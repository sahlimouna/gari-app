import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { ProtectedRoute } from "@/components/protected-route"

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-6">
        <AdminDashboard />
      </div>
    </ProtectedRoute>
  )
}
