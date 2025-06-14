import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getMessaging } from "firebase/messaging"
import { doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: AIzaSyCv_yTxIDDIRTX4rWDwv_D2pPgYI33gWKk,
  authDomain: gari-parkinglocal.firebaseapp.com,
  projectId: gari-parkinglocal,
  storageBucket: gari-parkinglocal.firebasestorage.app,
  messagingSenderId: 484158155675,
  appId:1:484158155675:web:9d69bcb0b10085b2cf0f3e,
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// Initialize Firebase services
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Initialize Firebase Cloud Messaging (only on client side)
let messaging: any = null
if (typeof window !== "undefined") {
  try {
    messaging = getMessaging(app)
  } catch (error) {
    console.error("Firebase messaging failed to initialize", error)
  }
}

if (auth.currentUser) {
  const userRef = doc(db, "users", auth.currentUser.uid)
  const userSnap = await getDoc(userRef)
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: auth.currentUser.email,
      createdAt: new Date(),
      // ...autres infos
    })
  }
}

export { app, auth, db, storage, messaging }
