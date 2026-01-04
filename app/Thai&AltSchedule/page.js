'use client'; // Required for useState and onClick handlers

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css'; // Import local styles for this page

// --- ข้อมูลตารางการให้บริการ (แพทย์แผนไทยและทางเลือก) ---
const tableDataWithGroup = [ 
    // ... (keep existing data) ...
    { id: 1, type: 'จันทร์', firstName: 'การนวด อบ ประคบสมุนไพร การตรวจรักษาใช้ยาสมุนไพร การดูแลสุขภาพหญิงหลังคลอด ฤาษีดัดตน สมาธิบำบัด', lastName: 'การนวด อบ ประคบสมุนไพร การตรวจรักษาใช้ยาสมุนไพร การดูแลสุขภาพหญิงหลังคลอด ฤาษีดัดตน สมาธิบำบัด' },
    { id: 2, type: 'อังคาร', firstName: 'การนวด อบ ประคบสมุนไพร การตรวจรักษาใช้ยาสมุนไพร การดูแลสุขภาพหญิงหลังคลอด ฤาษีดัดตน สมาธิบำบัด', lastName: 'การนวด อบ ประคบสมุนไพร การตรวจรักษาใช้ยาสมุนไพร การดูแลสุขภาพหญิงหลังคลอด ฤาษีดัดตน สมาธิบำบัด' },
    { id: 3, type: 'พุธ', firstName: 'การนวด อบ ประคบสมุนไพร การตรวจรักษาใช้ยาสมุนไพร การดูแลสุขภาพหญิงหลังคลอด ฤาษีดัดตน สมาธิบำบัด', lastName: 'การนวด อบ ประคบสมุนไพร การตรวจรักษาใช้ยาสมุนไพร การดูแลสุขภาพหญิงหลังคลอด ฤาษีดัดตน สมาธิบำบัด' },
    { id: 4, type: 'พฤหัสบดี', firstName: 'การนวด อบ ประคบสมุนไพร การตรวจรักษาใช้ยาสมุนไพร การดูแลสุขภาพหญิงหลังคลอด ฤาษีดัดตน สมาธิบำบัด', lastName: 'การนวด อบ ประคบสมุนไพร การตรวจรักษาใช้ยาสมุนไพร การดูแลสุขภาพหญิงหลังคลอด ฤาษีดัดตน สมาธิบำบัด' },
    { id: 5, type: 'ศุกร์', firstName: 'การนวด อบ ประคบสมุนไพร การตรวจรักษาใช้ยาสมุนไพร การดูแลสุขภาพหญิงหลังคลอด ฤาษีดัดตน สมาธิบำบัด', lastName: 'การนวด อบ ประคบสมุนไพร การตรวจรักษาใช้ยาสมุนไพร การดูแลสุขภาพหญิงหลังคลอด ฤาษีดัดตน สมาธิบำบัด' },
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

// --- Component หลักสำหรับหน้าตารางแพทย์แผนไทยและทางเลือก ---
export default function SimpleTablePage() {

    return (
        <div className={styles.pageContainer}>
            <main className={styles.mainContentSingleColumn}>
                {/* 
                  ส่วนหัวข้อของหน้า
                */}
                <h1 className={styles.title}>ตารางการให้บริการแพทย์แผนไทย และแพทย์ทางเลือก</h1>
                <h2 className={styles.title2}>ณ ศูนย์พัฒนาคุณภาพชีวิตและส่งเสริมอาชีพผู้สูงอายุ เทศบาลเมืองกำแพงเพชร</h2>
                <h2 className={styles.title2}>โทร. 055-714924 สำหรับติดต่อสอบถามและจองคิว</h2>

                {/* 
                  ข้อความแนะนำการใช้งานบนมือถือ (แสดงเฉพาะจอมือถือ)
                */}
                <p className={styles.scrollHintMobile}>
                    (สำหรับมือถือ: ใช้นิ้วเลื่อนตารางไปทางซ้าย-ขวา เพื่อดูข้อมูลทั้งหมด ↔️)
                </p>

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
                                const rowKey = row.id ? `${row.type}-${row.id}-${index}` : `row-${index}`; // More unique key

                                return (
                                    <tr key={rowKey} className={getRowClassName(row.type)}>
                                        {/* แสดงเซลล์ "วัน" เฉพาะแถวแรกของวันนั้นๆ */}
                                        {isFirstOfType && (
                                            <td rowSpan={typeRowSpan} className={styles.groupCell}>
                                                {row.type}
                                            </td>
                                        )}
                                        {isFirstOfFirstNameInGroup && (
                                            <td rowSpan={firstNameRowSpan} className={styles.dataCell}>
                                                {row.firstName}
                                            </td>
                                        )}
                                        {isFirstOfLastNameInGroup && (
                                            <td rowSpan={lastNameRowSpan} className={styles.dataCell}>
                                                {row.lastName}
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
                    <ul className={styles.notesList}>
                        <li>การให้บริการการแพทย์แผนไทย ณ ศูนย์พัฒนาคุณภาพชีวิตและส่งเสริมอาชีพผู้สูงอายุ เทศบาลเมืองกำแพงเพชร ทุกวันราชการ เวลา 08.30 น. – 16.30 น.<span> ยกเว้นวันเสาร์ อาทิตย์ และวันหยุดนักขัตฤกษ์</span> สถานที่ตั้งอยู่ ถนนราชดำเนิน ติดกับสำนักงานดับเพลิง</li>
                        <li>บริการแพทย์แผนไทยมีกิจกรรม : การนวด อบ ประคบสมุนไพร การตรวจรักษาใช้ยาสมุนไพรบำบัดรักษาโรค การทับหม้อเกลือ การดูแลสุขภาพหญิงหลังคลอด ฤาษีดัดตน และสมาธิบำบัด </li>
                        <li>บริการแพทย์แผนไทย ภายใต้การบริการของโรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร</li>
                    </ul>
                </div>
                {/* 
                  Map Button: ปุ่มสำหรับดูแผนที่
                */}
                <div className={styles.mapButtonWrapper}>
                    <div className={styles.mapButtonContainer}>
                        <a
                            href="https://maps.app.goo.gl/S9AXX2LrLbsUqHv39"
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
