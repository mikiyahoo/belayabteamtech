// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, email, partnershipType, description } = body;

    // 1. Validate required fields
    if (!companyName || !email || !partnershipType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 3. GENTLE SPAM DETECTION (don't mark in subject)
    const isLikelySpam = 
      // Very obvious spam indicators only
      description?.toLowerCase().includes('viagra') ||
      description?.toLowerCase().includes('casino') ||
      description?.toLowerCase().includes('xxx') ||
      description?.toLowerCase().includes('porn') ||
      description?.includes('http://') && !description.includes(' ') || // Naked URLs
      description?.includes('https://') && !description.includes(' ') || // Naked URLs
      email.includes('+') && email.split('+')[1]?.includes('@'); // Gmail aliases

    // Get IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // 4. Email configuration
    const emailUser = process.env.EMAIL_USER || 'info@belayabteamtech.com';
    const emailPass = process.env.EMAIL_PASSWORD;
    
    if (!emailPass) {
      console.error('❌ EMAIL_PASSWORD not set');
      throw new Error('Email configuration error');
    }

    // Create transporter with BETTER settings
    const transporter = nodemailer.createTransport({
      host: 'mail.belayabteamtech.com',
      port: 587, // Changed from 465 to 587 (TLS is better)
      secure: false, // false for TLS
      requireTLS: true, // Require TLS
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      // Better settings for deliverability
      pool: true, // Use connection pooling
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5,
      tls: {
        // DO NOT use rejectUnauthorized: false in production
        minVersion: 'TLSv1.2'
      }
    });

    // 5. Prepare CLEAN emails (no spam indicators)
    
    // Admin email - Clean subject
    const adminSubject = `Partnership Inquiry: ${companyName.substring(0, 50)}`;
    
    // Clean HTML without spam-like formatting
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Partnership Inquiry</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #e65225; margin-top: 0;">New Partnership Inquiry</h2>
        
        <div style="background: white; padding: 20px; border-radius: 5px; border: 1px solid #e0e0e0;">
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #e65225; text-decoration: none;">${email}</a></p>
            <p><strong>Partnership Type:</strong> ${partnershipType}</p>
            <p><strong>Description:</strong><br>${description || 'Not provided'}</p>
            
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
                <p><strong>Submission Details:</strong></p>
                <p>Date: ${new Date().toLocaleString()}</p>
                <p>IP: ${ip}</p>
                ${isLikelySpam ? '<p style="color: #999;">Note: This message passed automated screening.</p>' : ''}
            </div>
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
            <a href="https://belayabteamtech.com" style="background: #e65225; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
                View on Website
            </a>
        </div>
    </div>
    
    <div style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
        <p>This email was sent from the BelayAb Team Technologies contact form.</p>
        <p>© ${new Date().getFullYear()} BelayAb Team Technologies. All rights reserved.</p>
    </div>
</body>
</html>
    `;

    const adminText = `
New Partnership Inquiry

Company: ${companyName}
Email: ${email}
Partnership Type: ${partnershipType}
Description: ${description || 'Not provided'}

Date: ${new Date().toLocaleString()}
IP: ${ip}

--
BelayAb Team Technologies
https://belayabteamtech.com
    `;

    // User confirmation email
    const userHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>We've Received Your Inquiry</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #e65225; margin-top: 0;">BelayAb Team Technologies</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 5px; border: 1px solid #e0e0e0;">
            <h2 style="color: #333; margin-top: 0;">Thank You for Your Interest!</h2>
            
            <p>Hello${companyName ? ` ${companyName}` : ''},</p>
            
            <p>We have received your partnership inquiry and our team will review it shortly.</p>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #e65225; margin-top: 0; font-size: 16px;">Your Inquiry Summary:</h3>
                <p><strong>Company:</strong> ${companyName}</p>
                <p><strong>Partnership Type:</strong> ${partnershipType}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <p><strong>What Happens Next:</strong></p>
            <ol style="padding-left: 20px;">
                <li>Our partnership team will review your inquiry</li>
                <li>We'll contact you within 24-48 hours</li>
                <li>We may schedule an introductory call</li>
            </ol>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://belayabteamtech.com" style="background: #e65225; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
                    Visit Our Website
                </a>
            </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center;">
            <p>This is an automated confirmation. Please do not reply to this email.</p>
            <p>If you need to update your inquiry, please contact us at info@belayabteamtech.com</p>
            <p>© ${new Date().getFullYear()} BelayAb Team Technologies</p>
        </div>
    </div>
</body>
</html>
    `;

    const userText = `
Thank You for Your Interest!

Hello${companyName ? ` ${companyName}` : ''},

We have received your partnership inquiry and our team will review it shortly.

Your Inquiry Summary:
Company: ${companyName}
Partnership Type: ${partnershipType}
Submitted: ${new Date().toLocaleDateString()}

What Happens Next:
1. Our partnership team will review your inquiry
2. We'll contact you within 24-48 hours
3. We may schedule an introductory call

For updates, visit: https://belayabteamtech.com

--
BelayAb Team Technologies
info@belayabteamtech.com

This is an automated confirmation. Please do not reply to this email.
    `;

    // 6. Send emails
    console.log('📤 Sending emails...', {
      toAdmin: emailUser,
      toUser: email,
      isLikelySpam
    });

    // Send to admin
    const adminResult = await transporter.sendMail({
      from: `"BelayAb Team" <${emailUser}>`, // Consistent sender name
      to: emailUser,
      replyTo: email,
      subject: adminSubject,
      html: adminHtml,
      text: adminText,
      headers: {
        'X-Priority': '3', // Normal priority
        'X-Mailer': 'BelayAb Team Website',
        'List-Unsubscribe': '<https://belayabteamtech.com/unsubscribe>',
      }
    });

    console.log('✅ Admin email sent:', adminResult.messageId);

    // Send to user (always send confirmation)
    const userResult = await transporter.sendMail({
      from: `"BelayAb Team Technologies" <${emailUser}>`,
      to: email,
      subject: 'We\'ve Received Your Partnership Inquiry',
      html: userHtml,
      text: userText,
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'BelayAb Team Website'
      }
    });

    console.log('✅ User confirmation sent:', userResult.messageId);

    // 7. Return success
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      timestamp: new Date().toISOString(),
      adminMessageId: adminResult.messageId,
      userMessageId: userResult.messageId
    }, { status: 200 });

  } catch (error: any) {
    console.error('❌ Email error:', {
      message: error.message,
      code: error.code,
      command: error.command
    });

    return NextResponse.json({
      success: false,
      error: 'Failed to send email',
      suggestion: 'Please try again later or contact us directly'
    }, { status: 500 });
  }
}