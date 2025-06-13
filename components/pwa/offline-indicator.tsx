"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wifi, WifiOff } from "lucide-react"

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine
      setIsOnline(online)

      if (!online) {
        setShowOfflineMessage(true)
      } else if (showOfflineMessage) {
        // Masquer le message après 3 secondes quand on revient en ligne
        setTimeout(() => setShowOfflineMessage(false), 3000)
      }
    }

    // Vérifier le statut initial
    updateOnlineStatus()

    // Écouter les changements de connectivité
    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [showOfflineMessage])

  if (!showOfflineMessage) return null

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Alert
        className={`${isOnline ? "border-green-200 bg-green-50 dark:bg-green-900/20" : "border-orange-200 bg-orange-50 dark:bg-orange-900/20"}`}
      >
        {isOnline ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-orange-600" />}
        <AlertDescription
          className={isOnline ? "text-green-800 dark:text-green-200" : "text-orange-800 dark:text-orange-200"}
        >
          {isOnline
            ? "Connexion rétablie ! Synchronisation en cours..."
            : "Mode hors ligne activé. Certaines fonctionnalités sont limitées."}
        </AlertDescription>
      </Alert>
    </div>
  )
}
