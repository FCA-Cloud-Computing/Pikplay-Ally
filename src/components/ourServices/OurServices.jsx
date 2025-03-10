import styles from './services.module.scss';

const OurServices = () => {
    return (
        <div className={styles.OurServicesComponent}>
            <li className='Card'>
                <span className={styles.icon}>
                    <img src="https://150800256.v2.pressablecdn.com/wp-content/uploads/2022/01/logo.png" alt="" />
                </span>
                <b>Integraciones</b>
                &nbsp;con pasarelas de pagos, recibe pagos en linea, tarjetas de credito/debito, efecty, etc.
                <br />ADDI, Sistecredito,
            </li>
            {/* <li className='Card'>
                <b>Pikcredit</b>
            </li> */}
            <li className='Card'>
                <span className={styles.icon}>
                    <img src="https://statics.forbes.com.ec/2023/10/653963100ba8c.jpg" alt="" />
                </span>
                <b>Desarollo a la medida</b>
                &nbsp; facturacion electronica, inventario, contabilidad, etc.
            </li>
            <li className='Card'>
                <span className={styles.icon}>
                    <img src="https://img.freepik.com/vector-gratis/chatbot-mensaje-chat-vectorart_78370-4104.jpg" alt="" />
                </span>
                <b>Chatbot</b>
                &nbsp;para mejorar la efiencia en la atencion al cliente. Enfocate en tu negocio y nosotros nos encargamos de la tecnologia.
            </li>
        </div>
    );
}

export default OurServices;
