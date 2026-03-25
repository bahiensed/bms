"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const COOKIE_NAME = "cookie_consent"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

function getConsentCookie(): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function setConsentCookie(value: "all" | "essential") {
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!getConsentCookie()) setVisible(true)
  }, [])

  if (!visible) return null

  function handleAcceptAll() {
    setConsentCookie("all")
    setVisible(false)
  }

  function handleEssentialOnly() {
    setConsentCookie("essential")
    setVisible(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background px-4 py-4 shadow-lg sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Usamos cookies para garantir o funcionamento do Serviço e, com sua permissão,
          para melhorar sua experiência.{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:no-underline">
            Saiba mais
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={handleEssentialOnly}>
            Apenas essenciais
          </Button>
          <Button size="sm" onClick={handleAcceptAll}>
            Aceitar todos
          </Button>
        </div>
      </div>
    </div>
  )
}
