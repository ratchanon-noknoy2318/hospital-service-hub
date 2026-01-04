'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './LineAd.module.css';

// --- Component: FloatingLineAd ---
// แสดงแบนเนอร์โฆษณา LINE OA แบบลอย
// สามารถปิดได้ และจะแสดงผลแตกต่างกันระหว่าง Desktop และ Mobile
const FloatingLineAd = () => {
  // State สำหรับจัดการการแสดงผลของแบนเนอร์
  const [isOpen, setIsOpen] = useState(true);

  // ถ้าผู้ใช้กดปิด (isOpen เป็น false) ให้ return null เพื่อไม่แสดง Component นี้
  if (!isOpen) {
    return null;
  }

  return (
    // Container หลักของแบนเนอร์
    <div className={styles.floatingContainer} role="banner">
      <div className={styles.adContent}>
        {/* ปุ่มสำหรับปิดแบนเนอร์ */}
        <button onClick={() => setIsOpen(false)} className={styles.closeButton} aria-label="ปิดโฆษณา">
          ×
        </button>
        <p className={styles.adTitle}>เพิ่มเพื่อนใน LINE</p>
        <p className={styles.adText}>รับข่าวสารและโปรโมชั่น</p>
        <div className={styles.qrWrapper}>
          {/* QR Code สำหรับเพิ่มเพื่อน (แสดงเฉพาะบน Desktop) */}
          <Image
            src="/qr/line-oa.png"
            alt="QR Code เพิ่มเพื่อน LINE"
            width={100}
            height={100}
            className={styles.qrImage}
          />
        </div>
        {/* ปุ่มสำหรับกดเพิ่มเพื่อน */}
        <a href="https://lin.ee/WTOV9ovB" target="_blank" rel="noopener noreferrer" className={styles.addButton}>
         คลิกติดตามข่าว!
        </a>
        <p className={styles.lineId}>ID: @133rkonx</p>
      </div>
    </div>
  );
};

export default FloatingLineAd;