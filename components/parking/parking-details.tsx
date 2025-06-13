"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addDays } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, MapPin, Car, Clock, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Parking } from "@/types/parking"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ParkingDetailsProps {
  parking: Parking
}

export function ParkingDetails({ parking }: ParkingDetailsProps) {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 1))
  const [startTime, setStartTime] = useState<string>("09:00")
  const [endTime, setEndTime] = useState<string>("17:00")
  const [isChecking, setIsChecking] = useState(false)

  // Générer les options d'heures
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0")
    return `${hour}:00`
  })

  const calculateDuration = () => {
    if (!startDate || !endDate || !startTime || !endTime) return 0

    const start = new Date(startDate)
    const [startHour] = startTime.split(":").map(Number)
    start.setHours(startHour, 0, 0, 0)

    const end = new Date(endDate)
    const [endHour] = endTime.split(":").map(Number)
    end.setHours(endHour, 0, 0, 0)

    const diffMs = end.getTime() - start.getTime()
    return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60))) // Minimum 1 heure
  }

  const calculatePrice = () => {
    const duration = calculateDuration()
    return duration * parking.pricePerHour
  }

  const handleReservation = async () => {
    if (!startDate || !endDate || !startTime || !endTime) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez sélectionner toutes les dates et heures",
        variant: "destructive",
      })
      return
    }

    const start = new Date(startDate)
    const [startHour] = startTime.split(":").map(Number)
    start.setHours(startHour, 0, 0, 0)

    const end = new Date(endDate)
    const [endHour] = endTime.split(":").map(Number)
    end.setHours(endHour, 0, 0, 0)

    if (start >= end) {
      toast({
        title: "Erreur de validation",
        description: "La date/heure de fin doit être après le début",
        variant: "destructive",
      })
      return
    }

    setIsChecking(true)

    // Simuler une vérification
    setTimeout(() => {
      setIsChecking(false)
      router.push(`/home/parking/${parking.id}/reserve?start=${start.toISOString()}&end=${end.toISOString()}`)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="h-60 bg-muted relative rounded-lg overflow-hidden">
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full">
          {parking.availableSpots} places disponibles
        </div>
        <img
          src={parking.image || "/placeholder.svg?height=240&width=640"}
          alt={parking.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">{parking.name}</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{parking.address}</span>
          </div>
          <div className="flex items-center">
            <Car className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{parking.totalSpots} places totales</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{parking.pricePerHour} DA/heure</span>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Choisir les dates de réservation</h3>

          {/* Date et heure de début */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date et heure d'arrivée</label>
              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP", { locale: fr }) : "Date d'arrivée"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>

                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Heure" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date et heure de fin */}
            <div>
              <label className="block text-sm font-medium mb-2">Date et heure de départ</label>
              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP", { locale: fr }) : "Date de départ"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => date < (startDate || new Date(new Date().setHours(0, 0, 0, 0)))}
                    />
                  </PopoverContent>
                </Popover>

                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Heure" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Résumé de la réservation */}
            {startDate && endDate && startTime && endTime && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Résumé de la réservation</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Durée :</span>
                    <span className="font-medium">{calculateDuration()} heure(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prix par heure :</span>
                    <span className="font-medium">{parking.pricePerHour} DA</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total :</span>
                    <span className="text-primary">{calculatePrice()} DA</span>
                  </div>
                </div>
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleReservation}
              disabled={!startDate || !endDate || !startTime || !endTime || isChecking}
            >
              {isChecking ? "Vérification..." : "Réserver maintenant"}
            </Button>

            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                Sélectionnez vos dates et heures d'arrivée et de départ. Le paiement se fait en Dinars Algériens (DA)
                via CIB ou EDAHABIA.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
