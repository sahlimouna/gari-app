import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, MapPin, Clock, Battery } from "lucide-react"

export default function ChargingStationsPage() {
  const stations = [
    {
      name: "Station Tesla Annaba Centre",
      address: "Place de l'Indépendance, Annaba",
      power: "150 kW",
      available: 3,
      total: 4,
      price: "45 DA/kWh",
    },
    {
      name: "Borne Rapide Aéroport",
      address: "Aéroport Rabah Bitat, Annaba",
      power: "50 kW",
      available: 2,
      total: 2,
      price: "35 DA/kWh",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <Header title="Bornes de recharge électrique" backUrl="/settings" />

      <div className="mt-6 space-y-4">
        <div className="text-center mb-6">
          <Zap className="h-12 w-12 mx-auto text-green-500 mb-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Stations de recharge à Annaba</h2>
          <p className="text-gray-600 dark:text-gray-400">Trouvez et réservez une borne de recharge électrique</p>
        </div>

        {stations.map((station, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{station.name}</h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {station.address}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-semibold">
                    {station.available}/{station.total}
                  </div>
                  <div className="text-xs text-gray-500">disponibles</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Battery className="h-4 w-4 mr-2 text-blue-500" />
                  <span>{station.power}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-orange-500" />
                  <span>{station.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
