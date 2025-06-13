"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Header } from "@/components/header"
import { ParkingMap } from "@/components/maps/parking-map"
import { ParkingAvailability } from "@/components/realtime/parking-availability"
import { ResponsiveContainer } from "@/components/responsive/responsive-container"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Map, List, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Parking } from "@/types/parking"

interface EnhancedHomeProps {
  parkings: Parking[]
}

export function EnhancedHome({ parkings }: EnhancedHomeProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [selectedParking, setSelectedParking] = useState<Parking | null>(null)

  const handleParkingSelect = (parking: Parking) => {
    router.push(`/home/parking/${parking.id}`)
  }

  return (
    <ResponsiveContainer maxWidth="lg" padding="md">
      <Header title={t("home")} />

      <div className="mt-4 sm:mt-6">
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 h-12 sm:h-10">
            <TabsTrigger
              value="map"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 touch-optimized"
            >
              <Map className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{t("map")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 touch-optimized"
            >
              <List className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{t("list")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="realtime"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 touch-optimized"
            >
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{t("realTime")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-4 sm:mt-6 animate-fade-in">
            <ParkingMap parkings={parkings} onParkingSelect={handleParkingSelect} />
          </TabsContent>

          <TabsContent value="list" className="mt-4 sm:mt-6 animate-fade-in">
            <div className="space-y-3 sm:space-y-4">
              {parkings.map((parking) => (
                <div
                  key={parking.id}
                  className="p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800 touch-optimized"
                >
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white text-sm sm:text-base">
                    {parking.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {parking.address}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-xs sm:text-sm">
                      <span className="text-green-600 dark:text-green-400 font-medium">{parking.availableSpots}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        /{parking.totalSpots} {t("availableSpots")}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleParkingSelect(parking)}
                      className="touch-optimized min-h-[44px] px-4"
                    >
                      {t("reserve")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="realtime" className="mt-4 sm:mt-6 animate-fade-in">
            <div className="space-y-4 sm:space-y-6">
              {parkings.map((parking) => (
                <ParkingAvailability key={parking.id} parking={parking} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ResponsiveContainer>
  )
}
