"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Calendar, Lock, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PaymentForm() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Formatage spécial pour le numéro de carte
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "") // Supprimer les espaces existants
        .replace(/\D/g, "") // Garder uniquement les chiffres
        .slice(0, 16) // Limiter à 16 chiffres
        .replace(/(\d{4})(?=\d)/g, "$1 ") // Ajouter un espace tous les 4 chiffres

      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    // Formatage pour le CVV (3 chiffres max)
    if (name === "cvv") {
      const formatted = value.replace(/\D/g, "").slice(0, 3)
      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation simple
    if (!formData.cardNumber || !formData.cardName || !formData.expiryMonth || !formData.expiryYear || !formData.cvv) {
      toast({
        title: t("validationError"),
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simuler un traitement de paiement
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      toast({
        title: "Paiement réussi",
        description: "Votre paiement a été traité avec succès",
      })
    }, 2000)
  }

  // Générer les options pour les mois
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1
    return (
      <SelectItem key={month} value={month.toString().padStart(2, "0")}>
        {month.toString().padStart(2, "0")}
      </SelectItem>
    )
  })

  // Générer les options pour les années
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => {
    const year = currentYear + i
    return (
      <SelectItem key={year} value={year.toString()}>
        {year}
      </SelectItem>
    )
  })

  if (isSuccess) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-2xl font-semibold">Paiement réussi</h3>
            <p className="mb-6 text-muted-foreground">
              Votre paiement a été traité avec succès. Un reçu a été envoyé à votre adresse email.
            </p>
            <Button className="w-full md:w-auto" onClick={() => setIsSuccess(false)}>
              Ajouter une autre carte
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Ajouter une carte de paiement
        </CardTitle>
        <CardDescription>Entrez les informations de votre carte pour effectuer un paiement</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Numéro de carte</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={formData.cardNumber}
                onChange={handleChange}
                className="pl-10"
                required
              />
              <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">Nom sur la carte</Label>
            <Input
              id="cardName"
              name="cardName"
              placeholder="JEAN DUPONT"
              value={formData.cardName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 col-span-2">
              <Label>Date d'expiration</Label>
              <div className="flex gap-2">
                <div className="relative w-full">
                  <Select
                    value={formData.expiryMonth}
                    onValueChange={(value) => handleSelectChange("expiryMonth", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>{months}</SelectContent>
                  </Select>
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                <div className="w-full">
                  <Select
                    value={formData.expiryYear}
                    onValueChange={(value) => handleSelectChange("expiryYear", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="AAAA" />
                    </SelectTrigger>
                    <SelectContent>{years}</SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Traitement en cours..." : "Payer maintenant"}
        </Button>
        <div className="flex items-center justify-center text-xs text-muted-foreground">
          <Lock className="mr-1 h-3 w-3" /> Paiement sécurisé via Stripe
        </div>
      </CardFooter>
    </Card>
  )
}
