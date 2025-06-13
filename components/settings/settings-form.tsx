"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import type { UserProfile } from "@/types/user"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase/config"
import {
  LogOut,
  User,
  Bell,
  Moon,
  Sun,
  Globe,
  LogIn,
  UserPlus,
  ChevronRight,
  Zap,
  Clock,
  HelpCircle,
  FileText,
  Info,
  Shield,
  Car,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth-provider"
import { LanguageSwitcher } from "@/components/language-switcher"

interface SettingsFormProps {
  profile: UserProfile
}

export function SettingsForm({ profile }: SettingsFormProps) {
  const { t, language, setLanguage } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      toast({
        title: t("success"),
        description: t("signedOut"),
      })
      router.push("/welcome")
    } catch (error) {
      console.error(error)
      toast({
        title: t("error"),
        description: t("errorSigningOut"),
        variant: "destructive",
      })
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    toast({
      title: t("themeChanged"),
      description: t(newTheme === "dark" ? "darkModeEnabled" : "lightModeEnabled"),
    })
  }

  const SettingsItem = ({
    icon,
    title,
    subtitle,
    onClick,
    showChevron = true,
    children,
  }: {
    icon: React.ReactNode
    title: string
    subtitle?: string
    onClick?: () => void
    showChevron?: boolean
    children?: React.ReactNode
  }) => (
    <div
      className={`flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 ${onClick ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="text-gray-600 dark:text-gray-400">{icon}</div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{title}</p>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {children}
        {showChevron && <ChevronRight className="h-5 w-5 text-gray-400" />}
      </div>
    </div>
  )

  return (
    <div className="space-y-0 bg-white dark:bg-gray-900">
      {/* Section Profil */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          {t("profile")}
        </h2>

        {!user ? (
          <>
            <SettingsItem
              icon={<UserPlus className="h-5 w-5" />}
              title={t("createAccount")}
              onClick={() => router.push("/auth/register")}
            />
            <SettingsItem
              icon={<LogIn className="h-5 w-5" />}
              title={t("signIn")}
              onClick={() => router.push("/auth/login")}
            />
          </>
        ) : (
          <SettingsItem
            icon={<User className="h-5 w-5" />}
            title={`${profile.firstName} ${profile.lastName}`}
            subtitle={profile.email}
            onClick={() => router.push("/profile")}
          />
        )}
      </div>

      {/* Section À découvrir */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          À découvrir
        </h2>

        <SettingsItem
          icon={<Zap className="h-5 w-5" />}
          title="Borne de recharge électrique"
          onClick={() => router.push("/charging-stations")}
        />
        <SettingsItem
          icon={<Clock className="h-5 w-5" />}
          title="Mon parking à l'heure"
          onClick={() => router.push("/hourly-parking")}
        />
      </div>

      {/* Section Promotion */}
      <div className="mx-4 mb-6">
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-4 text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Car className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">Louez votre parking à l'heure</h3>
              <p className="text-sm text-pink-100 mt-1">
                De quelques heures à plusieurs jours, réservez à partir d'1€/heure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Apparence */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          {t("appearance")}
        </h2>

        <SettingsItem
          icon={theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          title={t("displayMode")}
          subtitle={theme === "dark" ? t("darkMode") : t("lightMode")}
          showChevron={false}
        >
          <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
        </SettingsItem>

        <SettingsItem
          icon={<Globe className="h-5 w-5" />}
          title={t("language")}
          subtitle={language === "fr" ? "Français" : language === "en" ? "English" : "العربية"}
          showChevron={false}
        >
          <LanguageSwitcher />
        </SettingsItem>

        <SettingsItem
          icon={<Bell className="h-5 w-5" />}
          title={t("notifications")}
          subtitle={t("enableNotifications")}
          showChevron={false}
        >
          <Switch defaultChecked />
        </SettingsItem>
      </div>

      {/* Section Aide */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          Aide
        </h2>

        <SettingsItem
          icon={<HelpCircle className="h-5 w-5" />}
          title="Centre d'aide"
          onClick={() => router.push("/help")}
        />
        <SettingsItem
          icon={<FileText className="h-5 w-5" />}
          title="Comment ça marche"
          onClick={() => router.push("/how-it-works")}
        />
        <SettingsItem icon={<Info className="h-5 w-5" />} title="À propos" onClick={() => router.push("/about")} />
        <SettingsItem
          icon={<Shield className="h-5 w-5" />}
          title="Consignes de sécurité"
          onClick={() => router.push("/safety")}
        />
      </div>

      {/* Section Déconnexion (seulement si connecté) */}
      {user && (
        <div className="mb-6">
          <SettingsItem
            icon={<LogOut className="h-5 w-5 text-red-500" />}
            title={t("signOut")}
            onClick={handleSignOut}
            showChevron={false}
          />
        </div>
      )}
    </div>
  )
}
