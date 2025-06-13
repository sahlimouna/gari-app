import type { Timestamp } from "firebase/firestore"

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  read: boolean
  date: Timestamp
  type: "reservation" | "payment" | "system"
  relatedId?: string
}
