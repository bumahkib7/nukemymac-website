import { NextRequest, NextResponse } from 'next/server';
import { getLicenseBySessionId } from '@/lib/license';

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }

  try {
    const license = await getLicenseBySessionId(sessionId);

    if (!license) {
      return NextResponse.json({ license: null });
    }

    // Return license info (don't expose internal fields)
    return NextResponse.json({
      license: {
        key: license.key,
        tier: license.tier,
        email: license.email,
      },
    });
  } catch (error) {
    console.error('Error fetching license:', error);
    return NextResponse.json(
      { error: 'Failed to fetch license' },
      { status: 500 }
    );
  }
}
