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
        picture,
        place,
        secondaryColor,
        whatsapp,
    } = props?.authorInformation || {}
    const { setIAMessage } = useIAStore()

    return <div className={`${styles.AuthorComponentPage}`} style={{ ['--backgroundImage']: `url(${background})` }}>
        <div className={styles.content}>
            <ProfileImage picture={picture} />
            <br />
            <div className={styles.namePlace}>
                <b>{name}</b>
                <small style={{ color: dividerColor }}>{place}, Colombia</small>
            </div>
            <hr style={{ background: dividerColor }} />
            {<div className={styles.creditsGiven}>
                <CoinIcon />
                <div>
                    <b>{formatNumber(givenPikcoins)}</b>
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
            <div className={styles.aboutMe}>
                <Button color='link' style={aboutHTMLButtonStyle} onClick={() => setIAMessage(aboutHTML)}>
                    Acerca de {name}
                </Button>
            </div>
        </div>
    </div>
}
