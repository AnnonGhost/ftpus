import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'

// GET /api/referral - Get referral data for current user
export async function GET(request: NextRequest) {
  try {
    // TODO: Get user ID from authentication token/session
    // For now, using a mock user ID
    const userId = "mock-user-id"

    // Get user's referral code and stats
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        referrals: {
          where: { status: 'COMPLETED' },
          include: {
            referred: true
          }
        },
        referredBy: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Generate referral code if not exists
    let referralCode = user.referredBy?.code
    if (!referralCode) {
      referralCode = `FUTURE${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      
      // Create referral record
      await db.referral.create({
        data: {
          code: referralCode,
          referrerId: userId,
          referredId: userId, // Self-reference for now, will be updated when someone uses the code
          status: 'COMPLETED'
        }
      })
    }

    const referralLink = `${process.env.NEXT_PUBLIC_APP_URL || 'https://futureplus.com'}/ref/${referralCode}`

    // Calculate total bonus from referrals
    const totalBonus = user.referrals.reduce((sum, referral) => sum + referral.bonus, 0)

    // Get referred users
    const referredUsers = user.referrals.map(referral => ({
      id: referral.referred.id,
      name: referral.referred.name || 'Anonymous',
      email: referral.referred.email,
      joinedAt: referral.referred.createdAt,
      bonus: referral.bonus,
      status: referral.status
    }))

    return NextResponse.json({
      referralCode,
      referralLink,
      totalReferrals: user.referrals.length,
      totalBonus,
      referredUsers
    })

  } catch (error) {
    console.error('Referral data error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/referral - Process referral when someone signs up with a code
export async function POST(request: NextRequest) {
  try {
    const { referralCode, userId } = await request.json()

    if (!referralCode || !userId) {
      return NextResponse.json(
        { error: 'Referral code and user ID are required' },
        { status: 400 }
      )
    }

    // Find the referral record
    const referral = await db.referral.findFirst({
      where: { code: referralCode },
      include: {
        referrer: true,
        referred: true
      }
    })

    if (!referral) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 404 }
      )
    }

    // Check if the referred user is different from referrer
    if (referral.referrerId === userId) {
      return NextResponse.json(
        { error: 'Cannot use your own referral code' },
        { status: 400 }
      )
    }

    // Update the referral record with the new user
    await db.referral.update({
      where: { id: referral.id },
      data: {
        referredId: userId,
        status: 'PENDING'
      }
    })

    return NextResponse.json({
      message: 'Referral code applied successfully',
      referrerId: referral.referrerId
    })

  } catch (error) {
    console.error('Referral processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}