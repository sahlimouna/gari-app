"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import type { UserProfile } from "@/types/user"
import { updateUserProfile } from "@/lib/firebase/auth"
import { Save, User, Mail, Phone, Bell, Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileFormProps {
  profile: UserProfile
  onUpdate: () => void
}

export function ProfileForm({ profile, onUpdate }: ProfileFormProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    phone: profile.phone || "",
    notificationsEnabled: profile.notificationsEnabled !== false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, notificationsEnabled: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateUserProfile(profile.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        notificationsEnabled: formData.notificationsEnabled,
      })

      toast({
        title: t("success"),
        description: t("profileUpdated"),
      })
      onUpdate()
    } catch (error) {
      console.error(error)
      toast({
        title: t("error"),
        description: t("errorUpdatingProfile"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = () => {
    return `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="space-y-6 mt-6">
      {/* Photo de profil */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt="Photo de profil" />
                <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">{getInitials()}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white shadow-lg"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations personnelles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {t("profile")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("firstName")}</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Ahmed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("lastName")}</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Benali"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {t("email")}
              </Label>
              <Input id="email" value={profile.email} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">{t("emailCannotBeChanged")}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {t("phone")}
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+213 5 12 34 56 78"
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <Label htmlFor="notifications">{t("notifications")}</Label>
                </div>
                <p className="text-sm text-muted-foreground">{t("enableNotifications")}</p>
              </div>
              <Switch id="notifications" checked={formData.notificationsEnabled} onCheckedChange={handleSwitchChange} />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                t("saving")
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {t("saveChanges")}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Statistiques utilisateur */}
      <Card>
        <CardHeader>
          <CardTitle>Vos statistiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Réservations</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">850 DA</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total dépensé</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">24h</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Temps total</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">4.8★</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Note moyenne</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
