"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Car, Clock, Star, Plane, Building } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Parking } from "@/types/parking"

interface ParkingListProps {
  parkings: Parking[]
}

export function ParkingList({ parkings }: ParkingListProps) {
  const { t } = useLanguage()
  const router = useRouter()

  const getParkingIcon = (name: string) => {
    if (name.toLowerCase().includes("aéroport") || name.toLowerCase().includes("airport")) {
      return <Plane className="h-5 w-5 text-blue-500" />
    }
    return <Building className="h-5 w-5 text-green-500" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("availableParkings")}</h2>
        <Badge variant="secondary" className="text-sm">
          {parkings.length} {t("availableSpots")}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {parkings.map((parking) => (
          <Card
            key={parking.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
          >
            <div className="h-48 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative">
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {parking.availableSpots} {t("availableSpots")}
              </div>
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {getParkingIcon(parking.name)}
                Annaba
              </div>
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                4.8/5
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{parking.name}</h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
                  <span className="line-clamp-1">{parking.address}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Car className="h-4 w-4 mr-3 text-gray-400" />
                    <span>{parking.totalSpots} places</span>
                  </div>
                  <div className="flex items-center text-gray-900 dark:text-white font-semibold">
                    <Clock className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{parking.pricePerHour} DA/h</span>
                  </div>
                </div>

                <div className="text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full inline-block">
                  💳 CIB/EDAHABIA
                </div>
              </div>

              {parking.features && parking.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {parking.features.slice(0, 3).map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Button
                className="w-full h-12 text-base font-medium"
                onClick={() => router.push(`/home/parking/${parking.id}`)}
                disabled={parking.availableSpots === 0}
              >
                {parking.availableSpots === 0 ? t("notAvailable") : t("select")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
