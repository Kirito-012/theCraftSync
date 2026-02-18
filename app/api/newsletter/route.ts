
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'TheCraftSync Newsletter <onboarding@resend.dev>',
      to: ['manikbansal@thecraftsync.com'],
      subject: `New Newsletter Subscription: ${email}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f5; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #333;">New Newsletter Subscriber</h2>
              <p>A new user has requested to subscribe to the newsletter.</p>
              <div style="background-color: #f9f9fa; padding: 15px; border-radius: 4px; margin: 20px 0;">
                <strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
              </div>
              <p style="font-size: 12px; color: #666; margin-top: 30px;">
                Received on ${new Date().toLocaleString()}
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending newsletter email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
