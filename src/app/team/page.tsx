'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Users, 
  UserPlus, 
  TrendingUp, 
  Crown,
  Star,
  Gift,
  IndianRupee,
  Calendar,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface TeamMember {
  id: string
  name: string
  email: string
  joinedAt: string
  totalEarnings: number
  referralCount: number
  status: string
}

interface TeamStats {
  totalMembers: number
  totalEarnings: number
  activeMembers: number
  topPerformer: TeamMember | null
}

export default function TeamPage() {
  const router = useRouter()
  const [teamStats, setTeamStats] = useState<TeamStats>({
    totalMembers: 0,
    totalEarnings: 0,
    activeMembers: 0,
    topPerformer: null
  })
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth')
      return
    }
    
    fetchTeamData()
  }, [router])

  const fetchTeamData = async () => {
    try {
      // TODO: Replace with actual API call
      // For now, using mock data
      setTeamStats({
        totalMembers: 25,
        totalEarnings: 45600,
        activeMembers: 18,
        topPerformer: {
          id: '1',
          name: 'Rahul Sharma',
          email: 'rahul@example.com',
          joinedAt: '2024-01-01T10:30:00Z',
          totalEarnings: 8500,
          referralCount: 8,
          status: 'ACTIVE'
        }
      })
      
      setTeamMembers([
        {
          id: '1',
          name: 'Rahul Sharma',
          email: 'rahul@example.com',
          joinedAt: '2024-01-01T10:30:00Z',
          totalEarnings: 8500,
          referralCount: 8,
          status: 'ACTIVE'
        },
        {
          id: '2',
          name: 'Priya Patel',
          email: 'priya@example.com',
          joinedAt: '2024-01-05T14:20:00Z',
          totalEarnings: 7200,
          referralCount: 6,
          status: 'ACTIVE'
        },
        {
          id: '3',
          name: 'Amit Kumar',
          email: 'amit@example.com',
          joinedAt: '2024-01-10T09:15:00Z',
          totalEarnings: 6800,
          referralCount: 5,
          status: 'ACTIVE'
        },
        {
          id: '4',
          name: 'Sneha Reddy',
          email: 'sneha@example.com',
          joinedAt: '2024-01-12T16:45:00Z',
          totalEarnings: 5400,
          referralCount: 4,
          status: 'ACTIVE'
        },
        {
          id: '5',
          name: 'Vikram Singh',
          email: 'vikram@example.com',
          joinedAt: '2024-01-15T11:30:00Z',
          totalEarnings: 4200,
          referralCount: 3,
          status: 'ACTIVE'
        },
        {
          id: '6',
          name: 'Neha Gupta',
          email: 'neha@example.com',
          joinedAt: '2024-01-18T13:20:00Z',
          totalEarnings: 3500,
          referralCount: 2,
          status: 'ACTIVE'
        }
      ])
    } catch (error) {
      console.error('Error fetching team data:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-600 bg-green-100'
      case 'INACTIVE':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 1:
        return <Award className="w-5 h-5 text-gray-400" />
      case 2:
        return <Award className="w-5 h-5 text-orange-600" />
      default:
        return <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
          {index + 1}
        </span>
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
          <h1 className="text-xl font-bold">My Team</h1>
        </div>
      </header>

      {/* Team Stats */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Team Members</p>
                <p className="text-2xl font-bold">{teamStats.totalMembers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold">₹{teamStats.totalEarnings.toLocaleString()}</p>
              </div>
              <IndianRupee className="w-8 h-8 text-green-200" />
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Card className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Active Members</p>
                <p className="text-2xl font-bold">{teamStats.activeMembers}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Top Performer</p>
                <p className="text-lg font-bold truncate">
                  {teamStats.topPerformer?.name || 'N/A'}
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-200" />
            </div>
          </Card>
        </div>
      </div>

      {/* Top Performer */}
      {teamStats.topPerformer && (
        <div className="px-4">
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 text-white shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">🏆 Top Performer</h3>
                <p className="text-sm opacity-90">{teamStats.topPerformer.name}</p>
                <p className="text-xs opacity-80">
                  ₹{teamStats.topPerformer.totalEarnings.toLocaleString()} earned • {teamStats.topPerformer.referralCount} referrals
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Team Members */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Team Members</h2>
        <div className="space-y-3">
          {teamMembers.map((member, index) => (
            <Card key={member.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {getRankIcon(index)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.email}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <UserPlus className="w-3 h-3" />
                        <span>{member.referralCount} referrals</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹{member.totalEarnings.toLocaleString()}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Benefits */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Team Benefits</h2>
        <div className="space-y-3">
          <Card className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Gift className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Referral Bonuses</p>
                <p className="text-sm text-gray-600">Earn 10% bonus on every team member's first recharge</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Growth Incentives</p>
                <p className="text-sm text-gray-600">Get special rewards for building large teams</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Leadership Recognition</p>
                <p className="text-sm text-gray-600">Top performers get exclusive benefits and recognition</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}