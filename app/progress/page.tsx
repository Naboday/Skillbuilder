"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { domains, getCompletedModulesByDomain, getUserProgressStats } from "@/lib/data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function ProgressPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [domainProgress, setDomainProgress] = useState<any[]>([])
  const [overallStats, setOverallStats] = useState<any>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }

    if (user) {
      // Get domain progress data
      const domainCompletionData = getCompletedModulesByDomain(user.id)
      const domainProgressData = domains.map((domain) => ({
        name: domain.name,
        completed: domainCompletionData[domain.id].completed,
        total: domainCompletionData[domain.id].total,
        percentage:
          domainCompletionData[domain.id].total > 0
            ? Math.round((domainCompletionData[domain.id].completed / domainCompletionData[domain.id].total) * 100)
            : 0,
      }))
      setDomainProgress(domainProgressData)

      // Get overall progress stats
      setOverallStats(getUserProgressStats(user.id))
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  // Data for pie chart
  const pieData = [
    { name: "Completed", value: overallStats?.completedModules || 0, color: "#4ade80" },
    { name: "In Progress", value: overallStats?.inProgressModules || 0, color: "#facc15" },
    { name: "Not Started", value: overallStats?.notStartedModules || 0, color: "#94a3b8" },
  ]

  // Colors for the bar chart
  const COLORS = ["#4ade80", "#94a3b8"]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <section>
            <h1 className="text-3xl font-bold mb-2">Progress Report</h1>
            <p className="text-muted-foreground">Track your learning journey and see your achievements</p>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Overall Completion</CardTitle>
                <CardDescription>Your progress across all domains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Completion</span>
                    <span className="text-sm font-medium">{overallStats?.completionPercentage || 0}%</span>
                  </div>
                  <Progress value={overallStats?.completionPercentage || 0} className="h-2" />
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Completed: {overallStats?.completedModules || 0} modules</p>
                    <p>In Progress: {overallStats?.inProgressModules || 0} modules</p>
                    <p>Not Started: {overallStats?.notStartedModules || 0} modules</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Progress Distribution</CardTitle>
                <CardDescription>Visual breakdown of your learning progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Domain Progress</CardTitle>
                <CardDescription>Your progress in each learning domain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={domainProgress} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [
                          value,
                          name === "completed" ? "Completed Modules" : "Total Modules",
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="completed" name="Completed Modules" fill="#4ade80" />
                      <Bar dataKey="total" name="Total Modules" fill="#94a3b8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-4">
                  {domainProgress.map((domain) => (
                    <div key={domain.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{domain.name}</span>
                        <span className="text-sm">
                          {domain.completed} of {domain.total} modules ({domain.percentage}%)
                        </span>
                      </div>
                      <Progress value={domain.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
