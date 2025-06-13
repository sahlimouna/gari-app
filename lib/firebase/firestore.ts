import { db, storage } from "./config"
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import type { Parking } from "@/types/parking"
import type { Payment } from "@/types/payment"
import type { Notification } from "@/types/notification"
import type { UserProfile } from "@/types/user"
import { Timestamp } from "firebase/firestore"
import { auth } from "./config" 

// Parkings
export async function getParkings(): Promise<Parking[]> {
  try {
    const parkingsRef = collection(db, "parkings")
    const snapshot = await getDocs(parkingsRef)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Parking[]
  } catch (error) {
    console.error("Error getting parkings:", error)
    return [] // Retourner un tableau vide en cas d'erreur
  }
}

export async function getParking(id: string): Promise<Parking | null> {
  try {
    const parkingRef = doc(db, "parkings", id)
    const parkingDoc = await getDoc(parkingRef)

    if (!parkingDoc.exists()) {
      return null
    }

    return {
      id: parkingDoc.id,
      ...parkingDoc.data(),
    } as Parking
  } catch (error) {
    console.error("Error getting parking:", error)
    return null
  }
}

// Ajouter les fonctions d'administration des parkings
export async function addParking(data: any) {
  try {
    const parkingsRef = collection(db, "parkings")
    return addDoc(parkingsRef, {
      ...data,
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error adding parking:", error)
    throw error
  }
}

export async function updateParking(parkingId: string, data: any) {
  try {
    const parkingRef = doc(db, "parkings", parkingId)
    return updateDoc(parkingRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating parking:", error)
    throw error
  }
}

export async function deleteParking(parkingId: string) {
  try {
    const parkingRef = doc(db, "parkings", parkingId)
    return deleteDoc(parkingRef)
  } catch (error) {
    console.error("Error deleting parking:", error)
    throw error
  }
}

// Reservations
export async function checkAvailability(parkingId: string, startDate: Date, endDate: Date): Promise<boolean> {
  try {
    // Vérifier la disponibilité dans Firestore
    const parkingRef = doc(db, "parkings", parkingId)
    const parkingDoc = await getDoc(parkingRef)

    if (!parkingDoc.exists()) {
      return false
    }

    const parking = parkingDoc.data() as Parking

    // Vérifier s'il y a des places disponibles
    if (parking.availableSpots <= 0) {
      return false
    }

    // Vérifier les réservations existantes pour cette période
    const reservationsRef = collection(db, "reservations")
    const q = query(
      reservationsRef,
      where("parkingId", "==", parkingId),
      where("status", "==", "confirmed"),
      where("startDate", "<=", endDate),
      where("endDate", ">=", startDate),
    )

    const snapshot = await getDocs(q)
    const conflictingReservations = snapshot.size

    // Si le nombre de réservations en conflit est inférieur au nombre de places disponibles
    return conflictingReservations < parking.availableSpots
  } catch (error) {
    console.error("Error checking availability:", error)
    return true // Par défaut, considérer comme disponible en cas d'erreur
  }
}

export async function createReservation(data: any) {
  try {
    const user = auth.currentUser
    if (!user) throw new Error("Utilisateur non connecté")
    const reservationsRef = collection(db, "reservations")

    const reservationData = {
      userId: data.userId, // ضروري وضعه أولًا وقبل serverTimestamp()
      parkingId: data.parkingId,
      startDate: data.startDate,
      endDate: data.endDate,
      firstName: data.firstName,
      lastName: data.lastName,
      carBrand: data.carBrand,
      carColor: data.carColor,
      licensePlate: data.licensePlate,
      licensePlateImageUrl: data.licensePlateImageUrl || null,
      status: data.status || "confirmed",
      createdAt: serverTimestamp(),
    }

    const docRef = await addDoc(reservationsRef, reservationData)

    // تحديث عدد الأماكن المتوفرة
    const parkingRef = doc(db, "parkings", data.parkingId)
    const parkingDoc = await getDoc(parkingRef)

    if (parkingDoc.exists()) {
      const parking = parkingDoc.data() as Parking
      await updateDoc(parkingRef, {
        availableSpots: Math.max(0, parking.availableSpots - 1),
      })
    }

    return docRef.id
  } catch (error) {
    console.error("Error creating reservation:", error)
    throw error
  }
}


export async function uploadLicensePlateImage(userId: string, file: File): Promise<string> {
  try {
    const storageRef = ref(storage, `license-plates/${userId}/${Date.now()}-${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    return getDownloadURL(snapshot.ref)
  } catch (error) {
    console.error("Error uploading license plate image:", error)
    throw error
  }
}

// User Profile
export async function createUserProfile(userId: string, data: any) {
  try {
    const userRef = doc(db, "users", userId)
    await setDoc(userRef, {
      ...data,
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error creating user profile:", error)
    throw error
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile> {
  try {
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      return {
        id: userId,
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        notificationsEnabled: true,
      }
    }

    return {
      id: userDoc.id,
      ...userDoc.data(),
    } as UserProfile
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

// Payments - Retourner directement les données de démonstration
export async function getUserPayments(userId: string): Promise<Payment[]> {
  console.log("Getting demo payments for user:", userId)

  // Retourner directement les données de démonstration d'Annaba
  return [
    {
      id: "annaba-payment-1",
      userId,
      reservationId: "annaba-reservation-1",
      parkingId: "parking-centre-ville-annaba",
      parkingName: "Parking Centre-Ville Annaba",
      amount: 100.0, // 100 DA pour 2h
      status: "completed",
      date: Timestamp.fromDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)), // 5 jours ago
      paymentMethod: "CIB",
      receiptUrl: "#",
    },
    {
      id: "annaba-payment-2",
      userId,
      reservationId: "annaba-reservation-2",
      parkingId: "parking-aeroport-annaba",
      parkingName: "Parking Aéroport Annaba",
      amount: 200.0, // 200 DA pour 4h
      status: "completed",
      date: Timestamp.fromDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)), // 2 jours ago
      paymentMethod: "EDAHABIA",
      receiptUrl: "#",
    },
    {
      id: "annaba-payment-3",
      userId,
      reservationId: "annaba-reservation-3",
      parkingId: "parking-centre-ville-annaba",
      parkingName: "Parking Centre-Ville Annaba",
      amount: 150.0, // 150 DA pour 3h
      status: "pending",
      date: Timestamp.fromDate(new Date(Date.now() - 2 * 60 * 60 * 1000)), // 2 heures ago
      paymentMethod: "CIB",
    },
    {
      id: "annaba-payment-4",
      userId,
      reservationId: "annaba-reservation-4",
      parkingId: "parking-aeroport-annaba",
      parkingName: "Parking Aéroport Annaba",
      amount: 100.0, // 100 DA pour 2h
      status: "completed",
      date: Timestamp.fromDate(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)), // 10 jours ago
      paymentMethod: "EDAHABIA",
      receiptUrl: "#",
    },
    {
      id: "annaba-payment-5",
      userId,
      reservationId: "annaba-reservation-5",
      parkingId: "parking-centre-ville-annaba",
      parkingName: "Parking Centre-Ville Annaba",
      amount: 100.0, // 100 DA pour 2h
      status: "failed",
      date: Timestamp.fromDate(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)), // 1 jour ago
      paymentMethod: "CIB",
    },
  ]
}

// Notifications - Retourner directement les données de démonstration
export async function getUserNotifications(userId: string): Promise<Notification[]> {
  console.log("Getting demo notifications for user:", userId)

  // Retourner directement les données de démonstration
  return [
    {
      id: "demo-notif-1",
      userId,
      title: "Réservation confirmée",
      message: "Votre réservation au Parking Centre-Ville Annaba a été confirmée pour demain à 14h00.",
      read: false,
      date: Timestamp.fromDate(new Date(Date.now() - 2 * 60 * 60 * 1000)), // 2 heures ago
      type: "reservation",
      relatedId: "demo-reservation-1",
    },
    {
      id: "demo-notif-2",
      userId,
      title: "Paiement effectué",
      message: "Votre paiement de 100 DA a été traité avec succès via CIB.",
      read: true,
      date: Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000)), // 1 jour ago
      type: "payment",
      relatedId: "demo-payment-1",
    },
    {
      id: "demo-notif-3",
      userId,
      title: "Bienvenue sur Gari Annaba",
      message: "Merci de vous être inscrit sur Gari. Découvrez nos parkings à Annaba !",
      read: true,
      date: Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)), // 7 jours ago
      type: "system",
    },
    {
      id: "demo-notif-4",
      userId,
      title: "Promotion spéciale Annaba",
      message: "Profitez de -20% sur votre prochaine réservation avec le code ANNABA20.",
      read: false,
      date: Timestamp.fromDate(new Date(Date.now() - 12 * 60 * 60 * 1000)), // 12 heures ago
      type: "system",
    },
  ]
}
