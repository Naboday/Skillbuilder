import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getDomainById, masteryLevels } from "@/lib/data"

interface MasterySelectionPageProps {
  params: {
    domainId: string
  }
}

export default function MasterySelectionPage({ params }: MasterySelectionPageProps) {
  const domainId = Number.parseInt(params.domainId)
  const domain = getDomainById(domainId)

  if (!domain) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
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
              <h1 className="text-3xl font-bold">{domain.name}</h1>
            </div>
            <p className="text-muted-foreground">Select your mastery level to get a personalized learning path.</p>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {masteryLevels.map((level) => (
              <Card key={level.id}>
                <CardHeader>
                  <CardTitle>{level.name}</CardTitle>
                  <CardDescription>{level.description || `${level.name} level learning path`}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                    {level.name === "Beginner" && (
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
                        className="text-green-500"
                      >
                        <path d="M12 22v-5" />
                        <path d="M9 7V2" />
                        <path d="M15 7V2" />
                        <path d="M6 13V8a6 6 0 0 1 12 0v5" />
                        <path d="M6 13h12" />
                        <path d="M6 17h12" />
                      </svg>
                    )}
                    {level.name === "Intermediate" && (
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
                        className="text-yellow-500"
                      >
                        <path d="M12 2v20" />
                        <path d="M2 12h20" />
                        <path d="m4.93 4.93 14.14 14.14" />
                        <path d="m19.07 4.93-14.14 14.14" />
                      </svg>
                    )}
                    {level.name === "Advanced" && (
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
                        className="text-red-500"
                      >
                        <path d="M2 20h.01" />
                        <path d="M7 20v-4" />
                        <path d="M12 20v-8" />
                        <path d="M17 20V8" />
                        <path d="M22 4v16" />
                      </svg>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/skills/${domainId}/${level.id}`}>Select Level</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}
