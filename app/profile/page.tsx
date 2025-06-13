"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ProfileForm } from "@/components/profile/profile-form"
import { getUserProfile } from "@/lib/firebase/firestore"
import type { UserProfile } from "@/types/user"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
      return
    }

    if (user) {
      loadProfile()
    }
  }, [user, loading, router])

  const loadProfile = async () => {
    if (!user) return

    try {
      const profileData = await getUserProfile(user.uid)
      setProfile(profileData)
    } catch (error) {
      console.error("Error loading profile:", error)
      // En cas d'erreur, créer un profil de base
      setProfile({
        id: user.uid,
        email: user.email || "",
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        phone: "",
        notificationsEnabled: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Header title="Profil" backUrl="/settings" />
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Header title="Profil" backUrl="/settings" />
      <ProfileForm profile={profile} onUpdate={loadProfile} />
    </div>
  )
}
