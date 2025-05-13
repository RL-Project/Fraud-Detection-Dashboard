"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Mock fraud distribution data
const fraudDistributionData = [
  { name: "Legitimate", value: 12250, color: "#10b981" },
  { name: "Suspicious", value: 1350, color: "#f59e0b" },
  { name: "Fraudulent", value: 237, color: "#ef4444" },
]

export default function FraudDistributionChart() {
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
