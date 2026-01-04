// app/webhook/route.js

import { Client, validateSignature } from "@line/bot-sdk"; // นำเข้า SDK ของ LINE
import { NextResponse } from 'next/server';

// --- นำเข้า Flex Messages จากไฟล์ JSON ---
import getTelemedSession from "./flex_messages/TelemedicineStartFlexmessage.json" with { type: "json" };
import getLatestNews from "./flex_messages/PublicRelationsFlexmessage.json" with { type: "json" };
import getMoreTelemed from "./flex_messages/TelemedicineMoreInfoFlexmessage.json" with { type: "json" };
import getContactInfo from "./flex_messages/ContactUsFlexmessage.json" with { type: "json" };
import getAboutDetails from "./flex_messages/AboutUsFlexmessage.json" with { type: "json" };
import getGeneralCheckup from "./flex_messages/GeneralService.json" with { type: "json" };
import getTraditionalDoctors from "./flex_messages/ThaiChineseService.json" with { type: "json" };
import getThaiMedicineDoctors from "./flex_messages/ThaiService.json" with { type: "json" };
import getFaq from "./flex_messages/FaqFlexmessage.json" with { type: "json" };
import getHealthTips from "./flex_messages/HealthTipsFlexmessage.json" with { type: "json" };

/**
 * GET handler for health check.
 * ตรวจสอบว่าเซิร์ฟเวอร์ webhook ทำงานอยู่หรือไม่
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - A JSON response indicating the status.
 */
export async function GET(request) {
  return NextResponse.json({ status: 'ok', message: 'Bot is live!' });
}

// --- Main POST Handler for LINE Webhook ---
// ฟังก์ชันนี้จะรับ request จาก LINE Platform เมื่อมี event เกิดขึ้น
export async function POST(request) {
  // ตั้งค่าและสร้าง LINE client ภายใน handler เพื่อให้แน่ใจว่า env vars ถูกโหลดแล้ว
  const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
  };

  try {
    // ตรวจสอบว่ามี environment variables ครบถ้วนหรือไม่
    // เป็นสิ่งสำคัญสำหรับความปลอดภัยและการทำงานที่ถูกต้อง
    if (!config.channelAccessToken || !config.channelSecret) {
      console.error("Missing LINE Channel Access Token or Channel Secret");
      return new Response("Server configuration error", { status: 500 });
    }

    const client = new Client(config);
    const body = await request.text(); // อ่าน request body เป็น text
    const signature = request.headers.get('x-line-signature'); // ดึง signature จาก header

    // ตรวจสอบลายเซ็น (Signature) เพื่อยืนยันว่า request มาจาก LINE จริงๆ
    if (!validateSignature(body, config.channelSecret, signature)) {
      console.warn('LINE Webhook: Invalid signature received. Check CHANNEL_SECRET and request integrity.');
      return new Response('Invalid signature', { status: 401 });
    }

    // แปลง body ที่เป็น JSON string ให้เป็น object
    const events = JSON.parse(body).events;

    // ถ้าไม่มี event ให้ส่ง response กลับไปเลย
    if (!events || events.length === 0) {
      return NextResponse.json({ success: true });
    }

    // วนลูปจัดการทุก event ที่ได้รับมา (อาจมีหลาย event ใน request เดียว)
    await Promise.all(events.map((event) => handleEvent(event, client)));

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook Error:', error);
    // ส่ง response 500 กลับไป แต่ไม่ควรส่งรายละเอียด error ให้ client
    return new Response('Internal Server Error', { status: 500 });
  }
}

