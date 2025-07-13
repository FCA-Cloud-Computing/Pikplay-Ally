import { DailyPikcoins } from "@/components/dailyPikcoins/DailyPikcoins"
import Layout from "@/components/layout/Layout"
import { getDailyPikcoins } from "@/services/daily-pikcoins/daily-pikcoins"
import { useState } from "react"

const DailyPikcoinsPage = () => {
  const [dailyPikcoins, setDailyPikcoins] = useState(null)
    
  useEffect(() => {
    getDailyPikcoins().then((data) => {
      setDailyPikcoins(data)
    })
  }, [])
  
  return (
    <Layout>
      <section className="page">
        <DailyPikcoins streak={6} />
      </section>
    </Layout>
  )
}

export default DailyPikcoinsPage
