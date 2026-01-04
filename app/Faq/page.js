'use client';

import { useState } from 'react';
import styles from './page.module.css'; 

// --- Component หลักสำหรับหน้า "คำถามที่พบบ่อย" ---
export default function Page() {
  // --- ข้อมูลคำถามและคำตอบ ---
  const faqs = [ 
    {
      id: 1,
      question: "สามารถขอใบรับรองแพทย์เพื่อใช้ในราชการที่โรงพยาบาลได้หรือไม่?",
      answer:
        "ได้ค่ะ หากใช้แบบฟอร์มของทางเรา สามารถขอใบรับรองแพทย์ได้ทันทีค่ะ แต่หากเป็นแบบฟอร์มจากหน่วยงานอื่น กรุณาให้เจ้าหน้าที่ตรวจสอบก่อน เพื่อพิจารณาความเหมาะสมในการออกใบรับรองค่ะ ",
    },
    {
      id: 2,
      question: "สามารถขอใบรับรองแพทย์ได้มากกว่าหนึ่งฉบับหรือไม่?",
      answer:
        "ได้ค่ะ ใบแรก 80 บาทใบถัดไปเพิ่มใบละ 30 บาท",
    },
    {
      id: 3,
      question: "โรงพยาบาลเปิดให้บริการในวันเสาร์-อาทิตย์หรือไม่?",
      answer:
        "ทางเราปิดให้บริการในวันเสาร์ วันอาทิตย์ และวันหยุดนักขัตฤกษ์ค่ะ",
    },
    {
      id: 4,
      question: "ในวันทำการปกติ โรงพยาบาลเปิดให้บริการถึงเวลาใด?",
      answer:
        "คุณหมอจะตรวจตั้งแต่ 08:30 น. ถึง 12.00 น. แต่จะรับคิวตรวจถึง 11.30 น. ค่ะ",
    },
      {
      id: 5,
      question: "สามารถจองคิวนวดกับทางโรงพยาบาลได้หรือไม่?",
      answer:
        "รบกวนโทรติดต่อที่ 055714924 ค่ะ",
    },
    {
      id: 6,
      question: "ไม่ทราบว่าทางนี้มีกำหนดการฉีดวัคซีนสำหรับเด็กในวันที่เท่าใดคะ?",
      answer:
        "สัปดาห์ที่ 2 และสัปดาห์ที่ 4 ของทุกเดือน ในวันพฤหัสบดีช่วงบ่ายค่ะ สามารถติดต่อสอบถามเพิ่มเติมได้ที่หมายเลขโทรศัพท์ 055-716715",
    }
  ];

  // State สำหรับเก็บ ID ของคำถามที่กำลังเปิดอยู่
  const [openFaqId, setOpenFaqId] = useState(null);

  // ฟังก์ชันสำหรับเปิด/ปิดคำตอบ
  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContentSingleColumn}>
        {/* 
          Content Wrapper: กล่องสีขาวสำหรับครอบเนื้อหาหลัก
        */}
        <div className={styles.contentWrapper}>
          <h1 className={styles.faqPageTitle}>
            คำถามที่พบบ่อย (FAQ)
          </h1>
          {/* Accordion: ส่วนแสดงรายการคำถาม-คำตอบ */}
          <div className={styles.faqAccordion}>
            {faqs.map((faq) => (
              <div key={faq.id} className={styles.faqItem}>
                <button
                  // เมื่อคลิกปุ่ม จะเรียกใช้ฟังก์ชัน toggleFaq
                  onClick={() => toggleFaq(faq.id)}
                  className={styles.faqQuestionButton}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`${styles.faqIcon} ${openFaqId === faq.id ? styles.faqIconOpen : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {/* ส่วนแสดงคำตอบ จะเปิด/ปิดตาม State */}
                <div className={`${styles.faqAnswerContainer} ${openFaqId === faq.id ? styles.faqAnswerContainerOpen : ''}`}>
                  <div className={styles.faqAnswer}>{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}