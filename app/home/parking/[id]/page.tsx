// Utiliser le composant ProtectedRoute et charger les données côté client
import { ParkingDetailsContainer } from "@/components/parking/parking-details-container"
import { ProtectedRoute } from "@/components/protected-route"

export default function ParkingPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <ParkingDetailsContainer parkingId={params.id} />
    </ProtectedRoute>
  )
}
