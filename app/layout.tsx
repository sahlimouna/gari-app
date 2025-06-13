import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { BottomNavigation } from "@/components/bottom-navigation"
import { FirebaseMessaging } from "@/components/firebase-messaging"
import { PWAInstallPrompt } from "@/components/pwa/pwa-install-prompt"
import { OfflineIndicator } from "@/components/pwa/offline-indicator"
import { MobileOptimizations } from "@/components/mobile/mobile-optimizations"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

export const metadata = {
  title: "Gari - Parking Intelligent Annaba | جاري - مواقف ذكية عنابة",
  description:
    "Application mobile de réservation de places de parking à Annaba. Réservez, payez et stationnez en toute simplicité. تطبيق حجز مواقف السيارات في عنابة",
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1e40af" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
    interactiveWidget: "resizes-content",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Gari",
    startupImage: [
      {
        url: "/splash/iphone5_splash.png",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/splash/iphone6_splash.png",
        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/splash/iphoneplus_splash.png",
        media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/splash/iphonex_splash.png",
        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/splash/iphonexr_splash.png",
        media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/splash/iphonexsmax_splash.png",
        media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Gari",
    "application-name": "Gari",
    "msapplication-TileColor": "#1e40af",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-tap-highlight": "no",
    "msapplication-navbutton-color": "#1e40af",
    "msapplication-starturl": "/",
    "full-screen": "yes",
    browsermode: "application",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* PWA Meta Tags Essentiels */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="background-color" content="#1e40af" />

        {/* Apple Touch Icons - Toutes tailles */}
        <link rel="apple-touch-icon" href="/icons/icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />

        {/* Favicons pour tous navigateurs */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Optimisations de performance */}
        <link rel="preload" href="/icons/icon-192x192.png" as="image" />
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Prévention du zoom sur iOS */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="gari-theme"
        >
          <LanguageProvider>
            <AuthProvider>
              <MobileOptimizations />
              <FirebaseMessaging />
              <OfflineIndicator />

              {/* Structure mobile-first */}
              <div className="flex flex-col min-h-screen bg-background text-foreground">
                {/* Zone de contenu principal avec safe areas */}
                <main className="flex-1 pb-16 md:pb-0 safe-area-inset-top safe-area-inset-bottom overflow-x-hidden">
                  {children}
                </main>

                {/* Navigation bottom fixe */}
                <BottomNavigation />
              </div>

              {/* Composants overlay */}
              <PWAInstallPrompt />
              <Toaster />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .then(function(registration) {
                      console.log('✅ Gari SW registered successfully:', registration.scope);
                      
                      // Vérifier les mises à jour
                      registration.addEventListener('updatefound', () => {
                        console.log('🔄 Gari SW: Mise à jour disponible');
                      });
                    })
                    .catch(function(error) {
                      console.log('❌ Gari SW registration failed:', error);
                    });
                });
                
                // Écouter les messages du SW
                navigator.serviceWorker.addEventListener('message', event => {
                  if (event.data && event.data.type === 'CACHE_UPDATED') {
                    console.log('📦 Gari: Cache mis à jour');
                  }
                });
              }
              
              // Prévenir le zoom sur double-tap iOS
              let lastTouchEnd = 0;
              document.addEventListener('touchend', function (event) {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                  event.preventDefault();
                }
                lastTouchEnd = now;
              }, false);
              
              // Optimisation viewport pour mobile
              if (window.screen && window.screen.orientation) {
                window.screen.orientation.addEventListener('change', () => {
                  // Recalculer la hauteur viewport après rotation
                  setTimeout(() => {
                    const vh = window.innerHeight * 0.01;
                    document.documentElement.style.setProperty('--vh', vh + 'px');
                  }, 100);
                });
              }
              
              // Définir la hauteur viewport initiale
              const vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', vh + 'px');
            `,
          }}
        />
      </body>
    </html>
  )
}
