'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BackToTopButton.module.css';

// --- Component: BackToTopButton ---
// ปุ่มสำหรับเลื่อนหน้าเว็บกลับไปด้านบนสุด
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // ฟังก์ชันสำหรับตรวจสอบตำแหน่ง scroll และกำหนดการแสดงผลของปุ่ม
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // ใช้ useEffect เพื่อเพิ่มและลบ event listener สำหรับการ scroll
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // Dependency array ว่างเปล่า หมายถึง effect นี้จะทำงานครั้งเดียวหลัง mount

  // ฟังก์ชันเลื่อนกลับไปด้านบนสุด
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    // AnimatePresence ใช้สำหรับจัดการ animation ตอนที่ component ถูกนำออกจาก DOM
    <AnimatePresence>
      {isVisible && (
        // motion.button มาจาก Framer Motion เพื่อเพิ่ม animation
        <motion.button
          onClick={scrollToTop}
          className={styles.backToTopButton}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          aria-label="Go to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;