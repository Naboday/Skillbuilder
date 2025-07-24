"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { domains, forumPosts } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function NewForumPostPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [domainId, setDomainId] = useState<string>("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate creating a new post
    setTimeout(() => {
      const newPost = {
        id: forumPosts.length + 1,
        user_id: user.id,
        title,
        content,
        domain_id: domainId ? Number.parseInt(domainId) : null,
        upvotes: 0,
        downvotes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      forumPosts.push(newPost)

      toast({
        title: "Post created",
        description: "Your post has been created successfully.",
      })

      router.push("/forum")
    }, 500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" asChild>
              <Link href="/forum">
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
            <h1 className="text-3xl font-bold">Create New Post</h1>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain (Optional)</Label>
                  <Select value={domainId} onValueChange={setDomainId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      {domains.map((domain) => (
                        <SelectItem key={domain.id} value={domain.id.toString()}>
                          {domain.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your post content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" asChild>
                  <Link href="/forum">Cancel</Link>
                </Button>
                <Button type="submit" disabled={submitting || !title.trim() || !content.trim()}>
                  {submitting ? "Creating..." : "Create Post"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
