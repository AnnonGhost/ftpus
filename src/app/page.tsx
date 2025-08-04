'use client'

import { useState } from 'react'
import { 
  Wallet, 
  Receipt, 
  Users, 
  Share2, 
  Globe, 
  ClipboardList, 
  Gift, 
  Download,
  Bell,
  TrendingUp,
  ArrowUp,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Home() {
  const [notification, setNotification] = useState('Welcome to Future Plus')

  const features = [
    { icon: Wallet, label: 'Recharge', color: 'bg-blue-500', href: '/wallet' },
    { icon: Receipt, label: 'Withdrawal', color: 'bg-red-500', href: '/wallet' },
    { icon: Users, label: 'Team', color: 'bg-orange-500', href: '/team' },
    { icon: Share2, label: 'Referral', color: 'bg-orange-400', href: '/referral' },
    { icon: Globe, label: 'About Us', color: 'bg-green-500', href: '/about' },
    { icon: ClipboardList, label: 'My Package', color: 'bg-blue-600', href: '/plans' },
    { icon: Gift, label: 'Gift', color: 'bg-teal-400', href: '/gift' },
    { icon: Download, label: 'My APP', color: 'bg-teal-600', href: '/app' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Future Plus</h1>
              <p className="text-green-100 text-xs">Earn Daily</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-xs text-green-100">Balance</p>
              <p className="text-lg font-bold">₹0.00</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = '/auth'}
              className="text-white hover:bg-green-700"
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Notification Bar */}
      <div className="px-4 py-3 sticky top-16 z-40 bg-green-50">
        <Card className="bg-white rounded-full shadow-md flex items-center space-x-3 px-4 py-2 transition-all duration-300 hover:shadow-lg">
          <Bell className="w-5 h-5 text-green-600 flex-shrink-0 animate-pulse" />
          <p className="text-sm text-gray-700 truncate">{notification}</p>
        </Card>
      </div>

      {/* Icon Grid */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <a
              key={index}
              href={feature.href}
              className="group"
            >
              <div className="flex flex-col items-center space-y-2 transition-all duration-300 transform group-hover:scale-105">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 ${feature.color} rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110`}>
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900 transition-colors">
                  {feature.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Hero Illustration */}
      <div className="px-4 py-4 sm:py-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-4 sm:p-6 text-white shadow-xl transform transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Earn ₹500–₹2000 Daily</h2>
              <p className="text-blue-100 text-sm sm:text-base">Join thousands earning with Future Plus</p>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="animate-bounce">
                <ArrowUp className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
              </div>
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-green-300" />
            </div>
          </div>
          
          {/* Hero illustration with silhouettes */}
          <div className="relative h-24 sm:h-32 bg-blue-400 rounded-2xl overflow-hidden mb-4">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end">
              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-blue-800 rounded-t-lg opacity-60"></div>
              <div className="w-8 h-16 sm:w-10 sm:h-20 bg-blue-800 rounded-t-lg opacity-70"></div>
              <div className="w-10 h-20 sm:w-12 sm:h-24 bg-blue-800 rounded-t-lg opacity-80"></div>
              <div className="w-8 h-16 sm:w-10 sm:h-20 bg-blue-800 rounded-t-lg opacity-70"></div>
              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-blue-800 rounded-t-lg opacity-60"></div>
            </div>
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center opacity-80 animate-pulse">
                <ArrowUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-blue-100 text-sm">Active Users</p>
              <p className="text-lg sm:text-xl font-bold">10,000+</p>
            </div>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-2 px-6 transform transition-all duration-300 hover:scale-105 shadow-lg">
              Start Earning
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-2">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Card className="bg-green-50 p-3 sm:p-4 rounded-2xl transform transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-green-600">Today's Earning</p>
                <p className="text-lg sm:text-xl font-bold text-green-800">₹0.00</p>
              </div>
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
          </Card>
          <Card className="bg-blue-50 p-3 sm:p-4 rounded-2xl transform transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-blue-600">Total Earning</p>
                <p className="text-lg sm:text-xl font-bold text-blue-800">₹0.00</p>
              </div>
              <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
          </Card>
        </div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="px-4 py-6">
        <Card className="bg-gray-50 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">📱 Mobile-First Design</p>
          <p className="text-xs text-gray-500">Optimized for all devices • Fast & Secure • 24/7 Support</p>
        </Card>
      </div>
    </div>
  )
}