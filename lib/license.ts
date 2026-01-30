import crypto from 'crypto';
import prisma from './db';
import { LicenseTier as PrismaLicenseTier, LicenseStatus } from '@prisma/client';

export type LicenseTier = 'yearly' | 'lifetime';

export interface License {
  key: string;
  tier: LicenseTier;
  email: string;
  createdAt: string;
  stripeSessionId: string;
  activated: boolean;
  activatedAt?: string;
  expiresAt?: string;
}

/**
 * Generate a license key in the format: NUKE-XXXX-XXXX-XXXX-XXXX
 * The key encodes the tier in a verifiable way
 */
export function generateLicenseKey(tier: LicenseTier): string {
  // Generate random bytes
  const randomBytes = crypto.randomBytes(12);

  // Convert to base36 uppercase, split into 4-char segments
  const segments: string[] = [];
  for (let i = 0; i < 4; i++) {
    const slice = randomBytes.slice(i * 3, (i + 1) * 3);
    // Convert 3 bytes to a number and then to base36
    const num = (slice[0] << 16) | (slice[1] << 8) | slice[2];
    const segment = num.toString(36).toUpperCase().padStart(4, '0').slice(0, 4);
    segments.push(segment);
  }

  // Encode tier in the first character of second segment
  // Y = yearly, L = lifetime
  const tierChar = tier === 'yearly' ? 'Y' : 'L';
  segments[1] = tierChar + segments[1].slice(1);

  // Add a checksum character at the end of the last segment
  const baseKey = `NUKE-${segments.join('-')}`;
  const checksum = generateChecksum(baseKey);
  segments[3] = segments[3].slice(0, 3) + checksum;

  return `NUKE-${segments.join('-')}`;
}

/**
 * Generate a simple checksum character for validation
 */
function generateChecksum(key: string): string {
  const hash = crypto.createHash('md5').update(key).digest('hex');
  // Take first char and convert to uppercase letter (A-Z)
  const num = parseInt(hash.slice(0, 2), 16) % 26;
  return String.fromCharCode(65 + num); // A-Z
}

/**
 * Validate a license key format and extract tier
 * Returns null if invalid
 */
export function validateLicenseKey(key: string): { valid: boolean; tier?: LicenseTier } {
  // Check format: NUKE-XXXX-XXXX-XXXX-XXXX
  const regex = /^NUKE-[A-Z0-9]{4}-[YL][A-Z0-9]{3}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  if (!regex.test(key)) {
    return { valid: false };
  }

  // Extract tier from second segment's first character
  const segments = key.split('-');
  const tierChar = segments[2][0]; // Second segment after NUKE-

  const tier: LicenseTier = tierChar === 'Y' ? 'yearly' : 'lifetime';

  return { valid: true, tier };
}

// Convert string tier to Prisma enum
function toPrismaTier(tier: LicenseTier): PrismaLicenseTier {
  return tier === 'yearly' ? 'YEARLY' : 'LIFETIME';
}

// Convert Prisma enum to string tier
function fromPrismaTier(tier: PrismaLicenseTier): LicenseTier {
  return tier === 'YEARLY' ? 'yearly' : 'lifetime';
}

/**
 * Create and store a new license
 */
export async function createLicense(
  tier: LicenseTier,
  email: string,
  stripeSessionId: string,
  stripeCustomerId?: string
): Promise<License> {
  // Check if we already have a license for this session (idempotency)
  const existing = await prisma.license.findUnique({
    where: { stripeSessionId },
  });

  if (existing) {
    return {
      key: existing.key,
      tier: fromPrismaTier(existing.tier),
      email: existing.email,
      createdAt: existing.createdAt.toISOString(),
      stripeSessionId: existing.stripeSessionId || '',
      activated: existing.activationCount > 0,
      activatedAt: existing.activatedAt?.toISOString(),
      expiresAt: existing.expiresAt?.toISOString(),
    };
  }

  // Calculate expiration date for yearly licenses
  const expiresAt = tier === 'yearly'
    ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
    : null;

  const license = await prisma.license.create({
    data: {
      key: generateLicenseKey(tier),
      tier: toPrismaTier(tier),
      email,
      stripeSessionId,
      stripeCustomerId,
      expiresAt,
    },
  });

  return {
    key: license.key,
    tier: fromPrismaTier(license.tier),
    email: license.email,
    createdAt: license.createdAt.toISOString(),
    stripeSessionId: license.stripeSessionId || '',
    activated: false,
    expiresAt: license.expiresAt?.toISOString(),
  };
}

