// src/app/api/telegram/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Your Telegram Bot credentials
const BOT_TOKEN = '8487412498:AAHe2m8T5g10BNLTbRAXc8mQ93UR8lGV1QU';
const CHAT_ID = '7308831482';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, source } = body;

    // Validate required field
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'Unknown';

    // Format message for Telegram
    const telegramMessage = `
📨 *New Message from BelayAb Website*

*Name:* ${name || 'Not provided'}
*Email:* ${email || 'Not provided'}
*Phone:* ${phone || 'Not provided'}

*Message:*
${message}

---
*Time:* ${new Date().toLocaleString('en-US', { 
  timeZone: 'Africa/Addis_Ababa',
  dateStyle: 'full',
  timeStyle: 'long' 
})}
*IP:* ${ip}
*Source:* ${source || 'website_form'}
    `;

    console.log('📤 Sending to Telegram:', {
      botToken: BOT_TOKEN.substring(0, 10) + '...',
      chatId: CHAT_ID,
      messageLength: telegramMessage.length
    });

    // Send to Telegram
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        disable_notification: false,
      }),
    });

    const data = await response.json();

    console.log('📩 Telegram API response:', {
      ok: data.ok,
      messageId: data.result?.message_id,
      error: data.description
    });

    if (data.ok) {
      // Log success to file (optional)
      const logEntry = {
        timestamp: new Date().toISOString(),
        messageId: data.result.message_id,
        name,
        email,
        phone,
        messagePreview: message.substring(0, 100),
        ip,
        source,
        status: 'sent'
      };
      
      console.log('✅ Telegram message logged:', logEntry);

      return NextResponse.json({
        success: true,
        message: 'Message sent successfully',
        messageId: data.result.message_id,
        timestamp: new Date().toISOString()
      }, { status: 200 });
    } else {
      console.error('❌ Telegram API error:', data);
      
      // Provide helpful error messages
      let errorMessage = 'Failed to send message';
      if (data.description?.includes('chat not found')) {
        errorMessage = 'Telegram chat not found. Check CHAT_ID.';
      } else if (data.description?.includes('bot token')) {
        errorMessage = 'Invalid Telegram bot token.';
      } else if (data.description?.includes('Too Many Requests')) {
        errorMessage = 'Rate limited. Please try again in a moment.';
      }

      return NextResponse.json({
        success: false,
        error: errorMessage,
        details: data.description
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('❌ Server error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

// For testing: GET endpoint to verify bot is working
export async function GET() {
  try {
    // Test bot connection
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
    const data = await response.json();
    
    if (data.ok) {
      return NextResponse.json({
        status: 'Telegram bot is working',
        botUsername: data.result.username,
        botName: data.result.first_name,
        chatId: CHAT_ID,
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        status: 'Telegram bot error',
        error: data.description
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      status: 'Telegram bot connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}