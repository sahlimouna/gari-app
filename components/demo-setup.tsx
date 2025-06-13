"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { createDemoData } from "@/lib/firebase/demo-data"
import { Database, Users, Car } from "lucide-react"

export function DemoSetup() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCreateDemoData = async () => {
    setIsLoading(true)
    try {
      const success = await createDemoData()
      if (success) {
        toast({
          title: "Succès",
          description: "Données de démonstration créées avec succès",
        })
      } else {
        toast({
          title: "Erreur",
          description: "Erreur lors de la création des données de démonstration",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating demo data:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Database className="h-5 w-5" />
          Configuration Démo
        </CardTitle>
        <CardDescription>Créer des données de test pour l'application Gari</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            <span>Comptes utilisateurs de test</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Car className="h-4 w-4" />
            <span>Parkings de démonstration</span>
          </div>
        </div>

        <Button onClick={handleCreateDemoData} disabled={isLoading} className="w-full">
          {isLoading ? "Création en cours..." : "Créer les données de démo"}
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <strong>Comptes créés :</strong>
          </p>
          <p>• admin@gari.com / admin123456</p>
          <p>• user@gari.com / user123456</p>
          <p>• demo@gari.com / demo123456</p>
        </div>
      </CardContent>
    </Card>
  )
}
