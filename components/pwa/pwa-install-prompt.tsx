"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X, Smartphone, Apple } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstallPrompt() {
  const { t } = useLanguage()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  // Tous les hooks avant tout retour conditionnel
  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://")
    setIsStandalone(standalone)

    if (standalone) {
      setIsInstalled(true)
      return
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      setTimeout(() => {
        if (!isInstalled && !sessionStorage.getItem("installPromptDismissed")) {
          setShowInstallPrompt(true)
        }
      }, 10000)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
      console.log("🎉 Gari installé avec succès!")
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    if (iOS && !standalone) {
      setTimeout(() => {
        if (!sessionStorage.getItem("installPromptDismissed")) {
          setShowInstallPrompt(true)
        }
      }, 15000)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [isInstalled])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        console.log("✅ Installation acceptée")
      } else {
        console.log("❌ Installation refusée")
      }

      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    } else if (isIOS) {
      setShowInstallPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    sessionStorage.setItem("installPromptDismissed", "true")
  }

  // Retour conditionnel APRÈS tous les hooks
  if (isInstalled || !showInstallPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:bottom-4 md:left-auto md:right-4 md:max-w-sm animate-slide-up">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 shadow-xl border-2">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                {isIOS ? <Apple className="w-6 h-6 text-white" /> : <Smartphone className="w-6 h-6 text-white" />}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">📱 Installer Gari</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                {isIOS
                  ? "Ajoutez Gari à votre écran d'accueil pour une expérience app native complète"
                  : "Installez Gari comme une vraie app mobile pour un accès rapide et hors ligne"}
              </p>

              {isIOS && (
                <div className="text-xs text-blue-700 dark:text-blue-300 mb-3 p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                  📋 Appuyez sur <strong>Partager</strong> puis <strong>"Sur l'écran d'accueil"</strong>
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={handleInstallClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md flex-1"
                >
                  <Download className="w-3 h-3 mr-1" />
                  {isIOS ? "Instructions" : "Installer"}
                </Button>
                <Button size="sm" variant="ghost" onClick={handleDismiss} className="text-gray-600 dark:text-gray-400">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
