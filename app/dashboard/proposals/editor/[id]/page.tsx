"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Eye, Send, Save, Plus, Palette, DollarSign, Link, Check } from "lucide-react"
import { ProposalEditor } from "@/components/proposal-editor"
import { PricingBuilder } from "@/components/pricing-builder"
import { BrandingPanel } from "@/components/branding-panel"

const proposalSections = [
  { id: "cover", title: "Cover Letter", icon: FileText, completed: true },
  { id: "executive", title: "Executive Summary", icon: FileText, completed: true },
  { id: "scope", title: "Project Scope", icon: FileText, completed: false },
  { id: "approach", title: "Technical Approach", icon: FileText, completed: false },
  { id: "pricing", title: "Pricing", icon: DollarSign, completed: false },
  { id: "timeline", title: "Timeline", icon: FileText, completed: false },
  { id: "team", title: "Team & Experience", icon: FileText, completed: false },
  { id: "terms", title: "Terms & Conditions", icon: FileText, completed: false },
]

export default function ProposalEditorPage({ params }: { params: { id: string } }) {
  const [activeSection, setActiveSection] = useState("cover")
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit")
  const [showBranding, setShowBranding] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [requireSignature, setRequireSignature] = useState(true)
  const [publicLink, setPublicLink] = useState("")
  const [linkCopied, setLinkCopied] = useState(false)
  const [sendData, setSendData] = useState({
    clientEmail: "",
    clientName: "",
    message: "",
    subject: "Proposal for Review",
  })

  const generatePublicLink = () => {
    const link = `${window.location.origin}/proposal/${params.id}`
    setPublicLink(link)
    return link
  }

  const copyLink = async () => {
    const link = publicLink || generatePublicLink()
    await navigator.clipboard.writeText(link)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleSendProposal = async () => {
    const link = publicLink || generatePublicLink()
    // Simulate API call to send email
    console.log("Sending proposal:", { ...sendData, publicLink: link, requireSignature })
    setShowSendModal(false)
    // Show success message or redirect
  }

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b bg-background">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold">Website Redesign Proposal</h1>
              <p className="text-sm text-muted-foreground">TechCorp Inc. • Last saved 2 minutes ago</p>
            </div>
            <Badge variant="secondary">Draft</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowBranding(!showBranding)}>
              <Palette className="h-4 w-4 mr-2" />
              Branding
            </Button>
            <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "edit" ? "preview" : "edit")}>
              <Eye className="h-4 w-4 mr-2" />
              {viewMode === "edit" ? "Preview" : "Edit"}
            </Button>
            <Button variant="outline" size="sm" onClick={copyLink}>
              {linkCopied ? <Check className="h-4 w-4 mr-2" /> : <Link className="h-4 w-4 mr-2" />}
              {linkCopied ? "Copied!" : "Copy Link"}
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" onClick={() => setShowSendModal(true)}>
              <Send className="h-4 w-4 mr-2" />
              Send Proposal
            </Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Sections */}
          <div className="w-64 border-r bg-muted/30 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-medium mb-4">Proposal Sections</h3>
              <div className="space-y-1">
                {proposalSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <section.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{section.title}</span>
                    {section.completed && <div className="ml-auto h-2 w-2 rounded-full bg-green-500" />}
                  </button>
                ))}
              </div>

              <Separator className="my-4" />

              <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Add Section
              </Button>
            </div>
          </div>

          {/* Main Editor */}
          <div className="flex-1 flex">
            <div className="flex-1 overflow-y-auto">
              {activeSection === "pricing" ? (
                <PricingBuilder />
              ) : (
                <ProposalEditor section={activeSection} viewMode={viewMode} />
              )}
            </div>

            {/* Right Sidebar - Branding */}
            {showBranding && (
              <div className="w-80 border-l bg-muted/30">
                <BrandingPanel />
              </div>
            )}
          </div>
        </div>
      </div>

      {showSendModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Send Proposal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Client Name *</label>
                <input
                  type="text"
                  value={sendData.clientName}
                  onChange={(e) => setSendData((prev) => ({ ...prev, clientName: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Client Email *</label>
                <input
                  type="email"
                  value={sendData.clientEmail}
                  onChange={(e) => setSendData((prev) => ({ ...prev, clientEmail: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter client email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  value={sendData.subject}
                  onChange={(e) => setSendData((prev) => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Email subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  value={sendData.message}
                  onChange={(e) => setSendData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring h-24 resize-none"
                  placeholder="Optional message to include with the proposal"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="requireSignature"
                  checked={requireSignature}
                  onChange={(e) => setRequireSignature(e.target.checked)}
                  className="rounded border-input"
                />
                <label htmlFor="requireSignature" className="text-sm font-medium">
                  Require electronic signature
                </label>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <div className="text-sm font-medium mb-1">Public Link</div>
                <div className="text-xs text-muted-foreground break-all">{publicLink || generatePublicLink()}</div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowSendModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleSendProposal}
                  disabled={!sendData.clientName || !sendData.clientEmail}
                  className="flex-1"
                >
                  Send Proposal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  )
}
