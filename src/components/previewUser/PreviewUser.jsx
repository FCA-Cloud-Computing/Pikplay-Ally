import styles from './previewUser.module.scss'

import { createGlobalStyle } from "styled-components";
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';

// Custom
import Login from '../login/Login'
import CoinIcon from '../coinIcon/CoinIcon'
import { IS_MOBILE } from '../../lib/variables'
import useSystemStore from '../../hooks/storeSystem'
import UserNotifications from '../userNotifications/UserNotifications'
import Button from '../button/Button'

const ProfileImage = dynamic(() => import('../profileImage/ProfileImage'), { ssr: false })
const MenuMobileOptions = dynamic(() => import('./MenuMobileOptions'), { ssr: false })

const PreviewUser = () => {
  const router = useRouter()
  const { userLogged, leftMenuBar, leftMenuBar: { isShow: isShowLeftMenu }, setStoreValue, leftBottomMenuContent } = useSystemStore((state => state))
  const { picture, name, coins } = userLogged || {}

  const handleClickImage = () => {
    router.push('#menu')
    setStoreValue('leftMenuBar', { ...leftMenuBar, isShow: !isShowLeftMenu })
  }

  return (
    <div
      className={`
      ${styles.PreviewUser} PreviewUser
      ${isShowLeftMenu ? styles.actived : null}
      ${userLogged?.uid ? styles.userLogged : null}
      `}>
      {userLogged?.uid ? (
        <div>
          <ProfileImage
            suppressHydrationWarning={true}
            className="previewUser"
            handleClickImage={IS_MOBILE ? handleClickImage : null}
            picture={picture}
            small />
          {/* TODO */}
          {/* Icono */}
          <div className={styles.coins} id="PreviewProfile--Coins">
            <CoinIcon coins={coins} />
            {/* <span className={styles.experience}>
              <FontAwesomeIcon icon={faHeartbeat} />
              <span>&nbsp;10/20.500</span>
            </span> */}
          </div>
          <div className={styles.bg_white}></div>
          {isShowLeftMenu && <>
            <MenuMobileOptions />
            <UserNotifications />
            <Button realistic className={styles.close_button} color="blue" onClick={() => {
              setStoreValue('leftMenuBar', { isShow: false })
            }}>Cerrar</Button>
          </>}
          {/* <div className={styles.elementToCloseBgBlack} onClick={() => setStoreValue('leftMenuBar', false)}></div> */}
          {leftBottomMenuContent}
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default PreviewUser
