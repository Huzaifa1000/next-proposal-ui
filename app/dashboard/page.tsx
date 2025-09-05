import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Send, CheckCircle, Plus, TrendingUp, Clock, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your proposal activity.</p>
          </div>
          <Button size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Proposal
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Proposals</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+2</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sent Proposals</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+5</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Viewed Proposals</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">85.7%</span> open rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Won Proposals</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">33.3%</span> win rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Proposals</CardTitle>
              <CardDescription>Your latest proposal activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Website Redesign Proposal</p>
                    <p className="text-xs text-muted-foreground">TechCorp Inc.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Draft</Badge>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
              </div>

              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <Send className="h-4 w-4 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Mobile App Development</p>
                    <p className="text-xs text-muted-foreground">StartupXYZ</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Sent</Badge>
                  <span className="text-xs text-muted-foreground">1d ago</span>
                </div>
              </div>

              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">E-commerce Platform</p>
                    <p className="text-xs text-muted-foreground">RetailCo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Won</Badge>
                  <span className="text-xs text-muted-foreground">3d ago</span>
                </div>
              </div>

              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Brand Identity Package</p>
                    <p className="text-xs text-muted-foreground">CreativeAgency</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Viewed</Badge>
                  <span className="text-xs text-muted-foreground">5d ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Key metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Average Response Time</p>
                    <p className="text-xs text-muted-foreground">Time to first client response</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">2.3 days</p>
                  <p className="text-xs text-green-600">-0.5d from last month</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Avg. Proposal Value</p>
                    <p className="text-xs text-muted-foreground">Average project value</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">$12,500</p>
                  <p className="text-xs text-green-600">+$2,100 from last month</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Active Clients</p>
                    <p className="text-xs text-muted-foreground">Clients with ongoing projects</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">15</p>
                  <p className="text-xs text-green-600">+3 from last month</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full bg-transparent">
                  View Detailed Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
