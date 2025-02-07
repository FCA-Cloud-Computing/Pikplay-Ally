import styles from './previewUser.module.scss'

import React from 'react'
import { motion } from "framer-motion"
import CoinIcon from '../coinIcon/CoinIcon'
import { slugify } from '../../lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSystemStore from '../../hooks/storeSystem'
import { useIAStore } from '../ia/IAstore'

const MenuMobileOptions = () => {
  const router = useRouter()
  const {
    darkMode,
    logout,
    setStoreValue,
    userLogged,
    userLoggedOriginal
  } = useSystemStore((state => state))
  const { name, coins } = userLogged
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

  return <motion.div
    animate="visible"
    className={styles.bg_black}
    id="bg_black"
    initial="hidden"
    variants={container}>
    <motion.ol variants={item}>
      <Link href={`/perfil/${slugify(name || "User Name")}`}>
        <div className={styles.coinContent}>
          <CoinIcon coins={coins} />
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
    <motion.ol variants={item}>
      <Link href="/onboarding">
        Onboarding
      </Link>
    </motion.ol>
    <motion.ol variants={item}>
      <Link href="/#" className={styles.disabled}>
        <img src="https://cdn-icons-png.flaticon.com/512/4213/4213958.png" />
        Redimir
      </Link>
    </motion.ol>
    <motion.ol variants={item} onClick={() => handleLogout()}>
      Salir
    </motion.ol>
    {/* Opciones de administrador */}
    {userLogged.isAdmin && <>
      <motion.ol variants={item} onClick={changeToSellerUser}>
        Cambiar a Seller
      </motion.ol>
      <motion.ol variants={item} onClick={changeToOriginalUser}>
        Cambiar a Usuario
      </motion.ol>
    </>
    }
  </motion.div >
}

export default MenuMobileOptions
