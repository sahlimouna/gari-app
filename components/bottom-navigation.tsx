"use client"

import { useLanguage } from "./language-provider"
import { usePathname, useRouter } from "next/navigation"
import { Home, CreditCard, Bell, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function BottomNavigation() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [shouldRender, setShouldRender] = useState(true)

  // Tous les hooks doivent être appelés avant tout retour conditionnel
  useEffect(() => {
    if (pathname.startsWith("/auth") || pathname === "/" || pathname === "/welcome") {
      setShouldRender(false)
    } else {
      setShouldRender(true)
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    return () => {
      // Cleanup si nécessaire
    }
  }, [lastScrollY])

  const navItems = [
    {
      label: "home",
      icon: Home,
      href: "/home",
      active: pathname === "/home" || pathname.startsWith("/home/"),
    },
    {
      label: "payment",
      icon: CreditCard,
      href: "/payment",
      active: pathname === "/payment",
    },
    {
      label: "notifications",
      icon: Bell,
      href: "/notifications",
      active: pathname === "/notifications",
    },
    {
      label: "settings",
      icon: Settings,
      href: "/settings",
      active:
        pathname === "/settings" ||
        pathname.startsWith("/profile") ||
        pathname.startsWith("/help") ||
        pathname.startsWith("/about"),
    },
  ]

  const handleNavigation = (href: string) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50)
    }
    router.push(href)
  }

  // Retour conditionnel APRÈS tous les hooks
  if (!shouldRender) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out",
        "bg-background/95 backdrop-blur-lg border-t border-border shadow-2xl",
        "safe-area-inset-bottom",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 opacity-60"></div>

      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {navItems.map((item, index) => (
          <button
            key={item.href}
            onClick={() => handleNavigation(item.href)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full transition-all duration-200 rounded-xl mx-1",
              "relative overflow-hidden group",
              item.active
                ? "text-primary bg-primary/10 dark:bg-primary/20 scale-105 shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-muted/30 hover:scale-105",
              "active:scale-95",
            )}
            style={{
              minHeight: "44px",
              minWidth: "44px",
            }}
          >
            <div className="absolute inset-0 bg-primary/20 rounded-xl scale-0 group-active:scale-100 transition-transform duration-150"></div>

            <item.icon
              className={cn(
                "h-5 w-5 mb-1 transition-all duration-200",
                item.active ? "scale-110" : "group-hover:scale-110",
              )}
            />

            <span
              className={cn(
                "text-xs font-medium transition-all duration-200 leading-none",
                item.active ? "font-semibold" : "group-hover:font-medium",
              )}
            >
              {t(item.label)}
            </span>

            {item.active && <div className="absolute top-1 w-1 h-1 bg-primary rounded-full animate-pulse"></div>}

            {item.label === "notifications" && (
              <div className="absolute top-2 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      <div className="h-safe-bottom bg-background/50"></div>
    </div>
  )
}
