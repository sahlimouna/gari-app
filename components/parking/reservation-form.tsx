"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { createReservation, uploadLicensePlateImage } from "@/lib/firebase/firestore"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Camera, Upload } from "lucide-react"
import { auth } from "@/lib/firebase/config"
import type { Parking } from "@/types/parking"

interface ReservationFormProps {
  parking: Parking
}

export function ReservationForm({ parking }: ReservationFormProps) {
  const { t, language } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [licensePlateImage, setLicensePlateImage] = useState<File | null>(null)
  const [userId, setUserId] = useState<string>("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    carBrand: "",
    carColor: "",
    licensePlate: "",
  })

  const startDateParam = searchParams.get("start")
  const endDateParam = searchParams.get("end")
  const startDate = startDateParam ? new Date(startDateParam) : null
  const endDate = endDateParam ? new Date(endDateParam) : null

  useEffect(() => {
    if (!startDate || !endDate) {
      router.push(`/home/parking/${parking.id}`)
    }
  }, [startDate, endDate, parking.id, router])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.uid) setUserId(user.uid)
    })
    return () => unsubscribe()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLicensePlateImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId || !startDate || !endDate) {
      toast({
        title: t("error"),
        description: "Utilisateur non identifié ou dates invalides.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      let imageUrl = null
      if (licensePlateImage) {
        imageUrl = await uploadLicensePlateImage(userId, licensePlateImage)
      }

      await createReservation({
        userId,
        parkingId: parking.id,
        startDate,
        endDate,
        firstName: formData.firstName,
        lastName: formData.lastName,
        carBrand: formData.carBrand,
        carColor: formData.carColor,
        licensePlate: formData.licensePlate,
        licensePlateImageUrl: imageUrl,
        status: "confirmed",
        createdAt: new Date(),
      })

      toast({
        title: t("reservationSuccess"),
        description: t("reservationConfirmed"),
      })

      router.push("/payment")
    } catch (error: any) {
      console.error("❌ Firebase error:", error)
      toast({
        title: t("error"),
        description: error.message || t("errorCreatingReservation"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!startDate || !endDate) return null

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{t("reservationDetails")}</h3>
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t("parking")}</p>
                <p className="font-medium">{parking.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("price")}</p>
                <p className="font-medium">
                  {calculatePrice(startDate, endDate, parking.pricePerHour)} {t("currency")}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t("startDate")}</p>
                <p className="font-medium">{format(startDate, "PPP", { locale: language === "fr" ? fr : undefined })}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("endDate")}</p>
                <p className="font-medium">{format(endDate, "PPP", { locale: language === "fr" ? fr : undefined })}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("firstName")}</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("lastName")}</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="carBrand">{t("carBrand")}</Label>
              <Input id="carBrand" name="carBrand" value={formData.carBrand} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carColor">{t("carColor")}</Label>
              <Input id="carColor" name="carColor" value={formData.carColor} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licensePlate">{t("licensePlate")}</Label>
              <Input id="licensePlate" name="licensePlate" value={formData.licensePlate} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licensePlateImage">{t("licensePlateImage")}</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("licensePlateImage")?.click()}
                  className="w-full"
                >
                  {licensePlateImage ? <Upload className="h-4 w-4 mr-2" /> : <Camera className="h-4 w-4 mr-2" />}
                  {licensePlateImage ? t("imageSelected") : t("takePicture")}
                </Button>
                <input id="licensePlateImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>
              {licensePlateImage && <p className="text-xs text-muted-foreground mt-1">{licensePlateImage.name}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t("processing") : t("confirmReservation")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function calculatePrice(start: Date, end: Date, rate: number): number {
  const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60))
  return hours * rate
}
