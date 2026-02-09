import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { doubt, email, phone } = body;

    if (!doubt || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'TheCraftSync Bot <onboarding@resend.dev>', // Or a configured domain if available
      to: ['manikbansal@thecraftsync.com'],
      subject: 'New Chatbot Inquiry',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Chatbot Inquiry</title>
          </head>
          <body style="background-color: #f4f4f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
              <!-- Header -->
              <div style="background-color: #000000; padding: 40px 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px;">THECRAFTSYNC</h1>
                <p style="color: #888888; font-size: 12px; margin-top: 10px; text-transform: uppercase; letter-spacing: 1px;">New Website Inquiry</p>
              </div>

              <!-- Content -->
              <div style="padding: 40px 30px;">
                <h2 style="color: #111111; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 30px;">You received a new message</h2>
                
                <!-- Doubt/Question Section -->
                <div style="margin-bottom: 30px;">
                  <p style="color: #888888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">INQUIRY DETAILS</p>
                  <div style="background-color: #f9f9fa; border-left: 4px solid #000000; padding: 20px; border-radius: 4px;">
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0;">${doubt}</p>
                  </div>
                </div>

                <!-- Contact Details Grid -->
                <table style="width: 100%; border-spacing: 0;">
                  <tr>
                    <td style="width: 50%; padding-right: 15px; vertical-align: top;">
                      <p style="color: #888888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">EMAIL ADDRESS</p>
                      <p style="color: #111111; font-size: 16px; font-weight: 500; margin: 0;">
                        <a href="mailto:${email}" style="color: #111111; text-decoration: none; border-bottom: 1px solid #ddd;">${email}</a>
                      </p>
                    </td>
                    <td style="width: 50%; padding-left: 15px; vertical-align: top;">
                      <p style="color: #888888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">PHONE NUMBER</p>
                      <p style="color: #111111; font-size: 16px; font-weight: 500; margin: 0;">${phone}</p>
                    </td>
                  </tr>
                </table>

                <!-- Timestamp or Extra Info -->
                <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #f0f0f0;">
                  <p style="color: #999999; font-size: 13px; margin: 0; font-style: italic;">
                    Captured via TheCraftSync Chatbot • ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #f9f9fa; padding: 25px; text-align: center; border-top: 1px solid #eaeaea;">
                <p style="color: #aaaaaa; font-size: 12px; margin: 0;">
                  &copy; ${new Date().getFullYear()} TheCraftSync. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
