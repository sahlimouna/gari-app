import { auth } from "./config"
import { signOut as firebaseSignOut } from "firebase/auth"
import { db } from "./config"
import { doc, updateDoc } from "firebase/firestore"

export async function signOut() {
  return firebaseSignOut(auth)
}

export async function updateUserProfile(userId: string, data: any) {
  const userRef = doc(db, "users", userId)
  return updateDoc(userRef, {
    ...data,
    updatedAt: new Date(),
  })
}
