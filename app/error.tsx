'use client';
export default function ErrorPage({ reset }: { reset: () => void }) { return <main className="shell main"><h1>โหลดข้อมูลไม่สำเร็จ</h1><p className="muted my-5">กรุณาตรวจสอบการเชื่อมต่อและการเตรียมฐานข้อมูล</p><button className="button primary" onClick={reset}>ลองอีกครั้ง</button></main>; }
