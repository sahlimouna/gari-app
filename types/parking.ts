export interface Parking {
  id: string
  name: string
  address: string
  image?: string
  totalSpots: number
  availableSpots: number
  pricePerHour: number
  latitude: number
  longitude: number
  features?: string[]
}
