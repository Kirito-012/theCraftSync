
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/google'
);

// Helper to set credentials
const setCredentials = () => {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, date, time } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Authenticate with Google
    if (!process.env.GOOGLE_REFRESH_TOKEN) {
        console.error('Missing GOOGLE_REFRESH_TOKEN');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    setCredentials();

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Parse date and time to ISO string
    // Assuming date is ISO string from frontend, and time is like "10:00 AM"
    const startDate = new Date(date);
    const [timeStr, period] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 15); // 15 min duration as per UI

    // 2. Create Calendar Event
    const event = {
      summary: `Intro Call with ${name}`,
      description: `Meeting with ${name} (${email}) for TheCraftSync intro call.`,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'Asia/Kolkata', // Set preferred timezone or get from user
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      attendees: [
        { email: 'thecraftsync@gmail.com' } // Only your email so it appears on your calendar
      ],
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(7),
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const calendarResponse = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
    });

    const googleMeetLink = calendarResponse.data.hangoutLink || 'No link generated';
    console.log('✅ Generated Meet Link:', googleMeetLink);

    // 3. Send Confirmation Email to User via Resend
    console.log('📬 Attempting to send user confirmation email to:', email);
    await resend.emails.send({
      from: 'TheCraftSync <manikbansal@thecraftsync.com>',
      to: [email],
      subject: 'Meeting Confirmed: Your Intro Call with TheCraftSync',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Meeting Confirmation | TheCraftSync</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #030303; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td align="center" style="padding: 40px 0 60px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #09090b; border: 1px solid #18181b; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                  
                  <!-- Premium Header -->
                  <tr>
                    <td align="center" style="padding: 60px 40px 40px 40px; background: linear-gradient(180deg, #18181b 0%, #09090b 100%);">
                      <div style="background-color: #ffffff; width: 48px; h-48px; border-radius: 12px; display: inline-block; padding: 12px; margin-bottom: 24px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      </div>
                      <h1 style="color: #ffffff; margin: 0; font-size: 14px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase;">TheCraftSync</h1>
                      <p style="color: #a1a1aa; font-size: 16px; margin-top: 12px; font-weight: 400;">Your consultation is confirmed</p>
                    </td>
                  </tr>

                  <!-- Hero Content -->
                  <tr>
                    <td style="padding: 0 48px 40px 48px;">
                      <div style="height: 1px; background: linear-gradient(90deg, transparent, #27272a, transparent); margin-bottom: 40px;"></div>
                      
                      <h2 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 20px 0; letter-spacing: -0.5px;">Hi ${name},</h2>
                      <p style="color: #d4d4d8; font-size: 16px; line-height: 1.7; margin: 0 0 32px 0;">
                        We're excited to meet you! Your 15-minute introductory consultation has been successfully scheduled. We've prepared everything to help you explore the potential of your digital vision.
                      </p>

                      <!-- Detail Card -->
                      <div style="background-color: #111113; border: 1px solid #1d1d21; border-radius: 20px; padding: 32px; margin-bottom: 32px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="padding-bottom: 24px; border-bottom: 1px solid #1d1d21;">
                              <p style="color: #71717a; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 8px 0;">Date & Time</p>
                              <p style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0;">${startDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                              <p style="color: #10b981; font-size: 15px; font-weight: 500; margin: 4px 0 0 0;">${time} (India Standard Time)</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-top: 24px;">
                              <p style="color: #71717a; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 12px 0;">Access Invitation</p>
                              <a href="${googleMeetLink}" style="display: inline-block; background-color: #ffffff; color: #000000; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-size: 15px; font-weight: 700; transition: all 0.3s ease;">
                                Join Google Meet
                              </a>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <!-- Tip Section -->
                      <div style="background-color: #ffffff08; border-radius: 16px; padding: 20px; border: 1px dashed #27272a;">
                        <p style="color: #a1a1aa; font-size: 14px; line-height: 1.5; margin: 0;">
                          <span style="color: #ffffff; font-weight: 600;">Pro Tip:</span> Join from a desktop browser for the best experience. We recommend arriving 2 minutes early to test your audio/video.
                        </p>
                      </div>
                    </td>
                  </tr>

                  <!-- Sophisticated Footer -->
                  <tr>
                    <td style="padding: 0 48px 48px 48px;">
                      <div style="height: 1px; background: #18181b; margin-bottom: 32px;"></div>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td>
                            <p style="color: #52525b; font-size: 13px; margin: 0;">Sent by <span style="color: #a1a1aa;">TheCraftSync</span></p>
                          </td>
                          <td align="right">
                            <a href="https://thecraftsync.com" style="color: #52525b; font-size: 13px; text-decoration: none;">thecraftsync.com</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    // 4. Send Notification to Owner
    await resend.emails.send({
      from: 'TheCraftSync <manikbansal@thecraftsync.com>',
      to: ['manikbansal@thecraftsync.com'],
      subject: `Booking Alert: Intro Call with ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, sans-serif;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="500" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
                  <tr>
                    <td style="background-color: #000000; padding: 32px; text-align: center;">
                      <h1 style="color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 3px; margin: 0;">New Engagement</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 32px;">
                      <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin: 0 0 24px 0;">${name} just booked a call</h2>
                      
                      <div style="background-color: #f1f5f9; border-radius: 12px; padding: 24px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="padding-bottom: 12px; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Partner Details</td>
                          </tr>
                          <tr>
                            <td style="color: #0f172a; font-size: 16px; font-weight: 500; padding-bottom: 16px;">
                              ${name}<br>
                              <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom: 8px; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Scheduled For</td>
                          </tr>
                          <tr>
                            <td style="color: #0f172a; font-size: 16px; font-weight: 500;">
                               ${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} @ ${time} IST
                            </td>
                          </tr>
                        </table>
                      </div>

                      <div style="margin-top: 32px; text-align: center;">
                        <a href="${googleMeetLink}" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600;">View In Calendar</a>
                      </div>
                    </td>
                  </tr>
                </table>
                <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">&copy; ${new Date().getFullYear()} TheCraftSync Internal Automation</p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, link: googleMeetLink });

  } catch (error: any) {
    console.error('Schedule Error:', error.response?.data || error.message || error);
    return NextResponse.json(
      { error: error.message || 'Failed to schedule meeting' },
      { status: 500 }
    );
  }
}
