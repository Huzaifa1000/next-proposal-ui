"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, Eye, Mail, Clock, Target, Lightbulb, ArrowUpRight } from "lucide-react"

const monthlyData = [
  { month: "Jan", proposals: 12, won: 4, sent: 10, viewed: 8 },
  { month: "Feb", proposals: 15, won: 6, sent: 13, viewed: 11 },
  { month: "Mar", proposals: 18, won: 7, sent: 16, viewed: 14 },
  { month: "Apr", proposals: 22, won: 9, sent: 20, viewed: 18 },
  { month: "May", proposals: 28, won: 12, sent: 25, viewed: 22 },
  { month: "Jun", proposals: 24, won: 8, sent: 22, viewed: 19 },
]

const proposalStatusData = [
  { name: "Won", value: 46, color: "#10b981" },
  { name: "In Progress", value: 32, color: "#f59e0b" },
  { name: "Lost", value: 22, color: "#ef4444" },
]

const sectionEngagementData = [
  { section: "Cover Letter", views: 95, avgTime: "2.3m" },
  { section: "Executive Summary", views: 88, avgTime: "3.1m" },
  { section: "Project Scope", views: 76, avgTime: "4.2m" },
  { section: "Pricing", views: 92, avgTime: "5.8m" },
  { section: "Timeline", views: 68, avgTime: "2.1m" },
  { section: "Team", views: 54, avgTime: "1.9m" },
]

const chartConfig = {
  proposals: { label: "Proposals", color: "#d97706" },
  won: { label: "Won", color: "#10b981" },
  sent: { label: "Sent", color: "#3b82f6" },
  viewed: { label: "Viewed", color: "#f59e0b" },
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your proposal performance and get insights to improve your win rate.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85.7%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">+5.2%</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">33.3%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">+2.1%</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3 days</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">-0.5d</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$187,500</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">+12.5%</span> from last month
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Proposal Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Proposal Performance</CardTitle>
              <CardDescription>Monthly proposal activity and success rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="proposals" fill="var(--color-proposals)" radius={4} />
                  <Bar dataKey="won" fill="var(--color-won)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Proposal Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Proposal Status Distribution</CardTitle>
              <CardDescription>Current status of all proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <PieChart>
                  <Pie
                    data={proposalStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {proposalStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="flex justify-center gap-6 mt-4">
                {proposalStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Engagement Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Section Engagement Heatmap</CardTitle>
            <CardDescription>How clients interact with different sections of your proposals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectionEngagementData.map((section) => (
                <div key={section.section} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{section.section}</span>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{section.views}% viewed</span>
                        <span>Avg. {section.avgTime}</span>
                      </div>
                    </div>
                    <Progress value={section.views} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Tips Panel */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              AI-Powered Insights
            </CardTitle>
            <CardDescription>Personalized recommendations to improve your proposal performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-background rounded-lg border">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="font-medium text-sm">Optimize your pricing section</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Proposals with detailed pricing breakdowns have a 23% higher win rate. Consider adding more granular
                  line items.
                </p>
              </div>
              <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                Apply
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-start gap-3 p-4 bg-background rounded-lg border">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="font-medium text-sm">Improve response time</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your average response time is 2.3 days. Proposals sent within 24 hours have a 40% higher success rate.
                </p>
              </div>
              <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                Learn More
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-start gap-3 p-4 bg-background rounded-lg border">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="font-medium text-sm">Enhance team section engagement</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your team section has the lowest engagement (54%). Adding client testimonials could increase views by
                  30%.
                </p>
              </div>
              <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                Add Testimonials
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
