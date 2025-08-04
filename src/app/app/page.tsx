'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Download, 
  Smartphone, 
  Monitor, 
  Bot,
  QrCode,
  ExternalLink,
  CheckCircle,
  Star,
  Shield,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AppPage() {
  const router = useRouter()
  const [downloadType, setDownloadType] = useState<'mobile' | 'desktop' | 'bot'>('mobile')

  useEffect(() => {
    // Check if user is logged in (optional for app page)
    const user = localStorage.getItem('user')
    // App page can be accessed without login
  }, [router])

  const downloadItems = [
    {
      type: 'mobile',
      title: "Mobile App",
      description: "Download our Android app for the best mobile experience",
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      features: [
        "Push notifications for earnings",
        "Biometric login security",
        "Offline transaction history",
        "Quick recharge & withdrawal"
      ],
      downloadUrl: "#",
      qrCode: "MOBILE_APP_QR"
    },
    {
      type: 'desktop',
      title: "Desktop App",
      description: "Windows/Mac application for enhanced productivity",
      icon: <Monitor className="w-8 h-8 text-green-600" />,
      features: [
        "Multiple account management",
        "Advanced analytics dashboard",
        "Keyboard shortcuts",
        "Auto-sync across devices"
      ],
      downloadUrl: "#",
      qrCode: "DESKTOP_APP_QR"
    },
    {
      type: 'bot',
      title: "Telegram Bot",
      description: "Automated trading assistant for Telegram",
      icon: <Bot className="w-8 h-8 text-purple-600" />,
      features: [
        "Instant earning notifications",
        "Quick balance check",
        "Automated plan management",
        "24/7 customer support"
      ],
      downloadUrl: "#",
      qrCode: "TELEGRAM_BOT_QR"
    }
  ]

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Premium User",
      rating: 5,
      comment: "The mobile app is amazing! I can manage my earnings on the go.",
      avatar: "RS"
    },
    {
      name: "Priya Patel",
      role: "Active Trader",
      rating: 5,
      comment: "Desktop app made it so easy to track my investments and earnings.",
      avatar: "PP"
    },
    {
      name: "Amit Kumar",
      role: "Bot User",
      rating: 4,
      comment: "Telegram bot is super convenient for quick updates and actions.",
      avatar: "AK"
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <button onClick={() => router.push('/')} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Download App</h1>
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Download className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Future Plus Apps</h2>
          <p className="text-gray-600">Access our platform on any device, anywhere, anytime</p>
        </div>

        {/* Download Type Selector */}
        <div className="flex space-x-2 mb-6">
          {downloadItems.map((item) => (
            <Button
              key={item.type}
              variant={downloadType === item.type ? "default" : "outline"}
              onClick={() => setDownloadType(item.type as any)}
              className={`flex-1 ${downloadType === item.type ? 'bg-green-600 hover:bg-green-700' : ''}`}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Selected Download Item */}
      <div className="px-4 pb-6">
        {downloadItems.map((item) => (
          downloadType === item.type && (
            <Card key={item.type} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {item.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Download Actions */}
              <div className="space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download Now</span>
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Or scan QR code</p>
                  <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{item.qrCode}</p>
                </div>
              </div>
            </Card>
          )
        ))}
      </div>

      {/* App Benefits */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Why Use Our Apps?</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-blue-50 rounded-xl p-4">
            <div className="text-center">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-1">Lightning Fast</h3>
              <p className="text-xs text-blue-700">Instant transactions and updates</p>
            </div>
          </Card>
          
          <Card className="bg-green-50 rounded-xl p-4">
            <div className="text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900 mb-1">Secure</h3>
              <p className="text-xs text-green-700">Bank-level security protection</p>
            </div>
          </Card>
          
          <Card className="bg-purple-50 rounded-xl p-4">
            <div className="text-center">
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900 mb-1">User Friendly</h3>
              <p className="text-xs text-purple-700">Simple and intuitive interface</p>
            </div>
          </Card>
          
          <Card className="bg-orange-50 rounded-xl p-4">
            <div className="text-center">
              <Download className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-900 mb-1">Offline Access</h3>
              <p className="text-xs text-orange-700">Work without internet connection</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Testimonials */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">What Users Say</h2>
        <div className="space-y-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-gray-600">{testimonial.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                    <div className="flex space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{testimonial.comment}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* System Requirements */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">System Requirements</h2>
        <Card className="bg-white rounded-xl p-4 shadow-sm">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Mobile App</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Android 8.0 or higher</li>
                <li>• 50MB storage space</li>
                <li>• Internet connection for initial setup</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Desktop App</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Windows 10/11 or macOS 10.14+</li>
                <li>• 100MB storage space</li>
                <li>• 2GB RAM minimum</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Telegram Bot</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Telegram app installed</li>
                <li>• Active internet connection</li>
                <li>• Any device that supports Telegram</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Support */}
      <div className="px-4 pb-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-700 rounded-2xl p-6 text-white">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">Need Help?</h3>
            <p className="text-green-100 mb-4">Our support team is available 24/7 to assist you</p>
            <Button variant="outline" className="bg-white text-green-700 hover:bg-gray-100">
              Contact Support
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}