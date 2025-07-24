import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getDomainById, getMasteryLevelById, getModulesByDomainAndLevel, getUserProgressByModuleId } from "@/lib/data"

interface SkillsDevelopmentPageProps {
  params: {
    domainId: string
    levelId: string
  }
}

export default function SkillsDevelopmentPage({ params }: SkillsDevelopmentPageProps) {
  const domainId = Number.parseInt(params.domainId)
  const levelId = Number.parseInt(params.levelId)

  const domain = getDomainById(domainId)
  const masteryLevel = getMasteryLevelById(levelId)

  if (!domain || !masteryLevel) {
    notFound()
  }

  // Get modules for this domain and mastery level
  const modules = getModulesByDomainAndLevel(domainId, levelId)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" asChild>
                <Link href={`/skills/${domainId}`}>
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
              <div>
                <h1 className="text-3xl font-bold">
                  {domain.name} - {masteryLevel.name}
                </h1>
                <p className="text-muted-foreground">Your personalized learning roadmap</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Roadmap</h2>
            <div className="space-y-6">
              {modules && modules.length > 0 ? (
                modules.map((module, index) => {
                  const progress = getUserProgressByModuleId(module.id)
                  const isCompleted = progress?.is_completed || false
                  const isLocked = index > 0 && !getUserProgressByModuleId(modules[index - 1]?.id)?.is_completed

                  return (
                    <Card key={module.id} className={isLocked ? "opacity-70" : ""}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{module.title}</CardTitle>
                          {isCompleted ? (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                              Completed
                            </span>
                          ) : isLocked ? (
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-100">
                              Locked
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                              In Progress
                            </span>
                          )}
                        </div>
                        <CardDescription>{module.description || `Module ${index + 1}`}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{isCompleted ? "100%" : "0%"}</span>
                            </div>
                            <Progress value={isCompleted ? 100 : 0} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full" disabled={isLocked}>
                          <Link href={`/skills/${domainId}/${levelId}/${module.id}`}>
                            {isCompleted ? "Review Module" : "Start Learning"}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-medium">No modules available yet</h3>
                  <p className="text-muted-foreground mt-2">Please check back later for available modules.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
