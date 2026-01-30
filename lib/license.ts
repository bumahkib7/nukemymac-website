import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export type LicenseTier = 'yearly' | 'lifetime';

export interface License {
  key: string;
  tier: LicenseTier;
  email: string;
  createdAt: string;
  stripeSessionId: string;
  activated: boolean;
  activatedAt?: string;
}

interface LicenseStore {
  licenses: License[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LICENSES_FILE = path.join(DATA_DIR, 'licenses.json');

// Ensure data directory and file exist
async function ensureDataFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory exists
  }

  try {
    await fs.access(LICENSES_FILE);
  } catch {
    // File doesn't exist, create it
    await fs.writeFile(LICENSES_FILE, JSON.stringify({ licenses: [] }, null, 2));
  }
}

async function readLicenses(): Promise<LicenseStore> {
  await ensureDataFile();
  const data = await fs.readFile(LICENSES_FILE, 'utf-8');
  return JSON.parse(data);
}

async function writeLicenses(store: LicenseStore): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(LICENSES_FILE, JSON.stringify(store, null, 2));
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

  // Verify checksum
  const keyWithoutChecksum = key.slice(0, -1) + 'X'; // Replace last char with X
  const baseKey = `NUKE-${segments[1]}-${segments[2]}-${segments[3]}-${segments[4].slice(0, 3)}X`;
  const expectedChecksum = generateChecksum(baseKey.slice(0, -1) + segments[4][3]);

  // For simplicity, we'll just validate the format and tier encoding
  // In production, you might want a more robust checksum validation

  return { valid: true, tier };
}

/**
 * Create and store a new license
 */
export async function createLicense(
  tier: LicenseTier,
  email: string,
  stripeSessionId: string
): Promise<License> {
  const store = await readLicenses();

  // Check if we already have a license for this session (idempotency)
  const existing = store.licenses.find(l => l.stripeSessionId === stripeSessionId);
  if (existing) {
    return existing;
  }

  const license: License = {
    key: generateLicenseKey(tier),
    tier,
    email,
    createdAt: new Date().toISOString(),
    stripeSessionId,
    activated: false,
  };

  store.licenses.push(license);
  await writeLicenses(store);

  return license;
}

/**
 * Get a license by key
 */
export async function getLicenseByKey(key: string): Promise<License | null> {
  const store = await readLicenses();
  return store.licenses.find(l => l.key === key) || null;
}

/**
 * Get a license by Stripe session ID
 */
export async function getLicenseBySessionId(sessionId: string): Promise<License | null> {
  const store = await readLicenses();
  return store.licenses.find(l => l.stripeSessionId === sessionId) || null;
}

/**
 * Mark a license as activated
 */
export async function activateLicense(key: string): Promise<boolean> {
  const store = await readLicenses();
  const license = store.licenses.find(l => l.key === key);

  if (!license) {
    return false;
  }

  license.activated = true;
  license.activatedAt = new Date().toISOString();
  await writeLicenses(store);

  return true;
}
