import { Suspense } from "react"
import LoginClient from "@/components/auth/LoginClient"

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LoginClient />
    </Suspense>
  )
}
