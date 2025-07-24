import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { domains } from "@/lib/data"

export default function SkillsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <section className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Skill Builder</h1>
              <p className="text-muted-foreground">Choose a tech stack domain to start your learning journey.</p>
            </div>
            <Button asChild>
              <Link href="/skills/add-domain">Add Domain</Link>
            </Button>
          </section>

          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {domains && domains.length > 0 ? (
              domains.map((domain) => (
                <Card key={domain.id}>
                  <CardHeader>
                    <CardTitle>{domain.name}</CardTitle>
                    <CardDescription>{domain.description || `Learn all about ${domain.name}`}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                      {domain.icon ? (
                        <img
                          src={domain.icon || "/placeholder.svg"}
                          alt={domain.name}
                          className="h-20 w-20 object-contain"
                        />
                      ) : (
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
                          <path d="M18 16.98h-5.99c-1.1 0-1.95.5-2.01 1l-.01 2c-.01.55.44 1 .99 1H18c.56 0 1-.45 1-1v-2c0-.55-.45-1-1-1Z" />
                          <path d="M18 8.98h-5.99c-1.1 0-1.95.5-2.01 1l-.01 2c-.01.55.44 1 .99 1H18c.56 0 1-.45 1-1v-2c0-.55-.45-1-1-1Z" />
                          <path d="M5.01 9.98c0 .55.44 1 .99 1H6l.01-2H6c-.55 0-1 .45-.99 1Z" />
                          <path d="M5.01 17.98c0 .55.44 1 .99 1H6l.01-2H6c-.55 0-1 .45-.99 1Z" />

                          <path d="M17.99 4.98h-10c-1.1 0-2 .9-2 2v.01c0 1.1.9 1.99 2 1.99h10c1.1 0 2-.9 2-2v-.01c0-1.1-.9-1.99-2-1.99Z" />
                        </svg>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/skills/${domain.id}`}>Select Domain</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium">No domains available yet</h3>
                <p className="text-muted-foreground mt-2">Add your first tech domain to get started.</p>
                <Button asChild className="mt-4">
                  <Link href="/skills/add-domain">Add Domain</Link>
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
