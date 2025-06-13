const CACHE_NAME = "gari-mobile-v2.0.0"
const STATIC_CACHE = "gari-static-v2.0.0"
const DYNAMIC_CACHE = "gari-dynamic-v2.0.0"

// Ressources critiques à mettre en cache immédiatement
const STATIC_ASSETS = [
  "/",
  "/home",
  "/payment",
  "/notifications",
  "/settings",
  "/welcome",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/_next/static/css/app/layout.css",
  "/_next/static/chunks/webpack.js",
  "/_next/static/chunks/main.js",
]

// Installation du Service Worker
self.addEventListener("install", (event) => {
  console.log("🚀 Gari SW: Installation en cours...")
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("📦 Gari SW: Cache statique ouvert")
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log("✅ Gari SW: Ressources statiques mises en cache")
        return self.skipWaiting()
      }),
  )
})

// Activation du Service Worker
self.addEventListener("activate", (event) => {
  console.log("🔄 Gari SW: Activation en cours...")
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("🗑️ Gari SW: Suppression ancien cache:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("✅ Gari SW: Activation terminée")
        return self.clients.claim()
      }),
  )
})

// Stratégie de cache intelligente
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Ignorer les requêtes non-HTTP
  if (!request.url.startsWith("http")) return

  // Stratégie Cache First pour les ressources statiques
  if (request.destination === "image" || request.url.includes("/_next/static/") || request.url.includes("/icons/")) {
    event.respondWith(cacheFirst(request))
    return
  }

  // Stratégie Network First pour les pages
  if (request.destination === "document") {
    event.respondWith(networkFirst(request))
    return
  }

  // Stratégie Network First pour les API
  if (request.url.includes("/api/")) {
    event.respondWith(networkOnly(request))
    return
  }

  // Par défaut: Network First
  event.respondWith(networkFirst(request))
})

// Cache First Strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.log("❌ Gari SW: Erreur réseau pour:", request.url)
    return new Response("Contenu non disponible hors ligne", {
      status: 503,
      statusText: "Service Unavailable",
    })
  }
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.log("🔄 Gari SW: Fallback cache pour:", request.url)
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Fallback pour les pages
    if (request.destination === "document") {
      const fallback = await caches.match("/")
      if (fallback) return fallback
    }

    return new Response("Page non disponible hors ligne", {
      status: 503,
      statusText: "Service Unavailable",
    })
  }
}

// Network Only Strategy (pour les API)
async function networkOnly(request) {
  return fetch(request)
}

// Gestion des notifications push
self.addEventListener("push", (event) => {
  console.log("📱 Gari SW: Notification push reçue")

  const options = {
    body: event.data ? event.data.text() : "Nouvelle notification Gari",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    vibrate: [200, 100, 200],
    tag: "gari-notification",
    requireInteraction: true,
    data: {
      dateOfArrival: Date.now(),
      primaryKey: Math.random(),
    },
    actions: [
      {
        action: "open",
        title: "Ouvrir",
        icon: "/icons/action-open.png",
      },
      {
        action: "close",
        title: "Fermer",
        icon: "/icons/action-close.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("Gari - Parking Annaba", options))
})

// Gestion des clics sur notifications
self.addEventListener("notificationclick", (event) => {
  console.log("👆 Gari SW: Clic sur notification")
  event.notification.close()

  if (event.action === "open") {
    event.waitUntil(clients.openWindow("/notifications"))
  } else if (event.action === "close") {
    // Ne rien faire, juste fermer
  } else {
    // Clic sur la notification elle-même
    event.waitUntil(
      clients.matchAll({ type: "window" }).then((clientList) => {
        // Si l'app est déjà ouverte, la focus
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) {
            return client.focus()
          }
        }
        // Sinon ouvrir une nouvelle fenêtre
        if (clients.openWindow) {
          return clients.openWindow("/")
        }
      }),
    )
  }
})

// Synchronisation en arrière-plan
self.addEventListener("sync", (event) => {
  console.log("🔄 Gari SW: Synchronisation en arrière-plan")
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Synchroniser les données en attente
  console.log("📡 Gari SW: Synchronisation des données...")
}
