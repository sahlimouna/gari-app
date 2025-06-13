"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { Loader2, Car, MapPin } from "lucide-react"

export function SplashScreen() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const [showSplash, setShowSplash] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animation de progression
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 60)

    // Timer principal du splash screen
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [])

  useEffect(() => {
    if (!showSplash && !loading) {
      if (user) {
        router.push("/home")
      } else {
        router.push("/welcome")
      }
    }
  }, [showSplash, loading, user, router])

  return (
    <div className="min-h-screen-mobile bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-slate-900 flex flex-col items-center justify-center text-white transition-colors duration-300 safe-area-inset">
      {/* Logo principal avec animation */}
      <div className="flex flex-col items-center space-y-8 mb-12 animate-bounce-in">
        <div className="relative">
          {/* Logo principal */}
          <div className="w-32 h-32 bg-white dark:bg-gray-100 rounded-3xl flex items-center justify-center shadow-2xl transform transition-transform duration-500 hover:scale-105">
            <Car className="w-16 h-16 text-blue-600 dark:text-blue-700" />
          </div>

          {/* Badge parking */}
          <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <MapPin className="w-6 h-6 text-blue-800 dark:text-blue-900" />
          </div>

          {/* Cercles d'animation */}
          <div className="absolute inset-0 rounded-3xl border-4 border-white/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-3xl border-2 border-white/20 animate-pulse"></div>
        </div>

        {/* Nom de l'app */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold tracking-tight animate-fade-in">Gari</h1>
          <p className="text-blue-100 dark:text-blue-200 text-xl font-medium animate-fade-in">{t("appSubtitle")}</p>
          <p className="text-blue-200 dark:text-blue-300 text-sm animate-fade-in">جاري - مواقف ذكية عنابة</p>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="w-64 mb-8">
        <div className="flex items-center justify-between text-blue-200 dark:text-blue-300 text-sm mb-2">
          <span>{t("loading")}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-blue-800/30 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Animation de chargement */}
      <div className="flex flex-col items-center space-y-4 animate-fade-in">
        <div className="relative">
          <Loader2 className="w-8 h-8 animate-spin text-blue-200 dark:text-blue-300" />
          <div className="absolute inset-0 w-8 h-8 border-2 border-transparent border-t-yellow-400 rounded-full animate-spin"></div>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-200 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>

      {/* Informations en bas */}
      <div className="absolute bottom-8 text-center space-y-2 animate-fade-in">
        <p className="text-blue-200 dark:text-blue-300 text-sm font-medium">Version 2.0.0 Mobile</p>
        <p className="text-blue-300 dark:text-blue-400 text-xs">{t("madeInAnnaba")}</p>
        <div className="flex items-center justify-center space-x-2 text-blue-300 dark:text-blue-400 text-xs">
          <span>🚗</span>
          <span>Parking Intelligent</span>
          <span>📱</span>
          <span>App Mobile</span>
          <span>🇩🇿</span>
        </div>
      </div>

      {/* Effet de particules (optionnel) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
