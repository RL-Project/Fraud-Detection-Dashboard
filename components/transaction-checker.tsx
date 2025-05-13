"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function TransactionChecker() {
  const [amount, setAmount] = useState("")
  const [accountId, setAccountId] = useState("")
  const [transactionType, setTransactionType] = useState("purchase")
  const [location, setLocation] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<null | {
    fraudScore: number
    status: "legitimate" | "suspicious" | "fraudulent"
    reasons: string[]
  }>(null)

  const handleCheck = () => {
    setIsChecking(true)

    // Simulate API call to fraud detection system
    setTimeout(() => {
      // This is a mock implementation - in a real system, this would call your RL model
      const mockScore = calculateMockFraudScore(Number.parseFloat(amount), accountId, transactionType, location)
      let status: "legitimate" | "suspicious" | "fraudulent" = "legitimate"
      let reasons: string[] = []

      if (mockScore > 0.75) {
        status = "fraudulent"
        reasons = [
          "Transaction amount significantly higher than user average",
          "Unusual location for this account",
          "Velocity check failed (multiple transactions in short time)",
          "Pattern matches known fraud signatures",
        ]
      } else if (mockScore > 0.4) {
        status = "suspicious"
        reasons = [
          "Transaction amount higher than user average",
          "Location different from typical usage pattern",
          "Transaction type uncommon for this account",
        ]
      } else {
        reasons = [
          "Transaction amount within normal range",
          "Location consistent with user history",
          "Transaction pattern matches legitimate behavior",
        ]
      }

      setResult({
        fraudScore: mockScore,
        status,
        reasons,
      })
      setIsChecking(false)
    }, 1500)
  }

  // Mock function to simulate fraud detection
  const calculateMockFraudScore = (amount: number, accountId: string, type: string, location: string) => {
    let score = 0

    // High amounts increase fraud probability
    if (amount > 5000) score += 0.4
    else if (amount > 1000) score += 0.2

    // Certain account patterns might be flagged
    if (accountId.includes("NEW") || accountId === "") score += 0.2

    // Transaction types have different risk profiles
    if (type === "wire-transfer") score += 0.15
    if (type === "crypto") score += 0.25

    // Location-based risk
    if (location === "foreign" || location.includes("unusual")) score += 0.3

    // Add some randomness
    score += Math.random() * 0.2

    // Cap at 0.95
    return Math.min(score, 0.95)
  }

  const getScoreColor = (score: number) => {
    if (score > 0.75) return "bg-red-500"
    if (score > 0.4) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStatusBadge = (status: string) => {
    if (status === "fraudulent") {
      return (
        <div className="flex items-center gap-2 text-red-500 font-medium">
          <AlertCircle className="h-5 w-5" />
          Fraudulent Transaction Detected
        </div>
      )
    } else if (status === "suspicious") {
      return (
        <div className="flex items-center gap-2 text-yellow-500 font-medium">
          <AlertCircle className="h-5 w-5" />
          Suspicious Transaction
        </div>
      )
    } else {
      return (
        <div className="flex items-center gap-2 text-green-500 font-medium">
          <CheckCircle className="h-5 w-5" />
          Legitimate Transaction
        </div>
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Fraud Checker</CardTitle>
        <CardDescription>Check if a transaction is likely to be fraudulent</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Transaction Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="account-id">Account ID</Label>
            <Input
              id="account-id"
              placeholder="Enter account ID"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="transaction-type">Transaction Type</Label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger id="transaction-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
                <SelectItem value="wire-transfer">Wire Transfer</SelectItem>
                <SelectItem value="crypto">Crypto Exchange</SelectItem>
                <SelectItem value="recurring">Recurring Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Transaction Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domestic">Domestic</SelectItem>
                <SelectItem value="foreign">Foreign</SelectItem>
                <SelectItem value="usual">Usual Location</SelectItem>
                <SelectItem value="unusual">Unusual Location</SelectItem>
                <SelectItem value="high-risk">High-Risk Region</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {result && (
          <div className="mt-6 space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
            <div className="space-y-2">
              {getStatusBadge(result.status)}

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Fraud Score</span>
                  <span className="font-medium">{(result.fraudScore * 100).toFixed(0)}%</span>
                </div>
                <Progress value={result.fraudScore * 100} className={getScoreColor(result.fraudScore)} />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Analysis Factors:</h4>
              <ul className="space-y-1 text-sm">
                {result.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleCheck}
          disabled={isChecking || !amount || !accountId || !transactionType || !location}
          className="w-full"
        >
          {isChecking ? (
            "Analyzing Transaction..."
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Check Transaction
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
