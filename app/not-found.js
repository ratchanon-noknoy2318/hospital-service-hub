import Link from 'next/link'
import styles from './not-found.module.css';
 
// --- Component สำหรับแสดงหน้า 404 Not Found ---
// Next.js จะแสดงหน้านี้โดยอัตโนมัติเมื่อไม่พบ URL ที่ร้องขอ
export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.graphicContainer}> 
        <h1 className={styles.errorCode}>
          404
        </h1>
        <div className={styles.errorMessage}>
          Page Not Found
        </div>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>
          ไม่พบหน้าที่คุณค้นหา
        </h2>
        <p className={styles.description}>ขออภัยค่ะ ดูเหมือนว่าหน้าที่คุณพยายามเข้าถึงไม่มีอยู่จริง หรืออาจถูกย้ายไปที่อื่นแล้ว</p>
        {/* ปุ่มสำหรับกลับไปยังหน้าหลัก */}
        <Link href="/" className={styles.homeButton}>กลับสู่หน้าหลัก</Link>
      </div>
    </main>
  )
}