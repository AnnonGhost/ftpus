import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get all active plans
    const plans = await db.plan.findMany({
      where: { isActive: true },
      orderBy: { price: 'asc' }
    })

    return NextResponse.json({
      plans
    })

  } catch (error) {
    console.error('Plans fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, price, duration, dailyReturn, type } = await request.json()

    if (!name || !price || !duration || !dailyReturn || !type) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // TODO: Check if user is admin
    // For now, allowing plan creation

    const plan = await db.plan.create({
      data: {
        name,
        description,
        price,
        duration,
        dailyReturn,
        type
      }
    })

    return NextResponse.json({
      message: 'Plan created successfully',
      plan
    })

  } catch (error) {
    console.error('Plan creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}