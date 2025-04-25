/* eslint-disable jsx-a11y/alt-text */
import styles from './layout.module.scss'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'

// Customs
import IA from '../ia/IA'
import CustomHeader from '../customHeader/CustomHeader'
import MenuMovil from '../menuMovil/MenuMovil'

import useCommonStore from '../../hooks/commonStore'

const Body = ({
  cssClassPage,
  children,
  isReady,
}) => {
  const router = useRouter()
  const darkMode = useCommonStore((state => state.darkMode))
  const leftMenuBar = useCommonStore((state => state.leftMenuBar))
  const setStoreValue = useCommonStore((state => state.setStoreValue))

  const handleClickLogo = () => {
    if (leftMenuBar?.isShow) {
      setStoreValue('leftMenuBar', { isShow: false })
    } else router.push('/')
  }

  return <>
    <main
      className={classNames(`App font-a ${cssClassPage || ''}`, {
        'darkMode': darkMode,
        [styles.main]: true,
        [styles.AppComponent]: true,
        [styles.ready]: isReady,
      })}>
      <CustomHeader handleClickLogo={handleClickLogo} />
      {false && (
        <div className={styles.announcement}>
          Actualmente estamos en una versión piloto
        </div>
      )}
      {children}
      <MenuMovil />
      <a
        className='a_whatsapp'
        href='https://api.whatsapp.com/send?phone=573054202450&text=Hola Pikplay, tengo una consulta sobre los servicios que ofrecen a los Gamers en Colombia'
        target='_BLANK'
        rel="noreferrer">
        {/* <button className={styles['btn-whatsapp']}>
          <Image
            className={styles['we-are-here']}
            src='/images/others/we-are-here.svg'
            height={40}
            width={40}
          />
          <Image
            alt='Hablar con un asesor vía Whatsapp'
            src='/images/icons/whatsapp.png'
            height={40}
            width={40}
          />
        </button> */}
      </a>
      <IA />
    </main>
  </>
}

export default Body
