"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock performance data
const performanceData = [
  { day: "05/07", accuracy: 0.91, precision: 0.88, recall: 0.85, f1: 0.86 },
  { day: "05/08", accuracy: 0.92, precision: 0.89, recall: 0.86, f1: 0.87 },
  { day: "05/09", accuracy: 0.93, precision: 0.9, recall: 0.87, f1: 0.88 },
  { day: "05/10", accuracy: 0.94, precision: 0.91, recall: 0.89, f1: 0.9 },
  { day: "05/11", accuracy: 0.93, precision: 0.9, recall: 0.88, f1: 0.89 },
  { day: "05/12", accuracy: 0.94, precision: 0.92, recall: 0.9, f1: 0.91 },
  { day: "05/13", accuracy: 0.95, precision: 0.93, recall: 0.91, f1: 0.92 },
]

export default function ModelPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>RL Model Performance</CardTitle>
        <CardDescription>Performance metrics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="accuracy">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
            <TabsTrigger value="precision">Precision</TabsTrigger>
            <TabsTrigger value="recall">Recall</TabsTrigger>
            <TabsTrigger value="f1">F1 Score</TabsTrigger>
          </TabsList>
          <TabsContent value="accuracy" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0.8, 1]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="precision" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0.8, 1]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="precision" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="recall" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0.8, 1]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="recall" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="f1" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0.8, 1]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="f1" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
