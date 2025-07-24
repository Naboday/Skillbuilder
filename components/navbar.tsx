"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { toast } = useToast()

  const handleSignOut = () => {
    signOut()
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    })
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Skill Builder</span>
          </Link>
          {user && (
            <nav className="hidden md:flex gap-6">
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                href="/skills"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.startsWith("/skills") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Skill Builder
              </Link>
              <Link
                href="/progress"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.startsWith("/progress") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Progress Report
              </Link>
              <Link
                href="/forum"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.startsWith("/forum") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Community Forum
              </Link>
              <Link
                href="/chatbot"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.startsWith("/chatbot") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                AI Assistant
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar_url || undefined} alt={user.username} />
                    <AvatarFallback>
                      {user.full_name ? getInitials(user.full_name) : user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{user.full_name || user.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">@{user.username}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/progress">Progress Report</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
