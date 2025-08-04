import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId, rechargeAmount } = await request.json()

    if (!userId || !rechargeAmount) {
      return NextResponse.json(
        { error: 'User ID and recharge amount are required' },
        { status: 400 }
      )
    }

    // Find the referral record for this user
    const referral = await db.referral.findFirst({
      where: { 
        referredId: userId,
        status: 'PENDING'
      },
      include: {
        referrer: {
          include: {
            wallet: true
          }
        }
      }
    })

    if (!referral) {
      return NextResponse.json(
        { message: 'No pending referral found' },
        { status: 200 }
      )
    }

    // Calculate bonus (10% of recharge amount)
    const bonus = rechargeAmount * 0.1

    // Update referral status
    await db.referral.update({
      where: { id: referral.id },
      data: {
        status: 'COMPLETED',
        bonus
      }
    })

    // Update referrer's wallet
    if (referral.referrer.wallet) {
      await db.wallet.update({
        where: { id: referral.referrer.wallet.id },
        data: {
          bonus: referral.referrer.wallet.bonus + bonus
        }
      })
    } else {
      // Create wallet if it doesn't exist
      await db.wallet.create({
        data: {
          userId: referral.referrerId,
          balance: 0,
          bonus
        }
      })
    }

    // Create bonus transaction
    await db.transaction.create({
      data: {
        type: 'REFERRAL',
        amount: bonus,
        status: 'COMPLETED',
        bonus,
        userId: referral.referrerId
      }
    })

    return NextResponse.json({
      message: 'Referral bonus credited successfully',
      bonus,
      referrerId: referral.referrerId
    })

  } catch (error) {
    console.error('Referral bonus error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}