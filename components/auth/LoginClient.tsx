"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase/config"
import { LoginForm } from "@/components/auth/login-form"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LoginClient() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/home"
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(redirectTo)
      } else {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [redirectTo, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Chargement...
      </div>
    )
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-2">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">Gari</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Connectez-vous à votre compte
          </p>
        </div>
        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  )
}
