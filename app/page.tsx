import DashboardHeader from "@/components/dashboard-header"
import FraudMetricsCards from "@/components/fraud-metrics-cards"
import TransactionTable from "@/components/transaction-table"
import ModelPerformance from "@/components/model-performance"
import FraudDistributionChart from "@/components/fraud-distribution-chart"
import TransactionChecker from "@/components/transaction-checker"

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container mx-auto py-6 space-y-8">
        <FraudMetricsCards />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FraudDistributionChart />
          <ModelPerformance />
        </div>
        <TransactionChecker />
        <TransactionTable />
      </div>
    </main>
  )
}
