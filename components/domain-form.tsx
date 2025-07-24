"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { addDomain } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export function DomainForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Add the new domain
      addDomain(name, description || null)

      toast({
        title: "Domain added",
        description: "The new domain has been added successfully.",
      })

      // Reset form
      setName("")
      setDescription("")

      // Refresh the page to show the new domain
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while adding the domain.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Add New Domain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Domain Name</Label>
            <Input
              id="name"
              placeholder="e.g., Cloud Computing"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what learners will gain from this domain..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading || !name.trim()}>
            {loading ? "Adding..." : "Add Domain"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
