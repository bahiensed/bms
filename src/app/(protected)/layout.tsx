import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { ModeToggle } from "@/components/theme/mode-toggle";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
            <ModeToggle />
          </div>

          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
    </SidebarProvider>
  )
}
