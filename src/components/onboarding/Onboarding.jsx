/* eslint-disable react-hooks/exhaustive-deps */
import styles from './onboarding.module.scss'

import React, { useEffect, useMemo, useState } from 'react'
import Image from "next/image"
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { height } from '@mui/system'
import Link from 'next/link'
import { toast } from 'react-toastify'
import Zoom from 'react-medium-image-zoom'
import ZoomInIcon from '@mui/icons-material/ZoomIn';

// Custom
import { sellersInformation } from '../../data/dataSellers'
import Button from '../button/Button'
import CoinIcon from '../coinIcon/CoinIcon'
import MESSAGES from '../../consts/messages'
import useCommonStore from '../../hooks/commonStore'
import { getUsersSrv, saveLeadSrv, } from '../../services/user/user'
import { useIAStore } from '../ia/IAstore'
import OurServices from '../ourServices/OurServices'

const Onboarding = () => {
  const { ONBOARDING_LEAD_DUPLICATED, ONBOARDING_LEAD_SUCCESS } = MESSAGES
  const { setStoreValue } = useCommonStore()
  const [phoneNumber, setPhoneNumber] = useState("")
  const items = [
    {
      background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
      html: <>¿Qué es <br /><span className={styles.yellow}>Pikplay</span>?</>,
      image: "/images/logos/pp.svg",
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

  // Animacion levitando
  // const yAnimation = useMotionValue(0); // Movimiento vertical
  // const shadowAnimation = useTransform(yAnimation, [-20, 0, 20], [
  //   "0px 25px 40px rgba(0, 0, 0, 0.05)",
  //   "0px 10px 15px rgba(0, 0, 0, 0.15)",
  //   "0px 5px 5px rgba(0, 0, 0, 0.3)"
  // ]);

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
    setStoreValue('isFullLoading', true)
    const res = await saveLeadSrv(null, phoneNumber)
    if (!res.error) {
      setPhoneNumber('')
      toast(ONBOARDING_LEAD_SUCCESS, { type: 'success' })
    } else if (res.errorCode == 409) toast(ONBOARDING_LEAD_DUPLICATED, { type: 'info' })
    else toast('Error al inscribirte, intentalo más tarde', { type: 'error' })
    setStoreValue('isFullLoading', false)
  }

  const handleCardOnboarding = async (messageCode) => {
    // const controls = controlsMap[item.messageCode];
    // await controls.start({ scale: 0.7, transition: { duration: 0.1 } });
    // await controls.start({ scale: 1, transition: { duration: 0.1 } });

    handleUserMessage(messageCode, {})
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
    <div className={styles.itemsPikplayCards}>
      {
        items.map((item, ind) => {
          const { imageStyle, imageStyle: { height = 200, width = 200 } } = item || {}
          return <motion.div
            // controls={controlsCards}
            animate={{ x: 0 }}
            initial={{ x: '-400px' }}
            transition={{ delay: (.2 * ind) }}
            className={`${styles.item} ${ind < 1 && styles.active}`}
            key={ind}
            onClick={() => handleCardOnboarding(item.messageCode, {})}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.7 }}
          >
            {/* <Image className={styles.background} src={item.background} width={564} height={564} /> */}
            <div className={styles.black_bg}></div>
            <motion.img
              // animate={{ y: [0, -20, 0] }} // animación arriba-abajo
              // transition={{
              //   duration: 3,
              //   repeat: Infinity,
              //   ease: "easeInOut"
              // }}
              style={{
                // yAnimation,
                // boxShadow: shadowAnimation
              }}
              alt="Imagen de Onboarding"
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
        <input type="text" placeholder='Aquí tu Whastapp' onChange={handleInputChange} value={phoneNumber} />
        <div className={styles.btnSend}>
          <Button color='blue' onClick={saveLead}>
            Enviar
          </Button>
        </div>
      </div>
    </div>

    <div className={styles.texts}>
      <div className={styles.background}></div>
      <article>
        Comprando con aliados de
        <b>Pikplay</b> tienes la posibilidad de ganar <b>Cashback</b><CoinIcon hideNumber />,
        <br />esto basicamente es descuentos en otras tiendas aliadas.
        <br /><br />
        Tambien invitar a tus amigos y tener un Ranking de puntos los cuales te serviran para aumentar de liga, obtener descuentos
        y participar en concursos.
      </article>
      {/* <p>
        Por ello en Pikplay solo encontraras <b>Aliados certificados</b>.
        <br />Tiendas que han sido estudiadas y validadas por nuestro equipo. Tienen nuestro total respaldo y confianza.
      </p> */}
    </div>

    <div className={styles.aliados}>
      <h2>Aliados</h2>
      <div className={styles.itemsAliados}>
        {sellersInformation && Object.keys(sellersInformation).map((key, i) => {
          const { authorInformation: item, products } = sellersInformation[key]
          // if (key == "quilla-tenis") debugger
          return <div className="Card" key={key}>
            <Link href={`/${key}`}>
              <div className={styles.sellerInformation}>
                <img src={item.picture} />
                <p>
                  <b>{item.name}</b>
                  <span>{item?.category?.label}</span>
                  {item.location}
                </p>
              </div>
            </Link>
            <div className={`${styles.products} ${(products && products.length > 1) && styles.manyProducts}`}>
              {products && products.map((product, i) => {
                // debugger
                return product.images[0].isHome && <div className={styles.itemProduct}>
                  <Zoom>
                    <span className={styles.zoomIcon}>
                      <ZoomInIcon />
                    </span>
                    <img src={product.images[0].url} />
                    {product?.showPriceHome && <div className={styles.price}>
                      <label>Redímelo por:</label>
                      <CoinIcon coins={product.priceHome || product?.price} />
                    </div>}
                  </Zoom>
                </div>
              })}
            </div>
            {(!products || !products[0].images[0]?.isHome) && <div className={styles.sellerDescription}>
              {item?.description}
            </div>}
          </div>
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

    <div className={styles.services}>
      <h2>Te ofrecemos</h2>
      <OurServices />
    </div>
  </section>
}

export default Onboarding
