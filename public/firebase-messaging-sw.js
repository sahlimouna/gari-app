// Service Worker pour Firebase Cloud Messaging
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js")

const firebaseConfig = {
  apiKey: "AIzaSyCv_yTxIDDIRTX4rWDwv_D2pPgYI33gWKk",
  authDomain: "gari-parkinglocal.firebaseapp.com",
  databaseURL: "https://gari-parkinglocal-default-rtdb.firebaseio.com",
  projectId: "gari-parkinglocal",
  storageBucket: "gari-parkinglocal.firebasestorage.app",
  messagingSenderId: "484158155675",
  appId: "1:484158155675:web:9d69bcb0b10085b2cf0f3e",
  measurementId: "G-Z58VSJBWLK"
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log("Message reçu en arrière-plan:", payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon-192x192.png",
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
