import styles from './profileSummaryExperience.module.scss'

import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

// Custom
import { animatePrince, formatNumber } from '../../lib/utils'
import CoinIcon from '../coinIcon/CoinIcon'
import ProfileImage from '../profileImage/ProfileImage'
import useSystemStore from '../../hooks/storeSystem'
import MESSAGES from '../../consts/messages'
import { useIAStore } from '../ia/IAstore'
import Button from '../button/Button'

// Servicios
import { getExperiencesSrv, updateProfileSrv } from '../../services/user/userService'
import { toast } from 'react-toastify'

const ProfileSummaryExperience = (props) => {
  const { DEFAULT_NAME } = MESSAGES
  const { isEditProfile, userInfoData, setIsEditProfile, showDetails } = props
  const [currentExp, setCurrentExp] = useState(0)
  const [percentageBar, setPercentageBar] = useState("0%")
  // userInfoData: Props que se utiliza para mostrar la información de un usuario en particular
  const gainedCoins = 5
  const currentUserCoins = 10
  const { userLogged, setUserLogged } = useSystemStore()
  const { uid } = userLogged
  const {
    handleUserMessage,
    setIAMessage,
    setIAOptions,
  } = useIAStore((state => state))

  const {
    backgroundColor,
    backgroundImage,
    experienceValue,
    badge,
    name,
    picture,
    coins,
    league = 'oro',
  } = userInfoData ? userInfoData : userLogged
  const [newNickname, setNewNickname] = useState(name || DEFAULT_NAME)

  const handleBlurName = (e) => {
    const { value } = e.target
    if (value == name) return
    setIAMessage(`Deseas cambiar tu nombre a ${value}?`)
    setIAOptions(<>
      <Button color='transparent'>Cancelar</Button>
      <Button color='blue' realistic
        onClick={() => {
          updateProfileSrv(null, uid, { name: value })
            .then(data => {
              setUserLogged({ name: value })
              setIAMessage(null)
              toast("¡Perfil actualizado correctamente!")
            })
        }}>
        Cambiar
      </Button>
    </>)
  }

  const getExperienceInfo = () => {
    const exp = 0

    getExperiencesSrv()
      .then(data => {
        const { expTotal, exp, percentageBar } = data
        setCurrentExp(expTotal)
        setPercentageBar(percentageBar + "%")
      });
    const widthBar = (exp / 1000) * 100;
    setPercentageBar(widthBar + "%")
  }

  useEffect(() => {
    const element = document.querySelector('.ProfileSummaryExperience .number-coins')
    const fromNumber = element?.innerHTML
    const targetNumber = currentUserCoins + gainedCoins
    animatePrince(element, targetNumber, fromNumber)
    getExperienceInfo()
  }, [])

  // const exp = 0
  // const [currentExp, setCurrentExp] = useState(exp)
  // const [percentageBar, setPercentageBar] = useState("0%")

  useEffect(() => {
    getExperiencesSrv()
      .then(data => {
        const { expTotal, percentageBar } = data
        setCurrentExp(expTotal)
        setPercentageBar(percentageBar + "%")
      });
  }, [])

  return (
    <div className={classNames("ProfileSummaryExperience", { [styles.ProfileSummaryExperience]: true })}>
      {/* <div>
          Name
        </div> */}
      <div className={`${styles[league]} ${styles.box}`} style={{ background: backgroundColor }}>
        {/* <div asd={backgroundImage} className={styles.bg} style={{ backgroundImage: `url( ${backgroundImage})` }}></div> */}
        <div asd={backgroundImage} className={styles.bg}></div>
        <div className={styles.left}>
          <ProfileImage picture={picture} progress={percentageBar} />
          {/* <div className={`shine ${styles[league]} ${league == 'oro' && 'starsFallingDown'} `}> */}
          <input className={styles.fullName}
            value={newNickname}
            onChange={e => setNewNickname(e.target.value)}
            onBlur={handleBlurName} />
          {/* <div className={styles.icons}>
            <Tooltip title="Plataforma más utilizada">
              <img width={40} className={styles.platform} src="/images/icons/ps-icon.png" />
            </Tooltip>
          </div> */}
          {/* </div> */}
          <div className={styles.experience_status}>
            <ExperienceBar {...{
              currentExp,
              experienceValue,
              percentageBar
            }} />
          </div>
        </div>
        {showDetails && <div className={styles.right}>
          {/* <div className={styles.fields}>
              <span className={styles.label}>
                <div className={styles.name}>Categoria</div>
                Bronce
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Pikcoins</div>
                <CoinIcon coins={coins} />
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Compras</div>
                5
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Antiguedad</div>
                4 meses
              </span>
            </div> */}
        </div>}
      </div>
    </div>
  )
}

export default ProfileSummaryExperience

const ExperienceBar = (props) => {
  const { currentExp, experienceValue, exp, percentageBar } = props;
  return (
    <div className={classNames("ExperienceBar", { [styles.ExperienceBar]: true })}>
      <div className={styles.bar}>
        <label>
          <span className='number'>{formatNumber(currentExp)}</span>
          &nbsp;/&nbsp;1.000 Points
        </label>
        <div className={classNames("indicator", { [styles.indicator]: true })} style={{ width: percentageBar }}>
        </div>
      </div>
    </div>
  )
}
