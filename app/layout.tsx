import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = { title: 'Student Management | ระบบจัดการนักศึกษา', description: 'ระบบจัดการข้อมูลนักศึกษา เพิ่ม ดู แก้ไข และลบข้อมูล' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="th"><body><header className="topbar"><div className="shell flex items-center justify-between gap-4"><Link href="/" className="brand"><span className="logo">S</span><span>Student<span className="brand-sub">MANAGEMENT SYSTEM</span></span></Link><Link className="nav-active" href="/">ทะเบียนนักศึกษา</Link></div></header>{children}<footer className="shell footer"><span>Student Management System · ระบบจัดการข้อมูลนักศึกษา</span><span>ผู้จัดทำ: นาย เจษฎารักษ์ วิชาไชย · 673450207-3</span></footer></body></html>;
}
