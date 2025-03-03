/* eslint-disable @next/next/no-img-element */
import styles from './menuMovil.module.scss'

import React from 'react'
import Link from 'next/link'
import PreviewUser from '../previewUser/PreviewUser'
import useCommonStore from '../../hooks/commonStore'
import { useIAStore } from '../ia/IAstore'

const { motion } = require('framer-motion')

const MenuMovil = () => {
  // const user = useSelector(state => state.user)
  const { userLogged } = useCommonStore((state => state))
  const {
    handleUserMessage,
  } = useIAStore((state => state))

  return (
    <div className={styles.MenuMovil}>
      {/* <motion.ol className={styles.main_option}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
        <Link href='/categoria/[id]' as='/categoria/playstation'>
          <PlaystationIcon />
          <span className='f-s-10'>Playstation</span>
        </Link>
      </motion.ol>
      <motion.ol className={styles.main_option} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
        <Link href='/categoria/[id]' as='/categoria/nintendo-switch'>
          <SwitchIcon style={{ height: '32px', width: '44px' }} />
          <span className='f-s-10'>Nintendo</span>
        </Link>
      </motion.ol> */}
      <ol className={`${styles.main_option}`}>
        <PreviewUser />
      </ol>
      {/* <motion.ol className={styles.main_option}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}>
        <Link href='/' as='/'>
          <img src="https://img.icons8.com/?size=512&id=67574&format=png" />
          <span className='f-s-10'>Retro</span>
        </Link>
      </motion.ol> */}
      {/* <motion.ol
        className={styles.main_option}
        onClick={() => handleUserMessage('welcome')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}>
        <a>
          <img src='/images/ia/4.svg' />
          <span className='f-s-10'>Paco</span>
        </a>
      </motion.ol> */}
    </div>
  )
}

export default MenuMovil
