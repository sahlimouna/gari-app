"use client"

import { useEffect } from "react"
import { messaging } from "@/lib/firebase/config"
import { getToken, onMessage } from "firebase/messaging"
import { useToast } from "@/components/ui/use-toast"

export function FirebaseMessaging() {
  const { toast } = useToast()

  useEffect(() => {
    if (!messaging) return

    // Demander la permission pour les notifications
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission()
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          })
          console.log("FCM Token:", token)
          // Envoyer le token au serveur pour l'associer à l'utilisateur
        }
      } catch (error) {
        console.error("Erreur lors de la demande de permission:", error)
      }
    }

    // Écouter les messages en premier plan
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message reçu:", payload)
      toast({
        title: payload.notification?.title || "Nouvelle notification",
        description: payload.notification?.body || "",
      })
    })

    requestPermission()

    return () => unsubscribe()
  }, [toast])

  return null
}
