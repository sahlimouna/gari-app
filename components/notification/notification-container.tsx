"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { NotificationList } from "./notification-list"
import { getUserNotifications } from "@/lib/firebase/firestore"
import type { Notification } from "@/types/notification"
import { Loader2 } from "lucide-react"

export function NotificationContainer() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      // Utiliser un ID utilisateur par défaut pour les données de démo
      const notificationsData = await getUserNotifications("demo-user")
      setNotifications(notificationsData)
    } catch (error) {
      console.error("Error loading notifications:", error)
      setNotifications([])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Header title="Notifications" />
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Header title="Notifications" />
      <NotificationList notifications={notifications} />
    </div>
  )
}
