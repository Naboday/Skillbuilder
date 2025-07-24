"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { forumComments, forumPosts, getDomainById } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

interface ForumPostPageProps {
  params: {
    postId: string
  }
}

export default function ForumPostPage({ params }: ForumPostPageProps) {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { toast } = useToast()
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const postId = Number.parseInt(params.postId)
  const post = forumPosts.find((p) => p.id === postId)
  const comments = forumComments.filter((c) => c.post_id === postId)
  const domain = post?.domain_id ? getDomainById(post.domain_id) : null

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

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link href="/forum">Back to Forum</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate adding a comment
    setTimeout(() => {
      const newComment = {
        id: forumComments.length + 1,
        post_id: postId,
        user_id: user.id,
        content: comment,
        upvotes: 0,
        downvotes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      forumComments.push(newComment)
      setComment("")
      setSubmitting(false)

      toast({
        title: "Comment added",
        description: "Your comment has been added successfully.",
      })

      // Force a re-render
      router.refresh()
    }, 500)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
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
            <h1 className="text-3xl font-bold">Forum Post</h1>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {user.full_name ? getInitials(user.full_name) : user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Posted by @{user.username}</span>
                    <span>•</span>
                    <span>{formatDate(post.created_at)}</span>
                    {domain && (
                      <>
                        <span>•</span>
                        <Badge variant="outline">{domain.name}</Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="m6 15 6-6 6 6" />
                  </svg>
                  <span>{post.upvotes}</span>
                </Button>
                <Button variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  <span>{post.downvotes}</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p>{post.content}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmitComment}>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      required
                    />
                    <div className="flex justify-end">
                      <Button type="submit" disabled={submitting || !comment.trim()}>
                        {submitting ? "Posting..." : "Post Comment"}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                      <div className="flex space-x-4">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user.full_name ? getInitials(user.full_name) : user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">@{user.username}</div>
                          <div className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{comment.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <path d="m6 15 6-6 6 6" />
                          </svg>
                          <span>{comment.upvotes}</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                          <span>{comment.downvotes}</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-medium">No comments yet</h3>
                <p className="text-muted-foreground mt-2">Be the first to comment on this post.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
