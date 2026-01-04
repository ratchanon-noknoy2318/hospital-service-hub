'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css'; // Import dedicated styles

/**
 * OrgCard Component
 * แสดงการ์ดสำหรับแต่ละบุคคลหรือตำแหน่งในผังองค์กร
 * @param {string} name - ชื่อบุคคล
 * @param {string | React.ReactNode} title - ตำแหน่งงาน (สามารถเป็น Node เพื่อรองรับ <br />)
 * @param {number} level - ระดับในผังองค์กร (ใช้สำหรับกำหนดสไตล์)
 * @param {string} imageUrl - URL ของรูปภาพ
 * @param {string} customWidthClass - CSS class สำหรับกำหนดความกว้าง (ถ้ามี)
 * @returns {React.ReactElement}
 */
const OrgCard = ({ name, title, imageUrl, customWidthClass = '' }) => {
  // หมายเหตุ: level ถูกลบออกจากการใช้งานโดยตรงใน props นี้
  // แต่ยังคงแนวคิดการจัดระดับผ่านการเรียกใช้ใน Component หลัก
  // การกำหนด class จะทำโดยตรงใน JSX เพื่อความชัดเจน

  return (
    <div className={`${styles.orgCard} ${customWidthClass}`}>
      {/* 
        แสดงรูปภาพถ้ามี imageUrl
        ใช้ next/image เพื่อ performance optimization
        `fill` และ `sizes` ช่วยในการทำ responsive image
      */}
      {imageUrl && (
        <div className={styles.orgCardImageContainer}>
          <Image
            src={imageUrl}
            alt={`รูปภาพของ ${name}`}
            fill
            className={styles.orgCardImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      {/* แสดงชื่อและตำแหน่ง */}
      <h3 className={styles.orgCardName}>{name}</h3>
      {title && <p className={styles.orgCardTitle}>{title}</p>}
    </div>
  );
};

// --- Component หลักสำหรับหน้าโครงสร้างองค์กร ---
export default function OrganizationChartPage() {
  return (
    <div className={styles.pageContainer}>
      {/* ใช้ main tag สำหรับเนื้อหาหลักของหน้า */}
      <main className={styles.mainContentSingleColumn}>
        <div className={styles.orgChartHeader}>
          <h1 className={styles.orgChartPageTitle}>
            โครงสร้างองค์กร
          </h1>
          <p className={styles.orgChartPageSubtitle}>
            โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร
          </p>
        </div>

        {/* 
          Chart Container: ส่วนหลักที่ครอบผังองค์กรทั้งหมด
        */}
        <div className={styles.orgChartContainer}>
          
          {/* Level 1: Mayor */}
          <div className={styles.orgLevel}>
            <OrgCard 
              name="นายวุฒิชัย ศุภอรรถพานิช" 
              title="นายกเทศมนตรีเมืองกำแพงเพชร" 
              imageUrl="/executives/mayor.png"
              customWidthClass={styles.w72} 
            />
            <div className={styles.orgConnector}></div>
          </div>

          {/* Level 2: Division Director */}
          <div className={styles.orgLevel}>
            <OrgCard 
              name="นส.พิชญา หงษ์สุตะเมธี" 
              title="หัวหน้าฝ่ายบริหารงานทั่วไป (รักษาราชการแทน ผอ.กองสาธารณสุขฯ)" 
              imageUrl="/executives/director-1.png"
              customWidthClass={styles.w72} 
            />
            <div className={styles.orgConnector}></div>
          </div>

          {/* Level 3: Hospital Director */}
          <div className={styles.orgLevel}>
            <OrgCard 
              name="นางปัทมา พวงมาลัย" 
              title="พยาบาลวิชาชีพชำนาญการพิเศษ (หัวหน้าโรงพยาบาล)" 
              imageUrl="/executives/director-2.png"
              customWidthClass={styles.w72} 
            />
            <div className={styles.orgConnector}></div>
          </div>

          {/* Level 4: Hospital Team (Doctors) */}
          <div className={styles.orgGroupWrapper}>
            <div className={styles.orgGroupBoxTeal}> {/* กล่องสีเขียวสำหรับทีมแพทย์ */}
              <h3 className={styles.orgGroupBoxTitle}>โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร</h3>
                
              <div className={styles.orgHorizontalConnector}></div> {/* เส้นเชื่อมแนวนอน */}

              <div className={styles.orgGroupGrid2Cols}> {/* Grid 2 คอลัมน์ */}
                <div className={styles.orgGroupItem}>
                  <div className={styles.orgVerticalConnector}></div> {/* เส้นเชื่อมแนวตั้ง */}
                  <OrgCard name="นพ.กำชัย รังสิมันต์ไพบูลย์" title="นายแพทย์" imageUrl="/doctors/dr-kamchai.png" customWidthClass={styles.w72} />
                </div>
                <div className={styles.orgGroupItem}>
                  <div className={styles.orgVerticalConnector}></div>
                  <OrgCard name="พญ.จริดา สันธิติพงศ์" title="แพทย์หญิง" imageUrl="/doctors/dr-jarida.png" customWidthClass={styles.w72} />
                </div>
              </div>
            </div>
          </div>

          {/* เส้นเชื่อมไปยังระดับถัดไป */}
          <div className={styles.orgConnector}></div>

          {/* Level 5: Departments */}
          <div className={styles.orgGroupWrapperLg}>
            <div className={styles.orgGroupBoxGray}> {/* กล่องสีเทาสำหรับแผนกต่างๆ */}
              <h3 className={styles.orgGroupBoxTitle}>ฝ่ายและแผนกงาน</h3>
                
              <div className={styles.orgHorizontalConnectorLg}></div>

              <div className={styles.orgGroupGrid3Cols}> {/* Grid 3 คอลัมน์ (ปรับตามขนาดจอ) */}
                {/* ใช้ React Fragment (<>) เพื่อส่ง JSX ที่มี <br /> เข้าไปใน prop 'title' */}
                <div className={styles.orgGroupItem}><div className={styles.orgVerticalConnector}></div><OrgCard name="งานรักษาพยาบาล" title={<>นางสาวธฐรัศม์ชนม์ ชุติเวทย์คู<br />นางสาว ณัฐธิดา ...</>} customWidthClass={styles.w64} /></div>
                <div className={styles.orgGroupItem}><div className={styles.orgVerticalConnector}></div><OrgCard name="งานส่งเสริมสุขภาพ" title={<>นางสาวกุลสินี สาพาที<br />นางสาวมณฑ์ศิริ กล่อมยัง<br />พี่จงค์รักษ์ ...<br />นางสาวอรทัย ...<br />นางสาวพี่แอน ...<br />ตุ๊กตา</>} customWidthClass={styles.w64} /></div>
                <div className={styles.orgGroupItem}><div className={styles.orgVerticalConnector}></div><OrgCard name="งานป้องกันและควบคุมโรค" title={<>นางนิมารักษ์ กลิ่นบุบผา<br />นางกีรติวดี ฉัตรหลวง</>} customWidthClass={styles.w64} /></div>
                <div className={styles.orgGroupItem}><div className={styles.orgVerticalConnector}></div><OrgCard name="แผนกการเงิน" title={<>พี่นิตย์<br />นางสาวศิริโฉม ศรีจันทร์โฉม</>} customWidthClass={styles.w64} /></div>
                <div className={styles.orgGroupItem}><div className={styles.orgVerticalConnector}></div><OrgCard name="แผนธุรการ" title={<>พี่ดาวใจ<br />นางสาวทัศนีย์ เจริญรส</>} customWidthClass={styles.w64} /></div>
                <div className={styles.orgGroupItem}><div className={styles.orgVerticalConnector}></div><OrgCard name="เทคโนโลยีดิจิทัล" title={<>นายชัยวุุฒ อิมแนม<br />-ว่าง-</>} customWidthClass={styles.w64} /></div>
                <div className={styles.orgGroupItem}><div className={styles.orgVerticalConnector}></div><OrgCard name="พนักงานจ้างทั่วไป" title={<>นายสุรพงษ์ เหลี่ยมเคลือบ<br />พี่ตุ่น<br />นายอนุสรณ์ บรรดาล</>} customWidthClass={styles.w64} /></div>
              </div>
            </div>
          </div>

        </div>

        {/* ส่วนท้ายของหน้า มีปุ่มสำหรับกลับไปหน้าแรก */}
        <div className={styles.orgChartFooter}>
          <Link href="/" className={styles.buttonPrimary}>
            กลับสู่หน้าแรก
          </Link>
        </div>
      </main>
    </div>
  );
}