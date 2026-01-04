import './globals.css'
import NavBar from './components/Navbar'
// นำเข้า Component และฟอนต์ที่จำเป็น
import Script from 'next/script';
import Footer from './components/Footer'
import BackToTopButton from './components/BackToTopButton';
import FloatingLineAd from './components/LineAd';
import { Sarabun } from 'next/font/google';

const sarabun = Sarabun({
  // ตั้งค่าฟอนต์ Sarabun
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// --- Metadata สำหรับ SEO ---
export const metadata = {
  title: 'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร | บริการสุขภาพเพื่อชุมชน',
  metadataBase: new URL('https://kppmch-service.vercel.app/'),
  description: 'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร ให้บริการสุขภาพเพื่อชุมชนอย่างครบวงจร ตั้งแต่การตรวจรักษาโรคทั่วไป, แพทย์แผนจีน, แพทย์แผนไทย และบริการสุขภาพอื่นๆ ด้วยทีมแพทย์ผู้เชี่ยวชาญและเทคโนโลยีที่ทันสมัย',
  keywords: 'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร, โรงพยาบาลชุมชน, ตารางแพทย์, ตรวจโรคทั่วไป, แพทย์แผนจีน, แพทย์แผนไทย, ฝังเข็ม, กำแพงเพชร',
  creator: 'งานเทคโนโลยีดิจิทัล โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
  publisher: 'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
  icons: {
    icon: '/favicon.ico', // icon
  
  },
  // การตั้งค่าสำหรับ Search Engine Bots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // การตั้งค่าสำหรับ Open Graph (แสดงผลเมื่อแชร์ใน Social Media)
  openGraph: {
    title: 'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร | บริการสุขภาพเพื่อชุมชน',
    description: 'ค้นหาข้อมูลบริการ, ตารางแพทย์, และข้อมูลติดต่อของโรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร เว็บไซต์อย่างเป็นทางการเพื่อดูแลสุขภาพของคนในชุมชน',
    url: '/', // Path relative to metadataBase (หน้าแรกของเว็บไซต์)
    siteName: 'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร', // ชื่อของเว็บไซต์',
    images: [
      {
    
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ภาพ Preview ของโรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
}

// --- JSON-LD Schema สำหรับ SEO (Structured Data) ---
const hospitalSchema = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  "name": "โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร",
  "url": "https://kppmch-service.vercel.app/",
  "logo": "https://kppmch-service.vercel.app/logo.png",
  "image": "https://kppmch-service.vercel.app/og-image.png",
  "description": "โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร ให้บริการตรวจรักษาโรคทั่วไป, แพทย์แผนจีน, แพทย์แผนไทย และบริการการแพทย์ทางไกล (Telemedicine) ด้วยทีมแพทย์ผู้เชี่ยวชาญ",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "35 ซ.2 ถ.ราชดำเนิน 1",
    "addressLocality": "ในเมือง, เมืองกำแพงเพชร",
    "addressRegion": "กำแพงเพชร",
    "postalCode": "62000",
    "addressCountry": "TH"
  },
  "telephone": "+66-55-716-715",
  "openingHours": "Mo-Fr 08:30-16:30",
  "sameAs": [
    "https://www.facebook.com/kmch.kpp",
    "https://www.tiktok.com/@kppmuch"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://kppmch-service.vercel.app/",
  "name": "โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://kppmch-service.vercel.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// --- Component หลักของ Layout ---
export default function RootLayout({ children }) {
  return (
    <html lang="th" className={sarabun.className}> {/* เปลี่ยน lang เป็น "th" และใช้ฟอนต์ Sarabun */}
      <head>
        {/* ใส่ Script ของ JSON-LD Schema */}
        {/* Next.js จะจัดการ title, description, icons, และ openGraph/twitter images จาก metadata object ด้านบนโดยอัตโนมัติ */}
        {/* viewport และ charset จะถูกเพิ่มโดย Next.js โดยอัตโนมัติ */}
        <Script id="hospital-schema" type="application/ld+json">
          {JSON.stringify(hospitalSchema)}
        </Script>
        <Script id="website-schema" type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </Script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        
      </head>
      <body >
        {/* แสดง Components ที่ใช้ร่วมกันทุกหน้า */}
        <NavBar />
        {children}
        <FloatingLineAd />
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  )
}
