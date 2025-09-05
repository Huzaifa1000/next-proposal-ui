"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Upload, Palette, ImageIcon, Plus } from "lucide-react"

const colorPresets = [
  { name: "Primary", color: "#d97706" },
  { name: "Secondary", color: "#f59e0b" },
  { name: "Accent", color: "#059669" },
  { name: "Text", color: "#374151" },
]

const portfolioItems = [
  { id: 1, title: "E-commerce Platform", image: "/ecommerce-website-homepage.png" },
  { id: 2, title: "SaaS Dashboard", image: "/saas-dashboard-overview.png" },
  { id: 3, title: "Mobile App Design", image: "/mobile-app-design-concept.png" },
  { id: 4, title: "Brand Identity", image: "/brand-identity-design.png" },
]

export function BrandingPanel() {
  const [selectedColor, setSelectedColor] = useState("#d97706")

  return (
    <div className="p-4 space-y-6 overflow-y-auto">
      {/* Company Logo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Company Logo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Upload your logo</p>
            <p className="text-xs text-muted-foreground">PNG, JPG, SVG up to 2MB</p>
          </div>
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <Upload className="h-4 w-4 mr-2" />
            Choose File
          </Button>
        </CardContent>
      </Card>

      {/* Brand Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brand Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {colorPresets.map((preset) => (
              <div key={preset.name} className="space-y-2">
                <Label className="text-xs">{preset.name}</Label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded border cursor-pointer"
                    style={{ backgroundColor: preset.color }}
                    onClick={() => setSelectedColor(preset.color)}
                  />
                  <Input value={preset.color} className="text-xs font-mono" readOnly />
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
            <Palette className="h-4 w-4" />
            Customize Colors
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Portfolio Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Portfolio Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {portfolioItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-2 cursor-pointer hover:bg-muted/50 transition-colors">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-20 object-cover rounded mb-2"
                />
                <p className="text-xs font-medium">{item.title}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Add Portfolio Item
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2 bg-transparent">
            <ImageIcon className="h-4 w-4" />
            Insert Image
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2 bg-transparent">
            <Palette className="h-4 w-4" />
            Apply Brand Theme
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
