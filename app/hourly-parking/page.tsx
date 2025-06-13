import { BookingForm } from "@/components/booking/booking-form"
import { Header } from "@/components/header"

export default function HourlyParkingPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Header title="Mon parking à l'heure" backUrl="/settings" />
      <div className="mt-6">
        <BookingForm />
      </div>
    </div>
  )
}
