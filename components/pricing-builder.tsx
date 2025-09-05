"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, Sparkles, TrendingUp } from "lucide-react"

interface PricingItem {
  id: string
  description: string
  quantity: number
  rate: number
  total: number
}

export function PricingBuilder() {
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([
    {
      id: "1",
      description: "Website Design & UX/UI",
      quantity: 1,
      rate: 8500,
      total: 8500,
    },
    {
      id: "2",
      description: "Frontend Development",
      quantity: 1,
      rate: 6000,
      total: 6000,
    },
    {
      id: "3",
      description: "Backend Development & CMS",
      quantity: 1,
      rate: 4500,
      total: 4500,
    },
    {
      id: "4",
      description: "Testing & Quality Assurance",
      quantity: 1,
      rate: 2000,
      total: 2000,
    },
  ])

  const subtotal = pricingItems.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  const addPricingItem = () => {
    const newItem: PricingItem = {
      id: Date.now().toString(),
      description: "New Service",
      quantity: 1,
      rate: 0,
      total: 0,
    }
    setPricingItems([...pricingItems, newItem])
  }

  const updatePricingItem = (id: string, field: keyof PricingItem, value: string | number) => {
    setPricingItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === "quantity" || field === "rate") {
            updated.total = updated.quantity * updated.rate
          }
          return updated
        }
        return item
      }),
    )
  }

  const removePricingItem = (id: string) => {
    setPricingItems((items) => items.filter((item) => item.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      {/* AI Pricing Suggestions */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Smart Pricing Insights</p>
                <p className="text-xs text-muted-foreground">
                  Based on similar projects, consider increasing design rate by 15%
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Sparkles className="h-4 w-4" />
              Apply Suggestion
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Project Pricing</CardTitle>
          <Button onClick={addPricingItem} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-5">Description</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Rate</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-1"></div>
            </div>

            <Separator />

            {/* Pricing Items */}
            {pricingItems.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5">
                  <Input
                    value={item.description}
                    onChange={(e) => updatePricingItem(item.id, "description", e.target.value)}
                    className="border-0 p-0 h-auto font-medium focus-visible:ring-0"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updatePricingItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)}
                    className="text-center"
                  />
                </div>
                <div className="col-span-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updatePricingItem(item.id, "rate", Number.parseFloat(e.target.value) || 0)}
                      className="pl-7"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="font-medium">${item.total.toLocaleString()}</div>
                </div>
                <div className="col-span-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePricingItem(item.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Separator />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span className="font-medium">${tax.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">50%</div>
              <div className="text-sm text-muted-foreground">Project Start</div>
              <div className="font-medium">${(total * 0.5).toLocaleString()}</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">30%</div>
              <div className="text-sm text-muted-foreground">Milestone 1</div>
              <div className="font-medium">${(total * 0.3).toLocaleString()}</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">20%</div>
              <div className="text-sm text-muted-foreground">Project Completion</div>
              <div className="font-medium">${(total * 0.2).toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
