"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ParkingDetails } from "./parking-details"
import { getParking } from "@/lib/firebase/firestore"
import type { Parking } from "@/types/parking"
import { Loader2 } from "lucide-react"

interface ParkingDetailsContainerProps {
  parkingId: string
}

export function ParkingDetailsContainer({ parkingId }: ParkingDetailsContainerProps) {
  const router = useRouter()
  const [parking, setParking] = useState<Parking | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadParking()
  }, [parkingId])

  const loadParking = async () => {
    try {
      const parkingData = await getParking(parkingId)
      if (!parkingData) {
        router.push("/home")
        return
      }
      setParking(parkingData)
    } catch (error) {
      console.error("Error loading parking:", error)
      router.push("/home")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (!parking) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Header title={parking.name} backUrl="/home" />
      <ParkingDetails parking={parking} />
    </div>
  )
}
