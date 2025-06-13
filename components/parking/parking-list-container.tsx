"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { ParkingList } from "./parking-list"
import type { Parking } from "@/types/parking"
import { Loader2 } from "lucide-react"

export function ParkingListContainer() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [parkings, setParkings] = useState<Parking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
      return
    }

    if (user) {
      loadParkings()
    }
  }, [user, loading, router])

  const loadParkings = async () => {
    try {
      // Utiliser directement les 2 parkings d'Annaba
      setParkings(getAnnabaParkings())
    } catch (error) {
      console.error("Error loading parkings:", error)
      setParkings(getAnnabaParkings())
    } finally {
      setIsLoading(false)
    }
  }

  // Les 2 seuls parkings disponibles à Annaba
  const getAnnabaParkings = (): Parking[] => [
    {
      id: "parking-centre-ville-annaba",
      name: "Parking Centre-Ville Annaba",
      address: "Place de l'Indépendance, Centre-Ville, Annaba",
      image: "/placeholder.svg?height=240&width=640",
      totalSpots: 80,
      availableSpots: 25,
      pricePerHour: 50, // 50 DA/heure
      latitude: 36.9,
      longitude: 7.7667,
      features: ["Couvert", "Sécurisé", "24h/24", "Centre commercial"],
    },
    {
      id: "parking-aeroport-annaba",
      name: "Parking Aéroport Annaba",
      address: "Aéroport Rabah Bitat, Annaba",
      image: "/placeholder.svg?height=240&width=640",
      totalSpots: 150,
      availableSpots: 45,
      pricePerHour: 50, // 50 DA/heure
      latitude: 36.8222,
      longitude: 7.8092,
      features: ["Aéroport", "Surveillance", "Accessible PMR", "Navettes"],
    },
  ]

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <ParkingList parkings={parkings} />
}
