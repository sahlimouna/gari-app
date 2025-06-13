import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, MessageCircle, Phone, Mail } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Header title="Centre d'aide" backUrl="/settings" />

      <div className="mt-6 space-y-6">
        <div className="text-center mb-6">
          <HelpCircle className="h-12 w-12 mx-auto text-blue-500 mb-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Comment pouvons-nous vous aider ?</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              Chat en direct
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Discutez avec notre équipe support en temps réel</p>
            <p className="text-sm text-green-600">Disponible 24h/24</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-green-500" />
              Téléphone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Appelez-nous directement</p>
            <p className="font-semibold text-gray-900 dark:text-white">+213 38 XX XX XX</p>
            <p className="text-sm text-gray-500">Lun-Ven 8h-18h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-500" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Envoyez-nous un email</p>
            <p className="font-semibold text-gray-900 dark:text-white">support@gari-annaba.dz</p>
            <p className="text-sm text-gray-500">Réponse sous 24h</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
