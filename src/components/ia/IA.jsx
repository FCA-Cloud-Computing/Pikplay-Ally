import styles from './ia.module.scss'

import { useIAStore } from './IAstore'
import IACharacter from './IACharacter'
import { motion } from "framer-motion"

const IA = (props) => {
    const {
        isVisible,
        IAMessage,
        IAOptions,
        setIsvisible,
        IAExpression,
        IAHTMLMessage,
        IAHTMLSecondMessage
    } = useIAStore((state => state))

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 1 // Tiempo para que cada elemento hijo empiece a salir
            }
        }
    };

    return <div className={`${styles.IAElement} ${!isVisible ? styles.hide : null} `}>
        <div className={styles.box}>
            <div className={styles.title}>
                <b>Pikplay Colombia</b> ¡Hola!
                <div className={styles.hide} onClick={() => setIsvisible(false)}>x</div>
            </div>
            <div className={styles.text}>
                <div className={styles.list}>
                    {IAHTMLMessage && IAHTMLMessage}
                    {IAMessage && IAMessage}
                    {IAHTMLSecondMessage && <p className={styles.IAMessage} dangerouslySetInnerHTML={{ __html: IAHTMLSecondMessage }}></p>}
                    <motion.div
                        animate="visible"
                        className={styles.buttons}
                        initial="hidden"
                        variants={container}>
                        {IAOptions}
                    </motion.div>
                </div>
            </div>
            <IACharacter {...{ IAExpression, setIsvisible }} />
        </div>
    </div>
}

export default IA
