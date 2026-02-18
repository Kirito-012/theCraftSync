
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
        { email: email },
        { email: 'manikbansal@thecraftsync.com' } // Owner's email
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

    // 3. Send Confirmation Email to User via Resend
    await resend.emails.send({
      from: 'TheCraftSync <onboarding@resend.dev>',
      to: [email],
      subject: 'Meeting Confirmation: Intro Call with TheCraftSync',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="background-color: #f4f4f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <!-- Header -->
            <div style="background-color: #000000; padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px;">THECRAFTSYNC</h1>
              <p style="color: #888888; font-size: 12px; margin-top: 10px; text-transform: uppercase; letter-spacing: 1px;">Meeting Confirmation</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #111111; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 20px;">Hi ${name},</h2>
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Your 15-minute intro call with TheCraftSync has been successfully scheduled. We're looking forward to discussing how we can help upgrade your digital presence.
              </p>
              
              <!-- Meeting Details Card -->
              <div style="background-color: #f9f9fa; border: 1px solid #eeeeee; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                <table style="width: 100%; border-spacing: 0;">
                  <tr>
                    <td style="padding-bottom: 15px; border-bottom: 1px solid #eaeaea; width: 30%;">
                      <p style="color: #888888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0;">DATE</p>
                    </td>
                    <td style="padding-bottom: 15px; border-bottom: 1px solid #eaeaea;">
                      <p style="color: #111111; font-size: 16px; font-weight: 500; margin: 0;">${startDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 15px; padding-bottom: 15px; border-bottom: 1px solid #eaeaea;">
                      <p style="color: #888888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0;">TIME</p>
                    </td>
                    <td style="padding-top: 15px; padding-bottom: 15px; border-bottom: 1px solid #eaeaea;">
                      <p style="color: #111111; font-size: 16px; font-weight: 500; margin: 0;">${time} (IST)</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 15px; vertical-align: middle;">
                      <p style="color: #888888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0;">LINK</p>
                    </td>
                    <td style="padding-top: 15px; vertical-align: middle;">
                      <a href="${googleMeetLink}" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 500;">Join Google Meet</a>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #fff8f1; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin-bottom: 30px;">
                <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.5;">
                  <strong>Quick Tip:</strong> Use a computer for the best experience. A calendar invitation has also been sent to <strong>${email}</strong>.
                </p>
              </div>

              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eaeaea;">
                <p style="color: #888888; font-size: 14px; margin: 0;">Best regards,<br><span style="color: #111111; font-weight: 500;">TheCraftSync Team</span></p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9f9fa; padding: 20px; text-align: center; border-top: 1px solid #eaeaea;">
              <p style="color: #aaaaaa; font-size: 11px; margin: 0;">&copy; ${new Date().getFullYear()} TheCraftSync. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // 4. Send Notification to Owner
    await resend.emails.send({
      from: 'TheCraftSync <onboarding@resend.dev>',
      to: ['manikbansal@thecraftsync.com'],
      subject: `New Meeting Scheduled: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="background-color: #f4f4f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <!-- Header -->
            <div style="background-color: #10b981; padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">NEW BOOKING</h1>
              <p style="color: #ecfdf5; font-size: 12px; margin-top: 10px; text-transform: uppercase; letter-spacing: 1px;">Incoming Lead</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #111111; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 20px;">${name} scheduled a call</h2>
              
              <!-- Client Details -->
              <div style="background-color: #f9f9fa; border: 1px solid #eeeeee; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                <table style="width: 100%; border-spacing: 0;">
                  <tr>
                    <td style="padding-bottom: 15px; border-bottom: 1px solid #eaeaea; width: 30%;">
                      <p style="color: #888888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0;">NAME</p>
                    </td>
                    <td style="padding-bottom: 15px; border-bottom: 1px solid #eaeaea;">
                      <p style="color: #111111; font-size: 16px; font-weight: 500; margin: 0;">${name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 15px; padding-bottom: 15px; border-bottom: 1px solid #eaeaea;">
                      <p style="color: #888888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0;">EMAIL</p>
                    </td>
                    <td style="padding-top: 15px; padding-bottom: 15px; border-bottom: 1px solid #eaeaea;">
                      <p style="color: #111111; font-size: 16px; font-weight: 500; margin: 0;"><a href="mailto:${email}" style="color: #111111; text-decoration: none; border-bottom: 1px solid #ddd;">${email}</a></p>
                    </td>
                  </tr>
                   <tr>
                    <td style="padding-top: 15px; padding-bottom: 15px; border-bottom: 1px solid #eaeaea;">
                      <p style="color: #888888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0;">DATE</p>
                    </td>
                    <td style="padding-top: 15px; padding-bottom: 15px; border-bottom: 1px solid #eaeaea;">
                      <p style="color: #111111; font-size: 16px; font-weight: 500; margin: 0;">${startDate.toLocaleDateString()}</p>
                    </td>
                  </tr>
                   <tr>
                    <td style="padding-top: 15px; padding-bottom: 15px; border-bottom: 1px solid #eaeaea;">
                      <p style="color: #888888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0;">TIME</p>
                    </td>
                    <td style="padding-top: 15px; padding-bottom: 15px; border-bottom: 1px solid #eaeaea;">
                      <p style="color: #111111; font-size: 16px; font-weight: 500; margin: 0;">${time}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 15px;">
                      <p style="color: #888888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0;">ACTION</p>
                    </td>
                    <td style="padding-top: 15px;">
                      <a href="${googleMeetLink}" style="color: #10b981; font-size: 16px; font-weight: 500; text-decoration: none;">View Meeting &rarr;</a>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="margin-top: 40px; text-align: center;">
                 <a href="https://calendar.google.com" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 500;">Open Google Calendar</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, link: googleMeetLink });

  } catch (error: any) {
    console.error('Schedule Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to schedule meeting' },
      { status: 500 }
    );
  }
}
