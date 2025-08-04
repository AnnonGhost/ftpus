import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { planId, isActive } = await request.json()

    if (!planId || typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'Plan ID and active status are required' },
        { status: 400 }
      )
    }

    // TODO: Verify admin authentication
    // For now, allowing access

    // Update plan status
    const plan = await db.plan.update({
      where: { id: planId },
      data: { isActive }
    })

    return NextResponse.json({
      message: `Plan ${isActive ? 'activated' : 'deactivated'} successfully`,
      plan: {
        id: plan.id,
        name: plan.name,
        isActive: plan.isActive
      }
    })

  } catch (error) {
    console.error('Plan toggle error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}