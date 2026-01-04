'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { useState } from 'react';

// --- Component: Navbar ---
// แถบเมนูหลักของเว็บไซต์, รองรับการแสดงผลทั้งบน Desktop และ Mobile
const Navbar = () => {
    // State สำหรับจัดการการเปิด/ปิดเมนูบนมือถือ
    const [isNavOpen, setIsNavOpen] = useState(false);

    // ฟังก์ชันสำหรับสลับสถานะการเปิด/ปิดเมนู
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    // ฟังก์ชันสำหรับปิดเมนู (ใช้เมื่อคลิกลิงก์ในเมนูมือถือ)
    const closeNav = () => {
        setIsNavOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.navbarContent}>
                    {/* ส่วนโลโก้และชื่อโรงพยาบาล */}
                    <Link href="/" onClick={closeNav} className={styles.navBrand}>
                        <Image
                            src="/navbar/logo.png" // Make sure your logo is in the /public folder
                            alt="KPPMCH Logo"
                            width={40}
                            height={40}
                            className={styles.logoImage}
                        />
                        <span className={styles.brandText}>โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร</span>
                    </Link>
                    {/* Hamburger Menu Button (แสดงเฉพาะบน Mobile) */}
                    <div className={styles.hamburgerMenu}>
                        <button onClick={toggleNav} type="button" className={styles.hamburgerButton} aria-label="toggle menu">
                            <svg viewBox="0 0 24 24" className={styles.hamburgerIcon}>
                                {isNavOpen ? (
                                    <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                                ) : (
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                                )}
                            </svg>
                        </button>
                    </div>
                    {/* Desktop Menu (แสดงเฉพาะบน Desktop) */}
                    <div className={styles.desktopMenu}>
                        <Link href="/" className={styles.navLink}>หน้าแรก</Link>
                        <Link href="/About" className={styles.navLink}>เกี่ยวกับเรา</Link>
                       
                        <Link href="/OrganizationalStructure" className={styles.navLink}>โครงสร้างองค์กร</Link>
                        <Link href="/#contact" className={styles.navLink}>ติดต่อเรา</Link>
                        <Link href="/Faq" className={styles.navLink}>FAQ</Link>
                        
                    </div>
                </div>
                {/* Mobile Menu (จะแสดงเมื่อ isNavOpen เป็น true) */}
                <div className={`${styles.mobileMenu} ${isNavOpen ? styles.mobileMenuOpen : ''}`}>
                    <Link href="/" onClick={closeNav} className={styles.mobileNavLink}>หน้าแรก</Link>
                    <Link href="/About" onClick={closeNav} className={styles.mobileNavLink}>เกี่ยวกับเรา</Link>
                    <Link href="/OrganizationalStructure" onClick={closeNav} className={styles.mobileNavLink}>โครงสร้างองค์กร</Link>
                    <Link href="/#contact" onClick={closeNav} className={styles.mobileNavLink}>ติดต่อเรา</Link>
                    <Link href="/Faq" onClick={closeNav} className={styles.mobileNavLink}>FAQ</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;