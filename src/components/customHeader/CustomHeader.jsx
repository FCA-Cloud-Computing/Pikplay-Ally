import styles from './custom_header.module.scss' // eslint-disable-line

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { IS_MOBILE } from '../../lib/variables'
import Image from 'next/image'
import { motion } from 'framer-motion'

const CustomHeader = React.memo(() => {
  const images = [
    {
      original: '/images/banners/ps3-azul.jpeg',
      thumbnail: '/images/banners/ps3-azul.jpeg',
    },
    {
      original: '/images/banners/juanchofenix.jpeg',
      thumbnail: '/images/banners/juanchofenix.jpeg',
    },
  ]

  // const cityLabelSearch = cities.find(row => row.id == city) ? cities.find(row => row.id === city)?.label : null
  // const premiumResult = results.length > 0 ? results[0] : null

  return (
    <div id={styles.CustomHeader}>
      {/* <ChangeCity handleCity={handleCity} /> */}
      <ul>
        <Link href='/'>
          <motion.div
            whileTap={{ scale: 0.7 }}>
            <Image
              alt='Logo de Pikplay'
              className={styles.logo}
              height={43}
              src='/images/logos/logo.svg'
              width={160}
            />
            <div className={styles.slogan}>
              Compra y vende subiendo de nivel
            </div>
          </motion.div>
        </Link>
        <span className={styles.beta}>Beta</span>
        {/* TODO Descomentar cuando se implementen los productos */}
        {/* <SearchBox
          inputText={inputText}
          isLoading={isLoading}
          results={results}
          setInputText={setInputText}
        /> */}
      </ul>
    </div>
  )
})

export default CustomHeader
