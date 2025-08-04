'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Wallet, 
  TrendingUp, 
  CreditCard, 
  Banknote, 
  Smartphone,
  Copy,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Transaction {
  id: string
  type: string
  amount: number
  status: string
  createdAt: string
  reference?: string
}

interface WalletData {
  balance: number
  bonus: number
}

export default function WalletPage() {
  const router = useRouter()
  const [wallet, setWallet] = useState<WalletData>({ balance: 0, bonus: 0 })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [rechargeAmount, setRechargeAmount] = useState('')
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [upiId, setUpiId] = useState('')
  const [upiNumber, setUpiNumber] = useState('')
  const [referenceNumber, setReferenceNumber] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('recharge')

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth')
      return
    }
    
    fetchWalletData()
    fetchTransactions()
  }, [router])

  const fetchWalletData = async () => {
    try {
      // TODO: Replace with actual API call
      // For now, using mock data
      setWallet({ balance: 1250, bonus: 150 })
    } catch (error) {
      console.error('Error fetching wallet data:', error)
    }
  }

  const fetchTransactions = async () => {
    try {
      // TODO: Replace with actual API call
      // For now, using mock data
      setTransactions([
        {
          id: '1',
          type: 'RECHARGE',
          amount: 1000,
          status: 'COMPLETED',
          createdAt: '2024-01-15T10:30:00Z',
          reference: 'TXN123456'
        },
        {
          id: '2',
          type: 'BONUS',
          amount: 100,
          status: 'COMPLETED',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '3',
          type: 'WITHDRAWAL',
          amount: 500,
          status: 'PENDING',
          createdAt: '2024-01-14T15:45:00Z',
          reference: 'TXN789012'
        }
      ])
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  const handleRecharge = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!rechargeAmount || isNaN(Number(rechargeAmount)) || Number(rechargeAmount) < 450) {
      alert('Minimum recharge amount is ₹450')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/wallet/recharge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(rechargeAmount),
          reference: referenceNumber
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowSuccess(true)
        setRechargeAmount('')
        setReferenceNumber('')
        fetchWalletData()
        fetchTransactions()
        
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        alert(data.error || 'Recharge failed')
      }
    } catch (error) {
      console.error('Recharge error:', error)
      alert('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!withdrawalAmount || isNaN(Number(withdrawalAmount)) || Number(withdrawalAmount) < 100) {
      alert('Minimum withdrawal amount is ₹100')
      return
    }

    if (!upiId || !upiNumber) {
      alert('Please provide both UPI ID and UPI Number')
      return
    }

    if (Number(withdrawalAmount) > wallet.balance) {
      alert('Insufficient balance')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/wallet/withdrawal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(withdrawalAmount),
          upiId,
          upiNumber
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowSuccess(true)
        setWithdrawalAmount('')
        setUpiId('')
        setUpiNumber('')
        fetchWalletData()
        fetchTransactions()
        
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        alert(data.error || 'Withdrawal failed')
      }
    } catch (error) {
      console.error('Withdrawal error:', error)
      alert('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'FAILED':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600'
      case 'PENDING':
        return 'text-yellow-600'
      case 'FAILED':
        return 'text-red-600'
      default:
        return 'text-gray-600'
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
          <h1 className="text-xl font-bold">My Wallet</h1>
        </div>
      </header>

      {/* Success Alert */}
      {showSuccess && (
        <div className="px-4 pt-4">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {activeTab === 'recharge' ? 'Recharge successful! 10% bonus added.' : 'Withdrawal request submitted successfully.'}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Wallet Balance */}
      <div className="px-4 py-6">
        <Card className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm">Total Balance</p>
              <p className="text-3xl font-bold">₹{wallet.balance.toLocaleString()}</p>
            </div>
            <Wallet className="w-12 h-12 text-green-200" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Bonus Balance</p>
              <p className="text-xl font-semibold">₹{wallet.bonus.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </Card>
      </div>

      {/* Recharge & Withdrawal Tabs */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="recharge" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Recharge</span>
            </TabsTrigger>
            <TabsTrigger value="withdrawal" className="flex items-center space-x-2">
              <Banknote className="w-4 h-4" />
              <span>Withdrawal</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recharge">
            <Card className="bg-white rounded-2xl p-6 shadow-lg">
              <form onSubmit={handleRecharge} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recharge-amount">Recharge Amount (₹)</Label>
                  <Input
                    id="recharge-amount"
                    type="number"
                    placeholder="Enter amount (min. ₹450)"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                    min="450"
                    step="10"
                    required
                  />
                  <p className="text-xs text-gray-500">Get 10% instant bonus on first recharge!</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference Number (UTR)</Label>
                  <Input
                    id="reference"
                    type="text"
                    placeholder="Enter UTR/reference number"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    required
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <p className="font-semibold text-blue-900">UPI Payment</p>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">Pay to UPI ID: mr.saharan1992-3@okhdfcbank</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-blue-700 font-mono">mr.saharan1992-3@okhdfcbank</p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText('mr.saharan1992-3@okhdfcbank')
                        alert('UPI ID copied!')
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Recharge Now'}
                </Button>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="withdrawal">
            <Card className="bg-white rounded-2xl p-6 shadow-lg">
              <form onSubmit={handleWithdrawal} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdrawal-amount">Withdrawal Amount (₹)</Label>
                  <Input
                    id="withdrawal-amount"
                    type="number"
                    placeholder="Enter amount (min. ₹100)"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    min="100"
                    max={wallet.balance}
                    step="10"
                    required
                  />
                  <p className="text-xs text-gray-500">Available balance: ₹{wallet.balance.toLocaleString()}</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input
                    id="upi-id"
                    type="text"
                    placeholder="your@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="upi-number">UPI Number</Label>
                  <Input
                    id="upi-number"
                    type="tel"
                    placeholder="Enter UPI linked mobile number"
                    value={upiNumber}
                    onChange={(e) => setUpiNumber(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Withdraw Now'}
                </Button>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Transaction History */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Transaction History</h2>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(transaction.status)}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {transaction.type === 'RECHARGE' ? 'Recharge' : 
                       transaction.type === 'WITHDRAWAL' ? 'Withdrawal' : 
                       transaction.type === 'BONUS' ? 'Bonus' : 'Transaction'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    transaction.type === 'RECHARGE' || transaction.type === 'BONUS' 
                      ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'RECHARGE' || transaction.type === 'BONUS' ? '+' : '-'}
                    ₹{transaction.amount.toLocaleString()}
                  </p>
                  <p className={`text-xs ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </p>
                </div>
              </div>
              {transaction.reference && (
                <p className="text-xs text-gray-400 mt-2">
                  Ref: {transaction.reference}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}