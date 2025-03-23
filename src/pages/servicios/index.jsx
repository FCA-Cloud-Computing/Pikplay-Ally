import styles from "./index.module.scss"

import Layout from "@/components/layout/Layout"
import OurServices from "@/components/ourServices/OurServices"

const Servicios = () => {
    return <Layout>
        <section className={`page ${styles.ServicesPage}`}>
            <h2>Nuestros Servicios</h2>
            <OurServices />
        </section>
    </Layout>
}

export default Servicios
