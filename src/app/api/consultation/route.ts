// src/app/api/consultation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      consultationType,
      date,
      time,
      projectDescription,
      challenges,
      budgetRange,
      timeline
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !company || !projectDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER || 'info@belayabteamtech.com';
    const emailPass = process.env.EMAIL_PASSWORD;

    if (!emailPass) {
      throw new Error('Email configuration error');
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'mail.belayabteamtech.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        minVersion: 'TLSv1.2'
      }
    });

    // Email to admin
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Consultation Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #e65225;">🔔 New Consultation Request</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Client Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Consultation Details</h3>
            <p><strong>Type:</strong> ${consultationType}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time} (EAT)</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Project Information</h3>
            <p><strong>Description:</strong></p>
            <p>${projectDescription}</p>
            
            ${challenges ? `<p><strong>Challenges:</strong><br>${challenges}</p>` : ''}
            ${budgetRange ? `<p><strong>Budget Range:</strong> ${budgetRange}</p>` : ''}
            ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <a href="https://belayabteamtech.com/admin/consultations" 
               style="background: #e65225; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
                View in Dashboard
            </a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>This consultation request was submitted via the BelayAb Team Technologies website.</p>
            <p>Time: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' })}</p>
        </div>
    </div>
</body>
</html>
    `;

    // Send to admin
    await transporter.sendMail({
      from: `"BelayAb Team" <${emailUser}>`,
      to: emailUser,
      subject: `New Consultation: ${name} from ${company}`,
      html: adminHtml
    });

    // Confirmation email to user
    const userHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultation Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #e65225;">BelayAb Team Technologies</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">✅ Consultation Scheduled</h2>
            
            <p>Hello ${name},</p>
            
            <p>Thank you for scheduling a ${consultationType.toLowerCase()} with BelayAb Team Technologies.</p>
            
            <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #e0e0e0;">
                <h3 style="color: #e65225; margin-top: 0;">Your Consultation Details:</h3>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time} (East Africa Time)</p>
                <p><strong>Type:</strong> ${consultationType}</p>
                <p><strong>Meeting Format:</strong> Microsoft Teams / Zoom</p>
            </div>
            
            <h4>What to Prepare:</h4>
            <ul>
                <li>Brief overview of your organization</li>
                <li>Specific challenges you're facing</li>
                <li>Project goals and desired outcomes</li>
                <li>Any existing technical documentation</li>
            </ul>
            
            <p><strong>Next Steps:</strong></p>
            <ol>
                <li>Our technical team will review your information</li>
                <li>We'll send a calendar invite with meeting link</li>
                <li>Prepare any questions you have</li>
            </ol>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://belayabteamtech.com/solutions" 
                   style="background: #e65225; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                    View Our Solutions
                </a>
            </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center;">
            <p>This is an automated confirmation. Our team will contact you shortly.</p>
            <p>If you need to reschedule, please reply to this email or call +251 970 819 403</p>
            <p>© ${new Date().getFullYear()} BelayAb Team Technologies</p>
        </div>
    </div>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"BelayAb Team Technologies" <${emailUser}>`,
      to: email,
      subject: 'Consultation Scheduled with BelayAb Team Technologies',
      html: userHtml
    });

    return NextResponse.json({
      success: true,
      message: 'Consultation scheduled successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Consultation error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to schedule consultation',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}