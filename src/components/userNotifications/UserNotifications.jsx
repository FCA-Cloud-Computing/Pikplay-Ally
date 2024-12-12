import styles from './userNotifications.module.scss'

import React, { useEffect, useState } from 'react'
import {
  timeAgo,
} from '../../lib/utils'
// import { getNotificationsSrv } from '../../services/user/userService'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBell } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import moment from 'moment'
import Router from 'next/router'
import CoinIcon from '../coinIcon/CoinIcon'
import useSystemStore from '../../hooks/storeSystem.js'

const { motion } = require('framer-motion')

moment.locale('es-CO')

const UserNotifications = () => {
  const { userLogged, notifications, setStoreValue } = useSystemStore((state => state))
  // const user = useSelector(state => state.user)
  // const notifications = useSelector(state => state.notifications) //.filter(item => item.closed == 0)
  // const [deleteNotification] = useMutation(DELETE_NOTIFICATION, {
  //   onCompleted: ({ data, message, status }) => {
  //     if (status === 200) {
  //       getNotifications()
  //     }
  //   },
  // })
  // const [createCoin] = useMutation(CREATE_COIN)
  // const dispatch = useDispatch()

  // const reclamarCoins = async (coins, idNotification) => {
  //   const reqRes = await createCoin({
  //     variables: {
  //       id: idNotification,
  //     },
  //   })

  //   const { message, status } = reqRes.data.createCoin
  //   toast(message)

  //   if (status === 200) {
  //     confetti()
  //     dispatch({ type: 'RECLAMAR_COINS', payload: { coins } }) // Coins UI
  //     toast(`Has recibido ${formatNumber(coins)} Pikcoins, ¡felicidades!`)
  //     handleDeleteNotification(idNotification) // Delete notificacion (BD and UI)
  //     getNotifications()
  //     return true
  //   }
  // }

  // const handleDeleteNotification = id => {
  //   notifications.find(item => item.id === id).closed = '1'
  //   deleteNotification({ variables: { id, userId: user.id } }) // Delete notification BD
  // }

  const handleDeleteNotification = () => { }

  const getNotifications = () => {
    // if (userLogged.uid) {
    //   getNotificationsSrv()
    //     .then(res => {
    //       setStoreValue('notifications', res.data)
    //     });
    // }
  }

  const handleNotification = async ({ coins, disabled, id, link, type }) => {
    if (coins && !disabled) {
      // reclamarCoins(coins, id)
      setStoreValue('isAwardSummaryModalOpen', true)
    } else {
      handleDeleteNotification(id)
    }
    if (link) Router.push(link)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  const container = {
    hidden: { opacity: 1, scale: 1, x: "-100vw" },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1 // Tiempo para que cada elemento hijo empiece a salir
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className={`UserNotifications ${styles.UserNotifications}`}>
      <div className={styles.options}>
        {/* <FontAwesomeIcon icon={faBell} className='m-r-10 icon' /> */}
        <motion.span>
          Mis notificaciones
        </motion.span>
        {/* <span>Marcar todas como leídas</span> */}
      </div>
      <motion.ul
        animate="visible"
        initial="hidden"
        variants={container}>
        {notifications && notifications.map(
          ({
            closed,
            closed: disabled,
            coins,
            created,
            detail,
            id,
            link,
            status,
            type,
          }) => {
            created = moment(created).fromNow()
            const srcNotificationImg =
              type === 'COUPON_GIFT_AVAILABLE'
                ? '/images/type_notification/coupon_gift_available.png'
                : type === 'COMPLETED_PROFILE'
                  ? '/images/type_notification/completed_profile.png'
                  : type === 'COINS_BY_PURCHASE'
                    ? '/images/type_notification/coins_by_purchase.png'
                    : '/images/type_notification/coins_by_purchase_completed.png'
            return (
              // <Tooltip title={created} key={id}>
              <motion.li
                className={classNames('Card', { [styles.read]: status })}
                key={id}
                variants={item}
                onClick={() =>
                  !disabled && handleNotification({ coins, disabled, id, link, type })
                }>
                {/* {!disabled && <FontAwesomeIcon icon={faCircle} />} */}
                {/* <Image
                  alt='icon-notification'
                  className={styles.img_notification}
                  height={35}
                  src={srcNotificationImg}
                  width={48}
                /> */}
                <small>
                  hace {timeAgo("2024-09-12T16:30:00-05:00")}
                </small>
                <span>{detail}</span>
                {coins && <CoinIcon isLabel={false} coins={coins} />}
                {!coins && <div className={styles.content_close}></div>}
              </motion.li>
              // </Tooltip>
            )
          },
        )}
      </motion.ul>
    </div>
  )
}

export default UserNotifications