// --- Quick Reply Definitions ---
const servicesQuickReply = {
  type: 'text',
  text: 'กรุณาเลือกบริการที่ท่านสนใจ:',
  quickReply: {
    items: [
      { type: 'action', action: { type: 'message', label: 'ตรวจโรคทั่วไป', text: 'ตรวจโรคทั่วไป' } },
      { type: 'action', action: { type: 'message', label: 'แพทย์แผนจีนและแผนไทย', text: 'แพทย์แผนจีนและแผนไทย' } },
      { type: 'action', action: { type: 'message', label: 'แพทย์แผนไทย', text: 'แพทย์แผนไทย' } },
      { type: 'action', action: { type: 'message', label: 'Telemedicine', text: 'เริ่มใช้บริการtelemedicine' } },
      { type: 'action', action: { type: 'uri', label: 'คลินิกฝากครรภ์', uri: 'https://lin.ee/jSH3VEc' } }
    ]
  }
};

// --- Keyword to Message Mapping ---
// ใช้ Map เพื่อจับคู่ keyword ที่ผู้ใช้พิมพ์กับ Flex Message ที่จะตอบกลับ
const messageMappings = new Map([
  [['เริ่มใช้บริการtelemedicine', 'เริ่มต้น', 'ใช้งาน telemedicine'], getTelemedSession],
  [['ข้อมูลเพิ่มเติมเกี่ยวกับtelemedicine', 'บริการของเรา/qrcode', 'บริการ', 'telemedicine>ดูเพิ่มเติม'], getMoreTelemed],
  [['ประชาสัมพันธ์', 'ข่าวประชาสัมพันธ์'], getLatestNews],
  [['ติดต่อเรา'], getContactInfo],
  [['เกี่ยวกับเรา'], getAboutDetails],
  [['ตรวจโรคทั่วไป'], getGeneralCheckup],
  [['แพทย์แผนจีนและแผนไทย'], getTraditionalDoctors],
  [['แพทย์แผนไทย'], getThaiMedicineDoctors],
  [['คำถามที่พบบ่อย', 'faq'], getFaq],
  [['สาระสุขภาพ', 'health tips'], getHealthTips],
  [['บริการของเรา'], servicesQuickReply],
]);

/**
 * Handles a single LINE messaging event.
 * ฟังก์ชันหลักในการประมวลผลข้อความจากผู้ใช้และเลือกการตอบกลับที่เหมาะสม
 * @param {import('@line/bot-sdk').WebhookEvent} event - The event object from LINE.
 * @param {Client} client - The LINE SDK client instance.
 */
async function handleEvent(event, client) {
  // ถ้าไม่ใช่ event message หรือไม่ใช่ข้อความประเภท text ให้ข้ามไป
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const userMessage = event.message.text.trim().toLowerCase();
  let replyMessage = null; // ตัวแปรสำหรับเก็บข้อความที่จะตอบกลับ

  // --- ค้นหาข้อความตอบกลับจาก messageMappings ---
  for (const [keywords, message] of messageMappings.entries()) {
    if (keywords.includes(userMessage)) {
      replyMessage = message;
      break;
    }
  }

  // ถ้ามีข้อความที่จะตอบกลับ (หา keyword เจอ)
  if (replyMessage) {
    // แสดง loading animation ให้ผู้ใช้เห็นเฉพาะเมื่อมีข้อความที่จะตอบกลับ
    // เพื่อปรับปรุง UX ให้ผู้ใช้รู้ว่าบอทกำลังประมวลผล
    if (event.source.userId) {
      try {
        // เรียกใช้ Loading API โดยตรงผ่าน fetch
        await fetch('https://api.line.me/v2/bot/chat/loading/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
          },
          body: JSON.stringify({
            chatId: event.source.userId,
            loadingSeconds: 5
          })
        });
      } catch (err) {
        console.error("Failed to show loading animation:", err);
      }
    }

    // ส่งข้อความตอบกลับไปยังผู้ใช้
    return client.replyMessage(event.replyToken, replyMessage);
  }

  // ถ้าไม่ตรงกับ keyword ไหนเลย ก็ไม่ต้องทำอะไร (จบการทำงาน)
  return Promise.resolve(null);
}
