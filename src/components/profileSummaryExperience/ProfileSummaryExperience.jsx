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
  updateProfileSrv
} from '../../services/user/user'
import useAnimatedNumber from '@/hooks/useAnimatedNumber'
import { getExperiencesSrv } from '@/services/experience'

const ProfileSummaryExperience = (props) => {
  const { DEFAULT_NAME } = MESSAGES
  const {
    changeAvatar,
    gainedCoins = 0,
    gainedExperience,
    isEditProfile = false,
    newInfo,
    setIsEditProfile,
    showDetails,
    userInfoData,
  } = props
  const {
    points,
  } = newInfo || {}
  let animatedCoins = null
  // const [animatedCoins, setAnimatedCoins] = useState(null)
  const [currentCoins, setCurrentCoins] = useState(0)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [targetExperience, setTargetExperience] = useState(0)
  const [percentageBar, setPercentageBar] = useState("0%")
  // userInfoData: Props que se utiliza para mostrar la información de un usuario en particular
  // const currentCoins = useCommonStore(state => state.currentCoins)
  const userLogged = useCommonStore(state => state.userLogged)
  const setStoreValue = useCommonStore(state => state.setStoreValue)
  // const { userLogged, setUserLogged, setStoreValue, set } = useCommonStore(state => state.userLogged)
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
      <Button color='blue' realistic
        onClick={() => {
          updateProfileSrv(null, uid, { name: value })
            .then(resp => {
              const { data: { messageTop } } = resp
              { messageTop && setStoreValue('messageTop', messageTop) }
              setIAMessage(null)
              setStoreValue({
                messageTop: { message: "¡Perfil actualizado correctamente!", type: 'success' },
                userLogged: { ...userLogged, name: value }
              }, true)
            })
        }}>
        Cambiar
      </Button>
      <Button color='transparent'>Cancelar</Button>
    </>)
  }

  const getExperience = () => {
    const promisesList = [getExperiencesSrv()]
    Promise.allSettled(promisesList)
      .then(([expData]) => {
        const { currentPikcoins: currentPikcoinsUpdated, expTotal: currentExperience } = expData.value || {}
        setCurrentExperience(currentExperience)
        setCurrentCoins(currentPikcoinsUpdated)
        setStoreValue('currentCoins', currentPikcoinsUpdated)
        setPercentageBar(`${(currentExperience / 10000) * 100}`)
      })
  }

  useEffect(() => {
    getExperience()
  }, [])

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
          <ProfileImage
            changeAvatar={changeAvatar}
            percentageBar={percentageBar}
            picture={picture}
          />
          {/* <div className={`shine ${styles[league]} ${league == 'oro' && 'starsFallingDown'} `}> */}
          <input className={`${styles.fullName} ${isEditProfile && styles.editable}`}
            onChange={e => isEditProfile && setNewNickname(e.target.value)}
            onBlur={isEditProfile && handleBlurName}
            value={newNickname}
          />
          {/* <div className={styles.icons}>
            <Tooltip title="Plataforma más utilizada">
              <img width={40} className={styles.platform} src="/images/icons/ps-icon.png" />
            </Tooltip>
          </div> */}
          {/* </div> */}
          <div className={styles.currentCategory}>
            Bronce
          </div>
          <div className={styles.coinsContainer}>
            <CoinIcon coins={currentCoins} gainedCoins={gainedCoins} hideNumber={false} />
          </div>
          <div className={styles.experience_status}>
            <ExperienceBar {...{
              currentExperience,
              targetExperience: gainedExperience + currentExperience,
            }} />
          </div>
          {/* currentCoins:{currentCoins}
          gainedCoins={gainedCoins} */}
        </div>
        {/* <p className={styles.rankingMessage}>
          <img src="/images/icons/ranking-icon.png" />
          Estas a dos puestos de superar a Victoria en el ranking de la semana
        </p> */}
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
  const { currentExperience, targetExperience, exp } = props;
  let animatedValue;
  if (targetExperience > 0) animatedValue = useAnimatedNumber(currentExperience, targetExperience, 4000);
  else animatedValue = currentExperience;
  const percentageBar = (animatedValue / 10000) * 100 + "%";

  return (
    <motion.div
      animate={{ x: 0, y: '0px', opacity: 1 }}
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
