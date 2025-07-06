import { DailyPikcoins } from "@/components/dailyPikcoins/DailyPikcoins"
import Layout from "@/components/layout/Layout"

const DailyPikcoinsPage = () => {
    return <Layout>
        <section className="page">
            <DailyPikcoins streak={6} />
        </section>
    </Layout>
}

export default DailyPikcoinsPage
