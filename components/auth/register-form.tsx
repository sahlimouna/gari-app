"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase/config"
import { createUserProfile } from "@/lib/firebase/firestore"

export function RegisterForm() {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t("registrationError"),
        description: t("passwordsDoNotMatch"),
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: t("registrationError"),
        description: t("passwordTooShort"),
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)

      // Créer le profil utilisateur dans Firestore
      await createUserProfile(userCredential.user.uid, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        createdAt: new Date(),
      })

      toast({
        title: t("registrationSuccess"),
        description: t("accountCreated"),
      })
      router.push("/home")
    } catch (error: any) {
      console.error("Registration error:", error)

      let errorMessage = t("errorCreatingAccount")

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = t("emailAlreadyInUse")
          break
        case "auth/invalid-email":
          errorMessage = t("invalidEmail")
          break
        case "auth/weak-password":
          errorMessage = t("weakPassword")
          break
        default:
          errorMessage = t("errorCreatingAccount")
      }

      toast({
        title: t("registrationError"),
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t("firstName")}</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder={t("firstNamePlaceholder")}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t("lastName")}</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder={t("lastNamePlaceholder")}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="exemple@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t("creating") : t("createAccount")}
      </Button>
      <div className="text-center text-sm">
        {t("alreadyHaveAccount")}{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          {t("login")}
        </Link>
      </div>
    </form>
  )
}
