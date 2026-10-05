import Link from 'next/link';
export default function NotFound() { return <main className="shell main"><h1>ไม่พบข้อมูลที่ต้องการ</h1><p className="muted my-5">รายการอาจถูกลบไปแล้ว หรือ URL ไม่ถูกต้อง</p><Link className="button primary" href="/">กลับหน้ารายชื่อนักศึกษา</Link></main>; }
