"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowUpRight,
  DollarSign,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { baseUrl } from "@/config/constants";

export default function FraudMetricsCards() {
  const [transactionMetrics, setTransactionMetrics] = useState({
    total_transactions: 0,
    fraud_detected: 0,
    detection_rate: 0,
    false_positives: 0,
    updated_at: (new Date()).toISOString(),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(baseUrl + "/metrics/dashboard");
        const data = await response.json();
        setTransactionMetrics(data);
      } catch (error) {
        console.error("Error fetching transactions processed:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Transactions Processed
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{transactionMetrics['total_transactions']}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.5% from last week
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fraud Detected</CardTitle>
          <ShieldAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{transactionMetrics['fraud_detected']}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-500 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              +4.3% from last week
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{transactionMetrics['detection_rate']}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              +2.1% from last month
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">False Positives</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{transactionMetrics['false_positives']}%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 flex items-center">
              <TrendingDown className="mr-1 h-3 w-3" />
              -0.5% from last month
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
