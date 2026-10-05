import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import DeleteButton from './students/delete-button';
export const dynamic = 'force-dynamic';
export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string; saved?: string }> }) {
  const { q = '', saved } = await searchParams;
  const query = q.trim().slice(0, 120);
  const [students, total, active] = await Promise.all([
    prisma.student.findMany({ where: query ? { OR: [{ name: { contains: query } }, { studentCode: { contains: query } }, { major: { contains: query } }] } : {}, orderBy: { id: 'asc' } }),
    prisma.student.count(), prisma.student.count({ where: { status: true } }),
  ]);
  return <main className="shell main"><div className="eyebrow">STUDENT DIRECTORY</div><div className="heading-row"><div><h1>จัดการข้อมูลนักศึกษา</h1><p className="muted mt-3">ดูแลข้อมูลนักศึกษาทั้งหมด เพิ่มและอัปเดตข้อมูลได้ในที่เดียว</p></div><Link className="button primary" href="/students/create"><span aria-hidden="true">＋</span> เพิ่มนักศึกษา</Link></div>
    <div className="stats"><div className="stat"><span className="stat-icon">▤</span><div><p>นักศึกษาทั้งหมด</p><strong>{total}<small>คน</small></strong></div></div><div className="stat"><span className="stat-icon green">✓</span><div><p>กำลังศึกษา</p><strong>{active}<small>คน</small></strong></div></div><div className="stat"><span className="stat-icon gray">−</span><div><p>ไม่ใช้งาน</p><strong>{total - active}<small>คน</small></strong></div></div></div>
    {saved && <p className="notice" role="status">บันทึกข้อมูลนักศึกษาเรียบร้อยแล้ว</p>}
    <section className="panel"><div className="table-toolbar"><div><h2>รายชื่อนักศึกษา <span className="count">{students.length}</span></h2><p className="muted text-sm mt-1">ข้อมูลทะเบียนนักศึกษาในระบบ</p></div><form className="search" action="/"><label htmlFor="q" className="sr-only">ค้นหานักศึกษา</label><input id="q" name="q" defaultValue={query} placeholder="ค้นหาชื่อ รหัส หรือสาขา..." maxLength={120}/><button type="submit">ค้นหา</button>{query && <Link href="/">ล้าง</Link>}</form></div>
    <div className="overflow-x-auto"><table><thead><tr>{['ID', 'รหัสนักศึกษา', 'ชื่อ-นามสกุล', 'Email', 'สาขา', 'ชั้นปี', 'สถานะ', 'จัดการ'].map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{students.map(s => <tr key={s.id}><td className="muted">{String(s.id).padStart(2, '0')}</td><td className="student-code">{s.studentCode}</td><td className="font-semibold">{s.name}</td><td className="muted">{s.email ?? '—'}</td><td>{s.major}</td><td><span className="year">ปี {s.year}</span></td><td><span className={`badge ${s.status ? 'active' : 'inactive'}`}><span aria-hidden="true">●</span> {s.status ? 'กำลังศึกษา' : 'ไม่ใช้งาน'}</span></td><td><div className="flex gap-2"><Link className="edit-button" href={`/students/${s.id}/edit`} aria-label={`แก้ไข ${s.name}`}>แก้ไข</Link><DeleteButton id={s.id} name={s.name}/></div></td></tr>)}</tbody></table>{students.length === 0 && <div className="empty"><h3>{query ? 'ไม่พบผลการค้นหา' : 'ยังไม่มีข้อมูลนักศึกษา'}</h3><p>เพิ่มนักศึกษาใหม่ หรือเปลี่ยนคำค้นหาเพื่อดูข้อมูล</p></div>}</div><div className="table-bottom">แสดง {students.length} จาก {total} รายการ <span>ข้อมูลจัดเก็บใน SQLite</span></div></section>
  </main>;
}
