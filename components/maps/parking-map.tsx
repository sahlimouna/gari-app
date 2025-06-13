"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Car, Clock, Star } from "lucide-react"
import type { Parking } from "@/types/parking"

interface ParkingMapProps {
  parkings: Parking[]
  onParkingSelect: (parking: Parking) => void
}

export function ParkingMap({ parkings, onParkingSelect }: ParkingMapProps) {
  const { t } = useLanguage()
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedParking, setSelectedParking] = useState<Parking | null>(null)

  useEffect(() => {
    // Demander la géolocalisation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Géolocalisation refusée:", error)
          // Position par défaut à Annaba
          setUserLocation({ lat: 36.9, lng: 7.7667 })
        },
      )
    }
  }, [])

  const calculateDistance = (parking: Parking) => {
    if (!userLocation) return "N/A"

    const R = 6371 // Rayon de la Terre en km
    const dLat = (parking.latitude - userLocation.lat) * (Math.PI / 180)
    const dLng = (parking.longitude - userLocation.lng) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userLocation.lat * (Math.PI / 180)) *
        Math.cos(parking.latitude * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`
  }

  const openInGoogleMaps = (parking: Parking) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${parking.latitude},${parking.longitude}&travelmode=driving`
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-4">
      {/* Carte simulée avec positions */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Carte des parkings - Annaba
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Carte simulée avec CSS */}
          <div className="relative h-64 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 dark:from-blue-900 dark:via-green-900 dark:to-blue-900">
            {/* Simulation d'une carte avec points */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;&gt;&lt;g fill=&quot;none&quot; fillRule=&quot;evenodd&quot;&gt;&lt;g fill=&quot;#9C92AC&quot; fillOpacity=&quot;0.1&quot;&gt;&lt;circle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1.5&quot;/&gt;&lt;/g&gt;&lt;/g&gt;&lt;/svg&gt;')]"></div>

            {/* Position utilisateur */}
            {userLocation && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="text-xs text-blue-600 font-medium mt-1 whitespace-nowrap">Vous êtes ici</div>
              </div>
            )}

            {/* Parkings sur la carte */}
            <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <button
                onClick={() => setSelectedParking(parkings[0])}
                className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"
              >
                <Car className="h-3 w-3 text-white mx-auto" />
              </button>
              <div className="text-xs text-red-600 font-medium mt-1 whitespace-nowrap">Centre-Ville</div>
            </div>

            <div className="absolute top-3/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <button
                onClick={() => setSelectedParking(parkings[1])}
                className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"
              >
                <Car className="h-3 w-3 text-white mx-auto" />
              </button>
              <div className="text-xs text-green-600 font-medium mt-1 whitespace-nowrap">Aéroport</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des parkings avec distances */}
      <div className="space-y-3">
        {parkings.map((parking) => (
          <Card
            key={parking.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedParking?.id === parking.id ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""
            }`}
            onClick={() => setSelectedParking(parking)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{parking.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {calculateDistance(parking)}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="line-clamp-1">{parking.address}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Car className="h-3 w-3" />
                        <span>
                          {parking.availableSpots}/{parking.totalSpots}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{parking.pricePerHour} DA/h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      openInGoogleMaps(parking)
                    }}
                  >
                    <Navigation className="h-3 w-3 mr-1" />
                    Itinéraire
                  </Button>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onParkingSelect(parking)
                    }}
                    disabled={parking.availableSpots === 0}
                  >
                    Réserver
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
