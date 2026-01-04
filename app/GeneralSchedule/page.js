'use client'; // Required for useState and onClick handlers

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css'; // Import local styles for this page

// --- ข้อมูลตารางการให้บริการ (ตรวจโรคทั่วไป) ---
const tableDataWithGroup = [ 
    // ... (keep existing data) ...
    { id: 1, type: 'จันทร์', firstName: 'ตรวจรักษาโรคทั่วไป คลินิกความดันโลหิตสูง-เบาหวาน\nนพ.กำชัย รังสิมันต์ไพบูลย์ / พญ.จริดา สันธิติวงษ์', lastName: 'ติดตามเยี่ยมบ้านผู้ป่วยในชุมชน\nทีมสหวิชาชีพ' },
    { id: 2, type: 'อังคาร', firstName: 'ตรวจรักษาโรคทั่วไป คลินิกความดันโลหิตสูง-เบาหวาน\nนพ.กำชัย รังสิมันต์ไพบูลย์ / พญ.จริดา สันธิติวงษ์', lastName: 'ติดตามเยี่ยมบ้านผู้ป่วยในชุมชน\nทีมสหวิชาชีพ' },
    { id: 3, type: 'อังคาร', firstName: 'คลินิกวางแผนครอบครัว', lastName: 'คลินิกผู้สูงอายุ' },
    { id: 4, type: 'พุธ', firstName: 'ตรวจรักษาโรคทั่วไป และคลินิกความดันโลหิตสูง-เบาหวาน\nนพ.กำชัย รังสิมันต์ไพบูลย์ / พญ.จริดา สันธิติวงษ์', lastName: 'ติดตามเยี่ยมบ้านผู้ป่วยในชุมชน\nทีมสหวิชาชีพ' },
    { id: 5, type: 'พฤหัสบดี', firstName: 'ตรวจรักษาโรคทั่วไป และคลินิกความดันโลหิตสูง-เบาหวาน\nนพ.กำชัย รังสิมันต์ไพบูลย์ / พญ.จริดา สันธิติวงษ์', lastName: 'ติดตามเยี่ยมบ้านผู้ป่วยในชุมชน\nทีมสหวิชาชีพ' },
    { id: 6, type: 'พฤหัสบดี', firstName: 'ตรวจรักษาโรคทั่วไป และคลินิกความดันโลหิตสูง-เบาหวาน\nนพ.กำชัย รังสิมันต์ไพบูลย์ / พญ.จริดา สันธิติวงษ์', lastName: 'คลินิกให้คำปรึกษา' },
    { id: 7, type: 'ศุกร์', firstName: 'ตรวจรักษาโรคทั่วไป และคลินิกความดันโลหิตสูง-เบาหวาน\nนพ.กำชัย รังสิมันต์ไพบูลย์ / พญ.จริดา สันธิติวงษ์', lastName: 'ติดตามเยี่ยมบ้านผู้ป่วยในชุมชน\nทีมสหวิชาชีพ' },
    { id: 8, type: 'ศุกร์', firstName: 'ตรวจรักษาโรคทั่วไป และคลินิกความดันโลหิตสูง-เบาหวาน\nนพ.กำชัย รังสิมันต์ไพบูลย์ / พญ.จริดา สันธิติวงษ์', lastName: 'คลินิกให้คำปรึกษา' },
];

// --- Helper Functions ---

// ฟังก์ชันสำหรับคำนวณ rowspan เพื่อรวมเซลล์ในตาราง
const calculateRowSpan = (data, index, targetKey, groupKey) => {
    const currentTargetValue = data[index][targetKey];
    const currentGroupValue = data[index][groupKey];
    let count = 1;
    for (let i = index + 1; i < data.length; i++) {
        if (data[i][groupKey] !== currentGroupValue || data[i][targetKey] !== currentTargetValue) {
            break;
        }
        count++;
    }
    return count;
};

// ฟังก์ชันสำหรับกำหนด class ของแถวตามวัน เพื่อสลับสีพื้นหลัง
const getRowClassName = (day) => {
  const dayClassMap = {
    'จันทร์': styles.rowจันทร์,
    'อังคาร': styles.rowอังคาร,
    'พุธ': styles.rowพุธ,
    'พฤหัสบดี': styles.rowพฤหัสบดี,
    'ศุกร์': styles.rowศุกร์,
    'เสาร์': styles.rowเสาร์,
    'อาทิตย์': styles.rowอาทิตย์,
  };
  return dayClassMap[day] || styles.rowDefault;
};

