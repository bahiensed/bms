import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { inter } from '@/fonts'
import '@/styles/globals.css'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { CookieConsent } from '@/components/cookie-consent'

export const metadata: Metadata = {
  title: "B2C Boilerplate",
  description: "Business to Consumer Boilerplate",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <CookieConsent />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
