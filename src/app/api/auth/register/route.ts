import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db-vercel'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const { name, email, mobile, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
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

    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email: email },
          { mobile: mobile }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or mobile already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        mobile,
        password: hashedPassword,
        wallet: {
          create: {
            balance: 0,
            bonus: 0
          }
        }
      },
      include: {
        wallet: true
      }
    })

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Registration successful',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Registration error:', error)
    
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