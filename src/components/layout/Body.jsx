/* eslint-disable jsx-a11y/alt-text */
import styles from './layout.module.scss'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'

// Customs
import IA from '../ia/IA'
import CustomHeader from '../customHeader/CustomHeader'
import MenuMovil from '../menuMovil/MenuMovil'

import useCommonStore from '../../hooks/commonStore.js'

const Body = ({
  cssClassPage,
  children,
  isReady,
}) => {
  const { darkMode } = useCommonStore((state => state))

  return <>
    <main
      className={classNames(`App font-a ${cssClassPage || ''}`, {
        'darkMode': darkMode,
        [styles.main]: true,
        [styles.AppComponent]: true,
        [styles.ready]: isReady,
      })}>
      <CustomHeader />
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
