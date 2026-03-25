import Link from "next/link"
import { auth } from "@/auth"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { SearchInput } from "@/components/search/search-input"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user/user-menu"

export default async function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex border-b items-center justify-between p-2">
        B2C Boilerplate
        <div className="flex gap-2 items-center">
          <SearchInput />
          <ModeToggle />
          {session ? (
            <>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserMenu
                image={session.user?.image}
                name={session.user?.name}
                email={session.user?.email}
              />
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Crie uma conta grátis</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  )
}