// --- Component หลักสำหรับหน้าตารางตรวจโรคทั่วไป ---
export default function SimpleTablePage() {
    
    return (
        <div className={styles.pageContainer}>
           
            <main className={styles.mainContentSingleColumn}>
                {/* 
                  ส่วนหัวข้อของหน้า
                */}
                <h1 className={styles.title}>ตารางการให้บริการ</h1>
                <h2 className={styles.title2}>
                    โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร โทร. 055-716715 |<span className={styles.lineLink}> ID Line @133rkonx</span>
                </h2>

                {/* 
                  ส่วนตารางแสดงข้อมูล
                */}
                <div className={styles.tableWrapper}>
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th scope="col">วัน</th>
                                <th scope="col">08.30 - 12.00 น.</th>
                                <th scope="col">13.00 น.- 16.30 น.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* วนลูปแสดงข้อมูลในตาราง */}
                            {tableDataWithGroup.map((row, index) => {
                                const previousRow = index > 0 ? tableDataWithGroup[index - 1] : null;
                                // ตรวจสอบว่าเป็นแถวแรกของวันหรือไม่ เพื่อกำหนด rowspan
                                const isFirstOfType = !previousRow || row.type !== previousRow.type;
                                const typeRowSpan = isFirstOfType ? calculateRowSpan(tableDataWithGroup, index, 'type', 'type') : 0;
                                // ตรวจสอบว่าเป็นบริการแรกของวันหรือไม่ (สำหรับช่วงเช้า)
                                const isFirstOfFirstNameInGroup = isFirstOfType || row.firstName !== previousRow.firstName;
                                const firstNameRowSpan = isFirstOfFirstNameInGroup ? calculateRowSpan(tableDataWithGroup, index, 'firstName', 'type') : 0;
                                // ตรวจสอบว่าเป็นบริการแรกของวันหรือไม่ (สำหรับช่วงบ่าย)
                                const isFirstOfLastNameInGroup = isFirstOfType || row.lastName !== previousRow.lastName;
                                const lastNameRowSpan = isFirstOfLastNameInGroup ? calculateRowSpan(tableDataWithGroup, index, 'lastName', 'type') : 0;
                                const rowKey = row.id || `row-${index}`;

                                return (
                                    <tr key={rowKey} className={getRowClassName(row.type)}>
                                        {/* แสดงเซลล์ "วัน" เฉพาะแถวแรกของวันนั้นๆ */}
                                        {isFirstOfType && (
                                            <td rowSpan={typeRowSpan} className={styles.groupCell}>
                                                {row.type}
                                            </td>
                                        )}
                                        {isFirstOfFirstNameInGroup && (
                                            <td rowSpan={firstNameRowSpan} className={`${styles.dataCell} ${styles.centerTextCell}`}>
                                                {/* จัดการข้อความที่มีการขึ้นบรรทัดใหม่ (\n) */}
                                                {row.firstName.split('\n').map((line, i) => (
                                                    <React.Fragment key={i}>
                                                        {i > 0 && <br />}
                                                        {line}
                                                    </React.Fragment>
                                                ))}
                                            </td>
                                        )}
                                        {isFirstOfLastNameInGroup && (
                                            <td rowSpan={lastNameRowSpan} className={`${styles.dataCell} ${styles.centerTextCell}`}>
                                                {/* จัดการข้อความที่มีการขึ้นบรรทัดใหม่ (\n) */}
                                                {row.lastName.split('\n').map((line, i) => (
                                                    <React.Fragment key={i}>
                                                        {i > 0 && <br />}
                                                        {line}
                                                    </React.Fragment>
                                                ))}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* 
                  Notes Section: ส่วนหมายเหตุและข้อมูลเพิ่มเติม
                */}
                <div className={styles.notesSection}>
                    <h3 className={styles.notesTitle}>โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชรเปิดให้บริการพิเศษ</h3>
                    <ul className={styles.notesList}>
                        <li>บริการสาธารณสุขระบบการแพทย์ทางไกล (Telemedicine) ในวันราชการ เวลา 10.00 – 11.30 น. โดย add ID Line: @133rkonx หรือแสกน QR code ด้านล่างเพื่อลงทะเบียนรับบริการ </li>
                        <li>ตรวจคลื่นหัวใจ อัลตร้าซาวด์ และจี้หูด ในวันราชการ เวลา 08.30 – 11.30 น.</li>
                        <li>บริการกายภาพบำบัด ทุกวันจันทร์และวันอังคาร ในวันราชการ เวลา 08.30 - 12.00 น.</li>
                        <li>บริการฝังและถอดยาคุมกำเนิด ในกลุ่มหญิงวัยเจริญพันธุ์ ในวันราชการ เวลา 08.30 – 11.30 น.</li>
                        <li>คลินิกสุขภาพเด็กดี ให้บริการวันพฤหัสบดีสัปดาห์ที่ 2 และ 4 ของเดือน ในวันราชการ เวลา 13.00 – 16.00 น.</li>
                        <li>คลินิกวัคซีนผู้ใหญ่ ให้บริการวันพฤหัสบดีสัปดาห์ที่ 3 ของเดือน (ในวันราชการ) เวลา 13.00 – 16.00 น.</li>
                    </ul>
                    <br />
                    <h3 className={styles.notesTitle}>**สแกน QR Code เพื่อลงทะเบียน Telemedicine ผ่าน Line OA โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร</h3>
                    {/* 
                      ส่วนแสดง QR Code สำหรับ LINE OA
                    */}
                    <div className={styles.qrCodeContainer}>
                        <Image 
                            src="/qr/line-oa.png" 
                            alt="QR Code for Line OA Telemedicine Registration"
                            width={150}
                            height={150}
                        />
                    </div>
                </div>

                {/* 
                  Map Button: ปุ่มสำหรับดูแผนที่
                */}
                <div className={styles.mapButtonWrapper}>
                    <div className={styles.mapButtonContainer}>
                        <a
                            href="https://maps.app.goo.gl/PGNtguEKEg5Wi7246"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.buttonPrimaryFull}
                        >
                            ดูแผนที่และเส้นทาง
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
