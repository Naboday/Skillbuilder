"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { domains, forumPosts, getDomainById, forumComments } from "@/lib/data"

export default function ForumPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null)

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

  // Filter posts by domain if a domain is selected
  const filteredPosts = selectedDomain ? forumPosts.filter((post) => post.domain_id === selectedDomain) : forumPosts

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <section className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
              <p className="text-muted-foreground">Connect with other learners, ask questions, and share knowledge</p>
            </div>
            <Button asChild>
              <Link href="/forum/new">Create Post</Link>
            </Button>
          </section>

          <section>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all" onClick={() => setSelectedDomain(null)}>
                  All Topics
                </TabsTrigger>
                {domains.map((domain) => (
                  <TabsTrigger
                    key={domain.id}
                    value={domain.id.toString()}
                    onClick={() => setSelectedDomain(domain.id)}
                  >
                    {domain.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="space-y-4">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => {
                      const domain = post.domain_id ? getDomainById(post.domain_id) : null
                      return (
                        <Card key={post.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-xl">
                                <Link href={`/forum/${post.id}`} className="hover:underline">
                                  {post.title}
                                </Link>
                              </CardTitle>
                              {domain && (
                                <Badge variant="outline" className="ml-2">
                                  {domain.name}
                                </Badge>
                              )}
                            </div>
                            <CardDescription>
                              Posted on {formatDate(post.created_at)} by @{user.username}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="line-clamp-2">{post.content}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
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
                                <span>{post.upvotes}</span>
                              </div>
                              <div className="flex items-center">
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
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <span>{forumComments.filter((comment) => comment.post_id === post.id).length}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/forum/${post.id}`}>Read More</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      )
                    })
                  ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h3 className="text-lg font-medium">No posts found</h3>
                      <p className="text-muted-foreground mt-2">
                        {selectedDomain ? "There are no posts in this domain yet." : "There are no posts yet."}
                      </p>
                      <Button asChild className="mt-4">
                        <Link href="/forum/new">Create the first post</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              {domains.map((domain) => (
                <TabsContent key={domain.id} value={domain.id.toString()} className="mt-0">
                  <div className="space-y-4">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <Card key={post.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-xl">
                                <Link href={`/forum/${post.id}`} className="hover:underline">
                                  {post.title}
                                </Link>
                              </CardTitle>
                            </div>
                            <CardDescription>
                              Posted on {formatDate(post.created_at)} by @{user.username}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="line-clamp-2">{post.content}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
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
                                <span>{post.upvotes}</span>
                              </div>
                              <div className="flex items-center">
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
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <span>{forumComments.filter((comment) => comment.post_id === post.id).length}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/forum/${post.id}`}>Read More</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-lg font-medium">No posts found</h3>
                        <p className="text-muted-foreground mt-2">There are no posts in this domain yet.</p>
                        <Button asChild className="mt-4">
                          <Link href="/forum/new">Create the first post</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  )
}
