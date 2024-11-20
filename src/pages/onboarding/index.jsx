import Layout from "../../components/layout/Layout"
import Onboarding from "../../components/onboarding/Onboarding"

const OnboardingPage = () => {
    const image = ''
    const descripcion = ''
    const title = 'Te presentamos Pikplay Latam'
    const url = ''
    return <Layout
        image={image}
        descripcion={descripcion}
        title={title}
        url={url}>
        <Onboarding />
    </Layout>
}

export default OnboardingPage
