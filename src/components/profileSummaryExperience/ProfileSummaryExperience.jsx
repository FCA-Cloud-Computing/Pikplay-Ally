import styles from './profileSummaryExperience.module.scss'

import React, { useEffect, useState } from 'react'
import { Tooltip } from '@mui/material'
import Zoom from '@mui/material/Zoom'
import { animatePrince, formatNumber } from '../../lib/utils'
import classNames from 'classnames'
import CoinIcon from '../coinIcon/CoinIcon'
import ProfileImage from '../profileImage/ProfileImage'
import useSystemStore from '../../hooks/storeSystem'

const ProfileSummaryExperience = (props) => {
  const { isEditProfile, userInfoData, setIsEditProfile, showDetails } = props
  // userInfoData: Props que se utiliza para mostrar la información de un usuario en particular
  const gainedCoins = 5
  const currentUserCoins = 10
  const userLogged = useSystemStore(state => state.userLogged)
  const {
    backgroundColor,
    backgroundImage,
    experienceValue,
    badge,
    name,
    picture,
    coins,
    league,
  } = userInfoData ? userInfoData : userLogged
  useEffect(() => {
    const element = document.querySelector('.ProfileSummaryExperience .number-coins')
    const fromNumber = element?.innerHTML
    const targetNumber = currentUserCoins + gainedCoins
    animatePrince(element, targetNumber, fromNumber)
  }, [])

  return (
    <div className={classNames("ProfileSummaryExperience", { [styles.ProfileSummaryExperience]: true })}>
      <div>
        <div className={`shine ${styles[league]} ${league == 'oro' && 'starsFallingDown'} ${styles.full_name}`}>
          <span>{name}</span>
          {/* <div className={styles.icons}>
            <Tooltip title="Plataforma más utilizada">
              <img width={40} className={styles.platform} src="/images/icons/ps-icon.png" />
            </Tooltip>
          </div> */}
        </div>
        <div className={`${styles[league]} ${styles.box}`} style={{ background: backgroundColor }}>
          <div asd={backgroundImage} className={styles.bg} style={{ backgroundImage: `url( ${backgroundImage})` }}></div>
          <div className={styles.left}>
            <ProfileImage picture={picture} />
            <br />
            <div className={styles.experience_status}>
              <ExperienceBar {...{ exp: experienceValue }} />
            </div>
          </div>
          {showDetails && <div className={styles.right}>
            <div className={styles.fields}>
              <span className={styles.label}>
                <div className={styles.name}>Categoria</div>
                Bronce
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Pikcoins</div>
                <CoinIcon coins={coins} />
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Nivel</div>
                21
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Compras</div>
                5
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Ventas</div>
                2
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Antiguedad</div>
                4 meses
              </span>
              <Tooltip TransitionComponent={Zoom} title="Última conexión">
                <span className={styles.label}>
                  <div className={styles.name}>U.C.</div>
                  Ayer
                </span>
              </Tooltip>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default ProfileSummaryExperience

const ExperienceBar = (props) => {
  const { exp } = props;
  const [currentExp, setCurrentExp] = useState(exp)
  const [widtBar, setWidthBar] = useState("0%")

  useEffect(() => {
    // getExperiencesSrv()
    //   .then(data => {
    //     const { expTotal } = data
    //     setCurrentExp(expTotal)
    //     const widthBar = (expTotal / 10000) * 100;
    //     setWidthBar(widthBar + "%")
    //   });
    const widthBar = (exp / 1000) * 100;
    setWidthBar(widthBar + "%")
  }, [])

  return (
    <div className={classNames("ExperienceBar", { [styles.ExperienceBar]: true })}>
      <div className={styles.bar}>
        <div className={classNames("indicator", { [styles.indicator]: true })} style={{ width: widtBar }}>
          <label>
            <span className='number'>{formatNumber(currentExp)}</span>
            &nbsp;/ 1.000 EXP
          </label>
        </div>
      </div>
    </div>
  )
}
