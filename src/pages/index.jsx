import Layout from "../components/layout/Layout"
import Onboarding from "../components/onboarding/Onboarding"

const IndexPage = () => {
    const image = ''
    const description = 'Nuestro desafío es hacer que comprar y vender sea mucho más divertido · A través de la gamificación, transformamos la experiencia de compra en algo dinámico y diferente.'
    const title = 'Pikplay: Compra y vende subiendo de nivel'
    const url = ''
    return <Layout
        image={image}
        description={description}
        title={title}
        url={url}>
        <Onboarding />
    </Layout>
}

export default IndexPage;
