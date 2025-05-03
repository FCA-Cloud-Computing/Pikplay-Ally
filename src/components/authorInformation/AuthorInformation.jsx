import { motion } from 'framer-motion'

// Custom
import CoinIcon from '../coinIcon/CoinIcon'
import ProfileImage from '../profileImage/ProfileImage'
import styles from './authorInformation.module.scss'
import Button from '../button/Button'
import { useIAStore } from '../ia/IAstore'
import { postChallengeDetailSrv } from '@/services/challenges/challenges'
import { formatNumber } from '@/lib/utils'

// Icons
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import useCommonStore, { loadFromLocalStorage } from '@/hooks/commonStore'
import { useEffect, useState } from 'react'

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
        pageBackground,
        storeName,
        whatsapp,
    } = props?.authorInformation || {}
    const [isFavorite, setIsFavorite] = useState(false)
    const setStoreValue = useCommonStore((state) => state.setStoreValue)
    const stored = loadFromLocalStorage("favoritesSellers") || []

    useEffect(() => {
        const exists = stored.some((item) => item.storeName === storeName)
        setIsFavorite(exists)
      }, [storeName])

    const handleFavoriteClick = async () => {
        let updated
        const { picture, storeName, slug } = props.authorInformation
        if (isFavorite) {
          updated = stored.filter((item) => item.storeName !== storeName)
        } else {
          updated = [...stored, { picture, storeName, slug }]
        }
    
        setStoreValue("favoritesSellers", updated, true)
        setIsFavorite(!isFavorite)
    
        await postChallengeDetailSrv(null, { challengeId: 11 })
        console.log("Challenge 11 completed");
      }

    return <div className={`${styles.AuthorComponentPage}`} style={{ ['--backgroundImage']: `url(${pageBackground})` }}>
        <div className={styles.content}>
            <ProfileImage picture={storePicture} />
            <br />
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className={styles.namePlace}
                onClick={handleFavoriteClick}
                >
                <img
                  className={`${styles.star} ${isFavorite && styles.active}`} 
                  src="/images/icons/star.png" 
                />
                <b>{storeName || name}</b>
                <small 
                  style={{ color: dividerColor }}
                >
                  {location}
                </small>
            </motion.div>
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
