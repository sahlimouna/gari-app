import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, CreditCard, Car, CheckCircle, MapPin } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-blue-500" />,
      title: "1. Recherchez",
      description: "Trouvez un parking près de votre destination à Annaba",
      details: "Utilisez notre carte interactive ou recherchez par adresse",
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-500" />,
      title: "2. Réservez",
      description: "Choisissez vos dates et heures de stationnement",
      details: "Sélectionnez la durée qui vous convient, de 1h à plusieurs jours",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-purple-500" />,
      title: "3. Payez",
      description: "Réglez en ligne de manière sécurisée",
      details: "Paiement par CIB, EDAHABIA ou carte bancaire",
    },
    {
      icon: <Car className="h-8 w-8 text-orange-500" />,
      title: "4. Stationnez",
      description: "Rendez-vous au parking et garez-vous",
      details: "Présentez votre QR code à l'entrée du parking",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <Header title="Comment ça marche" backUrl="/settings" />

      <div className="mt-6 space-y-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Garer sa voiture n'a jamais été aussi simple
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Découvrez comment réserver votre place de parking en 4 étapes simples
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{step.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{step.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{step.details}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-0">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">C'est parti !</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Vous êtes maintenant prêt à utiliser Gari pour tous vos besoins de stationnement à Annaba.
            </p>
            <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-1" />
              Disponible à Annaba uniquement
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
