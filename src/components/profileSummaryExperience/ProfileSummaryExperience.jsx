import styles from './profileSummaryExperience.module.scss'

import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from "framer-motion"

// Custom
import { animatePrice, formatNumber } from '../../lib/utils'
import CoinIcon from '../coinIcon/CoinIcon'
import ProfileImage from '../profileImage/ProfileImage'
import useCommonStore from '../../hooks/commonStore'
import MESSAGES from '../../consts/messages'
import { useIAStore } from '../ia/IAstore'
import Button from '../button/Button'

// Servicios
import {
  getCoinsSrv,
  getExperiencesSrv,
  updateProfileSrv
} from '../../services/user/userService'
import useAnimatedNumber from '@/hooks/useAnimatedNumber'

const ProfileSummaryExperience = (props) => {
  const { DEFAULT_NAME } = MESSAGES
  const {
    isEditProfile = false,
    setIsEditProfile,
    showDetails,
    userInfoData,
    newInfo,
    gainedCoins,
    gainedPoints,
  } = props
  const {
    points,
  } = newInfo || {}

  const [currentCoins, setCurrentCoins] = useState(0)
  const [targetCoins, setTargetCoins] = useState(0)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [targetPoints, setTargetPoints] = useState(0)
  const [percentageBar, setPercentageBar] = useState("0%")
  // userInfoData: Props que se utiliza para mostrar la información de un usuario en particular
  const currentUserCoins = 10
  const { userLogged, setUserLogged } = useCommonStore()
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

  // const getExperienceInfo = () => {
  //   const exp = 0

  //   getExperiencesSrv()
  //     .then(data => {
  //       const { expTotal, exp, percentageBar } = data
  //       setCurrentExp(expTotal)
  //       setPercentageBar(percentageBar + "%")
  //     });
  //   const widthBar = (exp / 1000) * 100;
  //   setPercentageBar(widthBar + "%")
  // }

  useEffect(() => {
    const element = document.querySelector('.ProfileSummaryExperience .Coins .number')
    const fromNumber = element?.innerHTML
    const targetNumber = currentUserCoins + gainedCoins
    // animatePrice(element, targetNumber, fromNumber)
    // getExperienceInfo()
  }, [])

  // const exp = 0
  // const [currentPoints, setCurrentExp] = useState(exp)
  // const [percentageBar, setPercentageBar] = useState("0%")
  const validateNewAwards = (currentCoins, currentPoints) => {
    if (gainedCoins) {
      const coinsElement = document.querySelector('.ProfileSummaryExperience .Coins .number')
      const fromNumber = currentCoins
      const targetNumber = currentCoins + gainedCoins
      setTargetCoins(targetNumber)
      setTimeout(() => { // Animando los puntos ganados despues de 2 segundos
        setTargetPoints(currentPoints + gainedPoints)
      }, 2000)
    }
  }

  useEffect(() => {
    const promisesList = [getExperiencesSrv(), getCoinsSrv()]
    Promise.allSettled(promisesList)
      .then(([expData, coinsData]) => {
        // debugger;
        const { expTotal: currentPoints } = expData.value || {}
        debugger;
        setCurrentPoints(currentPoints)
        setCurrentCoins(coinsData.value.coins)
        validateNewAwards(coinsData.value.coins, currentPoints)
      })
  }, [])

  const animatedCoins = useAnimatedNumber(currentCoins, targetCoins, 2000)

  return (
    <div className={classNames("ProfileSummaryExperience", { [styles.ProfileSummaryExperience]: true })}>
      {/* <div>
        Actuales: {currentCoins}<br />
        Ganadas: {gainedCoins}
      </div> */}
      <div className={`${styles[league]} ${styles.box}`} style={{ background: backgroundColor }}>
        {/* <div asd={backgroundImage} className={styles.bg} style={{ backgroundImage: `url( ${backgroundImage})` }}></div> */}
        <div asd={backgroundImage} className={styles.bg}></div>
        <div className={styles.left}>
          <ProfileImage picture={picture} progress={percentageBar} />
          {/* <div className={`shine ${styles[league]} ${league == 'oro' && 'starsFallingDown'} `}> */}
          <input className={`${styles.fullName} ${isEditProfile && styles.editable}`}
            value={newNickname}
            onChange={e => isEditProfile && setNewNickname(e.target.value)}
            onBlur={isEditProfile && handleBlurName} />
          {/* <div className={styles.icons}>
            <Tooltip title="Plataforma más utilizada">
              <img width={40} className={styles.platform} src="/images/icons/ps-icon.png" />
            </Tooltip>
          </div> */}
          {/* </div> */}
          <div className={styles.experience_status}>
            <ExperienceBar {...{
              currentPoints,
              experienceValue,
              targetPoints,
            }} />
          </div>
          <CoinIcon coins={animatedCoins} gainedCoins={gainedCoins} hideNumber={false} />
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
  const { currentPoints, targetPoints, exp } = props;
  let animatedValue;
  if (targetPoints > 0) animatedValue = useAnimatedNumber(currentPoints, targetPoints, 4000);
  else animatedValue = currentPoints;
  const percentageBar = (animatedValue / 10000) * 100 + "%";

  return (
    <motion.div
      animate={{ x: 0, y: 0, opacity: 1 }}
      initial={{ x: '0px', y: '-50px', opacity: 0 }}
      transition={{ delay: 0.3 }}
      className={classNames("ExperienceBar", { [styles.ExperienceBar]: true })}>
      <div className={styles.bar}>
        <label>
          <span className='number'>{formatNumber(animatedValue)}</span>
          &nbsp;/&nbsp;10.000 Points
        </label>
        <div className={classNames("indicator", { [styles.indicator]: true })} style={{ width: percentageBar }}>
        </div>
      </div>
    </motion.div>
  )
}
