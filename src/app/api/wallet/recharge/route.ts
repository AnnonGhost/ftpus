import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { amount, reference } = await request.json()

    if (!amount || !reference) {
      return NextResponse.json(
        { error: 'Amount and reference are required' },
        { status: 400 }
      )
    }

    if (amount < 450) {
      return NextResponse.json(
        { error: 'Minimum recharge amount is ₹450' },
        { status: 400 }
      )
    }

    // TODO: Get user ID from authentication token/session
    // For now, using a mock user ID
    const userId = "mock-user-id"

    // Check if reference number already exists
    const existingTransaction = await db.transaction.findFirst({
      where: { reference }
    })

    if (existingTransaction) {
      return NextResponse.json(
        { error: 'Reference number already used' },
        { status: 409 }
      )
    }

    // Get user wallet
    let wallet = await db.wallet.findUnique({
      where: { userId }
    })

    if (!wallet) {
      // Create wallet if it doesn't exist
      wallet = await db.wallet.create({
        data: {
          userId,
          balance: 0,
          bonus: 0
        }
      })
    }

    // Calculate bonus (10% for first recharge)
    const bonus = amount * 0.1

    // Create transaction
    const transaction = await db.transaction.create({
      data: {
        type: 'RECHARGE',
        amount,
        status: 'COMPLETED',
        reference,
        bonus,
        userId
      }
    })

    // Update wallet balance and bonus
    await db.wallet.update({
      where: { userId },
      data: {
        balance: wallet.balance + amount,
        bonus: wallet.bonus + bonus
      }
    })

    return NextResponse.json({
      message: 'Recharge successful',
      transaction: {
        id: transaction.id,
        amount: transaction.amount,
        bonus: transaction.bonus,
        status: transaction.status
      }
    })

  } catch (error) {
    console.error('Recharge error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}