import { getServerSession } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { Header } from "@/components/header"
import { ReservationForm } from "@/components/parking/reservation-form"
import { getParking } from "@/lib/firebase/firestore"
import type { Metadata } from "next"

interface Parking {
  id: string
  name: string
  // autres propriétés si besoin
}

interface ReservePageProps {
  params: { id: string }
  searchParams: { start?: string; end?: string }
}

// ✅ Correction de generateMetadata (await safe)
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  try {
    const parking = await getParking(params.id)
    return {
      title: parking ? `Réserver - ${parking.name}` : "Réserver un parking",
      description: "Réservez votre place de parking en quelques clics",
    }
  } catch (error) {
    return {
      title: "Réserver un parking",
      description: "Réservez votre place de parking en quelques clics",
    }
  }
}

// ✅ Page principale
export default async function ReservePage({
  params,
  searchParams,
}: ReservePageProps) {
  const session = await getServerSession()

  // Si l'utilisateur n'est pas connecté, on redirige vers login avec retour
  if (!session) {
    const redirectTo = `/home/parking/${params.id}/reserve?start=${searchParams.start || ""}&end=${searchParams.end || ""}`
    redirect(`/auth/login?redirect=${encodeURIComponent(redirectTo)}`)
  }

  // On récupère le parking
  const parking = await getParking(params.id)
  if (!parking) notFound()

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Réserver {parking.name}</h1>
        <ReservationForm
          parking={parking}
          userId={session.user.id}
          start={searchParams.start}
          end={searchParams.end}
        />
      </main>
    </div>
  )
}
