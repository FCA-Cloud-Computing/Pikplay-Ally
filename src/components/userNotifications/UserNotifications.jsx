/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import styles from './userNotifications.module.scss'

import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import Router from 'next/router'

// Custom
import { getNotificationsSrv } from '../../services/user/user'
import CoinIcon from '../coinIcon/CoinIcon'
import useCommonStore from '../../hooks/commonStore'
import uploadFile from "../../services/uploadFile";
import { NOTIFICATION_TYPES } from '../../consts/messages'
import { useProfileImage } from '@/hooks/useProfileImage'

const { motion } = require('framer-motion')

moment.locale('es-CO')

const UserNotifications = () => {
  const { userLogged, notifications, setStoreValue } = useCommonStore((state => state))
  const { handlerInputFile, fileInputRef } = useProfileImage()
  const { uid } = userLogged
  const [bannerPictureProfile, setBannerPictureProfile] = useState(false);
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
    if (userLogged.uid) {
      getNotificationsSrv()
        .then(res => {
          setStoreValue('notifications', res.data)
        });
    }
  }

  const handleNotification = async (item) => {
    const { coins, experience, id, link, type } = item
    if (coins || experience) {
      // reclamarCoins(coins, id)
      setStoreValue('isAwardSummaryModalOpen', true)
      setStoreValue('awardSummaryModalDetail', item)
      setStoreValue('leftMenuBar', { isShow: false })
    } else {
      handleDeleteNotification(id)
    }
    if (link) Router.push(link)
  }

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

  useEffect(() => {
    getNotifications()
    // toast(ToastContent('¡Desafio completado! Acercandote más a la categoria Plata', 'success')) // Testing porpuses
  }, [])

  useEffect(() => {
    // Setting banner picture profile to true if there is a notification with cid 1 (profile image completed)
    notifications && notifications.filter(item => item.cid === 1).length == 0 && setBannerPictureProfile(true)
  }, [notifications])

  return (
    <div className={`UserNotifications ${styles.UserNotifications}`}>
      <div className={styles.options}>
        {/* <FontAwesomeIcon icon={faBell} className='m-r-10 icon' /> */}
        <span>
          <img src="/images/icons/notification.png" />
          Mis notificaciones
        </span>
        {/* <span>Marcar todas como leídas</span> */}
      </div>
      <motion.ul
        animate="visible"
        initial="hidden"
        variants={container}>
        {notifications && notifications.map(
          (item) => {
            const {
              claimed,
              coins,
              createdAt,
              description,
              image,
              id,
              isChecked,
              link,
              status,
              type,
            } = item
            const created = moment(createdAt).fromNow()
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
                className={classNames('Card', { [styles.read]: isChecked })}
                key={id}
                variants={item}
                onClick={() => !isChecked && handleNotification(item)}>
                {/* {!disabled && <FontAwesomeIcon icon={faCircle} />} */}
                {/* <Image
                  alt='icon-notification'
                  className={styles.img_notification}
                  height={35}
                  src={srcNotificationImg}
                  width={48}
                /> */}
                <span className={`${styles.notificationType} ${styles[item.type]}`}>
                  {NOTIFICATION_TYPES[item.type]}
                </span>
                <small>
                  hace {created}
                </small>
                <div dangerouslySetInnerHTML={{ __html: description }} />
                {!!image && <picture className={styles.picture}>
                  <img src={image} />
                </picture>}
                {!!coins && <CoinIcon hideNumber />}
                {/* {!coins && <div className={styles.content_close}></div>} */}
              </motion.li>
              // </Tooltip>
            )
          },
        )}
      </motion.ul>
      {bannerPictureProfile && userLogged.uid && <>
        <input onChange={handlerInputFile} ref={fileInputRef} type="file" style={{ display: 'none' }} />
        <img onClick={() => fileInputRef.current.click()} style={{ borderRadius: '5px' }} src="/images/banners/gana_tus.png" />
      </>}
    </div>
  )
}

export default UserNotifications
