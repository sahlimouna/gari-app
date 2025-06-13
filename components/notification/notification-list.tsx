"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import type { Notification } from "@/types/notification"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Bell, CreditCard, Calendar, Info } from "lucide-react"

interface NotificationListProps {
  notifications: Notification[]
}

export function NotificationList({ notifications }: NotificationListProps) {
  const { t, language } = useLanguage()

  // Fonction pour obtenir l'icône selon le type de notification
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reservation":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "payment":
        return <CreditCard className="h-5 w-5 text-green-500" />
      case "system":
      default:
        return <Info className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("notifications")}</h2>

      {notifications.length === 0 ? (
        <div className="text-center py-8">
          <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">{t("noNotifications")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-md ${notification.read ? "" : "border-l-4 border-l-primary"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{notification.title}</h3>
                      <span className="text-xs text-muted-foreground">
                        {format(notification.date.toDate(), "PPp", { locale: language === "fr" ? fr : undefined })}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{notification.message}</p>
                    {!notification.read && (
                      <div className="mt-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t("new")}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
