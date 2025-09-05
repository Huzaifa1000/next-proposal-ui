"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Wand2, RefreshCw } from "lucide-react"

interface ProposalEditorProps {
  section: string
  viewMode: "edit" | "preview"
}

const sectionContent = {
  cover: {
    title: "Cover Letter",
    content: `Dear TechCorp Team,

Thank you for considering our services for your website redesign project. We are excited about the opportunity to partner with you in creating a modern, user-friendly website that will enhance your digital presence and drive business growth.

Our team has carefully reviewed your requirements and we believe our expertise in modern web development, combined with our understanding of the technology sector, makes us the ideal partner for this project.

We look forward to discussing how we can help transform your vision into reality.

Best regards,
[Your Name]
[Your Company]`,
  },
  executive: {
    title: "Executive Summary",
    content: `This proposal outlines our comprehensive approach to redesigning and developing TechCorp's website. Our solution focuses on creating a modern, responsive, and user-centric digital experience that aligns with your business objectives.

Key highlights of our proposal:
• Complete website redesign with modern UI/UX principles
• Responsive development for all devices
• Content Management System integration
• SEO optimization and performance enhancement
• 3-month timeline with phased delivery

Our team brings over 10 years of experience in web development and has successfully delivered similar projects for technology companies. We are committed to delivering exceptional results that exceed your expectations.`,
  },
  scope: {
    title: "Project Scope",
    content: `The scope of this project includes the following deliverables:

1. Discovery & Planning Phase
   - Stakeholder interviews and requirements gathering
   - Competitive analysis and market research
   - Information architecture and sitemap development
   - Technical requirements documentation

2. Design Phase
   - Wireframing and user experience design
   - Visual design and brand integration
   - Responsive design for desktop, tablet, and mobile
   - Design system and style guide creation

3. Development Phase
   - Frontend development using modern frameworks
   - Backend development and CMS integration
   - Database design and implementation
   - Third-party integrations as required

4. Testing & Launch
   - Quality assurance and cross-browser testing
   - Performance optimization
   - Security testing and implementation
   - Launch support and deployment`,
  },
}

export function ProposalEditor({ section, viewMode }: ProposalEditorProps) {
  const [content, setContent] = useState(sectionContent[section as keyof typeof sectionContent]?.content || "")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleAIGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
  }

  const handleAIImprove = async () => {
    setIsGenerating(true)
    // Simulate AI improvement
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setContent(
      (prev) => prev + "\n\n[AI-enhanced content would appear here with improved clarity and persuasive language]",
    )
    setIsGenerating(false)
  }

  if (viewMode === "preview") {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{sectionContent[section as keyof typeof sectionContent]?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              {content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* AI Suggestions Banner */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">AI Suggestions Available</p>
                <p className="text-xs text-muted-foreground">
                  Enhance this section with AI-powered content improvements
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleAIGenerate}
                disabled={isGenerating}
                className="gap-2 bg-transparent"
              >
                <Wand2 className="h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
              <Button size="sm" onClick={handleAIImprove} disabled={isGenerating} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                {isGenerating ? "Improving..." : "Improve"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{sectionContent[section as keyof typeof sectionContent]?.title}</CardTitle>
          <Badge variant="outline">{content.split(" ").length} words</Badge>
        </CardHeader>
        <CardContent>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-96 font-mono text-sm leading-relaxed resize-none"
            placeholder="Start writing your proposal content here..."
          />
        </CardContent>
      </Card>

      {/* Writing Tips */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base">Writing Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• Keep paragraphs concise and focused on one main idea</p>
            <p>• Use bullet points to break down complex information</p>
            <p>• Include specific examples and quantifiable benefits</p>
            <p>• Address the client's pain points directly</p>
            <p>• End with a clear call to action</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
