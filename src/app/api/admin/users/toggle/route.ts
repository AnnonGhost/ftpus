import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId, isActive } = await request.json()

    if (!userId || typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'User ID and active status are required' },
        { status: 400 }
      )
    }

    // TODO: Verify admin authentication
    // For now, allowing access

    // Update user status
    const user = await db.user.update({
      where: { id: userId },
      data: { isActive }
    })

    return NextResponse.json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        id: user.id,
        name: user.name,
        isActive: user.isActive
      }
    })

  } catch (error) {
    console.error('User toggle error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}