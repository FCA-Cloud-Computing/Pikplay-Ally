import Layout from "@/components/layout/Layout"
import RankingComponent from "@/components/ranking/Ranking"

const Ranking = () => {
    return <Layout>
        <section className="page">
            <h1>Tabla de posiciones</h1>
            <p>Esta es la página de ranking</p>
            <RankingComponent />
        </section>
    </Layout>
}

export default Ranking
