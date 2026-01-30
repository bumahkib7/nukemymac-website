import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, type } = body as {
      name: string;
      email: string;
      subject: string;
      message: string;
      type?: 'BUG' | 'FEATURE_REQUEST' | 'GENERAL' | 'SUPPORT';
    };

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Store in database
    await prisma.feedback.create({
      data: {
        email,
        type: type || 'GENERAL',
        message: `Subject: ${subject}\n\nFrom: ${name}\n\n${message}`,
      },
    });

    // Send email notification
    const emailResult = await sendContactEmail({
      name,
      email,
      subject,
      message,
    });

    if (!emailResult.success) {
      console.error('Failed to send contact email');
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent. We\'ll get back to you soon!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
