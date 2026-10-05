import Link from 'next/link';
import StudentForm from '../student-form';
export default function CreatePage() {
  return <main className="shell main form-main"><Link className="back-link" href="/">← กลับไปรายชื่อนักศึกษา</Link><div className="eyebrow mt-8">NEW STUDENT</div><h1>เพิ่มนักศึกษา</h1><p className="muted mt-3 mb-8">สร้างข้อมูลนักศึกษาใหม่ในระบบทะเบียน</p><StudentForm/></main>;
}
