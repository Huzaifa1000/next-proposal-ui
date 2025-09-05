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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Star, Download, Eye } from "lucide-react"

const templates = [
  {
    id: 1,
    title: "Website Development Proposal",
    description: "Complete template for web development projects including design, development, and deployment.",
    category: "Web Development",
    rating: 4.8,
    downloads: 1250,
    preview: "/website-development-template.png",
    tags: ["responsive", "modern", "professional"],
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Comprehensive template for mobile app projects covering iOS, Android, and cross-platform solutions.",
    category: "Mobile Development",
    rating: 4.9,
    downloads: 980,
    preview: "/mobile-app-template.png",
    tags: ["mobile", "cross-platform", "native"],
  },
  {
    id: 3,
    title: "Digital Marketing Campaign",
    description: "Template for digital marketing proposals including SEO, social media, and content marketing.",
    category: "Marketing",
    rating: 4.7,
    downloads: 750,
    preview: "/digital-marketing-template.png",
    tags: ["seo", "social media", "content"],
  },
  {
    id: 4,
    title: "Brand Identity Design",
    description: "Complete branding package template including logo design, brand guidelines, and collateral.",
    category: "Design",
    rating: 4.6,
    downloads: 650,
    preview: "/brand-identity-template.png",
    tags: ["branding", "logo", "guidelines"],
  },
  {
    id: 5,
    title: "E-commerce Platform",
    description: "Template for e-commerce development proposals with payment integration and inventory management.",
    category: "Web Development",
    rating: 4.5,
    downloads: 890,
    preview: "/website-development-template.png",
    tags: ["e-commerce", "payment", "inventory"],
  },
  {
    id: 6,
    title: "Consulting Services",
    description: "Professional template for consulting proposals with detailed methodology and deliverables.",
    category: "Consulting",
    rating: 4.4,
    downloads: 420,
    preview: "/digital-marketing-template.png",
    tags: ["consulting", "methodology", "strategy"],
  },
]

export default function TemplatesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [previewTemplate, setPreviewTemplate] = useState<(typeof templates)[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredTemplates = templates
    .filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = categoryFilter === "all" || template.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.downloads - a.downloads
        case "rating":
          return b.rating - a.rating
        case "alphabetical":
          return a.title.localeCompare(b.title)
        case "recent":
          return b.id - a.id
        default:
          return 0
      }
    })

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + itemsPerPage)

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    switch (filterType) {
      case "search":
        setSearchTerm(value)
        break
      case "category":
        setCategoryFilter(value)
        break
      case "sort":
        setSortBy(value)
        break
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
            <p className="text-muted-foreground">
              Browse and use professional proposal templates to speed up your workflow.
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Template
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

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
              <SelectItem value="Consulting">Consulting</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value) => handleFilterChange("sort", value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTemplates.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No templates found matching your criteria.</p>
              </div>
            ) : (
              paginatedTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={template.preview || "/placeholder.svg"}
                      alt={template.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">{template.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {template.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Download className="h-4 w-4" />
                        {template.downloads}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                            <Eye className="h-4 w-4" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                          <DialogHeader>
                            <DialogTitle>{template.title}</DialogTitle>
                            <DialogDescription>{template.description}</DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <img
                              src={template.preview || "/placeholder.svg"}
                              alt={`${template.title} preview`}
                              className="w-full rounded-lg border"
                            />
                            <div className="mt-4 space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Template Features:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {template.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center justify-between pt-4 border-t">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-primary text-primary" />
                                    <span className="font-medium">{template.rating}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Download className="h-4 w-4" />
                                    <span>{template.downloads} downloads</span>
                                  </div>
                                </div>
                                <Button onClick={() => handleFilterChange("use", template.id.toString())}>
                                  Use This Template
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleFilterChange("use", template.id.toString())}
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTemplates.length)} of{" "}
                {filteredTemplates.length} templates
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
        </div>
      </div>
    </DashboardLayout>
  )
}
