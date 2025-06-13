"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, TrendingUp, TrendingDown, Minus, Clock } from "lucide-react"
import type { Parking } from "@/types/parking"

interface ParkingAvailabilityProps {
  parking: Parking
}

export function ParkingAvailability({ parking }: ParkingAvailabilityProps) {
  const [currentAvailability, setCurrentAvailability] = useState(parking.availableSpots)
  const [trend, setTrend] = useState<"up" | "down" | "stable">("stable")
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    // Simuler les mises à jour en temps réel
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 3) - 1 // -1, 0, ou 1
      const newAvailability = Math.max(0, Math.min(parking.totalSpots, currentAvailability + change))

      if (newAvailability > currentAvailability) {
        setTrend("up")
      } else if (newAvailability < currentAvailability) {
        setTrend("down")
      } else {
        setTrend("stable")
      }

      setCurrentAvailability(newAvailability)
      setLastUpdate(new Date())
    }, 10000) // Mise à jour toutes les 10 secondes

    return () => clearInterval(interval)
  }, [currentAvailability, parking.totalSpots])

  const getAvailabilityColor = () => {
    const percentage = (currentAvailability / parking.totalSpots) * 100
    if (percentage > 50) return "text-green-600 bg-green-50 dark:bg-green-900/20"
    if (percentage > 20) return "text-orange-600 bg-orange-50 dark:bg-orange-900/20"
    return "text-red-600 bg-red-50 dark:bg-red-900/20"
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getOccupancyLevel = () => {
    const percentage = ((parking.totalSpots - currentAvailability) / parking.totalSpots) * 100
    if (percentage < 30) return "Faible affluence"
    if (percentage < 70) return "Affluence modérée"
    if (percentage < 90) return "Forte affluence"
    return "Complet"
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-blue-500" />
            Disponibilité en temps réel
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-3 w-3" />
            {lastUpdate.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Compteur principal */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getAvailabilityColor()}`}>
            <span className="text-3xl font-bold">{currentAvailability}</span>
            <div className="text-left">
              <div className="text-sm font-medium">places libres</div>
              <div className="text-xs opacity-75">sur {parking.totalSpots}</div>
            </div>
            {getTrendIcon()}
          </div>
        </div>

        {/* Barre de progression */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Occupation</span>
            <span>{Math.round(((parking.totalSpots - currentAvailability) / parking.totalSpots) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((parking.totalSpots - currentAvailability) / parking.totalSpots) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Statut et prédictions */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Statut</div>
            <div className="font-medium">{getOccupancyLevel()}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Prochaine heure</div>
            <div className="font-medium text-green-600">+2-3 places</div>
          </div>
        </div>

        {/* Alertes */}
        {currentAvailability <= 5 && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-700 dark:text-red-300 font-medium">
                Attention : Plus que {currentAvailability} places disponibles !
              </span>
            </div>
          </div>
        )}

        {currentAvailability === 0 && (
          <Badge variant="destructive" className="w-full justify-center py-2">
            Parking complet - Rejoindre la liste d'attente
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
