"use client"

import { useSearchParams } from "next/navigation"
import { QRCodeGenerator } from "@/components/qr/qr-code-generator"
import { ParkingRating } from "@/components/rating/parking-rating"
import { Header } from "@/components/header"
import { useState } from "react"

export default function ReservationSuccessPage() {
  const searchParams = useSearchParams()
  const [showRating, setShowRating] = useState(false)

  const reservationId = searchParams.get("id") || "RES123456789"
  const parkingName = searchParams.get("parking") || "Parking Centre-Ville Annaba"
  const amount = Number.parseFloat(searchParams.get("amount") || "100")

  const startDate = new Date()
  const endDate = new Date(Date.now() + 2 * 60 * 60 * 1000) // +2h

  const handleRatingSubmit = (rating: number, comment: string) => {
    console.log("Rating submitted:", { rating, comment, parkingName })
    setShowRating(false)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Header title="Réservation confirmée" backUrl="/home" />

      <div className="mt-6 space-y-6">
        <QRCodeGenerator
          reservationId={reservationId}
          parkingName={parkingName}
          startDate={startDate}
          endDate={endDate}
          amount={amount}
        />

        {!showRating && (
          <div className="text-center">
            <button onClick={() => setShowRating(true)} className="text-blue-600 hover:text-blue-800 text-sm underline">
              Évaluer ce parking
            </button>
          </div>
        )}

        {showRating && (
          <ParkingRating
            parkingId="parking-centre-ville-annaba"
            parkingName={parkingName}
            onRatingSubmit={handleRatingSubmit}
          />
        )}
      </div>
    </div>
  )
}
