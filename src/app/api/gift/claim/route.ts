import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { rewardId } = await request.json()

    if (!rewardId) {
      return NextResponse.json(
        { error: 'Reward ID is required' },
        { status: 400 }
      )
    }

    // TODO: Get user ID from authentication token/session
    // For now, using a mock user ID
    const userId = "mock-user-id"

    // Find the gift/reward
    const gift = await db.gift.findFirst({
      where: {
        id: rewardId,
        userId,
        status: 'ACTIVE'
      }
    })

    if (!gift) {
      return NextResponse.json(
        { error: 'Reward not found or already claimed' },
        { status: 404 }
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

    // Update gift status to claimed
    await db.gift.update({
      where: { id: gift.id },
      data: {
        status: 'CLAIMED',
        winnerId: userId
      }
    })

    // Add reward to wallet (as bonus)
    await db.wallet.update({
      where: { userId },
      data: {
        bonus: wallet.bonus + gift.value
      }
    })

    // Create transaction record
    await db.transaction.create({
      data: {
        type: 'BONUS',
        amount: gift.value,
        status: 'COMPLETED',
        bonus: gift.value,
        userId
      }
    })

    return NextResponse.json({
      message: 'Reward claimed successfully',
      gift: {
        id: gift.id,
        name: gift.name,
        value: gift.value,
        status: 'CLAIMED'
      }
    })

  } catch (error) {
    console.error('Gift claim error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}