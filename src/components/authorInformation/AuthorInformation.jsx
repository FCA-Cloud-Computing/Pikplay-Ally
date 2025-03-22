import { formatNumber } from '@/lib/utils'
import CoinIcon from '../coinIcon/CoinIcon'
import ProfileImage from '../profileImage/ProfileImage'
import styles from './authorInformation.module.scss'
import Button from '../button/Button'
import { useIAStore } from '../ia/IAstore'
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';

export const AuthorInformation = (props) => {
    const {
        aboutHTML,
        aboutHTMLButtonStyle,
        background,
        dividerColor,
        facebook,
        givenPikcoins,
        instagram,
        name,
        storePicture,
        location,
        secondaryColor,
        storeName,
        whatsapp,
    } = props?.authorInformation || {}

    return <div className={`${styles.AuthorComponentPage}`} style={{ ['--backgroundImage']: `url(${background})` }}>
        <div className={styles.content}>
            <ProfileImage picture={storePicture} />
            <br />
            <div className={styles.namePlace}>
                <b>{storeName || name}</b>
                <small style={{ color: dividerColor }}>{location}</small>
            </div>
            <hr style={{ background: dividerColor }} />
            {<div className={styles.creditsGiven}>
                <CoinIcon coins={givenPikcoins} />
                <div>
                    {/* <b>{formatNumber(givenPikcoins)}</b> */}
                    <small>Pikcoins <br />entregadas</small>
                </div>
            </div>}
            <div className={styles.socialContent}>
                <a href={instagram} target="_blank">
                    <InstagramIcon />
                </a>
                <a href={whatsapp} target="_blank">
                    <WhatsAppIcon />
                </a>
                <a href={facebook} target="_blank">
                    <FacebookIcon />
                </a>
            </div>
        </div>
    </div>
}
