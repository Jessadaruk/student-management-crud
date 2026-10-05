'use client';
import { useEffect, useRef, useState, useTransition } from 'react';
import { deleteStudent } from './actions';
export default function DeleteButton({ id, name }: { id: number; name: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (confirming) dialogRef.current?.showModal(); }, [confirming]);
  function remove() {
    startTransition(async () => {
      try { const result = await deleteStudent(id); setError(result.error ?? ''); setConfirming(false); }
      catch { setError('เชื่อมต่อไม่สำเร็จ กรุณาลองอีกครั้ง'); }
    });
  }
  return <div><button className="delete-button" onClick={() => setConfirming(true)} disabled={pending} aria-label={`ลบ ${name}`}>{pending ? 'กำลังลบ…' : 'ลบ'}</button>{confirming && <dialog ref={dialogRef} className="confirm-dialog" aria-labelledby={`delete-title-${id}`} onCancel={() => setConfirming(false)}><h2 id={`delete-title-${id}`}>ยืนยันการลบนักศึกษา</h2><p className="my-4">ต้องการลบข้อมูล {name} ใช่หรือไม่?</p><p className="muted text-sm">การลบนี้ไม่สามารถย้อนกลับได้</p><div className="form-actions"><button autoFocus className="button secondary" disabled={pending} onClick={() => setConfirming(false)}>ยกเลิกการลบ</button><button className="button danger" disabled={pending} onClick={remove}>{pending ? 'กำลังลบ…' : 'ยืนยันการลบ'}</button></div></dialog>}{error && <p className="field-error" role="alert">{error}</p>}</div>;
}
