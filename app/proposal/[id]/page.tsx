"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, FileText, DollarSign, Calendar, Building, Mail, Phone } from "lucide-react"

// Mock proposal data - in real app, this would come from API
const mockProposal = {
  id: "1",
  title: "Website Development Project",
  client: {
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
  },
  status: "sent",
  totalAmount: 15000,
  timeline: "8-10 weeks",
  createdAt: "2024-01-15",
  sections: {
    coverLetter:
      "We are excited to propose a comprehensive website development solution for Acme Corporation. Our team will deliver a modern, responsive website that meets your business objectives.",
    scope: [
      "Custom website design and development",
      "Responsive mobile optimization",
      "Content management system integration",
      "SEO optimization",
      "Performance optimization",
      "Security implementation",
    ],
    pricing: [
      { item: "Website Design & Development", quantity: 1, rate: 8000, total: 8000 },
      { item: "CMS Integration", quantity: 1, rate: 3000, total: 3000 },
      { item: "SEO Optimization", quantity: 1, rate: 2000, total: 2000 },
      { item: "Testing & Launch", quantity: 1, rate: 2000, total: 2000 },
    ],
    terms:
      "50% deposit required to begin work. Final payment due upon project completion. All work includes 30-day warranty period.",
  },
  requiresSignature: true,
  signedAt: null,
  signedBy: null,
}

export default function PublicProposalPage() {
  const params = useParams()
  const [proposal, setProposal] = useState(mockProposal)
  const [isLoading, setIsLoading] = useState(false)
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [signatureData, setSignatureData] = useState({
    name: "",
    email: "",
    title: "",
    date: new Date().toISOString().split("T")[0],
  })

  const handleSignProposal = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setProposal((prev) => ({
        ...prev,
        signedAt: new Date().toISOString(),
        signedBy: signatureData.name,
        status: "accepted",
      }))
      setShowSignatureModal(false)
      setIsLoading(false)
    }, 2000)
  }

  const totalAmount = proposal.sections.pricing.reduce((sum, item) => sum + item.total, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">ProposalAI</h1>
                <p className="text-sm text-muted-foreground">Proposal Review</p>
              </div>
            </div>
            <Badge variant={proposal.status === "accepted" ? "default" : "secondary"}>
              {proposal.status === "accepted" ? "Accepted" : "Pending Review"}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Proposal Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl mb-2">{proposal.title}</CardTitle>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {proposal.client.company}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {proposal.timeline}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />${totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
              {proposal.signedAt && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <div className="text-sm">
                    <div className="font-medium">Signed by {proposal.signedBy}</div>
                    <div className="text-muted-foreground">{new Date(proposal.signedAt).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Cover Letter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cover Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{proposal.sections.coverLetter}</p>
          </CardContent>
        </Card>

        {/* Scope of Work */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scope of Work</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {proposal.sections.scope.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pricing Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proposal.sections.pricing.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <div className="font-medium">{item.item}</div>
                    <div className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × ${item.rate.toLocaleString()}
                    </div>
                  </div>
                  <div className="font-medium">${item.total.toLocaleString()}</div>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center py-2 text-lg font-semibold">
                <span>Total</span>
                <span>${totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms & Conditions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{proposal.sections.terms}</p>
          </CardContent>
        </Card>

        {/* Signature Section */}
        {proposal.requiresSignature && !proposal.signedAt && (
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                Electronic Signature Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                To accept this proposal, please provide your electronic signature below.
              </p>
              <Button onClick={() => setShowSignatureModal(true)} className="w-full md:w-auto">
                Review & Sign Proposal
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Questions?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this proposal, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>hello@proposalai.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Electronic Signature</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  value={signatureData.name}
                  onChange={(e) => setSignatureData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  value={signatureData.email}
                  onChange={(e) => setSignatureData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title/Position</label>
                <input
                  type="text"
                  value={signatureData.title}
                  onChange={(e) => setSignatureData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your title or position"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={signatureData.date}
                  onChange={(e) => setSignatureData((prev) => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="bg-muted p-3 rounded-md text-sm text-muted-foreground">
                By signing this proposal, you agree to the terms and conditions outlined above.
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowSignatureModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleSignProposal}
                  disabled={!signatureData.name || !signatureData.email || isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Signing..." : "Sign Proposal"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
