"use client"
import React from 'react'
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, CheckCircle } from "lucide-react"

interface QRCodeGeneratorProps {
  reservationId: string
  parkingName: string
  startDate: Date
  endDate: Date
  amount: number
}

export function QRCodeGenerator({ reservationId, parkingName, startDate, endDate, amount }: QRCodeGeneratorProps) {
  const [qrCodeData, setQrCodeData] = useState("")

  useEffect(() => {
    // Générer les données du QR Code
    const qrData = {
      reservationId,
      parkingName,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      amount,
      timestamp: Date.now(),
    }
    setQrCodeData(JSON.stringify(qrData))
  }, [reservationId, parkingName, startDate, endDate, amount])

  // Simulation d'un QR Code avec CSS
  const QRCodeDisplay = () => {
    return (
      <div className="w-48 h-48 mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div className="w-full h-full bg-black relative">
          {/* Pattern de QR Code simulé */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&#34;20&#34; height=&#34;20&#34; viewBox=&#34;0 0 20 20&#34; xmlns=&#34;http://www.w3.org/2000/svg&#34;%3E%3Cg fill=&#34;white&#34; fill-opacity=&#34;0.8&#34;%3E%3Crect x=&#34;0&#34; y=&#34;0&#34; width=&#34;2&#34; height=&#34;2&#34;/%3E%3Crect x=&#34;4&#34; y=&#34;0&#34; width=&#34;2&#34; height=&#34;2&#34;/%3E%3Crect x=&#34;8&#34; y=&#34;0&#34; width=&#34;2&#34; height=&#34;2&#34;/%3E%3Crect x=&#34;12&#34; y=&#34;0&#34; width=&#34;2&#34; height=&#34;2&#34;/%3E%3Crect x=&#34;16&#34; y=&#34;0&#34; width=&#34;2&#34; height=&#34;2&#34;/%3E%3C/g%3E%3C/svg%3E')] opacity-80"></div>
  
          {/* Coins */}
          <div className="absolute top-2 left-2 w-6 h-6 border-4 border-white"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-4 border-white"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-4 border-white"></div>
  
          {/* Centre */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded"></div>
        </div>
      </div>
    );
  };
  

  const downloadQRCode = () => {
    // Simulation du téléchargement
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(qrCodeData))
    element.setAttribute("download", `gari-qr-${reservationId}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "QR Code Gari",
          text: `Ma réservation parking: ${parkingName}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Partage annulé")
      }
    } else {
      // Fallback: copier dans le presse-papier
      navigator.clipboard.writeText(qrCodeData)
      alert("QR Code copié dans le presse-papier")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          Réservation confirmée
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Code */}
        <div className="text-center">
          <QRCodeDisplay />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Présentez ce QR Code à l'entrée du parking
          </p>
        </div>

        {/* Détails de la réservation */}
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Parking :</span>
            <span className="font-medium">{parkingName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Arrivée :</span>
            <span className="font-medium">{startDate.toLocaleDateString("fr-FR")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Départ :</span>
            <span className="font-medium">{endDate.toLocaleDateString("fr-FR")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total :</span>
            <span className="font-bold text-green-600">{amount} DA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Réservation :</span>
            <span className="font-mono text-sm">#{reservationId.slice(-8)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={downloadQRCode} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
          <Button variant="outline" onClick={shareQRCode} className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>• Gardez ce QR Code accessible sur votre téléphone</p>
          <p>• Arrivez 5 minutes avant l'heure de réservation</p>
          <p>• En cas de problème, contactez le support</p>
        </div>
      </CardContent>
    </Card>
  )
}
