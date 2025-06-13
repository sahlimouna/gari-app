"use client"

import { useEffect } from "react"

export function MobileOptimizations() {
  useEffect(() => {
    // Optimisations spécifiques mobile
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setVH()

    const handleResize = () => setVH()
    const handleOrientationChange = () => setTimeout(setVH, 100)

    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleOrientationChange)

    // Optimiser le scroll sur iOS
    document.body.style.webkitOverflowScrolling = "touch"
    document.body.style.overscrollBehavior = "none"

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleOrientationChange)
    }
  }, [])

  return null
}
