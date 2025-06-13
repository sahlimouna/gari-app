import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock, Eye, Phone, AlertTriangle, CheckCircle, Camera, UserCheck } from "lucide-react"

export default function SafetyPage() {
  const safetyTips = [
    {
      icon: <Lock className="h-6 w-6 text-blue-500" />,
      title: "Sécurisez votre véhicule",
      description: "Verrouillez toujours votre voiture et ne laissez aucun objet de valeur visible.",
    },
    {
      icon: <Eye className="h-6 w-6 text-green-500" />,
      title: "Vérifiez l'environnement",
      description: "Observez les alentours avant de quitter votre véhicule.",
    },
    {
      icon: <Camera className="h-6 w-6 text-purple-500" />,
      title: "Photographiez votre place",
      description: "Prenez une photo de l'emplacement pour retrouver facilement votre voiture.",
    },
    {
      icon: <UserCheck className="h-6 w-6 text-orange-500" />,
      title: "Vérifiez votre réservation",
      description: "Assurez-vous que votre réservation correspond à l'emplacement.",
    },
  ]

  const emergencyContacts = [
    { service: "Police", number: "17", description: "Urgences sécuritaires" },
    { service: "Protection Civile", number: "14", description: "Secours et urgences" },
    { service: "Support Gari", number: "+213 38 XX XX XX", description: "Assistance technique 24h/24" },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <Header title="Consignes de sécurité" backUrl="/settings" />

      <div className="mt-6 space-y-6">
        {/* Alert principale */}
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <Shield className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            Votre sécurité est notre priorité. Suivez ces consignes pour un stationnement en toute sérénité.
          </AlertDescription>
        </Alert>

        {/* Consignes de sécurité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Consignes de sécurité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safetyTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex-shrink-0">{tip.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sécurité des parkings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-green-500" />
              Sécurité de nos parkings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Surveillance vidéo 24h/24</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Éclairage optimal</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Accès contrôlé</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Personnel de sécurité</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contacts d'urgence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-500" />
              Contacts d'urgence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{contact.service}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{contact.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600 dark:text-red-400">{contact.number}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Que faire en cas de problème */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              En cas de problème
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-1">Vol ou dégradation</h4>
                <p className="text-orange-700 dark:text-orange-300">
                  Contactez immédiatement la police (17) et notre support client
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Problème technique</h4>
                <p className="text-blue-700 dark:text-blue-300">
                  Utilisez le chat en direct dans l'app ou appelez notre support
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">Place occupée</h4>
                <p className="text-green-700 dark:text-green-300">
                  Signalez-le via l'app, nous vous proposerons une alternative
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Note finale */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-0">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Votre sécurité, notre engagement
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Nous travaillons constamment pour améliorer la sécurité de nos parkings et de notre service. N'hésitez pas
              à nous faire part de vos suggestions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
