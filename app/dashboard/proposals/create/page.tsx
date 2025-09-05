"use client"

import type React from "react"
import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Real Estate",
  "Marketing & Advertising",
  "Consulting",
  "Other",
]

const budgetRanges = ["Under $5,000", "$5,000 - $15,000", "$15,000 - $50,000", "$50,000 - $100,000", "Over $100,000"]

const timelines = ["1-2 weeks", "3-4 weeks", "1-2 months", "3-6 months", "6+ months"]

export default function CreateProposalPage() {
  const [rfpFile, setRfpFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    industry: "",
    projectTitle: "",
    services: "",
    budget: "",
    timeline: "",
    additionalNotes: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setRfpFile(file)
      // Simulate AI analysis
      setIsAnalyzing(true)
      setTimeout(() => {
        setIsAnalyzing(false)
        // Auto-populate some fields based on "AI analysis"
        setFormData((prev) => ({
          ...prev,
          projectTitle: "Website Redesign & Development",
          services: "Complete website redesign with modern UI/UX, responsive development, and CMS integration",
          industry: "Technology",
        }))
      }, 3000)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.clientName || formData.clientName.length < 2) {
      newErrors.clientName = "Client name must be at least 2 characters"
    }
    if (!formData.clientEmail || !/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = "Please enter a valid email address"
    }
    if (!formData.industry) {
      newErrors.industry = "Please select an industry"
    }
    if (!formData.projectTitle || formData.projectTitle.length < 5) {
      newErrors.projectTitle = "Project title must be at least 5 characters"
    }
    if (!formData.services || formData.services.length < 10) {
      newErrors.services = "Please describe the services needed"
    }
    if (!formData.budget) {
      newErrors.budget = "Please select a budget range"
    }
    if (!formData.timeline) {
      newErrors.timeline = "Please select a timeline"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Create proposal data:", formData)
    setIsLoading(false)
    // Navigate to editor
    router.push("/dashboard/proposals/editor/1")
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Proposal</h1>
          <p className="text-muted-foreground">
            Upload your RFP and provide project details to get started with AI-powered proposal generation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* RFP Upload */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload RFP
                </CardTitle>
                <CardDescription>
                  Upload your RFP document for AI analysis and automatic field population.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                    onClick={() => document.getElementById("rfp-upload")?.click()}
                  >
                    <input
                      id="rfp-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    {rfpFile ? (
                      <div className="space-y-2">
                        <FileText className="h-8 w-8 text-primary mx-auto" />
                        <p className="text-sm font-medium">{rfpFile.name}</p>
                        <p className="text-xs text-muted-foreground">{(rfpFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                        <p className="text-sm font-medium">Drop your RFP here</p>
                        <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, or TXT files</p>
                      </div>
                    )}
                  </div>

                  {isAnalyzing && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Sparkles className="h-4 w-4 animate-pulse" />
                      Analyzing RFP with AI...
                    </div>
                  )}

                  {rfpFile && !isAnalyzing && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Sparkles className="h-4 w-4" />
                      Analysis complete! Fields auto-populated.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Details Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>Provide information about your client and project requirements.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Client Name
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Corporation"
                        value={formData.clientName}
                        onChange={(e) => handleInputChange("clientName", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {errors.clientName && <p className="text-sm font-medium text-destructive">{errors.clientName}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Client Email
                      </label>
                      <input
                        type="email"
                        placeholder="contact@acme.com"
                        value={formData.clientEmail}
                        onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {errors.clientEmail && (
                        <p className="text-sm font-medium text-destructive">{errors.clientEmail}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Industry
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => handleInputChange("industry", e.target.value)}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select industry</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                      {errors.industry && <p className="text-sm font-medium text-destructive">{errors.industry}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                      {errors.budget && <p className="text-sm font-medium text-destructive">{errors.budget}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Project Title
                    </label>
                    <input
                      type="text"
                      placeholder="Website Redesign & Development"
                      value={formData.projectTitle}
                      onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.projectTitle && (
                      <p className="text-sm font-medium text-destructive">{errors.projectTitle}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Services Required
                    </label>
                    <textarea
                      placeholder="Describe the services and deliverables needed for this project..."
                      value={formData.services}
                      onChange={(e) => handleInputChange("services", e.target.value)}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.services && <p className="text-sm font-medium text-destructive">{errors.services}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Project Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange("timeline", e.target.value)}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                    {errors.timeline && <p className="text-sm font-medium text-destructive">{errors.timeline}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      placeholder="Any additional requirements, constraints, or notes..."
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading} className="gap-2">
                      {isLoading ? "Creating..." : "Continue to Editor"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
