"use client"

import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "./language-switcher"

interface HeaderProps {
  title: string
  backUrl?: string
}

export function Header({ title, backUrl }: HeaderProps) {
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        {backUrl && (
          <Button variant="ghost" size="icon" onClick={() => router.push(backUrl)} className="mr-2">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">{t("back")}</span>
          </Button>
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <LanguageSwitcher />
    </div>
  )
}
