"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { baseUrl } from "@/config/constants";

// // Mock transaction data
// const transactions = [
//   {
//     id: "TX123456",
//     amount: 1250.0,
//     timestamp: "2025-05-13T10:23:45",
//     accountId: "ACC7890",
//     fraudScore: 0.12,
//     status: "legitimate",
//   },
//   {
//     id: "TX123457",
//     amount: 4999.99,
//     timestamp: "2025-05-13T09:45:12",
//     accountId: "ACC7891",
//     fraudScore: 0.87,
//     status: "fraudulent",
//   },
//   {
//     id: "TX123458",
//     amount: 350.5,
//     timestamp: "2025-05-13T08:32:01",
//     accountId: "ACC7892",
//     fraudScore: 0.05,
//     status: "legitimate",
//   },
//   {
//     id: "TX123459",
//     amount: 2100.0,
//     timestamp: "2025-05-13T07:15:33",
//     accountId: "ACC7893",
//     fraudScore: 0.65,
//     status: "suspicious",
//   },
//   {
//     id: "TX123460",
//     amount: 799.99,
//     timestamp: "2025-05-13T06:58:22",
//     accountId: "ACC7894",
//     fraudScore: 0.22,
//     status: "legitimate",
//   },
// ]

// {
//   "transaction_id": tx["id"],
//   "fraud_score": fraud_score,
//   "status": status,
//   "analysis_factors": analysis_factors,
//   "timestamp": tx["timestamp"]
// }

export default function TransactionTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(baseUrl + "/transactions");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    fetchTransactions();
  }, []);

  const getStatusBadge = (status: string, score: number) => {
    if (status === "fraudulent") {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Fraudulent ({(score * 100).toFixed(0)}%)
        </Badge>
      );
    } else if (status === "suspicious") {
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-800 flex items-center gap-1"
        >
          <AlertCircle className="h-3 w-3" />
          Suspicious ({(score * 100).toFixed(0)}%)
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 flex items-center gap-1"
        >
          <CheckCircle className="h-3 w-3" />
          Legitimate ({(score * 100).toFixed(0)}%)
        </Badge>
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          Review recent transactions and their fraud detection status
        </CardDescription>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Account</TableHead>

              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction["id"]}>
                <TableCell className="font-medium">
                  {transaction["id"]}
                </TableCell>
                <TableCell>{transaction["amount"]}</TableCell>
                <TableCell>{transaction["timestamp"]}</TableCell>
                <TableCell>{transaction['account_id']}</TableCell>

                <TableCell>
                  {getStatusBadge(
                    transaction["status"],
                    transaction["fraud_score"]
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Reviewed</DropdownMenuItem>
                      <DropdownMenuItem>Export Data</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
