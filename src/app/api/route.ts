import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_MFidbNCG_HxsfosAMdaogvgkhEUR98fy5');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'SoleTech Contact <onboarding@resend.dev>', // Use your verified domain
      to: ['casasemelle@gmail.com'], // Your recipient email
      replyTo: email, // User's email for easy reply
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #4b5563;
                display: block;
                margin-bottom: 5px;
              }
              .value {
                background: white;
                padding: 12px;
                border-radius: 6px;
                border: 1px solid #e5e7eb;
              }
              .message-box {
                background: white;
                padding: 15px;
                border-radius: 6px;
                border-left: 4px solid #f59e0b;
                white-space: pre-wrap;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Name:</span>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <span class="label">Email:</span>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                ${phone ? `
                <div class="field">
                  <span class="label">Phone:</span>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                ` : ''}
                
                <div class="field">
                  <span class="label">Message:</span>
                  <div class="message-box">${message}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from the SoleTech contact form.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}