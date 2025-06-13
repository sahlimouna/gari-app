"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr, ar } from "date-fns/locale"
import { CalendarIcon, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function BookingForm() {
  const { t, language } = useLanguage()
  const [bookingType, setBookingType] = useState<"monthly" | "hourly">("hourly")
  const [address, setAddress] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [startTime, setStartTime] = useState("06:00")
  const [endTime, setEndTime] = useState("10:00")

  const vehicleTypes = [
    { value: "car", label: t("car") },
    { value: "motorcycle", label: t("motorcycle") },
    { value: "truck", label: t("truck") },
    { value: "van", label: t("van") },
  ]

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0")
    return `${hour}:00`
  })

  const getDateLocale = () => {
    switch (language) {
      case "fr":
        return fr
      case "ar":
        return ar
      default:
        return undefined
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0">
      <CardContent className="p-6 space-y-6">
        {/* Toggle Au mois / Heure/Jour */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
              bookingType === "monthly"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400",
            )}
            onClick={() => setBookingType("monthly")}
          >
            {t("monthly")}
          </button>
          <button
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
              bookingType === "hourly" ? "bg-pink-500 text-white shadow-sm" : "text-gray-600 dark:text-gray-400",
            )}
            onClick={() => setBookingType("hourly")}
          >
            {t("hourlyDaily")}
          </button>
        </div>

        {/* Adresse */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-600 dark:text-gray-300">
            {t("address")}
          </Label>
          <div className="relative">
            <Input
              id="address"
              placeholder={t("whereToParK")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="pr-10 border-gray-200 dark:border-gray-700"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Type de véhicule */}
        <div className="space-y-2">
          <Label className="text-gray-600 dark:text-gray-300">{t("selectVehicleType")}</Label>
          <Select value={vehicleType} onValueChange={setVehicleType}>
            <SelectTrigger className="border-gray-200 dark:border-gray-700">
              <SelectValue placeholder={t("vehicleType")} />
            </SelectTrigger>
            <SelectContent>
              {vehicleTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dates */}
        <div className="space-y-4">
          {/* Date de début */}
          <div className="space-y-2">
            <Label className="text-gray-600 dark:text-gray-300">{t("start")}</Label>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex-1 justify-start text-left font-normal border-gray-200 dark:border-gray-700",
                      !startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd/MM/yyyy", { locale: getDateLocale() }) : "17/02/2025"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>

              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger className="w-24 border-gray-200 dark:border-gray-700">
                  <SelectValue />
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

          {/* Date de fin */}
          <div className="space-y-2">
            <Label className="text-gray-600 dark:text-gray-300">{t("end")}</Label>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex-1 justify-start text-left font-normal border-gray-200 dark:border-gray-700",
                      !endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd/MM/yyyy", { locale: getDateLocale() }) : "17/02/2025"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>

              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger className="w-24 border-gray-200 dark:border-gray-700">
                  <SelectValue />
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
        </div>

        {/* Bouton Rechercher */}
        <Button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3">{t("search")}</Button>
      </CardContent>
    </Card>
  )
}
