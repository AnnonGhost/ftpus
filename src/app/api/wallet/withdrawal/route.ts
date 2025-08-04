import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { amount, upiId, upiNumber } = await request.json()

    if (!amount || !upiId || !upiNumber) {
      return NextResponse.json(
        { error: 'Amount, UPI ID, and UPI Number are required' },
        { status: 400 }
      )
    }

    if (amount < 100) {
      return NextResponse.json(
        { error: 'Minimum withdrawal amount is ₹100' },
        { status: 400 }
      )
    }

    // TODO: Get user ID from authentication token/session
    // For now, using a mock user ID
    const userId = "mock-user-id"

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

    if (wallet.balance < amount) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      )
    }

    // Create withdrawal transaction
    const transaction = await db.transaction.create({
      data: {
        type: 'WITHDRAWAL',
        amount,
        status: 'PENDING',
        upiId,
        upiNumber,
        userId
      }
    })

    // Update wallet balance (deduct the amount but keep it pending until approved)
    await db.wallet.update({
      where: { userId },
      data: {
        balance: wallet.balance - amount
      }
    })

    return NextResponse.json({
      message: 'Withdrawal request submitted successfully',
      transaction: {
        id: transaction.id,
        amount: transaction.amount,
        status: transaction.status,
        upiId: transaction.upiId,
        upiNumber: transaction.upiNumber
      }
    })

  } catch (error) {
    console.error('Withdrawal error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}