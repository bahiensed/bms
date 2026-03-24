import { ModeToggle } from '@/components/theme/mode-toggle'
import { SearchInput } from '@/components/search/search-input'

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
        <div className="flex flex-col min-h-screen">
          <div className="flex border-b items-center justify-between p-2">
            Basic Boilerplate
            <div className="flex gap-2 items-center">
              <SearchInput />
              <ModeToggle />
            </div>
          </div>

          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
  )
}
