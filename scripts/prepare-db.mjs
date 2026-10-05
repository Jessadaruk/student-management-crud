import { existsSync, writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
// Resolve SQLite URLs relative to the Prisma schema; create only missing files.
const envFile = existsSync('.env') ? readFileSync('.env', 'utf8') : '';
const url = process.env.DATABASE_URL ?? envFile.match(/^DATABASE_URL\s*=\s*["']?([^"'\r\n]+)/m)?.[1]?.trim();
if (!url?.startsWith('file:')) throw new Error('กำหนด DATABASE_URL แบบ file: ใน .env ก่อนเตรียมฐานข้อมูล');
const databasePath = resolve('prisma', url.slice(5));
if (!existsSync(databasePath)) { mkdirSync(dirname(databasePath), { recursive: true }); writeFileSync(databasePath, ''); }
