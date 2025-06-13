import { db } from "./config"
import { collection, addDoc } from "firebase/firestore"

// Fonction pour initialiser des données de test
export async function seedParkings() {
  const parkings = [
    {
      name: "Parking Centre-Ville",
      address: "123 Rue de la République, Paris",
      image: "/placeholder.svg?height=240&width=640",
      totalSpots: 50,
      availableSpots: 12,
      pricePerHour: 2.5,
      latitude: 48.8566,
      longitude: 2.3522,
      features: ["Couvert", "Sécurisé", "24h/24"],
    },
    {
      name: "Parking Gare du Nord",
      address: "Place Napoléon III, Paris",
      image: "/placeholder.svg?height=240&width=640",
      totalSpots: 80,
      availableSpots: 25,
      pricePerHour: 3.0,
      latitude: 48.8808,
      longitude: 2.3555,
      features: ["Proche transport", "Surveillance", "Accessible PMR"],
    },
    {
      name: "Parking Champs-Élysées",
      address: "Avenue des Champs-Élysées, Paris",
      image: "/placeholder.svg?height=240&width=640",
      totalSpots: 120,
      availableSpots: 8,
      pricePerHour: 4.5,
      latitude: 48.8698,
      longitude: 2.3076,
      features: ["Centre commercial", "Lavage auto", "Recharge électrique"],
    },
    {
      name: "Parking Montparnasse",
      address: "Boulevard du Montparnasse, Paris",
      image: "/placeholder.svg?height=240&width=640",
      totalSpots: 60,
      availableSpots: 18,
      pricePerHour: 2.8,
      latitude: 48.8422,
      longitude: 2.3219,
      features: ["Souterrain", "Sécurisé", "Proche métro"],
    },
  ]

  const parkingsRef = collection(db, "parkings")

  for (const parking of parkings) {
    try {
      await addDoc(parkingsRef, parking)
      console.log("Parking ajouté:", parking.name)
    } catch (error) {
      console.error("Erreur lors de l'ajout du parking:", error)
    }
  }
}

// Appeler cette fonction une seule fois pour initialiser les données
// seedParkings()
