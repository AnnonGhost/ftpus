import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // TODO: Verify admin authentication
    // For now, allowing access

    const gifts = await db.gift.findMany({
      include: {
        winner: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      gifts
    })

  } catch (error) {
    console.error('Admin gifts fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, type, value } = await request.json()

    if (!name || !type || !value) {
      return NextResponse.json(
        { error: 'Name, type, and value are required' },
        { status: 400 }
      )
    }

    // TODO: Verify admin authentication
    // For now, allowing access

    // TODO: Get user ID from authentication
    const userId = "admin-user-id"

    const gift = await db.gift.create({
      data: {
        name,
        type,
        value,
        userId
      }
    })

    return NextResponse.json({
      message: 'Gift created successfully',
      gift
    })

  } catch (error) {
    console.error('Gift creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}