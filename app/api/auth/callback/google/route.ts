
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/google'
);

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    if (!tokens.refresh_token) {
        return NextResponse.json({
            message: 'Refresh token not returned. Try revoking authorization if it was already granted.',
            tokens
        });
    }

    // Display the refresh token clearly for the user to copy
    return new NextResponse(`
      <body style="font-family: sans-serif; padding: 40px; background: #000; color: #fff;">
        <h1 style="color: #10b981;">New Refresh Token Generated!</h1>
        <p>Copy this token and update <strong>GOOGLE_REFRESH_TOKEN</strong> in your .env file:</p>
        <pre style="background: #111; padding: 20px; border: 1px solid #333; overflow-x: auto; color: #10b981; font-weight: bold; font-size: 1.2rem;">${tokens.refresh_token}</pre>
        <p style="color: #666;">After updating .env, RESTART your dev server for the changes to take effect.</p>
      </body>
    `, {
        headers: { 'Content-Type': 'text/html' }
    });

  } catch (error: any) {
    console.error('Callback Error:', error);
    return NextResponse.json({ error: error.message || 'Token exchange failed' }, { status: 500 });
  }
}
