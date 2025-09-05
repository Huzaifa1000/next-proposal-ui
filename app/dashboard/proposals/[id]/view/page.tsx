"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Eye,
  Download,
  Share2,
  Edit,
  Clock,
  DollarSign,
  Calendar,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Users,
  Target,
} from "lucide-react"

// Mock proposal data
const proposalData = {
  id: "1",
  title: "Website Redesign & Development",
  client: {
    name: "TechCorp Solutions",
    email: "contact@techcorp.com",
    phone: "+1 (555) 987-6543",
    address: "456 Business Ave, New York, NY 10001",
  },
  status: "sent",
  createdAt: "2024-01-15",
  sentAt: "2024-01-16",
  viewedAt: "2024-01-17",
  totalValue: 45000,
  sections: {
    coverLetter:
      "We're excited to propose a comprehensive website redesign that will transform your digital presence...",
    executiveSummary:
      "This proposal outlines a complete website redesign and development project for TechCorp Solutions...",
    projectScope: "Our team will deliver a modern, responsive website with enhanced user experience...",
    timeline: "The project will be completed in 3 phases over 12 weeks...",
    pricing: [
      { item: "UI/UX Design", description: "Complete website design and user experience", price: 15000 },
      { item: "Frontend Development", description: "Responsive website development", price: 20000 },
      { item: "Backend Integration", description: "CMS and database setup", price: 8000 },
      { item: "Testing & Launch", description: "Quality assurance and deployment", price: 2000 },
    ],
    team: "Our experienced team includes senior designers, developers, and project managers...",
  },
  analytics: {
    views: 12,
    timeSpent: "8m 32s",
    sectionsViewed: {
      coverLetter: 100,
      executiveSummary: 85,
      projectScope: 92,
      pricing: 100,
      timeline: 78,
      team: 45,
    },
  },
}

export default function ProposalViewPage() {
  const params = useParams()
  const router = useRouter()
  const [activeView, setActiveView] = useState<"proposal" | "analytics">("proposal")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "secondary"
      case "sent":
        return "default"
      case "viewed":
        return "outline"
      case "won":
        return "default"
      case "lost":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{proposalData.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant={getStatusColor(proposalData.status)} className="capitalize">
                {proposalData.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Created on {new Date(proposalData.createdAt).toLocaleDateString()}
              </span>
              {proposalData.viewedAt && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  Last viewed {new Date(proposalData.viewedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={activeView === "proposal" ? "default" : "outline"}
              onClick={() => setActiveView("proposal")}
              size="sm"
            >
              <FileText className="h-4 w-4 mr-2" />
              Proposal
            </Button>
            <Button
              variant={activeView === "analytics" ? "default" : "outline"}
              onClick={() => setActiveView("analytics")}
              size="sm"
            >
              <Target className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={() => router.push(`/dashboard/proposals/editor/${params.id}`)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        {activeView === "proposal" ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cover Letter */}
              <Card>
                <CardHeader>
                  <CardTitle>Cover Letter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{proposalData.sections.coverLetter}</p>
                </CardContent>
              </Card>

              {/* Executive Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{proposalData.sections.executiveSummary}</p>
                </CardContent>
              </Card>

              {/* Project Scope */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Scope</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{proposalData.sections.projectScope}</p>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Pricing Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {proposalData.sections.pricing.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.item}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <p className="font-semibold">${item.price.toLocaleString()}</p>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total Project Value</span>
                      <span>${proposalData.totalValue.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Project Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{proposalData.sections.timeline}</p>
                </CardContent>
              </Card>

              {/* Team */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Our Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{proposalData.sections.team}</p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Client Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Client Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{proposalData.client.name}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{proposalData.client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{proposalData.client.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <span>{proposalData.client.address}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Views</span>
                    <span className="font-medium">{proposalData.analytics.views}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time Spent</span>
                    <span className="font-medium">{proposalData.analytics.timeSpent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Project Value</span>
                    <span className="font-medium">${proposalData.totalValue.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Analytics View */
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{proposalData.analytics.views}</div>
                  <p className="text-xs text-muted-foreground">Unique proposal views</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{proposalData.analytics.timeSpent}</div>
                  <p className="text-xs text-muted-foreground">Average reading time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">Overall engagement score</p>
                </CardContent>
              </Card>
            </div>

            {/* Section Engagement */}
            <Card>
              <CardHeader>
                <CardTitle>Section Engagement</CardTitle>
                <CardDescription>How much time clients spent on each section</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(proposalData.analytics.sectionsViewed).map(([section, percentage]) => (
                    <div key={section} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">
                          {section.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="text-sm text-muted-foreground">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
