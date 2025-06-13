"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Edit, Trash2, Car, Users, CreditCard } from "lucide-react"
import { getParkings, addParking, updateParking, deleteParking } from "@/lib/firebase/firestore"
import type { Parking } from "@/types/parking"

export function AdminDashboard() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [parkings, setParkings] = useState<Parking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingParking, setEditingParking] = useState<Parking | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    totalSpots: 0,
    availableSpots: 0,
    pricePerHour: 0,
    latitude: 0,
    longitude: 0,
  })

  useEffect(() => {
    loadParkings()
  }, [])

  const loadParkings = async () => {
    try {
      const data = await getParkings()
      setParkings(data)
    } catch (error) {
      console.error("Error loading parkings:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (editingParking) {
        await updateParking(editingParking.id, formData)
        toast({
          title: t("success"),
          description: "Parking mis à jour avec succès",
        })
      } else {
        await addParking(formData)
        toast({
          title: t("success"),
          description: "Parking ajouté avec succès",
        })
      }

      resetForm()
      loadParkings()
    } catch (error) {
      console.error("Error saving parking:", error)
      toast({
        title: t("error"),
        description: "Erreur lors de la sauvegarde",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (parking: Parking) => {
    setEditingParking(parking)
    setFormData({
      name: parking.name,
      address: parking.address,
      totalSpots: parking.totalSpots,
      availableSpots: parking.availableSpots,
      pricePerHour: parking.pricePerHour,
      latitude: parking.latitude,
      longitude: parking.longitude,
    })
    setShowAddForm(true)
  }

  const handleDelete = async (parkingId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce parking ?")) {
      try {
        await deleteParking(parkingId)
        toast({
          title: t("success"),
          description: "Parking supprimé avec succès",
        })
        loadParkings()
      } catch (error) {
        console.error("Error deleting parking:", error)
        toast({
          title: t("error"),
          description: "Erreur lors de la suppression",
          variant: "destructive",
        })
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      totalSpots: 0,
      availableSpots: 0,
      pricePerHour: 0,
      latitude: 0,
      longitude: 0,
    })
    setEditingParking(null)
    setShowAddForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("Spots") || name.includes("price") || name.includes("latitude") || name.includes("longitude")
          ? Number.parseFloat(value) || 0
          : value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Administration Gari</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un parking
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Parkings</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parkings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Places Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parkings.reduce((sum, p) => sum + p.totalSpots, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Places Disponibles</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parkings.reduce((sum, p) => sum + p.availableSpots, 0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Formulaire d'ajout/modification */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingParking ? "Modifier le parking" : "Ajouter un parking"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du parking</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalSpots">Places totales</Label>
                  <Input
                    id="totalSpots"
                    name="totalSpots"
                    type="number"
                    value={formData.totalSpots}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availableSpots">Places disponibles</Label>
                  <Input
                    id="availableSpots"
                    name="availableSpots"
                    type="number"
                    value={formData.availableSpots}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pricePerHour">Prix/heure (€)</Label>
                  <Input
                    id="pricePerHour"
                    name="pricePerHour"
                    type="number"
                    step="0.1"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Sauvegarde..." : editingParking ? "Modifier" : "Ajouter"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Liste des parkings */}
      <Card>
        <CardHeader>
          <CardTitle>Parkings existants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {parkings.map((parking) => (
              <div key={parking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{parking.name}</h3>
                  <p className="text-sm text-muted-foreground">{parking.address}</p>
                  <p className="text-sm">
                    {parking.availableSpots}/{parking.totalSpots} places • {parking.pricePerHour}€/h
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(parking)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(parking.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
