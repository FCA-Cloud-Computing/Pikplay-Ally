import { getSellerHomeSrv, getUsersSrv } from "@/services/user/user"
import Layout from "../components/layout/Layout"
import Onboarding from "../components/onboarding/Onboarding"

const IndexPage = (props) => {
    const { sellersInformation } = props
    const image = ''
    const description = 'Nuestro desafío es hacer que comprar y vender sea mucho más divertido · A través de la gamificación, transformamos la experiencia de compra en algo dinámico y diferente.'
    const title = 'Pikplay: Compra y Vende Subiendo de Nivel'
    const url = ''
    return <Layout
        image={image}
        description={description}
        title={title}
        url={url}>
        <Onboarding sellersInformation={sellersInformation.data} />
    </Layout>
}

IndexPage.getInitialProps = async (ctx) => {
    let sellersInformation
    try {
        sellersInformation = await getSellerHomeSrv(ctx)

    } catch (error) {
        sellersInformation = []
        console.error("Error fetching sellers information:", error);
    }

    return {
        sellersInformation,
    }
}

export default IndexPage;
