'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Gift, 
  Trophy, 
  Calendar, 
  Users,
  CheckCircle,
  Clock,
  Star,
  Ticket,
  Sparkles,
  Crown,
  IndianRupee
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface LuckyDraw {
  id: string
  name: string
  description: string
  prizeAmount: number
  entryFee: number
  drawDate: string
  totalParticipants: number
  maxParticipants: number
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  winner?: {
    name: string
    email: string
    avatar?: string
  }
  userParticipated: boolean
}

interface GiftReward {
  id: string
  name: string
  description: string
  value: number
  type: 'BONUS' | 'CASHBACK' | 'SPECIAL'
  status: 'AVAILABLE' | 'CLAIMED' | 'EXPIRED'
  claimedAt?: string
}

export default function GiftPage() {
  const router = useRouter()
  const [luckyDraws, setLuckyDraws] = useState<LuckyDraw[]>([])
  const [giftRewards, setGiftRewards] = useState<GiftReward[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth')
      return
    }
    
    fetchGiftData()
  }, [router])

  const fetchGiftData = async () => {
    try {
      // TODO: Replace with actual API call
      // For now, using mock data
      setLuckyDraws([
        {
          id: '1',
          name: 'Daily Jackpot',
          description: 'Win ₹10,000 in our daily lucky draw',
          prizeAmount: 10000,
          entryFee: 50,
          drawDate: '2024-01-20T18:00:00Z',
          totalParticipants: 245,
          maxParticipants: 500,
          status: 'ACTIVE',
          userParticipated: true
        },
        {
          id: '2',
          name: 'Weekly Mega Draw',
          description: 'Grand prize of ₹50,000 every week',
          prizeAmount: 50000,
          entryFee: 200,
          drawDate: '2024-01-25T18:00:00Z',
          totalParticipants: 89,
          maxParticipants: 1000,
          status: 'ACTIVE',
          userParticipated: false
        },
        {
          id: '3',
          name: 'Monthly Special',
          description: 'Win ₹1,00,000 monthly special draw',
          prizeAmount: 100000,
          entryFee: 500,
          drawDate: '2024-02-01T18:00:00Z',
          totalParticipants: 45,
          maxParticipants: 2000,
          status: 'ACTIVE',
          userParticipated: false
        }
      ])
      
      setGiftRewards([
        {
          id: '1',
          name: 'Welcome Bonus',
          description: 'Special bonus for new users',
          value: 100,
          type: 'BONUS',
          status: 'CLAIMED',
          claimedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'First Recharge Cashback',
          description: '5% cashback on first recharge',
          value: 50,
          type: 'CASHBACK',
          status: 'AVAILABLE'
        },
        {
          id: '3',
          name: 'Referral Champion',
          description: 'Bonus for referring 5+ users',
          value: 500,
          type: 'SPECIAL',
          status: 'AVAILABLE'
        }
      ])
    } catch (error) {
      console.error('Error fetching gift data:', error)
    }
  }

  const participateInDraw = async (drawId: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/gift/participate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ drawId }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage('Successfully participated in the lucky draw!')
        setShowSuccess(true)
        fetchGiftData()
        
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        alert(data.error || 'Failed to participate in draw')
      }
    } catch (error) {
      console.error('Participation error:', error)
      alert('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const claimReward = async (rewardId: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/gift/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rewardId }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage('Reward claimed successfully!')
        setShowSuccess(true)
        fetchGiftData()
        
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        alert(data.error || 'Failed to claim reward')
      }
    } catch (error) {
      console.error('Claim error:', error)
      alert('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getDrawStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-600 bg-green-100'
      case 'COMPLETED':
        return 'text-blue-600 bg-blue-100'
      case 'CANCELLED':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getRewardTypeColor = (type: string) => {
    switch (type) {
      case 'BONUS':
        return 'text-green-600 bg-green-100'
      case 'CASHBACK':
        return 'text-blue-600 bg-blue-100'
      case 'SPECIAL':
        return 'text-purple-600 bg-purple-100'
      default:
        return 'text-gray-600 bg-gray-100'
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
          <h1 className="text-xl font-bold">Gifts & Lucky Draws</h1>
        </div>
      </header>

      {/* Success Alert */}
      {showSuccess && (
        <div className="px-4 pt-4">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {successMessage}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Lucky Draws Section */}
      <div className="px-4 py-6">
        <div className="flex items-center space-x-2 mb-4">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-lg font-bold text-gray-900">Lucky Draws</h2>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent>
            {luckyDraws.map((draw) => (
              <CarouselItem key={draw.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-xl h-full">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold">{draw.name}</h3>
                    <p className="text-sm opacity-90">{draw.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Prize Pool</span>
                      <span className="font-bold text-lg">₹{draw.prizeAmount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Entry Fee</span>
                      <span className="font-semibold">₹{draw.entryFee}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Participants</span>
                      <span className="font-semibold">
                        {draw.totalParticipants}/{draw.maxParticipants}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Draw Date</span>
                      <span className="font-semibold">
                        {new Date(draw.drawDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                      <div 
                        className="bg-white rounded-full h-2 transition-all duration-300"
                        style={{ width: `${(draw.totalParticipants / draw.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-center mt-1 opacity-90">
                      {draw.maxParticipants - draw.totalParticipants} spots left
                    </p>
                  </div>
                  
                  {draw.winner && (
                    <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
                      <p className="text-sm font-medium mb-1">🏆 Winner:</p>
                      <p className="text-sm">{draw.winner.name}</p>
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => participateInDraw(draw.id)}
                    className={`w-full py-3 font-semibold ${
                      draw.userParticipated 
                        ? 'bg-white text-orange-600 hover:bg-gray-100' 
                        : 'bg-white text-orange-600 hover:bg-gray-100'
                    }`}
                    disabled={draw.status !== 'ACTIVE' || draw.userParticipated || isLoading}
                  >
                    {draw.userParticipated ? '✓ Participated' : 'Participate Now'}
                  </Button>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Gift Rewards Section */}
      <div className="px-4 pb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-500" />
          <h2 className="text-lg font-bold text-gray-900">Your Rewards</h2>
        </div>
        
        <div className="space-y-3">
          {giftRewards.map((reward) => (
            <Card key={reward.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                    <Gift className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{reward.name}</h3>
                    <p className="text-sm text-gray-600">{reward.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRewardTypeColor(reward.type)}`}>
                        {reward.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        reward.status === 'AVAILABLE' ? 'text-green-600 bg-green-100' :
                        reward.status === 'CLAIMED' ? 'text-blue-600 bg-blue-100' :
                        'text-red-600 bg-red-100'
                      }`}>
                        {reward.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">₹{reward.value.toLocaleString()}</p>
                  {reward.status === 'AVAILABLE' && (
                    <Button 
                      size="sm"
                      onClick={() => claimReward(reward.id)}
                      className="mt-2 bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={isLoading}
                    >
                      Claim
                    </Button>
                  )}
                  {reward.status === 'CLAIMED' && reward.claimedAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Claimed {new Date(reward.claimedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Past Winners */}
      <div className="px-4 pb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Crown className="w-6 h-6 text-yellow-500" />
          <h2 className="text-lg font-bold text-gray-900">Recent Winners</h2>
        </div>
        
        <Card className="bg-white rounded-xl p-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                  <span className="text-yellow-700 font-bold">RS</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rahul Sharma</p>
                  <p className="text-sm text-gray-600">Daily Jackpot</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-600">₹10,000</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-bold">PP</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Priya Patel</p>
                  <p className="text-sm text-gray-600">Weekly Mega Draw</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600">₹50,000</p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                  <span className="text-green-700 font-bold">AK</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Amit Kumar</p>
                  <p className="text-sm text-gray-600">Monthly Special</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">₹1,00,000</p>
                <p className="text-xs text-gray-500">2 weeks ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* How to Participate */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">How to Participate</h2>
        <div className="space-y-3">
          <Card className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">1</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Choose a Draw</p>
                <p className="text-sm text-gray-600">Select from our daily, weekly, or monthly lucky draws</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">2</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Pay Entry Fee</p>
                <p className="text-sm text-gray-600">Pay the small entry fee to secure your spot</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">3</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Wait for Draw</p>
                <p className="text-sm text-gray-600">Our automated system will draw winners fairly</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">4</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Win & Claim</p>
                <p className="text-sm text-gray-600">If you win, the prize amount is automatically credited</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}