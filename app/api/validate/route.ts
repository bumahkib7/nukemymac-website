import { NextRequest, NextResponse } from 'next/server';
import { getLicenseByKey, validateLicenseKey, activateLicense, checkLicenseValidity } from '@/lib/license';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, activate, machineId } = body as {
      key: string;
      activate?: boolean;
      machineId?: string;
    };

    if (!key) {
      return NextResponse.json(
        { valid: false, error: 'License key is required' },
        { status: 400 }
      );
    }

    const normalizedKey = key.toUpperCase().trim();

    // First, validate the key format and extract tier
    const formatValidation = validateLicenseKey(normalizedKey);

    if (!formatValidation.valid) {
      return NextResponse.json({
        valid: false,
        error: 'Invalid license key format',
      });
    }

    // Check if key exists and is valid
    const validity = await checkLicenseValidity(normalizedKey);

    if (!validity.valid) {
      return NextResponse.json({
        valid: false,
        error: validity.error || 'License key not found',
      });
    }

    // If activation requested, activate with optional machine ID
    if (activate) {
      const activationResult = await activateLicense(normalizedKey, machineId);

      if (!activationResult.success) {
        return NextResponse.json({
          valid: false,
          error: activationResult.error,
        });
      }
    }

    // Get full license details
    const license = await getLicenseByKey(normalizedKey);

    return NextResponse.json({
      valid: true,
      tier: validity.tier,
      activated: license?.activated || activate,
      createdAt: license?.createdAt,
      expiresAt: validity.expiresAt,
    });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Validation failed' },
      { status: 500 }
    );
  }
}
