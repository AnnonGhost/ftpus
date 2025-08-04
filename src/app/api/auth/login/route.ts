import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db-vercel'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if database is available
    if (!db) {
      return NextResponse.json(
        { error: 'Database service unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    // Find user by email or mobile
    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: email },
          { mobile: email }
        ]
      },
      include: {
        wallet: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      )
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Login error:', error)
    
    // Handle specific database errors
    if (error instanceof Error && error.message.includes('database')) {
      return NextResponse.json(
        { error: 'Database service temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}