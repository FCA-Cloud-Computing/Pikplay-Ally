import styles from './services.module.scss';

const OurServices = () => {
    return (
        <div className={styles.OurServicesComponent}>
            <li className='Card'>
                <span className={styles.icon}>
                    <img src="/images/logos/celu.svg" alt="" />
                </span>
                <div>
                    <b>Integraciones</b>
                    &nbsp;con pasarelas de pagos, recibe pagos en linea, tarjetas de credito/debito, efecty, etc.
                    ADDI, Sistecredito.
                </div>
            </li>
            {/* <li className='Card'>
                <b>Pikcredit</b>
            </li> */}
            <li className='Card'>
                <span className={styles.icon}>
                    <img src="/images/logos/desarrollo.svg" alt="" />
                </span>
                <b>Desarollo a la medida</b>
                &nbsp; facturacion electronica, inventario, contabilidad, etc.
            </li>
            <li className='Card'>
                <span className={styles.icon}>
                    <img src="/images/logos/chatbot.svg" alt="" />
                </span>
                <b>Chatbot</b>
                &nbsp;para mejorar la efiencia en la atencion al cliente. Enfocate en tu negocio y nosotros nos encargamos de la tecnologia.
            </li>
        </div>
    );
}

export default OurServices;
