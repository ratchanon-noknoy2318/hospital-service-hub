'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';


// --- Component หลักสำหรับหน้าแรก (Homepage) ---
// หน้านี้เป็นหน้า Landing Page หลักของเว็บไซต์ ประกอบด้วยส่วนต่างๆ ที่ออกแบบมาเพื่อแนะนำโรงพยาบาลและบริการ
export default function HomePage() {
  // --- ข้อมูลและ Logic สำหรับ FAQ Accordion ---
  const [openFaqId, setOpenFaqId] = useState(null);
  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  // --- ข้อมูล FAQ สำหรับแสดงผลและทำ SEO Schema Markup ---
  const faqData = [
    { id: 1, question: "สามารถขอใบรับรองแพทย์เพื่อใช้ในราชการที่โรงพยาบาลได้หรือไม่?", answer: "ได้ค่ะ หากใช้แบบฟอร์มของทางเรา สามารถขอใบรับรองแพทย์ได้ทันทีค่ะ แต่หากเป็นแบบฟอร์มจากหน่วยงานอื่น กรุณาให้เจ้าหน้าที่ตรวจสอบก่อน เพื่อพิจารณาความเหมาะสมในการออกใบรับรองค่ะ " },
    { id: 2, question: "สามารถขอใบรับรองแพทย์ได้มากกว่าหนึ่งฉบับหรือไม่?", answer: "ได้ค่ะ ใบแรก 80 บาทใบถัดไปเพิ่มใบละ 30 บาท" },
    { id: 3, question: "โรงพยาบาลเปิดให้บริการในวันเสาร์-อาทิตย์หรือไม่?", answer: "ทางเราปิดให้บริการในวันเสาร์ วันอาทิตย์ และวันหยุดนักขัตฤกษ์ค่ะ" },
    { id: 4, question: "ในวันทำการปกติ โรงพยาบาลเปิดให้บริการถึงเวลาใด?", answer: "คุณหมอจะตรวจตั้งแต่ 08:30 น. ถึง 12.00 น. แต่จะรับคิวตรวจถึง 11.30 น. ค่ะ" },
    { id: 5, question: "สามารถจองคิวนวดกับทางโรงพยาบาลได้หรือไม่?", answer: "รบกวนโทรติดต่อที่ 055714924 ค่ะ" },
    { id: 6, question: "ไม่ทราบว่าทางนี้มีกำหนดการฉีดวัคซีนสำหรับเด็กในวันที่เท่าใดคะ?", answer: "สัปดาห์ที่ 2 และสัปดาห์ที่ 4 ของทุกเดือน ในวันพฤหัสบดีช่วงบ่ายค่ะ สามารถติดต่อสอบถามเพิ่มเติมได้ที่หมายเลขโทรศัพท์ 055-716715" }
  ];

  // --- JSON-LD Schema สำหรับ FAQPage (SEO) ---
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    // <main> เป็น container หลักสำหรับเนื้อหาทั้งหมดในหน้านี้
    <main className={styles.main}>
      {/* SEO: เพิ่ม JSON-LD Schema สำหรับ FAQ เพื่อให้ Google แสดงผล Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 
        Hero Section: ส่วนแรกที่ผู้ใช้เห็นเมื่อเข้ามาในเว็บไซต์ (Above the fold)
        - ประกอบด้วยภาพผู้บริหารเพื่อสร้างความน่าเชื่อถือ
        - ชื่อโรงพยาบาลและคำโปรยหลัก (Tagline)
        - คำอธิบายสั้นๆ เกี่ยวกับพันธกิจของโรงพยาบาล
        - ปุ่ม Call-to-Action (CTA) ที่ชัดเจนเพื่อนำผู้ใช้ไปยังหน้า "เกี่ยวกับเรา"
      */}
      <motion.header 
        id="hero" 
        className={`${styles.hero} ${styles.gridTwoCols}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className={styles.heroImageContainer} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <Image
            src="/hero/hero-image.jpg"
            alt="นางสาวพิชญา หงษ์สุตะเมธี - โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร"
            width={400}
            height={500}
            className={styles.heroImage}
            priority // `priority` บอกให้ Next.js โหลดรูปนี้ก่อน เพราะเป็นส่วนสำคัญที่ผู้ใช้เห็นเป็นอันดับแรก
            sizes="(max-width: 768px) 100vw, 50vw" // SEO: ช่วยให้ browser โหลดรูปขนาดที่เหมาะสมกับหน้าจอ (Core Web Vitals)
          />
          <div className={styles.heroImageCaption}>
            <p><strong>นางสาวพิชญา หงษ์สุตะเมธี</strong></p>
            <p>หัวหน้าฝ่ายบริหารงานทั่วไป (รักษาราชการแทน ผอ.กองสาธารณสุขฯ)</p>
          </div>
        </motion.div>
        <motion.div className={styles.heroText} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <h1>โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร</h1>
          <h2>บริการสุขภาพเพื่อชุมชน โดยเทศบาลเมืองกำแพงเพชร</h2>
          <p>
            เรามุ่งมั่นให้บริการดูแลสุขภาพที่ครอบคลุมแก่ประชาชนในพื้นที่ ด้วยเทคโนโลยีที่ทันสมัยและทีมบุคลากรทางการแพทย์ผู้เชี่ยวชาญ เพื่อสร้างประสบการณ์ที่ดีและไร้ความกังวลสำหรับทุกคนในครอบครัว
          </p>
          <Link href="/About" className={styles.button} aria-label="อ่านข้อมูลเพิ่มเติมเกี่ยวกับเรา">เกี่ยวกับเรา</Link>
        </motion.div>

      </motion.header>

      {/* 
        About Section: ส่วนแนะนำสั้นๆ เกี่ยวกับโรงพยาบาล
        - แสดงจุดเด่นหลักในรูปแบบ list เพื่อให้อ่านง่าย
        - ใช้คำขวัญ (Quote) เพื่อสร้างภาพลักษณ์และความเชื่อมั่น
      */}
      <motion.section 
        id="about" 
        className={`${styles.about} ${styles.gridTwoCols}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.aboutContent}>
          <h2>เกี่ยวกับสถานพยาบาลของเรา</h2>
          <p>
            เราทุ่มเทเพื่อมอบประสบการณ์ด้านสุขภาพที่ดีที่สุด โดยให้ความสำคัญกับความสะดวกสบายและความเป็นอยู่ที่ดีของท่านเป็นอันดับแรก
          </p>
          <ul>
            <li>เทคโนโลยีและเครื่องมือที่ทันสมัย</li>
            <li>ยึดผู้ป่วยเป็นศูนย์กลาง</li>
            <li>ทีมงานมากประสบการณ์</li>
            <li>บริการที่เป็นมิตรสำหรับทุกคน</li>
          </ul>
        </div>
        <div className={styles.quote}>
          <blockquote>
            "มุ่งมั่นพัฒนา สู่โรงพยาบาลคุณภาพ เพื่อสุขภาพที่ดีของชุมชน"
          </blockquote>
        </div>
      </motion.section>

      {/* 
        Value Section: ส่วนที่แสดงค่านิยมหรือจุดเด่นหลัก 3 ข้อของโรงพยาบาล
        - ใช้การ์ด (Card) พร้อมรูปภาพเพื่อช่วยในการสื่อสารและทำให้ข้อมูลน่าสนใจ
        - จัดเรียงในรูปแบบ Grid เพื่อความเป็นระเบียบ
      */}
      <motion.section 
        id="values" 
        className={`${styles.value} container`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2>สิ่งที่เราให้ความสำคัญ</h2>
        <div className={styles.valueGrid}>
          <motion.div 
            className={styles.valueCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Image src="/value/value-1.jpg" alt="เทคโนโลยีทางการแพทย์ที่ทันสมัย" width={300} height={200} sizes="(max-width: 768px) 100vw, 33vw" />
            <h3>เทคโนโลยีที่ทันสมัย</h3>
            <p>อุปกรณ์ที่ล้ำสมัยช่วยให้การวินิจฉัยและรักษามีความแม่นยำและสะดวกสบาย</p>
          </motion.div>
          <motion.div 
            className={styles.valueCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image src="/value/value-2.jpg" alt="การดูแลด้วยใจ" width={300} height={200} sizes="(max-width: 768px) 100vw, 33vw" />
            <h3>การดูแลด้วยใจ</h3>
            <p>เรามุ่งมั่นที่จะทำให้การมาโรงพยาบาลของท่านเป็นไปอย่างราบรื่นและน่าประทับใจ</p>
          </motion.div>
          <motion.div 
            className={styles.valueCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Image src="/value/value-3.jpg" alt="โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร" width={300} height={200} sizes="(max-width: 768px) 100vw, 33vw" />
            <h3>สะอาดและปลอดภัย</h3>
            <p>ความปลอดภัยคือสิ่งที่เรายึดมั่น สถานพยาบาลของเรามีมาตรฐานความสะอาดสูงสุด</p>
          </motion.div>
        </div>
      </motion.section>

      {/* 
        Services Section: ส่วนแสดงรายการบริการทางการแพทย์ที่โรงพยาบาลมีให้
        - แบ่งเป็น 2 คอลัมน์: รายการบริการ และรูปภาพประกอบ
        - ลิงก์ไปยังหน้ารายละเอียดของแต่ละบริการ หรือเว็บไซต์ภายนอก (เช่น Telemedicine)
      */}
      <motion.section 
        id="services" 
        className={`${styles.services} ${styles.gridTwoCols}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.servicesContent}>
          <h2>บริการทางการแพทย์</h2>
          <p>
            ตั้งแต่การตรวจสุขภาพทั่วไปจนถึงการรักษาเฉพาะทาง ท่านสามารถไว้วางใจให้เราส่งมอบบริการที่มีคุณภาพ เรามีรายการบริการที่ครอบคลุมความต้องการของท่าน
          </p>
          <div className={styles.servicesListContainer}>
            <ul>
              <li><Link href="/GeneralSchedule">ตรวจรักษาโรคทั่วไป</Link></li>
              <li><Link href="/HealthSchedule">แพทย์แผนจีน (ฝังเข็ม)</Link></li>
              <li><Link href="/Thai&AltSchedule">แพทย์แผนไทย</Link></li>
              <li><Link href="https://kppmch-register.vercel.app/" target="_blank" rel="noopener noreferrer">บริการการแพทย์ทางไกล (Telemedicine)</Link></li>
              <li><Link href="https://kppmch-pregnant.vercel.app/" target="_blank" rel="noopener noreferrer">คลินิกฝากครรภ์</Link></li>
            </ul>
            <ul>
              <li>งานส่งเสริมสุขภาพ</li>
              <li>งานสุขาภิบาลและสิ่งแวดล้อม</li>
              <li>งานควบคุมโรค</li>
              <li>ออกหน่วยบริการชุมชน</li>
              <li>บริการฉุกเฉิน (ร่วมกับ 1669)</li>
            </ul>
          </div>
        </div>
        <div className={styles.servicesImageContainer}>
          <Image
            src="/services/services-image.jpg"
            alt="บรรยากาศการให้บริการและเครื่องมือทางการแพทย์ โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร"
            width={400}
            height={550}
            className={styles.servicesImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </motion.section>

      {/* 
        Feedback Section (Testimonial): ส่วนแสดงความคิดเห็นจากผู้ใช้บริการ
        - ใช้เพื่อสร้างความน่าเชื่อถือ (Social Proof) และความไว้วางใจ
      */}
      <motion.section 
        id="feedback" 
        className={`${styles.feedback} container`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.feedbackGrid}>
          <div>
            <h2>เสียงตอบรับจากผู้ใช้บริการ</h2>
            <p>คำติชมที่ทรงคุณค่า</p>
          </div>
          <motion.div className={styles.testimonial} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <p>
              "ประทับใจมากค่ะ! ทีมงานทุกคนเป็นมิตรและเป็นมืออาชีพมาก คุณหมอใจดีและอธิบายทุกอย่างชัดเจน ในที่สุดก็เจอสถานพยาบาลที่ไว้ใจได้ ขอแนะนำที่นี่สำหรับทุกคนที่มองหาการดูแลสุขภาพที่ดีค่ะ"
            </p>
            <p><strong>- ผู้ใช้บริการ</strong></p>
          </motion.div>
        </div>
      </motion.section>

      {/* 
        FAQ Section: ส่วนคำถามที่พบบ่อย
        - นำมาจากหน้า FAQ เพื่อให้ผู้ใช้เข้าถึงข้อมูลได้ง่ายจากหน้าแรก
        - ใช้ UI แบบ Accordion เพื่อความกระชับ
      */}
      <motion.section
        id="faq"
        className={`${styles.faqSection} container`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.faqSectionTitle}>คำถามที่พบบ่อย</h2>
        <div className={styles.faqAccordion}>
          {faqData.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <button
                onClick={() => toggleFaq(faq.id)}
                className={styles.faqQuestionButton}
                aria-expanded={openFaqId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span>{faq.question}</span>
                <svg
                  className={`${styles.faqIcon} ${openFaqId === faq.id ? styles.faqIconOpen : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                id={`faq-answer-${faq.id}`}
                className={`${styles.faqAnswerContainer} ${openFaqId === faq.id ? styles.faqAnswerContainerOpen : ''}`}
              >
                <div className={styles.faqAnswer}>{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.faqFooter}>
          <p>หากมีคำถามเพิ่มเติม?</p>
          <Link href="/Faq" className={styles.button}>
            ดูคำถามทั้งหมด
          </Link>
        </div>
      </motion.section>

      {/* 
        Contact Section: ส่วนท้ายสุดของหน้าแรก ทำหน้าที่คล้าย Footer
        - แสดงข้อมูลการติดต่อที่สำคัญทั้งหมด เช่น เบอร์โทร, อีเมล, ที่อยู่, และโซเชียลมีเดีย
        - มีรูปภาพประกอบเพื่อความสวยงาม
      */}
      <motion.section 
        id="contact" 
        className={`${styles.contact} ${styles.gridTwoCols}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.0 }}
      >
        <div className={styles.contactImageContainer}>
          <Image
            src="/contact/contact-us.jpg"
            alt="อาคารและสถานที่ตั้ง โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร"
            width={400}
            height={550}
            className={styles.contactImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={styles.contactInfo}>
          <h2>ติดต่อเรา</h2>
          <address style={{ fontStyle: 'normal' }}>
            <p><strong>โทรศัพท์:</strong> <a href="tel:055716715" className={styles.contactLink}>055-716-715</a></p>
            <p><strong>อีเมล:</strong> <a href="mailto:prathomhealth@gmail.com" className={styles.contactLink}>prathomhealth@gmail.com</a></p>
            <p><strong>ที่อยู่:</strong> <a href="https://maps.app.goo.gl/dapP53qvxXsBAdD7A" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>35 ซ.2 ถ.ราชดำเนิน 1 ต.ในเมือง อ.เมืองกำแพงเพชร จ.กำแพงเพชร 62000 (ซอยหลังวัดคูยาง)</a></p>
            <a href="https://www.facebook.com/kmch.kpp" target="_blank" rel="noopener noreferrer" className={styles.contactLink}><p><strong>Facebook:</strong> โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร</p></a>
            <a href="https://lin.ee/ZU1yyCD" target="_blank" rel="noopener noreferrer" className={styles.contactLink}><p><strong>LINE:</strong> @133rkonx</p></a>
            <a href="https://www.facebook.com/share/r/19nveSEDTE/" target="_blank" rel="noopener noreferrer" className={styles.contactLink} title="เป็นกำลังใจให้นะคะ"><p><strong>Vlog:</strong> ชมวิดีโอแนะนำโรงพยาบาล</p></a>
            <p><strong>เวลาทำการ:</strong> จันทร์ - ศุกร์ 08.30 - 16.30 น. <span style={{ color: 'red' }}>(ยกเว้นวันหยุดนักขัตฤกษ์)</span></p>
            <a href="https://www.infoquest.co.th/holidays" target="_blank" rel="noopener noreferrer" className={styles.contactLink}><p><strong>ปฏิทิน:</strong> ตารางวันหยุดราชการ</p></a>
          </address>
        </div>
      </motion.section>
    </main>
  );
}