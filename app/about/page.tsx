import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, MapPin, Users, Zap, Heart, Star, Award, Target } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: <Car className="h-6 w-6 text-blue-500" />,
      title: "Parking intelligent",
      description: "Système de réservation en temps réel",
    },
    {
      icon: <MapPin className="h-6 w-6 text-green-500" />,
      title: "Géolocalisation",
      description: "Trouvez le parking le plus proche",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Bornes électriques",
      description: "Rechargez votre véhicule électrique",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: "Communauté",
      description: "Plus de 10,000 utilisateurs à Annaba",
    },
  ]

  const stats = [
    { number: "2", label: "Parkings partenaires", icon: <Car className="h-5 w-5" /> },
    { number: "230", label: "Places disponibles", icon: <MapPin className="h-5 w-5" /> },
    { number: "10K+", label: "Utilisateurs actifs", icon: <Users className="h-5 w-5" /> },
    { number: "4.8", label: "Note moyenne", icon: <Star className="h-5 w-5" /> },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <Header title="À propos" backUrl="/settings" />

      <div className="mt-6 space-y-6">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white border-0">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Gari</h1>
            <p className="text-blue-100 text-lg mb-4">L'application de parking intelligent d'Annaba</p>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Version 2.0.0
            </Badge>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Notre Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Gari révolutionne le stationnement à Annaba en offrant une solution moderne, simple et efficace pour
              trouver et réserver une place de parking. Notre objectif est de réduire le stress lié au stationnement et
              de contribuer à une mobilité urbaine plus fluide.
            </p>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" />
              Nos Chiffres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-center mb-2 text-blue-500">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fonctionnalités */}
        <Card>
          <CardHeader>
            <CardTitle>Nos Fonctionnalités</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Équipe */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Fait avec ❤️ à Annaba
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Gari est développé par une équipe passionnée basée à Annaba, qui connaît parfaitement les défis du
              stationnement dans notre belle ville.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Développement :</span>
                <span className="font-medium">Équipe Gari Annaba</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Contact :</span>
                <span className="font-medium">contact@gari-annaba.dz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Support :</span>
                <span className="font-medium">support@gari-annaba.dz</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remerciements */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Merci de votre confiance !</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Ensemble, nous rendons Annaba plus accessible et plus moderne. Votre feedback nous aide à nous améliorer
              chaque jour.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
