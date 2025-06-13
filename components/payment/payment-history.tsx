"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Payment } from "@/types/payment"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CreditCard, Download, CheckCircle, Clock, XCircle, Receipt } from "lucide-react"

interface PaymentHistoryProps {
  payments: Payment[]
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  const { t, language } = useLanguage()

  // Fonction pour obtenir l'icône et la couleur selon le statut
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: "text-green-600",
          bgColor: "bg-green-50",
          label: "Payé",
        }
      case "pending":
        return {
          icon: <Clock className="h-4 w-4" />,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          label: "En attente",
        }
      case "failed":
        return {
          icon: <XCircle className="h-4 w-4" />,
          color: "text-red-600",
          bgColor: "bg-red-50",
          label: "Échoué",
        }
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          label: status,
        }
    }
  }

  // Calculer les statistiques
  const totalAmount = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)
  const completedPayments = payments.filter((p) => p.status === "completed").length
  const pendingPayments = payments.filter((p) => p.status === "pending").length

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total payé</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmount.toFixed(0)} DA</div>
            <p className="text-xs text-muted-foreground">Dinars Algériens</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements réussis</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedPayments}</div>
            <p className="text-xs text-muted-foreground">Transactions terminées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>
      </div>

      {/* Historique */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Historique des paiements - Annaba
          </CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucun paiement effectué</p>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => {
                const statusInfo = getStatusInfo(payment.status)
                return (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${statusInfo.bgColor}`}>
                        <div className={statusInfo.color}>{statusInfo.icon}</div>
                      </div>
                      <div>
                        <h3 className="font-medium">{payment.parkingName}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>
                            {format(payment.date.toDate(), "PPP", { locale: language === "fr" ? fr : undefined })}
                          </span>
                          <span>•</span>
                          <span>{payment.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="font-semibold text-lg">{payment.amount.toFixed(0)} DA</p>
                        <Badge variant={payment.status === "completed" ? "default" : "secondary"} className="text-xs">
                          {statusInfo.label}
                        </Badge>
                      </div>
                      {payment.status === "completed" && payment.receiptUrl && (
                        <Button variant="outline" size="sm" onClick={() => window.open(payment.receiptUrl, "_blank")}>
                          <Download className="h-4 w-4 mr-1" />
                          Reçu
                        </Button>
                      )}
                      {payment.status === "failed" && (
                        <Button variant="outline" size="sm">
                          Réessayer
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
