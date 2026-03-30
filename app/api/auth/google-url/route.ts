
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/google';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUri
);

export async function GET() {
  const scopes = [
    'https://www.googleapis.com/auth/calendar.events',
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });

  return NextResponse.redirect(url);
}
