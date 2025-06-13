"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Car, MapPin, CreditCard, Bell, ArrowRight } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"

export function WelcomeScreen() {
  const { t } = useLanguage()
  const router = useRouter()

  const features = [
    {
      icon: <Car className="w-6 h-6 text-blue-600" />,
      title: t("easyParking"),
      description: t("easyParkingDesc"),
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: t("realTimeAvailability"),
      description: t("realTimeAvailabilityDesc"),
    },
    {
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      title: t("securePayment"),
      description: t("securePaymentDesc"),
    },
    {
      icon: <Bell className="w-6 h-6 text-orange-600" />,
      title: t("smartNotifications"),
      description: t("smartNotificationsDesc"),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header avec sélecteur de langue */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
        {/* Logo et titre */}
        <div className="text-center mb-8 pt-8">
          <div className="w-20 h-20 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Gari</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t("welcomeToGari")}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t("parkingMadeEasy")}</p>
        </div>

        {/* Fonctionnalités */}
        <div className="flex-1 mb-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
            {t("whyChooseGari")}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="space-y-4 pb-8">
          <Button
            className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={() => router.push("/home")}
          >
            {t("continueAsGuest")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t("alreadyHaveAccount")}</p>
            <Button
              variant="outline"
              className="w-full h-12 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => router.push("/settings")}
            >
              {t("signInFromSettings")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
