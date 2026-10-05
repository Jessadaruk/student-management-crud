import { test } from 'node:test';
import assert from 'node:assert/strict';
import { studentSchema } from '../lib/validation';
const valid = { studentCode: '673450207-3', name: 'ชื่อ ทดสอบ', email: '', major: 'เทคโนโลยีสารสนเทศ', year: '3', status: 'true' };
test('แปลงชั้นปี สถานะ และอีเมลว่างอย่างถูกต้อง', () => {
  const result = studentSchema.parse(valid);
  assert.equal(result.year, 3); assert.equal(result.status, true); assert.equal(result.email, null);
});
test('ปฏิเสธข้อมูลจำเป็นที่ว่างหรือมีแต่ช่องว่าง', () => {
  for (const field of ['studentCode', 'name', 'major']) assert.equal(studentSchema.safeParse({ ...valid, [field]: '  ' }).success, false);
});
test('ปฏิเสธอีเมลผิดรูปแบบ ชั้นปีผิด และสถานะที่ไม่รองรับ', () => {
  for (const patch of [{ email: 'invalid' }, { year: '0' }, { year: '9' }, { year: '1.5' }, { year: 'abc' }, { status: 'anything' }, { studentCode: 'bad code' }]) {
    assert.equal(studentSchema.safeParse({ ...valid, ...patch }).success, false);
  }
});
