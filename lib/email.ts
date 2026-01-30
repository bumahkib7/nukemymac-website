import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'NukeMyMac <noreply@resend.dev>';

export async function sendLicenseEmail(params: {
  to: string;
  licenseKey: string;
  tier: 'yearly' | 'lifetime';
  expiresAt?: string;
}) {
  const { to, licenseKey, tier, expiresAt } = params;

  const tierName = tier === 'lifetime' ? 'Lifetime' : 'Pro Yearly';
  const expiryText = tier === 'lifetime'
    ? 'Your license never expires!'
    : `Valid until: ${new Date(expiresAt!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Your NukeMyMac ${tierName} License Key`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #ff6b35; margin: 0;">🧹 NukeMyMac</h1>
    <p style="color: #666; margin: 5px 0;">Clean Your Mac & Free Up Storage</p>
  </div>

  <div style="background: linear-gradient(135deg, #ff6b35 0%, #ff8f5a 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
    <h2 style="margin: 0 0 10px 0;">Thank You for Your Purchase!</h2>
    <p style="margin: 0; opacity: 0.9;">You now have access to NukeMyMac ${tierName}</p>
  </div>

  <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
    <h3 style="margin: 0 0 15px 0; color: #333;">Your License Key</h3>
    <div style="background: #fff; border: 2px dashed #ff6b35; padding: 15px; border-radius: 8px; text-align: center;">
      <code style="font-size: 18px; font-weight: bold; color: #ff6b35; letter-spacing: 1px;">${licenseKey}</code>
    </div>
    <p style="margin: 15px 0 0 0; font-size: 14px; color: #666;">${expiryText}</p>
  </div>

  <div style="margin-bottom: 30px;">
    <h3 style="margin: 0 0 15px 0;">How to Activate</h3>
    <ol style="margin: 0; padding-left: 20px; color: #555;">
      <li style="margin-bottom: 10px;">Open NukeMyMac on your Mac</li>
      <li style="margin-bottom: 10px;">Click "Enter License Key" in the app</li>
      <li style="margin-bottom: 10px;">Paste your license key and click Activate</li>
      <li style="margin-bottom: 10px;">Enjoy all Pro features!</li>
    </ol>
  </div>

  <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-bottom: 30px;">
    <p style="margin: 0; font-size: 14px; color: #856404;">
      <strong>💡 Tip:</strong> Save this email! You can use this license key on up to 3 Macs.
    </p>
  </div>

  <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
    <p style="color: #999; font-size: 14px; margin: 0;">
      Need help? Reply to this email or visit our website.
    </p>
    <p style="color: #999; font-size: 12px; margin: 10px 0 0 0;">
      © ${new Date().getFullYear()} NukeMyMac. All rights reserved.
    </p>
  </div>
</body>
</html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send license email:', error);
    return { success: false, error };
  }
}

export async function sendContactEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { name, email, subject, message } = params;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: 'bumahkib7@gmail.com', // Your email for receiving contact messages
      replyTo: email,
      subject: `[NukeMyMac Contact] ${subject}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #ff6b35;">New Contact Form Submission</h2>

  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>From:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
  </div>

  <div style="background: #fff; border-left: 4px solid #ff6b35; padding: 15px; margin: 20px 0;">
    <h3 style="margin: 0 0 10px 0;">Message:</h3>
    <p style="margin: 0; white-space: pre-wrap;">${message}</p>
  </div>

  <p style="color: #666; font-size: 14px;">Reply directly to this email to respond to ${name}.</p>
</body>
</html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(params: {
  to: string;
  name?: string;
}) {
  const { to, name } = params;
  const greeting = name ? `Hi ${name}` : 'Hi there';

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Welcome to NukeMyMac! 🧹',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #ff6b35; margin: 0;">🧹 NukeMyMac</h1>
  </div>

  <h2>${greeting}!</h2>

  <p>Thanks for downloading NukeMyMac! You've taken the first step to a cleaner, faster Mac.</p>

  <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 20px 0;">
    <h3 style="margin: 0 0 15px 0;">Quick Start Guide</h3>
    <ul style="margin: 0; padding-left: 20px;">
      <li>Run a <strong>Smart Scan</strong> to find junk files</li>
      <li>Check <strong>Disk Analysis</strong> to see what's using space</li>
      <li>Use <strong>App Uninstaller</strong> to completely remove apps</li>
    </ul>
  </div>

  <p>Your free trial includes all features for 7 days. Upgrade anytime to keep your Mac clean!</p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://nukemymac-website.vercel.app/#pricing" style="background: #ff6b35; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">View Pricing</a>
  </div>

  <p style="color: #666; font-size: 14px;">Questions? Just reply to this email.</p>
</body>
</html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}
