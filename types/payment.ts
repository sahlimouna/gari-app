import type { Timestamp } from "firebase/firestore"

export interface Payment {
  id: string
  userId: string
  reservationId: string
  parkingId: string
  parkingName: string
  amount: number
  status: "pending" | "completed" | "failed"
  date: Timestamp
  paymentMethod?: string
  receiptUrl?: string
}
