"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { PaymentHistory } from "./payment-history"
import { PaymentForm } from "./payment-form"
import { getUserPayments } from "@/lib/firebase/firestore"
import type { Payment } from "@/types/payment"
import { Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PaymentContainer() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = async () => {
    try {
      // Utiliser un ID utilisateur par défaut pour les données de démo
      const paymentsData = await getUserPayments("demo-user")
      setPayments(paymentsData)
    } catch (error) {
      console.error("Error loading payments:", error)
      setPayments([])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Header title="Paiements" />
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Header title="Paiements" />

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="card">Carte de paiement</TabsTrigger>
          <TabsTrigger value="about">À propos</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <PaymentHistory payments={payments} />
        </TabsContent>

        <TabsContent value="card">
          <PaymentForm />
        </TabsContent>

        <TabsContent value="about">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">À propos de Gari</h2>
              <p className="text-muted-foreground mb-6">Application de réservation de parking pour la ville d'Annaba</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Version</h3>
                <p className="text-sm text-muted-foreground">1.0.0</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Développeur</h3>
                <p className="text-sm text-muted-foreground">Équipe Gari Annaba</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Contact</h3>
                <p className="text-sm text-muted-foreground">support@gari-annaba.dz</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Ville</h3>
                <p className="text-sm text-muted-foreground">Annaba, Algérie</p>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-4">Fonctionnalités</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Réservation de places de parking en temps réel</li>
                <li>• Paiement sécurisé avec CIB et EDAHABIA</li>
                <li>• Notifications push pour vos réservations</li>
                <li>• Interface multilingue (Français/Arabe)</li>
                <li>• Géolocalisation des parkings</li>
                <li>• Historique des paiements</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
