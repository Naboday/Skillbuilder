"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/lib/auth-context"
import { getUserProgressStats } from "@/lib/data"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

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

  const progressStats = getUserProgressStats(user.id)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <section>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.full_name || user?.username}!</h1>
            <p className="text-muted-foreground">Continue your learning journey or explore new skills.</p>
          </section>

          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{progressStats.completedModules}</CardTitle>
                <CardDescription>Completed Modules</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You've completed {progressStats.completionPercentage}% of all modules
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{progressStats.inProgressModules}</CardTitle>
                <CardDescription>Modules In Progress</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Continue where you left off</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{progressStats.notStartedModules}</CardTitle>
                <CardDescription>Modules To Explore</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Discover new learning opportunities</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">AI Assistant</CardTitle>
                <CardDescription>Get Learning Help</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Ask questions and get guidance</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/chatbot">Chat Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </section>

          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Skill Builder</CardTitle>
                <CardDescription>Choose a tech stack and start learning with personalized roadmaps.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="M4.93 4.93l2.83 2.83" />
                    <path d="M16.24 16.24l2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <path d="M4.93 19.07l2.83-2.83" />
                    <path d="M16.24 7.76l2.83-2.83" />
                  </svg>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/skills">Explore Skills</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Report</CardTitle>
                <CardDescription>Track your learning progress and view detailed statistics.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 20v-6" />
                    <path d="M6 20v-6" />
                    <path d="M18 20v-6" />
                    <path />
                    <path d="M6 20v-6" />
                    <path d="M18 20v-6" />
                    <path d="M12 14v-4" />
                    <path d="M6 14v-4" />
                    <path d="M18 14v-4" />
                    <rect width="18" height="4" x="3" y="4" rx="2" />
                  </svg>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/progress">View Progress</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Forum</CardTitle>
                <CardDescription>Connect with other learners, ask questions, and share resources.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                    <line x1="6" x2="14" y1="2" y2="2" />
                    <line x1="10" x2="10" y1="2" y2="4" />
                  </svg>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/forum">Join Discussion</Link>
                </Button>
              </CardFooter>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
