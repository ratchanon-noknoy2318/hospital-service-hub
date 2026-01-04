'use client';

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css'; // Import dedicated styles for About page

// --- Component หลักสำหรับหน้า "เกี่ยวกับเรา" ---
export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContentSingleColumn}>
        {/* 
          Content Wrapper: กล่องสีขาวสำหรับครอบเนื้อหาหลัก
          เพื่อให้ดูเด่นขึ้นจากพื้นหลังสีอ่อน
        */}
        <div className={styles.contentWrapper}>
          <h1 className={styles.aboutPageTitle}>
            เกี่ยวกับเรา
          </h1>
          <h2 className={styles.aboutPageSubtitle}>
            โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร
          </h2>

          {/* 
            Prose: ส่วนเนื้อหาหลักของหน้า
          */}
          <div className={styles.prose}>
            <p>
              โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร เรามุ่งมั่นให้บริการดูแลสุขภาพที่ครอบคลุมแก่ประชาชนในพื้นที่ ด้วยเทคโนโลยีที่ทันสมัยและทีมบุคลากรทางการแพทย์ผู้เชี่ยวชาญ เพื่อสร้างประสบการณ์ที่ดีและไร้ความกังวลสำหรับทุกคนในครอบครัว
            </p>

            <section id="history" aria-labelledby="history-heading">
              <div className={styles.aboutGrid}>
                {/* 
                  ส่วนรูปภาพหลักของหน้า
                */}
                <div className={styles.aboutImageWrapper}>
                  <Image
                    src="/content/about-main.jpg"
                    alt="อาคารโรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร"
                    width={600}
                    height={450}
                    className={styles.aboutImage}
                  />
                </div>
                {/* 
                  ส่วนเนื้อหาประวัติความเป็นมา
                */}
                <div>
                  <h3 id="history-heading">ประวัติความเป็นมา</h3>
                  <p>
                    ก่อตั้งขึ้นโดยมีวัตถุประสงค์เพื่อยกระดับคุณภาพชีวิตและสุขภาวะของคนในชุมชน จากจุดเริ่มต้นที่เป็นเพียงสถานีอนามัยขนาดเล็ก เราได้พัฒนาและขยายการบริการอย่างต่อเนื่อง จนกลายเป็นโรงพยาบาลชุมชนที่ได้รับความไว้วางใจจากประชาชน
                  </p>
                </div>
              </div>
            </section>

            {/* 
              ส่วนแสดงวิสัยทัศน์ (Vision)
            */}
            <section aria-labelledby="vision-heading">
              <h3 id="vision-heading">วิสัยทัศน์ (Vision)</h3>
              <p>
                "เป็นองค์กรชั้นนำด้านการสร้างเสริมสุขภาพและป้องกันโรค เพื่อให้ประชาชนมีสุขภาวะที่ดีอย่างยั่งยืน"
              </p>
            </section>
            
            {/* 
              ส่วนแสดงพันธกิจ (Mission)
            */}
            <section aria-labelledby="mission-heading">
              <h3 id="mission-heading">พันธกิจ (Mission)</h3>
              <ul>
                <li>ให้บริการสุขภาพแบบองค์รวม ทั้งด้านการรักษาพยาบาล ส่งเสริมสุขภาพ ป้องกันโรค และฟื้นฟูสภาพ</li>
                <li>พัฒนาศักยภาพบุคลากรและระบบบริการให้มีคุณภาพและมาตรฐาน</li>
                <li>สร้างเครือข่ายความร่วมมือด้านสุขภาพกับทุกภาคส่วนในชุมชน</li>
                <li>ส่งเสริมให้ประชาชนมีความรู้และทักษะในการดูแลสุขภาพตนเอง</li>
              </ul>
            </section>

            {/* 
              ส่วนแสดงค่านิยมหลัก หรือ "สิ่งที่เราให้ความสำคัญ"
            */}
            <section aria-labelledby="core-values-heading">
              <h3 id="core-values-heading">สิ่งที่เราให้ความสำคัญ</h3>
                <ul>
                  <li><strong>เทคโนโลยีและเครื่องมือที่ทันสมัย:</strong> เรานำอุปกรณ์ที่ล้ำสมัยมาใช้เพื่อให้การวินิจฉัยและรักษามีความแม่นยำและสะดวกสบายสูงสุด</li>
                  <li><strong>ยึดผู้ป่วยเป็นศูนย์กลาง:</strong> ทุกขั้นตอนการรักษา เราคำนึงถึงความต้องการและความรู้สึกของผู้ป่วยเป็นสำคัญ</li>
                  <li><strong>ทีมงานมากประสบการณ์:</strong> บุคลากรของเรามีความเชี่ยวชาญและพร้อมให้การดูแลอย่างมืออาชีพ</li>
                  <li><strong>บริการที่เป็นมิตรสำหรับทุกคน:</strong> เราสร้างบรรยากาศที่อบอุ่นและเป็นกันเอง เพื่อให้ทุกคนรู้สึกสบายใจเมื่อมาใช้บริการ</li>
                </ul>
            </section>
          </div>

          {/* 
            Gallery Section: ส่วนแสดงภาพกิจกรรมต่างๆ
            ใช้ Grid แสดงผลเพื่อให้ดูเป็นระเบียบ
          */}
          <section id="gallery" className={styles.gallerySection} aria-labelledby="gallery-heading">
            <h3 id="gallery-heading" className={styles.galleryTitle}>
              ภาพเกี่ยวกับเรา
            </h3>
            <div className={styles.galleryGrid}>
              {[
                { src: '/gallery/about-1.jpg', alt: 'ภาพเกี่ยวกับเรา1' },
                { src: '/gallery/about-2.jpg', alt: 'ภาพเกี่ยวกับเรา2' },
                { src: '/gallery/about-3.jpg', alt: 'ภาพเกี่ยวกับเรา3' },
                { src: '/gallery/about-4.jpg', alt: 'ภาพเกี่ยวกับเรา4' },
                { src: '/gallery/about-5.jpg', alt: 'ภาพเกี่ยวกับเรา5' },
                { src: '/gallery/about-6.jpg', alt: 'ภาพเกี่ยวกับเรา6' },
                { src: '/gallery/about-7.jpg', alt: 'ภาพเกี่ยวกับเรา7' },
                { src: '/gallery/about-8.jpg', alt: 'ภาพเกี่ยวกับเรา8' },
                { src: '/gallery/about-9.jpg', alt: 'ภาพเกี่ยวกับเรา9' },
                { src: '/gallery/about-10.jpg', alt: 'ภาพเกี่ยวกับเรา10' },
                { src: '/gallery/about-11.jpg', alt: 'ภาพเกี่ยวกับเรา11' },
                { src: '/gallery/about-12.jpg', alt: 'ภาพเกี่ยวกับเรา12' },
                { src: '/gallery/about-13.jpg', alt: 'ภาพเกี่ยวกับเรา13' },
                { src: '/gallery/about-14.jpg', alt: 'ภาพเกี่ยวกับเรา14' },
                { src: '/gallery/about-15.jpg', alt: 'ภาพเกี่ยวกับเรา15' },

              ].map((image, index) => (
                <div key={index} className={styles.galleryItem}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={500}
                    className={styles.galleryImage}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 
            Quote Section: ส่วนแสดงคำขวัญหรือข้อความสร้างแรงบันดาลใจ
          */}
          <section className={styles.quoteSection}>
            <blockquote className={styles.quote}>
              "มุ่งมั่นพัฒนา สู่โรงพยาบาลคุณภาพ เพื่อสุขภาพที่ดีของชุมชน"
            </blockquote>
          </section>

        </div>
      </main>
    </div>
  );
}