import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "./config"
import { createUserProfile, addParking } from "./firestore"

// Fonction pour créer des données de démonstration
export async function createDemoData() {
  try {
    // Créer un utilisateur admin de démonstration
    const adminCredential = await createUserWithEmailAndPassword(auth, "admin@gari.com", "admin123456")

    await createUserProfile(adminCredential.user.uid, {
      firstName: "Admin",
      lastName: "Gari",
      email: "admin@gari.com",
      role: "admin",
      createdAt: new Date(),
    })

    // Créer un utilisateur normal de démonstration
    const userCredential = await createUserWithEmailAndPassword(auth, "user@gari.com", "user123456")

    await createUserProfile(userCredential.user.uid, {
      firstName: "Utilisateur",
      lastName: "Test",
      email: "user@gari.com",
      role: "user",
      createdAt: new Date(),
    })

    // Ajouter des parkings de démonstration
    const parkings = [
      {
        name: "Parking Centre-Ville",
        address: "123 Rue de la République, Paris",
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
        totalSpots: 120,
        availableSpots: 8,
        pricePerHour: 4.5,
        latitude: 48.8698,
        longitude: 2.3076,
        features: ["Centre commercial", "Lavage auto", "Recharge électrique"],
      },
    ]

    for (const parking of parkings) {
      await addParking(parking)
    }

    console.log("Données de démonstration créées avec succès")
    return true
  } catch (error) {
    console.error("Erreur lors de la création des données de démonstration:", error)
    return false
  }
}
