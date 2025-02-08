import styles from './bonusList.module.scss' // eslint-disable-line
import { motion, AnimatePresence } from "framer-motion"
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

// Custom
import { formatNumber } from '@/lib/utils';
import CoinIcon from '../coinIcon/CoinIcon';
import Button from '../button/Button';
import { useIAStore } from '../ia/IAstore';
import MESSAGES from '../../consts/messages'

const BonusList = ({ bonuses }) => {
    const { setIAMessage } = useIAStore()
    const { CLAIM_IA_MESSAGE } = MESSAGES
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
                    <span className={styles.topMessage}>
                        {/* <img src="/images/icons/gift.svg" alt="gift" /> */}
                        <CardGiftcardIcon />
                        Bono personal
                    </span>
                    {bonus.amount && <div className={styles.amount}>
                        {bonus.amount}
                    </div>}
                    {bonus.image && <div className={styles.image}>
                        <img src={bonus.image} />
                    </div>}
                    {bonus.price && <div className={styles.price}>
                        <CoinIcon coins={bonus.price} />
                    </div>}
                    <div className={styles.contentTexts}>
                        <h2>{bonus.title}</h2>
                        <p>{bonus.description}</p>
                    </div>
                    <div className={styles.actions}>
                        <Button color="blue" onClick={() => setIAMessage(CLAIM_IA_MESSAGE, null, 'neutral_2')}>Redimir</Button>
                        <Button color="link" style={{ color: "white" }}>Compartir</Button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default BonusList
