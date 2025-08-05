import { NextRequest, NextResponse } from 'next/server'
import { initializePostgresDatabase } from '@/lib/init-postgres'
import { isUsingPostgres, isUsingMemoryDatabase } from '@/lib/db-memory'

export async function POST(request: NextRequest) {
  try {
    // Check for a secret key to prevent unauthorized initialization
    const { secret } = await request.json()
    
    if (secret !== process.env.INIT_DB_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let result

    // Initialize based on database type
    if (isUsingPostgres) {
      result = await initializePostgresDatabase()
    } else if (isUsingMemoryDatabase) {
      // For in-memory database, data is already initialized
      result = { 
        success: true, 
        message: 'In-memory database initialized automatically',
        databaseType: 'memory'
      }
    } else {
      // Fallback to Vercel initialization
      result = await initializePostgresDatabase()
    }
    
    if (result.success) {
      return NextResponse.json({
        message: 'Database initialized successfully',
        databaseType: isUsingPostgres ? 'postgresql' : isUsingMemoryDatabase ? 'memory' : 'unknown',
        details: result.message
      })
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Also allow GET requests for easier testing (with secret in query param)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    
    if (secret !== process.env.INIT_DB_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let result

    // Initialize based on database type
    if (isUsingPostgres) {
      result = await initializePostgresDatabase()
    } else if (isUsingMemoryDatabase) {
      // For in-memory database, data is already initialized
      result = { 
        success: true, 
        message: 'In-memory database initialized automatically',
        databaseType: 'memory'
      }
    } else {
      // Fallback to Vercel initialization
      result = await initializePostgresDatabase()
    }
    
    if (result.success) {
      return NextResponse.json({
        message: 'Database initialized successfully',
        databaseType: isUsingPostgres ? 'postgresql' : isUsingMemoryDatabase ? 'memory' : 'unknown',
        details: result.message
      })
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}