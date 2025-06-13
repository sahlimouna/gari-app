"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "en" | "ar"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
  t: (key) => key,
})

export const useLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({})

  useEffect(() => {
    // Charger les traductions
    const loadTranslations = async () => {
      const frTranslations = await import("@/translations/fr.json")
      const enTranslations = await import("@/translations/en.json")
      const arTranslations = await import("@/translations/ar.json")

      setTranslations({
        fr: frTranslations,
        en: enTranslations,
        ar: arTranslations,
      })
    }

    loadTranslations()

    // Détecter la langue du navigateur
    const detectLanguage = () => {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && ["fr", "en", "ar"].includes(savedLanguage)) {
        return savedLanguage
      }

      // Détection automatique basée sur la langue du navigateur
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith("fr")) return "fr"
      if (browserLang.startsWith("ar")) return "ar"
      return "en" // Anglais par défaut
    }

    const detectedLanguage = detectLanguage()
    setLanguage(detectedLanguage)
    document.documentElement.lang = detectedLanguage
    document.documentElement.dir = detectedLanguage === "ar" ? "rtl" : "ltr"
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  const t = (key: string) => {
    if (!translations[language]) return key
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}
