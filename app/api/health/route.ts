import { NextResponse } from 'next/server';import { prisma } from '@/lib/db';
export async function GET(){try{await prisma.$queryRaw`SELECT 1`;return NextResponse.json({ok:true,service:'CORE Materials Library',version:process.env.npm_package_version??'0.1.0',database:'ok'});}catch{return NextResponse.json({ok:false,database:'unavailable'},{status:503});}}
