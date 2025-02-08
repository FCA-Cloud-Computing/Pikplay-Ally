import styles from './bonusList.module.scss' // eslint-disable-line

import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { formatNumber } from '@/lib/utils';

const BonusList = ({ bonuses }) => {
    debugger;
    return (
        <div className={styles.BonusList}>
            {bonuses.map((bonus, index) => (
                <div className={`shine ${styles.item}`} key={index} /*style={{ backgroundImage: `url(${bonus.backgroundImage})` }}*/>
                    <span className={styles.topMessage}>
                        {/* <img src="/images/icons/gift.svg" alt="gift" /> */}
                        <CardGiftcardIcon />
                        Bono personal
                    </span>
                    {bonus.amount && <div className={styles.amount}>
                        {bonus.amount}
                    </div>}
                    <div className={styles.contentTexts}>
                        <h2>{bonus.title}</h2>
                        <p>{bonus.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BonusList
