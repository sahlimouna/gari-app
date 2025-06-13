"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { SettingsForm } from "./settings-form"
import type { UserProfile } from "@/types/user"
import { Loader2 } from "lucide-react"

export function SettingsContainer() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      // Créer un profil invité par défaut
      setProfile({
        id: "guest",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        notificationsEnabled: true,
      })
    } catch (error) {
      console.error("Error loading profile:", error)
      setProfile({
        id: "guest",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        notificationsEnabled: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Header title="Paramètres" />
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Header title="Paramètres" />
        <div className="text-center py-8">
          <p className="text-muted-foreground">Impossible de charger le profil</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Header title="Paramètres" />
      <SettingsForm profile={profile} />
    </div>
  )
}
