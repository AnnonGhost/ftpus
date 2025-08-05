import { PrismaClient } from '@prisma/client'

// Check if we're in Vercel environment
const isVercel = process.env.VERCEL === '1'

// Check if we have PostgreSQL connection strings
const hasPostgres = !!process.env.POSTGRES_PRISMA_URL

// Create appropriate database client
export const db = (() => {
  // If we have PostgreSQL, use it (production)
  if (hasPostgres) {
    const globalForPrisma = globalThis as unknown as {
      prisma: PrismaClient | undefined
    }
    
    const prisma = globalForPrisma.prisma ?? new PrismaClient({
      log: ['query'],
    })
    
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prisma
    }
    
    return prisma
  }
  
  // For Vercel without PostgreSQL, use in-memory database
  if (isVercel) {
    // In-memory database for Vercel serverless environment
    // This is a temporary solution for development/demonstration purposes
    
    let dbInstance: PrismaClient | null = null
    let isInitialized = false
    
    // Mock data for in-memory database
    const mockUsers = new Map()
    const mockAdmins = new Map()
    const mockWallets = new Map()
    const mockPlans = new Map()
    const mockTransactions = new Map()
    const mockReferrals = new Map()
    const mockGifts = new Map()
    const mockUserPlans = new Map()
    
    // Initialize mock data
    function initializeMockData() {
      if (isInitialized) return
      
      // Create admin
      const adminId = 'admin-1'
      mockAdmins.set(adminId, {
        id: adminId,
        email: 'admin@futureplus.in',
        password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeZeUfkZMBs9kYZP6', // admin123
        key: 'FUTUREPLUS_ADMIN_KEY_2024',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
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
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'plan-passion-income',
          name: 'Passion Income',
          description: 'Steady daily returns for passionate earners',
          price: 1700,
          duration: 60,
          dailyReturn: 200,
          type: 'PASSION_INCOME',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'plan-premium',
          name: 'Premium',
          description: 'Premium plan with higher daily returns',
          price: 3500,
          duration: 90,
          dailyReturn: 450,
          type: 'PREMIUM',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'plan-big-bonanza',
          name: 'Big Bonanza',
          description: 'Maximum returns for serious investors',
          price: 8500,
          duration: 120,
          dailyReturn: 1200,
          type: 'BIG_BONANZA',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      
      plans.forEach(plan => {
        mockPlans.set(plan.id, plan)
      })
      
      // Create system user for gifts
      const systemUserId = 'system-user-1'
      mockUsers.set(systemUserId, {
        id: systemUserId,
        email: 'system@futureplus.in',
        mobile: '9728854984',
        password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeZeUfkZMBs9kYZP6', // system123
        name: 'System Account',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
      mockWallets.set(systemUserId, {
        id: 'wallet-system-1',
        balance: 0,
        bonus: 0,
        userId: systemUserId
      })
      
      // Create gifts
      const gifts = [
        {
          id: 'gift-1',
          name: 'Daily Lucky Draw',
          type: 'LUCKY_DRAW',
          value: 1000,
          status: 'ACTIVE',
          winnerId: null,
          userId: systemUserId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'gift-2',
          name: 'Weekly Bonus',
          type: 'BONUS',
          value: 5000,
          status: 'ACTIVE',
          winnerId: null,
          userId: systemUserId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'gift-3',
          name: 'Monthly Cashback',
          type: 'CASHBACK',
          value: 10000,
          status: 'ACTIVE',
          winnerId: null,
          userId: systemUserId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      
      gifts.forEach(gift => {
        mockGifts.set(gift.id, gift)
      })
      
      isInitialized = true
      console.log('🎉 In-memory database initialized successfully!')
    }
    
    // Create a mock Prisma client that works with in-memory data
    class MockPrismaClient {
      user = {
        findFirst: async ({ where }: any) => {
          initializeMockData()
          
          if (where.OR) {
            for (const condition of where.OR) {
              if (condition.email) {
                for (const user of mockUsers.values()) {
                  if (user.email === condition.email) {
                    const wallet = mockWallets.get(user.id)
                    return { ...user, wallet }
                  }
                }
              }
              if (condition.mobile) {
                for (const user of mockUsers.values()) {
                  if (user.mobile === condition.mobile) {
                    const wallet = mockWallets.get(user.id)
                    return { ...user, wallet }
                  }
                }
              }
            }
          }
          return null
        },
    
        findUnique: async ({ where }: any) => {
          initializeMockData()
          
          if (where.email) {
            for (const user of mockUsers.values()) {
              if (user.email === where.email) {
                const wallet = mockWallets.get(user.id)
                return { ...user, wallet }
              }
            }
          }
          return null
        },
    
        create: async ({ data }: any) => {
          initializeMockData()
          
          const id = `user-${Date.now()}`
          const user = {
            id,
            email: data.email,
            mobile: data.mobile,
            password: data.password,
            name: data.name,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          
          mockUsers.set(id, user)
          
          const walletId = `wallet-${Date.now()}`
          const wallet = {
            id: walletId,
            balance: 0,
            bonus: 0,
            userId: id
          }
          
          mockWallets.set(walletId, wallet)
          
          return { ...user, wallet }
        }
      }
    
      admin = {
        findFirst: async ({ where }: any) => {
          initializeMockData()
          
          for (const admin of mockAdmins.values()) {
            if (where.key === admin.key && where.isActive === admin.isActive) {
              return admin
            }
          }
          return null
        },
    
        upsert: async ({ where, create }: any) => {
          initializeMockData()
          
          if (where.email) {
            for (const admin of mockAdmins.values()) {
              if (admin.email === where.email) {
                return admin
              }
            }
          }
          
          const admin = {
            id: `admin-${Date.now()}`,
            ...create
          }
          
          mockAdmins.set(admin.id, admin)
          return admin
        }
      }
    
      plan = {
        findMany: async () => {
          initializeMockData()
          return Array.from(mockPlans.values())
        },
    
        findUnique: async ({ where }: any) => {
          initializeMockData()
          return mockPlans.get(where.id) || null
        },
    
        upsert: async ({ where, create }: any) => {
          initializeMockData()
          
          if (where.id) {
            const existing = mockPlans.get(where.id)
            if (existing) {
              return existing
            }
          }
          
          const plan = {
            id: where.id,
            ...create
          }
          
          mockPlans.set(plan.id, plan)
          return plan
        }
      }
    
      gift = {
        findMany: async () => {
          initializeMockData()
          return Array.from(mockGifts.values())
        },
    
        create: async ({ data }: any) => {
          initializeMockData()
          
          const gift = {
            id: `gift-${Date.now()}`,
            ...data
          }
          
          mockGifts.set(gift.id, gift)
          return gift
        }
      }
    
      transaction = {
        create: async ({ data }: any) => {
          initializeMockData()
          
          const transaction = {
            id: `transaction-${Date.now()}`,
            ...data
          }
          
          mockTransactions.set(transaction.id, transaction)
          return transaction
        }
      }
    
      userPlan = {
        create: async ({ data }: any) => {
          initializeMockData()
          
          const userPlan = {
            id: `user-plan-${Date.now()}`,
            ...data
          }
          
          mockUserPlans.set(userPlan.id, userPlan)
          return userPlan
        }
      }
    
      referral = {
        create: async ({ data }: any) => {
          initializeMockData()
          
          const referral = {
            id: `referral-${Date.now()}`,
            ...data
          }
          
          mockReferrals.set(referral.id, referral)
          return referral
        }
      }
    
      $queryRaw = async () => {
        initializeMockData()
        return [{ '1': 1 }]
      }
    
      $disconnect = async () => {
        // No-op for in-memory database
      }
    }
    
    return new MockPrismaClient() as any
  }
  
  // Local development - use SQLite
  const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
  }
  
  const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ['query'],
  })
  
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
  }
  
  return prisma
})()

export const isUsingMemoryDatabase = isVercel && !hasPostgres
export const isUsingPostgres = hasPostgres