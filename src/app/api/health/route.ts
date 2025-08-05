import { NextResponse } from "next/server";
import { db } from '@/lib/db-vercel';

export async function GET() {
  try {
    // Test database connection
    let dbStatus = 'disconnected';
    let dbError = null;
    
    try {
      await db.$queryRaw`SELECT 1`;
      dbStatus = 'connected';
    } catch (error) {
      dbStatus = 'error';
      dbError = error instanceof Error ? error.message : 'Unknown error';
    }

    return NextResponse.json({ 
      status: 'ok',
      database: {
        status: dbStatus,
        error: dbError
      },
      environment: {
        vercel: process.env.VERCEL === '1',
        nodeEnv: process.env.NODE_ENV
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}