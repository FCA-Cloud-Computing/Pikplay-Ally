import styles from './terminosCondiciones.module.scss'

import Layout from "@/components/layout/Layout"

const TerminosCondiciones = () => {
    return <Layout>
        <section className={`${styles.TerminosCondicionesPage} Card page`}>
            <span className={styles.ovalo} />
            <h1>Términos y Condiciones Pikplay</h1>
            <p>Bienvenido a Pikplay. Al convertirse en Aliado Comercial dentro de nuestra plataforma, usted acepta los siguientes Términos y Condiciones. Por favor, léalos detenidamente antes de utilizar nuestros servicios.</p>
            <p>
                <b>1. Objeto del Acuerdo</b>
                Pikplay es una plataforma digital que permite a los Aliados Comerciales ofrecer productos y/o servicios a usuarios a través de dinámicas de gamificación, acumulación de puntos, retos y redenciones. El presente acuerdo regula las condiciones en que el Aliado Comercial participa en dicha plataforma.</p>
            <p>
                <b>2. Redenciones y Comisiones</b>
                Cuando un usuario redime un producto o servicio a través de Pikplay, el Aliado Comercial acepta que:

                Recibirá el 91% del valor total de la transacción.
                Pikplay retendrá el 9% del valor de la transacción como comisión por uso de la plataforma, tecnología y gestión de usuario final.
            </p>
            <p>
                <b>3. Gastos de Aplicativo y Créditos para Usuarios</b>
                Cuando el Aliado Comercial acumule ventas/redenciones a través de la plataforma, se aplicará un cargo adicional por operación tecnológica y sostenimiento del sistema:

                Se deducirá un 2% adicional del total acumulado, correspondiente a los gastos del aplicativo y provisión de créditos para el usuario final.
                Este porcentaje será facturado y/o descontado según el modelo operativo vigente.
            </p>
            <p>
                <b>4. Calidad y Garantía de los Productos/Servicios</b>
                Pikplay no es el proveedor directo de los productos o servicios ofertados por los Aliados Comerciales. En ese sentido:

                El Aliado Comercial es el único responsable por la calidad, idoneidad, cumplimiento, garantía y atención posventa de los productos o servicios ofrecidos.
                Pikplay no será responsable por quejas, reclamos, devoluciones, garantías, insatisfacciones o cualquier otro asunto derivado del consumo o uso de los productos y/o servicios del Aliado Comercial.
                Cualquier inconveniente deberá ser resuelto directamente entre el usuario y el Aliado Comercial.
            </p>
            <p>
                <b>5. Protección de Datos Personales</b>
                Pikplay cumple con lo dispuesto en la Ley 1581 de 2012 y demás normas que regulan la protección de datos personales en Colombia.

                Al registrarse en Pikplay, el Aliado Comercial autoriza el tratamiento de sus datos para fines comerciales, operativos y de contacto, en el marco de la relación entre ambas partes.
                Pikplay se compromete a garantizar la seguridad, confidencialidad e integridad de los datos personales suministrados.
                El Aliado podrá ejercer en cualquier momento sus derechos de acceso, corrección, supresión y revocación, enviando una solicitud al correo oficial de Pikplay o mediante los canales habilitados.
            </p>
            <p>
                <b>6. Modificaciones</b>
                Pikplay se reserva el derecho de modificar los presentes Términos y Condiciones en cualquier momento. Las modificaciones se notificarán por los medios establecidos y se entenderán aceptadas si el Aliado continúa utilizando la plataforma.
            </p>
            <p>
                <b>7. Jurisdicción y Legislación Aplicable</b>
                El presente acuerdo se rige por las leyes de la República de Colombia. En caso de controversia, ambas partes se someterán a la jurisdicción de los jueces y tribunales colombianos.
            </p>
        </section>
    </Layout>
}

export default TerminosCondiciones
