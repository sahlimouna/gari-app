export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  notificationsEnabled?: boolean
  createdAt?: Date
  updatedAt?: Date
}
