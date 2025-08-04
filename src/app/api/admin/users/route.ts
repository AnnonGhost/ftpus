import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // TODO: Verify admin authentication
    // For now, allowing access

    const users = await db.user.findMany({
      include: {
        wallet: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      users
    })

  } catch (error) {
    console.error('Admin users fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}