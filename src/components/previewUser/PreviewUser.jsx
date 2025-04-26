import styles from './previewUser.module.scss'

import { createGlobalStyle } from "styled-components";
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';

// Custom
import Button from '../button/Button'
import CoinIcon from '../coinIcon/CoinIcon'
import Login from '../login/Login'
import MenuMobileOptions from './MenuMobileOptions'
import UserNotifications from '../userNotifications/UserNotifications'
import useCommonStore from '../../hooks/commonStore'
import { IS_MOBILE } from '../../lib/variables'
import { getExperiencesSrv } from '@/services/experience';

const ProfileImage = dynamic(() => import('../profileImage/ProfileImage'), { ssr: false })

const PreviewUser = () => {
  const router = useRouter()
  const { currentCoins, userLogged, leftMenuBar, leftMenuBar: { isShow: isShowLeftMenu }, setStoreValue, leftBottomMenuContent } = useCommonStore((state => state))
  const { picture, name, coins } = userLogged || {}

  const handleClickImage = () => {
    router.push('#menu')
    setStoreValue('leftMenuBar', { ...leftMenuBar, isShow: !isShowLeftMenu })
  }

  const handlerUpadteCoins = async () => {
    const response = await getExperiencesSrv()
    const { currentPikcoins, experience } = response
    setStoreValue('currentCoins', currentPikcoins)
  }

  return (
    <div
      className={`
      ${styles.PreviewUser} PreviewUser
      ${isShowLeftMenu ? styles.actived : null}
      ${userLogged?.uid ? styles.userLogged : null}
      `}>
      <div>
        {/* <div className={styles.notificationContainer}>
          <img src="/images/icons/notification.png" />
          <span className={styles.notificationNew} />
        </div> */}
        <ProfileImage
          className="previewUser"
          handleClickImage={IS_MOBILE ? handleClickImage : null}
          picture={picture}
          small
          suppressHydrationWarning={true}
        />
        {/* TODO */}
        {/* Icono */}
        <div className={styles.coinsContainer} id="PreviewProfile--Coins">
          <CoinIcon coins={currentCoins} onClick={handlerUpadteCoins} />
          {/* <span className={styles.experience}>
              <FontAwesomeIcon icon={faHeartbeat} />
              <span>&nbsp;10/20.500</span>
            </span> */}
        </div>
        <div className={styles.bg_white}></div>
        {isShowLeftMenu && <>
          <MenuMobileOptions router={router} />
          <UserNotifications />
        </>}
        {/* <div className={styles.elementToCloseBgBlack} onClick={() => setStoreValue('leftMenuBar', false)}></div> */}
        {leftBottomMenuContent}
      </div>
    </div>
  )
}

export default PreviewUser
