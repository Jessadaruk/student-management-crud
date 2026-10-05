import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const students = [
  { studentCode: '673450207-3', name: 'นาย เจษฎารักษ์ วิชาไชย', email: 'jessadaruk@example.com', major: 'เทคโนโลยีสารสนเทศ', year: 3, status: true },
  { studentCode: '673450208-1', name: 'นางสาว พิมพ์ชนก ใจดี', email: 'pimchanok@example.com', major: 'วิทยาการคอมพิวเตอร์', year: 3, status: true },
  { studentCode: '683450101-2', name: 'นาย ธนกฤต แสงทอง', email: 'thanakrit@example.com', major: 'เทคโนโลยีสารสนเทศ', year: 2, status: true },
  { studentCode: '693450102-4', name: 'นางสาว กัญญารัตน์ ศรีสุข', email: 'kanyarat@example.com', major: 'บริหารธุรกิจ', year: 1, status: true },
  { studentCode: '663450205-6', name: 'นาย ณัฐวุฒิ วัฒนกุล', email: 'nattawut@example.com', major: 'วิศวกรรมคอมพิวเตอร์', year: 4, status: false },
];
async function main() {
  for (const student of students) {
    await prisma.student.upsert({ where: { studentCode: student.studentCode }, create: student, update: {} });
  }
  console.log('เตรียมข้อมูลตัวอย่าง 5 รายการแล้ว (ไม่เขียนทับข้อมูลที่มีอยู่)');
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
