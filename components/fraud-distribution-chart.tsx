"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { baseUrl } from "@/config/constants"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { getValueByDataKey } from "recharts/types/util/ChartUtils"

// // Mock fraud distribution data
// const fraudDistributionData = [
//   { name: "Legitimate", value: 12250, color: "#10b981" },
//   { name: "Suspicious", value: 1350, color: "#f59e0b" },
//   { name: "Fraudulent", value: 237, color: "#ef4444" },
// ]


export default function FraudDistributionChart() {
  const [fraudDistributionData, setFraudDistributionData] = useState([
    { name: "Legitimate", value: 0, color: "#10b981" },
    { name: "Suspicious", value: 0, color: "#f59e0b" },
    { name: "Fraudulent", value: 0, color: "#ef4444" },
  ])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error|null>()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(baseUrl + "/metrics/transaction-distribution")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        const newData = [
          { name: "Legitimate", value: data["legitimate"], color: "#10b981" },
          { name: "Suspicious", value: data["suspicous"], color: "#f59e0b" },
          { name: "Fraudulent", value: data["fraudulent"], color: "#ef4444" }
        ]

        setFraudDistributionData(newData)
      } catch (error) {
        setError(error as Error)
        console.error("Error fetching fraud distribution data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Distribution</CardTitle>
        <CardDescription>Breakdown of transaction classifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fraudDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {fraudDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} transactions`, "Count"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
