import argon2 from 'argon2';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { prisma } from './db';
export async function hashPassword(password:string){return argon2.hash(password,{type:argon2.argon2id});}
export async function verifyPassword(hash:string,password:string){return argon2.verify(hash,password);}
export function hashToken(token:string){return crypto.createHash('sha256').update(token).digest('hex');}
export function newToken(){return crypto.randomBytes(32).toString('base64url');}
export async function currentUser(){const token=(await cookies()).get('cml_session')?.value;if(!token)return null;const s=await prisma.session.findUnique({where:{tokenHash:hashToken(token)},include:{user:true}});if(!s||s.expiresAt<new Date()||!s.user.active)return null;return s.user;}
export async function requireUser(){const u=await currentUser();if(!u)throw new Error('Authentication required');return u;}
