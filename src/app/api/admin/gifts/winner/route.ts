import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { giftId, winnerId } = await request.json()

    if (!giftId || !winnerId) {
      return NextResponse.json(
        { error: 'Gift ID and winner ID are required' },
        { status: 400 }
      )
    }

    // TODO: Verify admin authentication
    // For now, allowing access

    // Update gift with winner
    const gift = await db.gift.update({
      where: { id: giftId },
      data: {
        winnerId,
        status: 'CLAIMED'
      },
      include: {
        winner: true
      }
    })

    return NextResponse.json({
      message: 'Winner announced successfully',
      gift: {
        id: gift.id,
        name: gift.name,
        winner: gift.winner,
        status: gift.status
      }
    })

  } catch (error) {
    console.error('Winner announcement error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}