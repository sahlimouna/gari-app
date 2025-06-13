import { auth } from "./firebase/config"
import { onAuthStateChanged, type User } from "firebase/auth"

export async function getServerSession() {
  // Pour une implémentation simplifiée, nous retournons null côté serveur
  // Dans une vraie application, vous utiliseriez Firebase Admin SDK
  return null
}

export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}
