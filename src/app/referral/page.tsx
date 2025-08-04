'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Share2, 
  Users, 
  Gift, 
  Copy, 
  CheckCircle,
  TrendingUp,
  UserPlus,
  IndianRupee
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ReferralStats {
  totalReferrals: number
  totalBonus: number
  referralCode: string
  referralLink: string
}

interface ReferredUser {
  id: string
  name: string
  email: string
  joinedAt: string
  bonus: number
  status: string
}

export default function ReferralPage() {
  const router = useRouter()
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    totalBonus: 0,
    referralCode: '',
    referralLink: ''
  })
  const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([])
  const [showCopied, setShowCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth')
      return
    }
    
    fetchReferralData()
  }, [router])

  const fetchReferralData = async () => {
    try {
      // TODO: Replace with actual API call
      // For now, using mock data
      setStats({
        totalReferrals: 5,
        totalBonus: 1250,
        referralCode: 'FUTURE123',
        referralLink: 'https://futureplus.com/ref/FUTURE123'
      })
      
      setReferredUsers([
        {
          id: '1',
          name: 'Rahul Sharma',
          email: 'rahul@example.com',
          joinedAt: '2024-01-10T10:30:00Z',
          bonus: 250,
          status: 'COMPLETED'
        },
        {
          id: '2',
          name: 'Priya Patel',
          email: 'priya@example.com',
          joinedAt: '2024-01-08T14:20:00Z',
          bonus: 300,
          status: 'COMPLETED'
        },
        {
          id: '3',
          name: 'Amit Kumar',
          email: 'amit@example.com',
          joinedAt: '2024-01-05T09:15:00Z',
          bonus: 200,
          status: 'COMPLETED'
        },
        {
          id: '4',
          name: 'Sneha Reddy',
          email: 'sneha@example.com',
          joinedAt: '2024-01-03T16:45:00Z',
          bonus: 250,
          status: 'COMPLETED'
        },
        {
          id: '5',
          name: 'Vikram Singh',
          email: 'vikram@example.com',
          joinedAt: '2024-01-01T11:30:00Z',
          bonus: 250,
          status: 'COMPLETED'
        }
      ])
    } catch (error) {
      console.error('Error fetching referral data:', error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Future Plus - Earn Daily!',
          text: `Use my referral code ${stats.referralCode} to join Future Plus and start earning ₹500-₹2000 daily! Get exclusive bonuses when you sign up.`,
          url: stats.referralLink
        })
      } catch (error) {
        console.log('Sharing failed:', error)
        copyToClipboard(stats.referralLink)
      }
    } else {
      copyToClipboard(stats.referralLink)
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
          <h1 className="text-xl font-bold">Referral Program</h1>
        </div>
      </header>

      {/* Success Alert */}
      {showCopied && (
        <div className="px-4 pt-4">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Referral link copied to clipboard!
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Referral Stats */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Referrals</p>
                <p className="text-2xl font-bold">{stats.totalReferrals}</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Total Bonus</p>
                <p className="text-2xl font-bold">₹{stats.totalBonus.toLocaleString()}</p>
              </div>
              <IndianRupee className="w-8 h-8 text-orange-200" />
            </div>
          </Card>
        </div>
      </div>

      {/* Referral Link */}
      <div className="px-4">
        <Card className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Share2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Your Referral Link</h2>
            <p className="text-sm text-gray-600">Share this link with friends and earn 10% bonus on their first recharge!</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Referral Code</label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-mono text-sm">
                  {stats.referralCode}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(stats.referralCode)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Referral Link</label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-mono text-xs truncate">
                  {stats.referralLink}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(stats.referralLink)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Button
              onClick={shareReferral}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 flex items-center space-x-2"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Referral Link</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* How It Works */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">How It Works</h2>
        <div className="space-y-3">
          <Card className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">1</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Share Your Link</p>
                <p className="text-sm text-gray-600">Share your unique referral link with friends and family</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">2</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">They Join & Recharge</p>
                <p className="text-sm text-gray-600">Your friends sign up using your link and make their first recharge</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">3</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Earn Bonus</p>
                <p className="text-sm text-gray-600">Get 10% bonus on their first recharge amount instantly!</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Referred Users */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Your Referrals</h2>
        <div className="space-y-3">
          {referredUsers.map((user) => (
            <Card key={user.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">
                      Joined {new Date(user.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">+₹{user.bonus.toLocaleString()}</p>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">{user.status}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}