import styles from './bonusList.module.scss' // eslint-disable-line
import { motion } from "framer-motion"

// Custom
import Button from '../button/Button';

const BonusList = ({ bonuses }) => {
    const href = (item) => `https://api.whatsapp.com/send?phone=573204863547&text=¡Hola! Quisiera redimir ${item.title} en Pikplay`

    return (
        <div className={styles.BonusList}>
            {bonuses.map((bonus, index) => (
                <motion.div
                    animate={{ x: 0, }}
                    className={`shine ${styles.item} ${bonus.image ? styles.withImage : ''}`}
                    key={index}
                    initial={{ x: '-400px' }}
                    transition={{ delay: index * 0.3 }}
                /*style={{ backgroundImage: `url(${bonus.backgroundImage})` }}*/>
                    {!bonus.isFavorite
                        ? <img className={styles.leagueIcon} src="/images/insignias/league.svg" alt="" />
                        : <div className={styles.favContent}>
                            <img className={styles.leagueIconFavorite} src="/images/backgrounds/league-top.svg" alt="" />
                            <span>Recomendado</span>
                        </div>}
                    {bonus.amount && <div className={styles.amount}>
                        {bonus.amount}
                    </div>}
                    <div className={styles.contentImageDescription}>
                        <div className={styles.contentTexts}>
                            <h2>{bonus.title}</h2>
                            <p>{bonus.description}</p>
                        </div>
                        {bonus.image && <div className={`m-t-30 ${styles.image}`}>
                            <img src={bonus.image} />
                        </div>}
                    </div>

                    <div className={styles.actions}>
                        <Button color="red">
                            {/* {bonus.price && <div className={styles.price}>
                                        <CoinIcon coins={bonus.price} />
                                    </div>} */}
                            <a target='_blank' href={href(bonus)} >
                                Redimir
                            </a>
                        </Button>
                        <Button color="darkBlue" style={{ color: "white" }}>Compartir</Button>
                    </div>
                    {/* <hr /> */}
                    <div className={styles.terms}>
                        <small>Terminos y condiciones</small>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default BonusList
