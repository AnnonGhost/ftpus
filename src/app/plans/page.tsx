'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Gift, 
  TrendingUp, 
  Crown, 
  Diamond,
  CheckCircle,
  Clock,
  Star,
  IndianRupee,
  Calendar,
  Percent
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface Plan {
  id: string
  name: string
  description: string
  price: number
  duration: number
  dailyReturn: number
  type: string
  isActive: boolean
  features: string[]
}

interface UserPlan {
  id: string
  planId: string
  status: string
  startDate: string
  endDate: string
  totalEarned: number
  plan: Plan
}

export default function PlansPage() {
  const router = useRouter()
  const [plans, setPlans] = useState<Plan[]>([])
  const [userPlans, setUserPlans] = useState<UserPlan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth')
      return
    }
    
    fetchPlans()
    fetchUserPlans()
  }, [router])

  const fetchPlans = async () => {
    try {
      // TODO: Replace with actual API call
      // For now, using mock data
      setPlans([
        {
          id: '1',
          name: 'Lucky Draw',
          description: 'Participate in daily lucky draws and win exciting prizes',
          price: 450,
          duration: 30,
          dailyReturn: 15,
          type: 'LUCKY_DRAW',
          isActive: true,
          features: [
            'Daily lucky draw entries',
            'Win up to ₹10,000',
            '30 days validity',
            'Multiple winners daily'
          ]
        },
        {
          id: '2',
          name: 'Passion Income',
          description: 'Steady daily returns with moderate risk',
          price: 1700,
          duration: 60,
          dailyReturn: 85,
          type: 'PASSION_INCOME',
          isActive: true,
          features: [
            'Fixed daily returns',
            '60 days validity',
            'Low risk strategy',
            'Guaranteed earnings'
          ]
        },
        {
          id: '3',
          name: 'Premium',
          description: 'Premium plan with higher returns and exclusive benefits',
          price: 3500,
          duration: 90,
          dailyReturn: 210,
          type: 'PREMIUM',
          isActive: true,
          features: [
            'Higher daily returns',
            '90 days validity',
            'Priority support',
            'Exclusive bonuses'
          ]
        },
        {
          id: '4',
          name: 'Big Bonanza',
          description: 'Maximum returns with our premium investment plan',
          price: 8500,
          duration: 120,
          dailyReturn: 680,
          type: 'BIG_BONANZA',
          isActive: true,
          features: [
            'Maximum daily returns',
            '120 days validity',
            'VIP treatment',
            'Special rewards'
          ]
        }
      ])
    } catch (error) {
      console.error('Error fetching plans:', error)
    }
  }

  const fetchUserPlans = async () => {
    try {
      // TODO: Replace with actual API call
      // For now, using mock data
      setUserPlans([
        {
          id: '1',
          planId: '1',
          status: 'ACTIVE',
          startDate: '2024-01-15T10:30:00Z',
          endDate: '2024-02-14T10:30:00Z',
          totalEarned: 225,
          plan: {
            id: '1',
            name: 'Lucky Draw',
            description: 'Participate in daily lucky draws and win exciting prizes',
            price: 450,
            duration: 30,
            dailyReturn: 15,
            type: 'LUCKY_DRAW',
            isActive: true,
            features: []
          }
        }
      ])
    } catch (error) {
      console.error('Error fetching user plans:', error)
    }
  }

  const activatePlan = async (plan: Plan) => {
    setSelectedPlan(plan)
    setShowConfirm(true)
  }

  const confirmActivation = async () => {
    if (!selectedPlan) return

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/plans/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: selectedPlan.id
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowSuccess(true)
        setShowConfirm(false)
        fetchUserPlans()
        
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        alert(data.error || 'Plan activation failed')
      }
    } catch (error) {
      console.error('Plan activation error:', error)
      alert('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getPlanIcon = (type: string) => {
    switch (type) {
      case 'LUCKY_DRAW':
        return <Gift className="w-8 h-8 text-purple-500" />
      case 'PASSION_INCOME':
        return <TrendingUp className="w-8 h-8 text-blue-500" />
      case 'PREMIUM':
        return <Crown className="w-8 h-8 text-yellow-500" />
      case 'BIG_BONANZA':
        return <Diamond className="w-8 h-8 text-pink-500" />
      default:
        return <Star className="w-8 h-8 text-gray-500" />
    }
  }

  const getPlanColor = (type: string) => {
    switch (type) {
      case 'LUCKY_DRAW':
        return 'from-purple-500 to-purple-700'
      case 'PASSION_INCOME':
        return 'from-blue-500 to-blue-700'
      case 'PREMIUM':
        return 'from-yellow-500 to-yellow-700'
      case 'BIG_BONANZA':
        return 'from-pink-500 to-pink-700'
      default:
        return 'from-gray-500 to-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <button onClick={() => router.push('/')} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Investment Plans</h1>
        </div>
      </header>

      {/* Success Alert */}
      {showSuccess && (
        <div className="px-4 pt-4">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Plan activated successfully! Start earning daily returns.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Plans Carousel */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Available Plans</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {plans.map((plan) => (
              <CarouselItem key={plan.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className={`bg-gradient-to-br ${getPlanColor(plan.type)} rounded-2xl p-6 text-white shadow-xl h-full`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm opacity-90">{plan.description}</p>
                    </div>
                    {getPlanIcon(plan.type)}
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="w-4 h-4" />
                        <span className="text-sm">Price</span>
                      </div>
                      <span className="font-bold">₹{plan.price.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Duration</span>
                      </div>
                      <span className="font-bold">{plan.duration} days</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Percent className="w-4 h-4" />
                        <span className="text-sm">Daily Return</span>
                      </div>
                      <span className="font-bold">₹{plan.dailyReturn.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-white opacity-80" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => activatePlan(plan)}
                    className="w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3"
                    disabled={!plan.isActive}
                  >
                    {plan.isActive ? 'Activate Plan' : 'Coming Soon'}
                  </Button>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Active Plans */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">My Active Plans</h2>
        {userPlans.length === 0 ? (
          <Card className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No active plans yet</p>
            <p className="text-sm text-gray-500 mt-1">Activate a plan to start earning daily returns</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {userPlans.map((userPlan) => (
              <Card key={userPlan.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getPlanIcon(userPlan.plan.type)}
                    <div>
                      <h3 className="font-bold text-gray-900">{userPlan.plan.name}</h3>
                      <p className="text-sm text-gray-500">{userPlan.plan.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">{userPlan.status}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Daily Return</p>
                    <p className="font-bold text-green-600">₹{userPlan.plan.dailyReturn.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Earned</p>
                    <p className="font-bold text-blue-600">₹{userPlan.totalEarned.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Started: {new Date(userPlan.startDate).toLocaleDateString()}</span>
                  <span>Ends: {new Date(userPlan.endDate).toLocaleDateString()}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Plan Activation</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold text-green-600">₹{selectedPlan.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{selectedPlan.duration} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Return:</span>
                <span className="font-semibold text-blue-600">₹{selectedPlan.dailyReturn.toLocaleString()}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              The amount will be deducted from your wallet balance. You'll start earning daily returns from tomorrow.
            </p>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmActivation}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Activating...' : 'Confirm'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}