import { useEffect, useState } from "react"
import { timeAgo } from "@/lib/utils"

export const useCooldown = () => {
  const coolDown = JSON.parse(localStorage?.getItem("coolDown"))
  const [isCooldown, setIsCooldown] = useState(coolDown?.isCooldown || false)

  useEffect(() => {
    const interval = setInterval(() => {
      const timeout = timeAgo(coolDown?.ago).includes("minutos")
      if (timeout && coolDown?.isCooldown) {
        setIsCooldown(false)
        localStorage.setItem(
          "coolDown",
          JSON.stringify({ isCooldown: false, ago: null })
        )
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const triggerCooldown = () => {
    setIsCooldown(true)
    const cooldownData = { isCooldown: true, ago: Date.now() }
    localStorage.setItem("coolDown", JSON.stringify(cooldownData))
  }

  return { isCooldown, triggerCooldown }
}
