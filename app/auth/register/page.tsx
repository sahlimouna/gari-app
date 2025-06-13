import { RegisterForm } from "@/components/auth/register-form"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getServerSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function RegisterPage() {
  const session = await getServerSession()

  if (session) {
    redirect("/home")
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-2">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">Gari</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Créez votre compte</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
