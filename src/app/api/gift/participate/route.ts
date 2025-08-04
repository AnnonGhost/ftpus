import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { drawId } = await request.json()

    if (!drawId) {
      return NextResponse.json(
        { error: 'Draw ID is required' },
        { status: 400 }
      )
    }

    // TODO: Get user ID from authentication token/session
    // For now, using a mock user ID
    const userId = "mock-user-id"

    // Check if user already participated in this draw
    const existingParticipation = await db.gift.findFirst({
      where: {
        userId,
        name: `Lucky Draw ${drawId}`,
        type: 'LUCKY_DRAW',
        status: 'ACTIVE'
      }
    })

    if (existingParticipation) {
      return NextResponse.json(
        { error: 'You have already participated in this draw' },
        { status: 400 }
      )
    }

    // Get user wallet
    const wallet = await db.wallet.findUnique({
      where: { userId }
    })

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 404 }
      )
    }

    // For now, using a fixed entry fee of ₹50
    const entryFee = 50

    if (wallet.balance < entryFee) {
      return NextResponse.json(
        { error: 'Insufficient balance for entry fee' },
        { status: 400 }
      )
    }

    // Create gift entry
    const gift = await db.gift.create({
      data: {
        name: `Lucky Draw ${drawId}`,
        type: 'LUCKY_DRAW',
        value: entryFee,
        status: 'ACTIVE',
        userId
      }
    })

    // Deduct entry fee from wallet
    await db.wallet.update({
      where: { userId },
      data: {
        balance: wallet.balance - entryFee
      }
    })

    // Create transaction record
    await db.transaction.create({
      data: {
        type: 'WITHDRAWAL',
        amount: entryFee,
        status: 'COMPLETED',
        userId
      }
    })

    return NextResponse.json({
      message: 'Successfully participated in lucky draw',
      gift: {
        id: gift.id,
        name: gift.name,
        status: gift.status
      }
    })

  } catch (error) {
    console.error('Gift participation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}