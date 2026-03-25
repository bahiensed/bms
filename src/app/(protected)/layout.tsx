import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { ModeToggle } from "@/components/theme/mode-toggle";
import { SearchInput } from "@/components/search/search-input";
import { UserMenu } from "@/components/user/user-menu";
import { verifySession } from "@/lib/dal";

export default async function ProtectPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await verifySession()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "14rem",
          "--sidebar-width-mobile": "14rem",
        } as React.CSSProperties
      }
    >
    <AppSidebar />
        <div className="flex flex-col w-full min-h-screen">
          <div className="flex border-b items-center justify-between p-2">
            <SidebarTrigger />
            <div className="flex gap-2 items-center">
              <SearchInput />
              <ModeToggle />
              <UserMenu
                name={session?.user?.name}
                email={session?.user?.email}
                image={session?.user?.image}
              />
            </div>
          </div>

          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
    </SidebarProvider>
  )
}
