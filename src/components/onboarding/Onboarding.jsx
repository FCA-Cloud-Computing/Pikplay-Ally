/* eslint-disable react-hooks/exhaustive-deps */
import styles from './onboarding.module.scss'

import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { motion } from 'framer-motion'
import { height } from '@mui/system'
import Link from 'next/link'
import { toast } from 'react-toastify'

// Custom
import { sellersInformation } from '../../data/dataSellers'
import Button from '../button/Button'
import CoinIcon from '../coinIcon/CoinIcon'
import MESSAGES from '../../consts/messages'
import useCommonStore from '../../hooks/commonStore'
import { getUsersSrv, saveLeadSrv, } from '../../services/user/userService'
import { useIAStore } from '../ia/IAstore'

const Onboarding = () => {
  const { ONBOARDING_LEAD_DUPLICATED, ONBOARDING_LEAD_SUCCESS } = MESSAGES
  const { setStoreValue } = useCommonStore()
  const [phoneNumber, setPhoneNumber] = useState("")
  const items = [
    {
      background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
      html: <>¿Qué es <br /><span className={styles.yellow}>Pikplay</span>?</>,
      image: "/images/ia/character-full.svg",
      isCompleted: true,
      messageCode: 'onboarding',
      imageStyle: {},
    },
    {
      background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
      html: <>¿Que son las <span className={styles.yellow}>Pikcoins?</span></>,
      image: "/images/icons/coin-v2.svg",
      imageStyle: {
        width: 70,
      },
      messageCode: "pikcoins",
    },
    {
      background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
      html: <>Alcanza la <span className={styles.green}>liga</span> <br />más top</>,
      image: "/images/icons/liga-oro-hiervas.svg",
      imageStyle: {
        width: 110,
      },
      messageCode: "ranking",
    },
    {
      background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
      html: <>¡Refiere y gana!</>,
      image: "/images/icons/gift.svg",
      messageCode: "referrals",
      imageStyle: {
        marginTop: "-26px",
        width: 66,
      }
    },
    // {
    //   background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
    //   html: <>Te ayudamos en<br /> tus integraciones</>,
    //   image: "/images/icons/addi-logo.png",
    //   messageCode: "b2b/integrations",
    //   imageStyle: { width: 100, height: 100 }
    // },
    // {
    //   background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
    //   html: <>Espacio personalizado para tus productos</>,
    //   image: "/images/icons/buid-your-brand.png",
    //   messageCode: "b2b/your-products",
    // },
  ]

  const {
    handleUserMessage,
  } = useIAStore((state => state))

  const handleInputChange = (e) => {
    const input = e.target.value;

    // Eliminar todos los caracteres que no sean dígitos
    const digits = input.replace(/\D/g, "");

    // Formatear el número de teléfono
    let formattedNumber = digits;

    if (digits.length > 3 && digits.length <= 6) {
      formattedNumber = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (digits.length > 6) {
      formattedNumber = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }

    setPhoneNumber(formattedNumber);
  }

  const saveLead = async () => {
    const res = await saveLeadSrv(null, phoneNumber)
    if (!res.error) {
      setPhoneNumber('')
      toast(ONBOARDING_LEAD_SUCCESS, { type: 'success' })
    } else if (res.errorCode == 409) toast(ONBOARDING_LEAD_DUPLICATED, { type: 'info' })
    else toast('Error al inscribirte, intentalo más tarde', { type: 'error' })
  }

  useEffect(() => {
    // handleUserMessage('onboarding', {})
    setStoreValue('isOnboardingProcess', true)
  }, [])

  return <section className={`page ${styles.Onboarding}`}>
    <Link href="/caribe-dev">
      {/* Caribe Conf 2025 */}
      <Image className={styles.bannerCaribeConf2025} src="images/banners/banner-caribe-conf-2025.jpg" alt="Banner Caribe Conf 2025" height="100" width="420" />
    </Link>
    <div className={styles.titleContent}>
      <div className={styles.background}></div>
      <h2>Conócenos
        <small>Abre cada tarjeta para conocer lo que tenemos para ti 🎁</small>
      </h2>
    </div>
    <div className={styles.items}>
      {
        items.map((item, ind) => {
          const { imageStyle, imageStyle: { height = 200, width = 200 } } = item || {}
          return <motion.div
            animate={{ x: 0 }}
            initial={{ x: '-400px' }}
            transition={{ delay: (.2 * ind) }}
            className={`${styles.item} ${ind < 1 && styles.active}`}
            key={ind}
            onClick={() => handleUserMessage(item.messageCode, {})}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.7 }}>
            {/* <Image className={styles.background} src={item.background} width={564} height={564} /> */}
            <div className={styles.black_bg}></div>
            <Image
              className={styles.image}
              src={item.image}
              style={imageStyle || {}}
              height={height}
              width={width}
            />
            <div className={styles.html}>{item.html}</div>
          </motion.div>
        }
        )}
    </div>

    <div className={styles.cta}>
      <div className={styles.titleContent}>
        <h2>
          Únete a nuestra comunidad
        </h2>
      </div>
      <div className={styles.inputContent}>
        <input type="text" placeholder='Tu whatsapp aquí' onChange={handleInputChange} value={phoneNumber} />
        <div className={styles.btnSend}>
          <Button color='blue' onClick={saveLead}>
            Enviar
          </Button>
        </div>
      </div>
    </div>

    <div className={styles.texts}>
      <div className={styles.background}></div>
      <p>
        Comprando con aliados de <br />
        <b>Pikplay</b> tienes la posibilidad de ganar <b>Cashback</b><CoinIcon />,
        <br />esto basicamente es descuentos en otras tiendas aliadas.
        <br /><br />
        Tambien invitar a tus amigos y tener un Ranking de puntos los cuales te serviran para aumentar de liga, obtener descuentos
        y participar en concursos.
      </p>
      {/* <p>
        Por ello en Pikplay solo encontraras <b>Aliados certificados</b>.
        <br />Tiendas que han sido estudiadas y validadas por nuestro equipo. Tienen nuestro total respaldo y confianza.
      </p> */}
    </div>

    <div className={styles.aliados}>
      <h2>Aliados</h2>
      <div className={styles.items}>
        {sellersInformation && Object.keys(sellersInformation).map((key, i) => {
          const { authorInformation: item } = sellersInformation[key]
          return <Link href={`/${key}`}>
            <div className="Card">
              <img src={item.picture} />
              <p>
                <b>{item.name}</b>
                <div>{item?.category?.label}</div>
                {item.location}
              </p>
            </div>
          </Link>
        })}
        {/* <Link href='/conversation-club'>
          <div className="Card">
            <img src='/images/users/conversation_club/logo.png' />
            <p>
              <b>English Club</b>
              <div>Club de conversación</div>
              Barranquilla, Colombia
            </p>
          </div>
        </Link>
        <Link href='/le-fragance'>
          <div className="Card">
            <img src='/images/users/le-fragance/le-fragance.jpeg' />
            <p>
              <b>LE-FRAGANCE</b>
              <div>Perfumes</div>
              Barranquilla, Colombia
            </p>
          </div>
        </Link>
        <Link href='/blue-panther'>
          <div className="Card">
            <img src='/images/users/bluepanther/logo.jpg' />
            <p>
              <b>Bluepanther</b>
              <div>Gaming</div>
              Medellín, Colombia
            </p>
          </div>
        </Link>
        <Link href='/nataliatution'>
          <div className="Card">
            <img src='/images/users/nataliatution/logo.jpg' />
            <p>
              <b>Nataliatution</b>
              <div>Ropa y Calzado</div>
              Barranquilla, Colombia
            </p>
          </div>
        </Link> */}
        {/* <div className="Card">
          <img src='/images/users/hiro.jpeg' />
          <p>
            <b>Hiro</b>
            <div>Anime, Cosplay</div>
            Barranquilla, Colombia
          </p>
        </div> */}
      </div>
    </div>
  </section>
}

export default Onboarding