/**
 * Get a license by key
 */
export async function getLicenseByKey(key: string): Promise<License | null> {
  const license = await prisma.license.findUnique({
    where: { key },
  });

  if (!license) return null;

  return {
    key: license.key,
    tier: fromPrismaTier(license.tier),
    email: license.email,
    createdAt: license.createdAt.toISOString(),
    stripeSessionId: license.stripeSessionId || '',
    activated: license.activationCount > 0,
    activatedAt: license.activatedAt?.toISOString(),
    expiresAt: license.expiresAt?.toISOString(),
  };
}

/**
 * Get a license by Stripe session ID
 */
export async function getLicenseBySessionId(sessionId: string): Promise<License | null> {
  const license = await prisma.license.findUnique({
    where: { stripeSessionId: sessionId },
  });

  if (!license) return null;

  return {
    key: license.key,
    tier: fromPrismaTier(license.tier),
    email: license.email,
    createdAt: license.createdAt.toISOString(),
    stripeSessionId: license.stripeSessionId || '',
    activated: license.activationCount > 0,
    activatedAt: license.activatedAt?.toISOString(),
    expiresAt: license.expiresAt?.toISOString(),
  };
}

/**
 * Activate a license for a machine
 */
export async function activateLicense(key: string, machineId?: string): Promise<{
  success: boolean;
  error?: string;
  tier?: LicenseTier;
}> {
  const license = await prisma.license.findUnique({
    where: { key },
  });

  if (!license) {
    return { success: false, error: 'License not found' };
  }

  // Check if license is active
  if (license.status !== 'ACTIVE') {
    return { success: false, error: `License is ${license.status.toLowerCase()}` };
  }

  // Check if license is expired
  if (license.expiresAt && license.expiresAt < new Date()) {
    await prisma.license.update({
      where: { key },
      data: { status: 'EXPIRED' },
    });
    return { success: false, error: 'License has expired' };
  }

  // Check activation limit (if machineId provided)
  if (machineId) {
    // Check if this machine is already activated
    if (license.machineIds.includes(machineId)) {
      return { success: true, tier: fromPrismaTier(license.tier) };
    }

    // Check if we've reached the activation limit
    if (license.activationCount >= license.maxActivations) {
      return { success: false, error: 'Maximum activations reached' };
    }

    // Add machine ID and increment count
    await prisma.license.update({
      where: { key },
      data: {
        machineIds: { push: machineId },
        activationCount: { increment: 1 },
        activatedAt: license.activatedAt || new Date(),
      },
    });
  } else {
    // Just mark as activated without machine tracking
    await prisma.license.update({
      where: { key },
      data: {
        activationCount: { increment: 1 },
        activatedAt: license.activatedAt || new Date(),
      },
    });
  }

  return { success: true, tier: fromPrismaTier(license.tier) };
}

/**
 * Check if a license is valid (not expired, active status)
 */
export async function checkLicenseValidity(key: string): Promise<{
  valid: boolean;
  tier?: LicenseTier;
  expiresAt?: string;
  error?: string;
}> {
  const license = await prisma.license.findUnique({
    where: { key },
  });

  if (!license) {
    return { valid: false, error: 'License not found' };
  }

  if (license.status !== 'ACTIVE') {
    return { valid: false, error: `License is ${license.status.toLowerCase()}` };
  }

  if (license.expiresAt && license.expiresAt < new Date()) {
    return { valid: false, error: 'License has expired' };
  }

  return {
    valid: true,
    tier: fromPrismaTier(license.tier),
    expiresAt: license.expiresAt?.toISOString(),
  };
}

/**
 * Revoke a license
 */
export async function revokeLicense(key: string): Promise<boolean> {
  try {
    await prisma.license.update({
      where: { key },
      data: { status: 'REVOKED' },
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Track a download
 */
export async function trackDownload(data: {
  version: string;
  ipAddress?: string;
  userAgent?: string;
  country?: string;
  referrer?: string;
}): Promise<void> {
  await prisma.download.create({
    data: {
      version: data.version,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      country: data.country,
      referrer: data.referrer,
    },
  });
}

/**
 * Track an analytics event
 */
export async function trackEvent(data: {
  event: string;
  page?: string;
  metadata?: Record<string, unknown>;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  country?: string;
}): Promise<void> {
  await prisma.analyticsEvent.create({
    data: {
      event: data.event,
      page: data.page,
      metadata: data.metadata || {},
      sessionId: data.sessionId,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      country: data.country,
    },
  });
}
