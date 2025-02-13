import styles from './perfil.module.scss'

import React, { useState, useEffect } from 'react'
// import VARS from '../../lib/variables'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import CustomFetch from '../fetch/CustomFetch'
// import Joyride from 'react-joyride'
// import { toast } from 'react-toastify'
// import { interestsList } from '../../lib/utils'
// import { Alert } from '@mui/material';
import { ChargingStation, EditNote, NotificationAdd, NotificationImportant, Notifications, NotificationsActive, Person, PhonelinkLockOutlined, PowerOffOutlined } from '@mui/icons-material'
import {
  Box,
  Chip,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import classNames from 'classnames'
// import CoinIcon from '../coinIcon/CoinIcon'

// import { Gamepad } from '@mui/icons-material'
// import { faPaintBrush } from '@fortawesome/free-solid-svg-icons'
// import NotificationsNewIcon from '../notificationsNewIcon/NotificationsNewIcon'

// Custom
import useSystemStore from '../../hooks/storeSystem'
import ProfileSummaryExperience from '../profileSummaryExperience/ProfileSummaryExperience'
import IACharacter from '../ia/IACharacter'
import Button from '../button/Button'
import UserNotifications from '../userNotifications/UserNotifications'
import RankingComponent from '../ranking/Ranking'
import Referrals from '../referrals/Referrals'
import CoinIcon from '../coinIcon/CoinIcon'
import { getExperiencesSrv } from '@/services/user/userService'

const { motion } = require('framer-motion')

const Interface = ({
  dispatch,
  userLogged,
  isSaving,
  handleSave,
  handleLogout,
  setUserData,
}) => {
  // const handleFavorite = useSelector(state => state.handleFavorite)
  const [tabValue, setTabValue] = useState(0)
  const [isEditProfile, setIsEditProfile] = useState(false)
  const [currentExp, setCurrentExp] = useState(0)
  const [widthBar, setWidthBar] = useState(0)
  const { newNotifications, perfilPage: { messageIA }, setStoreValue } = useSystemStore(state => state)
  const { name: userName } = userLogged
  const [currentPikcoins, setCurrentPikcoins] = useState(0)
  const steps = [
    {
      target: '.starsFallingDown',
      content: 'Este es tu nickname, puedes cambiarlo en cualquier momento',
    },
    // {
    //   target: '.my-other-step',
    //   content: 'This another awesome feature!',
    // },
  ]
  // const [file, setFile] = useState()
  // const { post } = CustomFetch()
  const msgSubirCategoria = (
    <div>
      <h2>Subir de categoria en Pikplay</h2>
      <p>No disponible</p>
    </div>)

  const handleChange = (event, newValue) => {
    if (newValue == 0) setStoreValue("perfilPage", { messageIA: <div>Así se ve tu perfil hasta ahora</div> })
    if (newValue == 1) setStoreValue("perfilPage", { messageIA: <div>No tienes notificaciones nuevas<br /><br /></div> })
    if (newValue == 2) setStoreValue("perfilPage", { messageIA: null })
    setTabValue(newValue)
  }

  // useEffect(() => {
  //   if (file) {
  //     // changeImageProfile()
  //   }
  // }, [file])

  // const changeImageProfile = async () => {
  //   try {
  //     const data = new FormData()
  //     data.set('file', file)
  //     const body = data
  //     const res = await post(null, '/v1/do/spaces', null, body)
  //     if (!res.ok) throw new Error(await res.text())
  //     setFile(null)
  //   } catch (e) {
  //     setFile(null)
  //     console.error(e)
  //   }
  // }

  // const [interests, setInterests] = useState([
  //   ...interestsList.map(item => ({ ...item, selected: false })),
  // ])

  // const handleInterests = id => {
  //   const _interests = [...interests]
  //   const state = _interests.find(item => item.id == id).selected
  //   _interests.find(item => item.id == id).selected = !state
  //   setInterests(_interests)
  // }

  const NotificationIcon = () => {
    // if (newNotifications) return <NotificationsNewIcon style={{ marginBottom: '6px' }} />
    // else return <NotificationsActive />
    return <NotificationsActive />
  }

  useEffect(() => {
    getExperiencesSrv()
      .then(data => {
        const { expTotal, percentageBar, currentPikcoins } = data
        setCurrentExp(expTotal)
        setWidthBar(percentageBar + "%")
        setCurrentPikcoins(currentPikcoins)
      })
      .catch(err => {
        debugger;
      })
  }, [])

  return (
    <section className={`page ${styles.Perfil}`}>
      {/* <Joyride steps={steps} /> */}
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label='basic tabs example'
              indicatorColor='primary'>
              <Tab icon={<Person />} label='Perfil' />
              <Tab icon={<NotificationIcon />} label='Transacciones' />
              <Tab icon={<EditNote />} label='Editar perfil' />
            </Tabs>
          </Box> */}

      {/*messageIA && <div className={styles.IAContentLeft}>
            <IACharacter
              className='Perfil'
              IAExpression='happy' />
            <div className='Card'>
              {messageIA}
              {tabValue == 0 && <a onClick={() => setIsEditProfile(true)}>
                {/* <FontAwesomeIcon className='icon' icon={faPaintBrush} style={{ margin: "5px 5px 0 0" }} />}
                {/* Personalizar perfil}
              </a>}
            </div>
          </div>*/}

      {/* Intereses */}
      {/* <TabPanel value={value} index={4}>
            <Alert className='m-t-20' severity='info'>
              En Pikplay utilizamos los intereses para conocer a los usuarios y
              ofrecerle contenido de valor
            </Alert>
            <p className={styles.interests}>
              {interests.map(item => {
                return (
                  <Chip
                    color={item.selected ? 'secondary' : ''}
                    key={item.id}
                    label={item.name}
                    onClick={() => handleInterests(item.id)}
                  />
                )
              })}
            </p>
            <Button
              color={!isSaving ? 'blue' : 'disabled'}
              onClick={handleSave}
            >
              {isSaving ? 'Gaurdando...' : 'Guardar'}
            </Button>
          </TabPanel> */}

      {/* Resumen */}
      <p className={styles.greeting}>
        ¡Hola,
        <motion.span
          animate={{ y: 0 }}
          initial={{ y: '-200px' }}
          className={styles.userName}>
          &nbsp;{userName}
        </motion.span>!, <br />
        <span>este mes has acumulado
          <CoinIcon coins={currentPikcoins} />
        </span>
        <br />
        <span>
          sigue participando, refiriendo y ganando con Pikplay
        </span>
      </p>
      <ProfileSummaryExperience
        isEditProfile={isEditProfile}
        setIsEditProfile={setIsEditProfile}
        showDetails
      />
      <h2>Referidos</h2>
      <Referrals />
    </section>
  )
}

export default Interface
