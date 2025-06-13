"use client"

import { EnhancedHome } from "@/components/home/enhanced-home"
import type { Parking } from "@/types/parking"

export default function HomePage() {
  // Les 2 parkings d'Annaba - données statiques pour éviter les problèmes de chargement
  const parkings: Parking[] = [
    {
      id: "parking-centre-ville-annaba",
      name: "Parking Centre-Ville Annaba",
      address: "Place de l'Indépendance, Centre-Ville, Annaba",
      image: "/placeholder.svg?height=240&width=640",
      totalSpots: 80,
      availableSpots: 25,
      pricePerHour: 50,
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
      pricePerHour: 50,
      latitude: 36.8222,
      longitude: 7.8092,
      features: ["Aéroport", "Surveillance", "Accessible PMR", "Navettes"],
    },
  ]

  return <EnhancedHome parkings={parkings} />
}
