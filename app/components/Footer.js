import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

// --- SVG Icon Components ---
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
    <path d="M3 3h18v4H3z M10 7h4v14h-4z" />
  </svg>
);

// --- Footer Component ---
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Grid layout for footer content, responsive for mobile */}
      <div className={styles.footerGrid}>
        {/* Column 1: ข้อมูลโรงพยาบาลและข้อมูลติดต่อ */}
        <div className={styles.footerColumn}>
          <div className={styles.footerBrand}>
            <Image
              src="/footer/logo.png"
              alt="KPPMCH Logo"
              width={50}
              height={50}
              className={styles.footerLogo}
            />
            <h3 className={styles.footerTitle}>โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร</h3>
          </div>
          <p className={styles.footerText}>
            35 ซ.2 ถ.ราชดำเนิน 1 ต.ในเมือง อ.เมืองกำแพงเพชร จ.กำแพงเพชร 62000
          </p>
          <p className={styles.footerText}>
            <strong>โทรศัพท์:</strong> 055-716715
          </p>
          <p className={styles.footerText}>
            <strong>อีเมล:</strong> prathomhealth@gmail.com
          </p>
          <div className={styles.socialLinks}>
            <a href="https://www.facebook.com/kmch.kpp" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://www.tiktok.com/@kppmuch" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <TikTokIcon />
            </a>
          </div>
        </div>

        {/* Column 2: ลิงก์ด่วนไปยังหน้าต่างๆ */}
        <div className={styles.footerColumn}>
          <h4 className={styles.footerColumnTitle}>ลิงก์ด่วน</h4>
          <ul className={styles.footerLinkList}>
            <li><Link href="/">หน้าแรก</Link></li>
            <li><Link href="/About">เกี่ยวกับเรา</Link></li>
            <li><Link href="/OrganizationalStructure">โครงสร้างองค์กร</Link></li>
            <li><Link href="/#contact">ติดต่อเรา</Link></li>
            <li><Link href="/Faq">คำถามที่พบบ่อย</Link></li>
          </ul>
        </div>

        {/* Column 3: ลิงก์ไปยังหน้าบริการต่างๆ */}
        <div className={styles.footerColumn}>
          <h4 className={styles.footerColumnTitle}>บริการของเรา</h4>
          <ul className={styles.footerLinkList}>
            <li><Link href="/GeneralSchedule">ตารางตรวจโรคทั่วไป</Link></li>
            <li><Link href="/HealthSchedule">ตารางแพทย์แผนจีน</Link></li>
            <li><Link href="/Thai&AltSchedule">ตารางแพทย์แผนไทย</Link></li>
            <li><Link href="https://kppmch-register.vercel.app/PatientRegister" target='_blank'>ลงทะเบียน Telemedicine</Link></li>
            <li><Link href="https://kppmch-pregnant.vercel.app/" target='_blank'>คลินิกฝากครรภ์</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar of the footer with copyright and developer info */}
      <div className={styles.footerBottom}>
        <p> © {currentYear} โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร. All Rights Reserved.</p>
        <p>
          พัฒนาโดย{' '}
          <Link 
            href="/OrganizationalStructure" 
            className={styles.developerLink}
          >
            งานเทคโนโลยีดิจิทัล
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;