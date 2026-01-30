import { NextRequest, NextResponse } from 'next/server';
import { getLicenseByKey, validateLicenseKey, activateLicense } from '@/lib/license';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, activate } = body as { key: string; activate?: boolean };

    if (!key) {
      return NextResponse.json(
        { valid: false, error: 'License key is required' },
        { status: 400 }
      );
    }

    // First, validate the key format and extract tier
    const formatValidation = validateLicenseKey(key.toUpperCase().trim());

    if (!formatValidation.valid) {
      return NextResponse.json({
        valid: false,
        error: 'Invalid license key format',
      });
    }

    // Check if key exists in our database
    const license = await getLicenseByKey(key.toUpperCase().trim());

    if (!license) {
      // Key format is valid but not in our database
      // This could be a forged key or from a different system
      return NextResponse.json({
        valid: false,
        error: 'License key not found',
      });
    }

    // If activation requested, mark it
    if (activate && !license.activated) {
      await activateLicense(license.key);
    }

    return NextResponse.json({
      valid: true,
      tier: license.tier,
      activated: license.activated || activate,
      createdAt: license.createdAt,
    });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Validation failed' },
      { status: 500 }
    );
  }
}
