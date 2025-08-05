import { NextRequest, NextResponse } from 'next/server'
import { db, isUsingMemoryDatabase } from '@/lib/db-memory'

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json()

    if (!key) {
      return NextResponse.json(
        { error: 'Admin key is required' },
        { status: 400 }
      )
    }

    // Find admin by key
    const admin = await db.admin.findFirst({
      where: { 
        key,
        isActive: true 
      }
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid admin key' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: 'Admin authenticated successfully',
      admin: {
        id: admin.id,
        email: admin.email
      },
      usingMemoryDatabase: isUsingMemoryDatabase
    })

  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}