import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import StudentForm from '../../student-form';
export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const studentId = Number(id);
  if (!Number.isSafeInteger(studentId) || studentId < 1) notFound();
  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student) notFound();
  return <main className="shell main form-main"><Link className="back-link" href="/">← กลับไปรายชื่อนักศึกษา</Link><div className="eyebrow mt-8">EDIT STUDENT · {student.studentCode}</div><h1>แก้ไขนักศึกษา</h1><p className="muted mt-3 mb-8">อัปเดตข้อมูลของ {student.name}</p><StudentForm student={student}/></main>;
}
