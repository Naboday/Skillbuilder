"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addDomain } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function AddDomainPage() {
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

      // Redirect back to skills page
      router.push("/skills")
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" asChild>
              <Link href="/skills">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Add New Domain</h1>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Domain Details</CardTitle>
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
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" asChild>
                  <Link href="/skills">Cancel</Link>
                </Button>
                <Button type="submit" disabled={loading || !name.trim()}>
                  {loading ? "Adding..." : "Add Domain"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
