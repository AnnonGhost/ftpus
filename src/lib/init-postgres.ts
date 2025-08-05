import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// This script initializes the PostgreSQL database with seed data
// It should be called from an API endpoint or during build time

const prisma = new PrismaClient()

export async function initializePostgresDatabase() {
  try {
    console.log('🚀 Initializing PostgreSQL database...')
    
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12)
    const admin = await prisma.admin.upsert({
      where: { email: 'admin@futureplus.in' },
      update: {},
      create: {
        email: 'admin@futureplus.in',
        password: adminPassword,
        key: 'FUTUREPLUS_ADMIN_KEY_2024',
        isActive: true,
      },
    })

    console.log('✅ Admin user created:', admin.email)

    // Create plans
    const plans = [
      {
        id: 'plan-lucky-draw',
        name: 'Lucky Draw',
        description: 'Entry into daily lucky draw with exciting prizes',
        price: 450,
        duration: 30,
        dailyReturn: 50,
        type: 'LUCKY_DRAW',
      },
      {
        id: 'plan-passion-income',
        name: 'Passion Income',
        description: 'Steady daily returns for passionate earners',
        price: 1700,
        duration: 60,
        dailyReturn: 200,
        type: 'PASSION_INCOME',
      },
      {
        id: 'plan-premium',
        name: 'Premium',
        description: 'Premium plan with higher daily returns',
        price: 3500,
        duration: 90,
        dailyReturn: 450,
        type: 'PREMIUM',
      },
      {
        id: 'plan-big-bonanza',
        name: 'Big Bonanza',
        description: 'Maximum returns for serious investors',
        price: 8500,
        duration: 120,
        dailyReturn: 1200,
        type: 'BIG_BONANZA',
      },
    ]

    for (const plan of plans) {
      const createdPlan = await prisma.plan.upsert({
        where: { id: plan.id },
        update: {},
        create: plan,
      })
      console.log('✅ Plan created:', createdPlan.name)
    }

    // Create some sample gifts
    const gifts = [
      {
        name: 'Daily Lucky Draw',
        type: 'LUCKY_DRAW',
        value: 1000,
        status: 'ACTIVE',
      },
      {
        name: 'Weekly Bonus',
        type: 'BONUS',
        value: 5000,
        status: 'ACTIVE',
      },
      {
        name: 'Monthly Cashback',
        type: 'CASHBACK',
        value: 10000,
        status: 'ACTIVE',
      },
    ]

    for (const gift of gifts) {
      // Create a dummy user for gift creator
      const dummyUser = await prisma.user.upsert({
        where: { email: 'system@futureplus.in' },
        update: {},
        create: {
          email: 'system@futureplus.in',
          mobile: '9728854984',
          password: await bcrypt.hash('system123', 12),
          name: 'System Account',
          isActive: true,
          wallet: {
            create: {
              balance: 0,
              bonus: 0,
            },
          },
        },
      })

      const createdGift = await prisma.gift.create({
        data: {
          ...gift,
          userId: dummyUser.id,
        },
      })
      console.log('✅ Gift created:', createdGift.name)
    }

    console.log('🎉 PostgreSQL database initialized successfully!')
    console.log('🔑 Admin credentials:')
    console.log('   Email: admin@futureplus.in')
    console.log('   Password: admin123')
    console.log('   Admin Key: FUTUREPLUS_ADMIN_KEY_2024')

    return { success: true, message: 'PostgreSQL database initialized successfully' }
  } catch (error) {
    console.error('❌ Error initializing PostgreSQL database:', error)
    return { success: false, error: error.message }
  } finally {
    await prisma.$disconnect()
  }
}

// Auto-initialize if this module is imported directly
if (require.main === module) {
  initializePostgresDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}