import { DemoSetup } from "@/components/demo-setup"

export default function SetupPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Gari</h1>
          <p className="text-muted-foreground">Configuration initiale</p>
        </div>
        <DemoSetup />
      </div>
    </div>
  )
}
