import { ModeToggle } from "@/components/theme/mode-toggle"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex justify-end p-2">
        <ModeToggle />
      </div>
      <main className="flex flex-1 items-center justify-center p-4">
        {children}
      </main>
    </div>
  )
}
