import styles from './previewUser.module.scss'

import React from 'react'
import { motion } from "framer-motion"
import Link from 'next/link'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Image from 'next/image'

// Custom
import CoinIcon from '../coinIcon/CoinIcon'
import { slugify } from '../../lib/utils'
import Login from '../login/Login'
import useCommonStore, { loadFromLocalStorage } from '../../hooks/commonStore'
import { useIAStore } from '../ia/IAstore'
import Button from '../button/Button'

const MenuMobileOptions = ({ router }) => {
  const {
    darkMode,
    logout,
    setStoreValue,
    userLogged,
    userLoggedOriginal
  } = useCommonStore((state => state))
  const { name, coins } = userLogged
  const isLogged = userLogged?.uid
  const {
    handleUserMessage,
  } = useIAStore((state => state))

  const handleLogout = () => {
    logout()
    router.push('/?action=logout')
  }

  const changeToSellerUser = () => {
    const userLoggedOriginal = {
      ...userLogged
    }
    setStoreValue('userLoggedOriginal', userLoggedOriginal)
    setStoreValue('userLogged', {
      uid: 120,
      name: 'Blackpanther',
      picture: '/images/bluepanther/profile.jpg',
    })
  }

  const changeToOriginalUser = () => {
    setStoreValue('userLogged', userLoggedOriginal)
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

  const favoritesSellers = loadFromLocalStorage("favoritesSellers") || []

  return <motion.div
    animate="visible"
    className={styles.MenuOptionsComponent}
    id="bg_black"
    initial="hidden"
    variants={container}>
    {!isLogged && <motion.ol variants={item} className={styles.notLogged}>
      <Login />
    </motion.ol>}
    {isLogged && (<>
      <motion.ol variants={item}>
        <Link href={`/perfil/${slugify(name || "User Name")}`}>
          <div className={styles.coinContent}>
            <CoinIcon coins={coins} hideNumber />
          </div>
          Mi cuenta
        </Link>
      </motion.ol>
      <motion.ol variants={item}>
        <Link href='/transacciones' as='/transacciones'>
          Transacciones
        </Link>
      </motion.ol>
      {/* <motion.ol variants={item}>
      <a>
        Configuración
      </a>
    </motion.ol> */}
      {/* <motion.ol variants={item}>
        <Link href="/onboarding">
          Onboarding
        </Link>
      </motion.ol> */}
    </>)}
    <motion.ol variants={item}>
      <Link href="/redimir">
        {/* <img src="https://cdn-icons-png.flaticon.com/512/4213/4213958.png" /> */}
        <CardGiftcardIcon />
        Redimir
      </Link>
    </motion.ol>
    {/* <motion.ol variants={item}>
      <Link href="/servicios">
        Nuestros Servicios
      </Link>
    </motion.ol> */}
    {/* Imagen de aplicación */}
    <motion.ol variants={item} style={{ justifyCcontent: 'center' }}>
      <a href="/files/pikplay-application.apk">
        <Image style={{ margin: 0 }} className={styles.downloadAppImage} src="/images/icons/google-play-05.svg" width="990" height="300" />
      </a>
    </motion.ol>
    {favoritesSellers && favoritesSellers.map(favoriteSeller => {
      return <motion.ol key={favoriteSeller.uid} variants={item} className={styles.favoriteSeller}>
        <Link href={`/${favoriteSeller.slug}`}>
          <img className='br-5' src={favoriteSeller.picture} />
          {favoriteSeller.storeName}
        </Link>
      </motion.ol>
    })}
    {/* Opciones de administrador */}
    {userLogged.isAdmin && <>
      {/* <motion.ol variants={item}>
        <Link href="/ranking">
          <img src="https://cdn-icons-png.flaticon.com/512/1420/1420338.png" />
          Ranking
        </Link>
      </motion.ol> */}
      {/* <motion.ol variants={item} onClick={changeToSellerUser}>
        Cambiar a Seller
      </motion.ol>
      <motion.ol variants={item} onClick={changeToOriginalUser}>
        Cambiar a Usuario
      </motion.ol> */}
    </>
    }
    {isLogged && <motion.ol variants={item} onClick={() => handleLogout()}>
      Salir
    </motion.ol>}
    <div className={styles.bottomContainer}>
      <Button>
        <a href="https://api.whatsapp.com/send?phone=573204863547&text=%C2%A1Hola!,%20quisiera%20ayuda%20con%20algo%20de%20Pikplay" target="_blank">
          <HeadphonesIcon />
          Hablar con soporte
        </a>
      </Button>
      <Button className={styles.closeButton} onClick={() => {
        setStoreValue('leftMenuBar', { isShow: false })
      }}>
        <ArrowBackIosIcon />
        Cerrar menu
      </Button>
    </div>
  </motion.div >
}

export default MenuMobileOptions
