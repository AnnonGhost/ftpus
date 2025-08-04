import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json()

    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      )
    }

    // TODO: Get user ID from authentication token/session
    // For now, using a mock user ID
    const userId = "mock-user-id"

    // Get the plan details
    const plan = await db.plan.findUnique({
      where: { id: planId }
    })

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      )
    }

    if (!plan.isActive) {
      return NextResponse.json(
        { error: 'Plan is not active' },
        { status: 400 }
      )
    }

    // Check if user already has this plan
    const existingUserPlan = await db.userPlan.findFirst({
      where: {
        userId,
        planId,
        status: 'ACTIVE'
      }
    })

    if (existingUserPlan) {
      return NextResponse.json(
        { error: 'You already have this active plan' },
        { status: 400 }
      )
    }

    // Get user wallet
    const wallet = await db.wallet.findUnique({
      where: { userId }
    })

    if (!wallet || wallet.balance < plan.price) {
      return NextResponse.json(
        { error: 'Insufficient wallet balance' },
        { status: 400 }
      )
    }

    // Calculate end date
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(startDate.getDate() + plan.duration)

    // Create user plan
    const userPlan = await db.userPlan.create({
      data: {
        userId,
        planId,
        status: 'ACTIVE',
        startDate,
        endDate,
        totalEarned: 0
      },
      include: {
        plan: true
      }
    })

    // Deduct amount from wallet
    await db.wallet.update({
      where: { userId },
      data: {
        balance: wallet.balance - plan.price
      }
    })

    // Create transaction record
    await db.transaction.create({
      data: {
        type: 'PLAN_RETURN',
        amount: plan.price,
        status: 'COMPLETED',
        userId
      }
    })

    return NextResponse.json({
      message: 'Plan activated successfully',
      userPlan: {
        id: userPlan.id,
        planName: userPlan.plan.name,
        startDate: userPlan.startDate,
        endDate: userPlan.endDate,
        dailyReturn: userPlan.plan.dailyReturn
      }
    })

  } catch (error) {
    console.error('Plan activation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}