"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Link,
  Copy,
  Check,
  PenTool,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const proposals = [
  {
    id: 1,
    title: "Website Redesign Proposal",
    client: "TechCorp Inc.",
    status: "draft",
    value: 15000,
    lastModified: "2 hours ago",
    createdAt: "2024-01-15",
    category: "Web Development",
    publicLink: `${typeof window !== "undefined" ? window.location.origin : ""}/proposal/1`,
    requiresSignature: true,
    signedAt: null,
    signedBy: null,
  },
  {
    id: 2,
    title: "Mobile App Development",
    client: "StartupXYZ",
    status: "sent",
    value: 25000,
    lastModified: "1 day ago",
    createdAt: "2024-01-14",
    category: "Mobile Development",
    publicLink: `${typeof window !== "undefined" ? window.location.origin : ""}/proposal/2`,
    requiresSignature: true,
    signedAt: null,
    signedBy: null,
  },
  {
    id: 3,
    title: "E-commerce Platform",
    client: "RetailCo",
    status: "won",
    value: 35000,
    lastModified: "3 days ago",
    createdAt: "2024-01-12",
    category: "Web Development",
    publicLink: `${typeof window !== "undefined" ? window.location.origin : ""}/proposal/3`,
    requiresSignature: true,
    signedAt: "2024-01-13T10:30:00Z",
    signedBy: "John Smith",
  },
  {
    id: 4,
    title: "Brand Identity Package",
    client: "CreativeAgency",
    status: "viewed",
    value: 8500,
    lastModified: "5 days ago",
    createdAt: "2024-01-10",
    category: "Design",
    publicLink: `${typeof window !== "undefined" ? window.location.origin : ""}/proposal/4`,
    requiresSignature: false,
    signedAt: null,
    signedBy: null,
  },
  {
    id: 5,
    title: "Digital Marketing Strategy",
    client: "GrowthCorp",
    status: "sent",
    value: 12000,
    lastModified: "1 week ago",
    createdAt: "2024-01-08",
    category: "Marketing",
    publicLink: `${typeof window !== "undefined" ? window.location.origin : ""}/proposal/5`,
    requiresSignature: true,
    signedAt: null,
    signedBy: null,
  },
  {
    id: 6,
    title: "SaaS Platform Development",
    client: "TechStartup",
    status: "lost",
    value: 45000,
    lastModified: "2 weeks ago",
    createdAt: "2024-01-01",
    category: "Web Development",
    publicLink: `${typeof window !== "undefined" ? window.location.origin : ""}/proposal/6`,
    requiresSignature: true,
    signedAt: null,
    signedBy: null,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "draft":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    case "sent":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "viewed":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100"
    case "won":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "lost":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export default function ProposalsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [copiedLinks, setCopiedLinks] = useState<{ [key: number]: boolean }>({})
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredProposals = proposals
    .filter((proposal) => {
      const matchesSearch =
        proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.client.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || proposal.status === statusFilter
      const matchesCategory = categoryFilter === "all" || proposal.category === categoryFilter
      return matchesSearch && matchesStatus && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "value-high":
          return b.value - a.value
        case "value-low":
          return a.value - b.value
        case "alphabetical":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProposals = filteredProposals.slice(startIndex, startIndex + itemsPerPage)

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    switch (filterType) {
      case "search":
        setSearchTerm(value)
        break
      case "status":
        setStatusFilter(value)
        break
      case "category":
        setCategoryFilter(value)
        break
      case "sort":
        setSortBy(value)
        break
    }
  }

  const copyPublicLink = async (proposal: (typeof proposals)[0]) => {
    await navigator.clipboard.writeText(proposal.publicLink)
    setCopiedLinks((prev) => ({ ...prev, [proposal.id]: true }))
    setTimeout(() => {
      setCopiedLinks((prev) => ({ ...prev, [proposal.id]: false }))
    }, 2000)
  }

  const handleViewProposal = (id: number) => {
    router.push(`/dashboard/proposals/${id}/view`)
  }

  const handleEditProposal = (id: number) => {
    router.push(`/dashboard/proposals/editor/${id}`)
  }

  const handleCreateProposal = () => {
    router.push("/dashboard/proposals/create")
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Proposals</h1>
            <p className="text-muted-foreground">Manage and track all your proposals in one place.</p>
          </div>
          <Button size="lg" className="gap-2" onClick={handleCreateProposal}>
            <Plus className="h-4 w-4" />
            Create Proposal
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search proposals..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="viewed">Viewed</SelectItem>
              <SelectItem value="won">Won</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Web Development">Web Development</SelectItem>
              <SelectItem value="Mobile Development">Mobile Development</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value) => handleFilterChange("sort", value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="value-high">Value (High)</SelectItem>
              <SelectItem value="value-low">Value (Low)</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Proposals</span>
              </div>
              <p className="text-2xl font-bold mt-2">{proposals.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Value</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                ${proposals.reduce((sum, p) => sum + p.value, 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <PenTool className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Signed</span>
              </div>
              <p className="text-2xl font-bold mt-2">{proposals.filter((p) => p.signedAt).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">This Month</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {proposals.filter((p) => new Date(p.createdAt).getMonth() === new Date().getMonth()).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Proposals List */}
        <Card>
          <CardHeader>
            <CardTitle>All Proposals ({filteredProposals.length})</CardTitle>
            <CardDescription>A list of all your proposals including their current status and details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paginatedProposals.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No proposals found matching your criteria.</p>
                </div>
              ) : (
                paginatedProposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{proposal.title}</h3>
                        <p className="text-sm text-muted-foreground">{proposal.client}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {proposal.category}
                          </Badge>
                          {proposal.requiresSignature && (
                            <Badge variant={proposal.signedAt ? "default" : "secondary"} className="text-xs">
                              {proposal.signedAt ? "Signed" : "Signature Required"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(proposal.status)}>
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </Badge>
                      <div className="text-right">
                        <p className="font-medium">${proposal.value.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{proposal.lastModified}</p>
                        {proposal.signedAt && <p className="text-xs text-green-600">Signed by {proposal.signedBy}</p>}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => copyPublicLink(proposal)} className="h-8 w-8">
                        {copiedLinks[proposal.id] ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Link className="h-4 w-4" />
                        )}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewProposal(proposal.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditProposal(proposal.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => copyPublicLink(proposal)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Public Link
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProposals.length)} of{" "}
                  {filteredProposals.length} proposals
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
