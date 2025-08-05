import { NextResponse } from "next/server";
import { db, isUsingMemoryDatabase, isUsingPostgres } from '@/lib/db-memory';

export async function GET() {
  try {
    // Test database connection
    let dbStatus = 'disconnected';
    let dbError = null;
    let dbType = 'unknown';
    
    try {
      await db.$queryRaw`SELECT 1`;
      dbStatus = 'connected';
      
      if (isUsingPostgres) {
        dbType = 'postgresql';
      } else if (isUsingMemoryDatabase) {
        dbType = 'memory';
      } else {
        dbType = 'sqlite';
      }
    } catch (error) {
      dbStatus = 'error';
      dbError = error instanceof Error ? error.message : 'Unknown error';
      dbType = 'unknown';
    }

    return NextResponse.json({ 
      status: 'ok',
      database: {
        status: dbStatus,
        type: dbType,
        error: dbError
      },
      environment: {
        vercel: process.env.VERCEL === '1',
        nodeEnv: process.env.NODE_ENV,
        usingMemoryDatabase: isUsingMemoryDatabase,
        usingPostgres: isUsingPostgres
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