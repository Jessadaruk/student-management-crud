import { z } from 'zod';
export const studentSchema = z.object({
  studentCode: z.string().trim().min(1, 'กรุณากรอกรหัสนักศึกษา').max(30, 'รหัสนักศึกษายาวเกินไป').regex(/^[A-Za-z0-9-]+$/, 'ใช้ตัวอักษรอังกฤษ ตัวเลข หรือขีดกลางเท่านั้น'),
  name: z.string().trim().min(2, 'กรุณากรอกชื่อ-นามสกุลอย่างน้อย 2 ตัวอักษร').max(120, 'ชื่อยาวเกินไป'),
  email: z.union([z.email('รูปแบบอีเมลไม่ถูกต้อง').max(254), z.literal('')]).transform(v => v || null),
  major: z.string().trim().min(1, 'กรุณากรอกสาขา').max(100, 'ชื่อสาขายาวเกินไป'),
  year: z.coerce.number().int('ชั้นปีต้องเป็นจำนวนเต็ม').min(1, 'ชั้นปีต้องอยู่ระหว่าง 1–8').max(8, 'ชั้นปีต้องอยู่ระหว่าง 1–8'),
  status: z.enum(['true', 'false'], { error: 'สถานะไม่ถูกต้อง' }).transform(v => v === 'true'),
});
export type ActionState = { error?: string; fields?: Record<string, string[]>; values?: Record<string, string> };
