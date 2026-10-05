'use server';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { studentSchema, type ActionState } from '@/lib/validation';

export async function saveStudent(id: number | null, _previous: ActionState, form: FormData): Promise<ActionState> {
  const values = Object.fromEntries(['studentCode', 'name', 'email', 'major', 'year', 'status'].map(key => [key, String(form.get(key) ?? '')]));
  const parsed = studentSchema.safeParse(values);
  if (!parsed.success) return { error: 'กรุณาตรวจสอบข้อมูลที่กรอก', fields: parsed.error.flatten().fieldErrors, values };
  if (id !== null && (!Number.isSafeInteger(id) || id < 1)) return { error: 'รหัสรายการไม่ถูกต้อง' };
  try {
    if (id === null) await prisma.student.create({ data: parsed.data });
    else await prisma.student.update({ where: { id }, data: parsed.data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') return { error: 'รหัสนักศึกษานี้มีอยู่แล้ว', fields: { studentCode: ['กรุณาใช้รหัสนักศึกษาที่ไม่ซ้ำ'] }, values };
      if (error.code === 'P2025') return { error: 'ไม่พบข้อมูลนักศึกษา อาจถูกลบไปแล้ว', values };
    }
    console.error('Student save failed', error);
    return { error: 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง', values };
  }
  revalidatePath('/');
  revalidatePath('/students');
  redirect('/?saved=1');
}

export async function deleteStudent(id: number): Promise<ActionState> {
  if (!Number.isSafeInteger(id) || id < 1) return { error: 'รหัสรายการไม่ถูกต้อง' };
  try { await prisma.student.delete({ where: { id } }); }
  catch (error) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')) {
      console.error('Student delete failed', error);
      return { error: 'ลบข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง' };
    }
  }
  revalidatePath('/');
  revalidatePath('/students');
  return {};
}
