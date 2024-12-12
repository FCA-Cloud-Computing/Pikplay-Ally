/* eslint-disable jsx-a11y/alt-text */
import styles from './layout.module.scss'

import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import IA from '../ia/IA'
import Image from 'next/image'
import CustomHeader from '../customHeader/CustomHeader.tsx'
import useSystemStore from '../../hooks/storeSystem.js'
import MenuMovil from '../menuMovil/MenuMovil'

const Body = ({
  children,
  isReady,
}) => {
  const { darkMode } = useSystemStore((state => state))

  return <>
    <main
      className={classNames('App font-a', {
        'darkMode': darkMode,
        [styles.main]: true,
        [styles.AppComponent]: true,
        [styles.ready]: isReady,
      })}>
      darkMode:{darkMode}
      <CustomHeader />
      {false && (
        <div className={styles.announcement}>
          Actualmente estamos en una versión piloto
        </div>
      )}
      <Link href='/articulo/pikcoins-que-son-y-como-redimir-cupones'>
        <div className={styles.wrapperBanner}>
          <Image src='/images/banners/banner-regalos-descuentos-pikcoins.svg' fill={true} layout='fill' />
        </div>
      </Link>
      {children}
      <MenuMovil />
      <a
        className='a_whatsapp'
        href='https://api.whatsapp.com/send?phone=573054202450&text=Hola Pikplay, tengo una consulta sobre los servicios que ofrecen a los Gamers en Colombia'
        target='_BLANK'
        rel="noreferrer">
        <button className={styles['btn-whatsapp']}>
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
        </button>
      </a>
      <IA />
    </main>
  </>
}

export default Body
