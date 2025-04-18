/* eslint-disable react/jsx-key */
import styles from './itemCard.module.scss'

import React, { } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import Grow from '@mui/material/Grow'
import { Tooltip } from '@mui/material'
import { ShareOutlined } from '@mui/icons-material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import classNames from 'classnames'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import ZoomInIcon from '@mui/icons-material/ZoomIn';

// Custom
import useCommonStore from '../../hooks/commonStore'
import CashbackTag from './cashbackTag/CashbackTag'
import Author from './Author'
import { formatNumber, setMessageTop } from '../../lib/utils'
import CustomFetch from '../fetch/CustomFetch'
import { postChallengeDetail } from '@/services/challenges/challenges'
import { CID_ASK_PRODUCT } from '@/consts/challenges'
import CoinIcon from '../coinIcon/CoinIcon'

const ItemCard = (props) => {
  const {
    acceptChanges,
    cashbackAvailable = true,
    coins,
    following,
    freeShipping,
    handleFavorite,
    isAddi,
    isClickable = true,
    id: publicationId,
    images = '',
    isUsed,
    likes,
    price,
    seller,
    slug,
    tags,
    title,
    whatsappNumber
  } = props

  const { setStoreValue } = useCommonStore()
  const imagesList = images ? images.split(",") : []
  const usuario =
    typeof localStorage != 'undefined'
      ? localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).email
        : null
      : null
  let like = null
  if (usuario) like = likes ? !!likes.find(like => like == usuario) : false
  const isDestacada = publicationId == 1 ? true : false
  const { loggedUser } = useCommonStore()
  const shareLink = `https://api.whatsapp.com/send?phone=&text=Revisa%20esta%20publicacion%20en%20Pikplay%20que%20esta%20potente%20https://pikplay.com.co/${seller.slug}%23${slug}`
  const showTags = isUsed || cashbackAvailable

  const handlerAskProduct = () => {
    const resp = postChallengeDetail(null, { challengeId: CID_ASK_PRODUCT })
      .then(({ data }) => {
        const { messageTop } = data
        if (messageTop) setMessageTop(messageTop)
      })
  }

  return (
    <Grow key={publicationId} in={true} style={{ opacity: 1 }}>
      <div
        id={slug}
        key={publicationId}
        className={`${styles.ItemCard} ${isDestacada ? styles.isDestacada : ''}`}>
        <div className={styles.descripcion_imagen}>
          <div className={styles.content_imagen}>
            {/* Image */}
            {imagesList.length > 0 && <a
              // onClick={isClickable && handlerAskProduct}
              as={slug ? `/publicacion/${slug}` : 'javascript:void(0)'}
              className={styles.image_wrapper}
              // href={isClickable ? `https://api.whatsapp.com/send?phone=${user.whatsappNumber}&text=¡Hola! me interesa este producto de Pikplay ${title}` : null}
              key={publicationId}
              target='_blank'
            // href={slug ? '/publicacion/[id]' : 'javascript:void(0)'}
            >
              {
                imagesList.map(image => (<>
                  <Zoom>
                    <span className={styles.zoomIcon}>
                      <ZoomInIcon />
                    </span>
                    <Image
                      alt="imagen del producto"
                      fill
                      style={{ objectFit: 'cover' }}
                      src={image}
                    // height={300}
                    // width={300}
                    />
                  </Zoom>
                </>
                ))
              }
            </a>}
          </div>
          {
            showTags && <div className={`tags ${styles.tags}`}>
              {isUsed && (
                <span
                  title='El articulo es de segunda mano'
                  className={styles.condition}>
                  Usado
                </span>
              )}
              {/* Si aplica cashback */}
              {cashbackAvailable && <CashbackTag value={'1%'} />}
              {acceptChanges && (
                <span
                  className={styles.condition}
                  title='El vendedor acepta productos como parte de pago o incluso cambiar el producto por otro de su interés'>
                  Acepto cambios
                </span>
              )}
              {!!tags && tags.map((item, ind) => {
                return <span key={ind}>{item.texto}</span>
              })}
            </div>
          }
          {/* Si tiene precio y Cashback */}
          {cashbackAvailable && price && <div className={styles.cashbackInformation}>
            Con esta compra obtienes <br />
            <b>{(price * 0.01) / 100} Puntos</b> de categoria</div>}
          {/* Si no tiene precio */}
          {cashbackAvailable && !price && <div className={styles.cashbackInformation}>
            Preguntale al comercio sobre <br /> los créditos por esta compra
          </div>}
          {
            <div className={styles.descripcion}>
              <div className={styles.icons}>
                {/* <Tooltip title='Seguir publicación'> 
                  <a>
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={classNames(styles.faHeart, {
                        [styles.active]: following
                      })}
                      onClick={() => {
                        loggedUser?.id != 0
                          ? handleFavorite({
                            variables: {
                              publication: publicationId,
                              user: loggedUser?.id,
                            },
                          })
                          : document.querySelector('#btnStart').click()
                      }}
                    />
                  </a>
                </Tooltip> */}
                {/* <Tooltip title='Compartir'> */}
                <a
                  href={`${shareLink}`}
                  rel="noreferrer"
                  target='_BLANK'>
                  <ShareOutlined
                    className={styles.faShare} />
                  {/* <FontAwesomeIcon
                      icon={faShare}
                      className={styles.faShare}
                    /> */}
                </a>
                {/* </Tooltip> */}
              </div>
              <a
                as={slug ? `/publicacion/${slug}` : 'javascript:void(0)'}
                className={publicationId == 1 ? styles.destacada_Card : ''}
                // href={slug ? '/publicacion/[id]' : 'javascript:void(0)'}
                href={isClickable ? `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=¡Hola! me interesa este producto de Pikplay ${title}` : null}
                onClick={isClickable && handlerAskProduct}
                target='_blank'>
                {title && <h2>
                  {title}
                </h2>}
              </a>
              {/* {user?.name && <Author user={user} />} */}
              {/* <small className={styles.location}> // TODO Mostrar la ciudad
                {cityLabel}
                &nbsp;-&nbsp;
                {countryLabel}
              </small> */}
              {/* {quantity && <p className={styles.quantity}>{quantity} unidades disponibles</p>} */}
              {price && <div className={styles['likes-precio']}>
                <div className={styles.content_precio}>
                  {
                    // Precio
                    Number(price) != 0 && (
                      <React.Fragment>
                        <span className={styles.nuevoPrecio}>
                          $ {formatNumber(price)}
                        </span>
                      </React.Fragment>
                    )
                  }
                </div>
              </div>}

              {coins && <CoinIcon size={32} coins={coins} />}

              {/* Envio */}
              {freeShipping && <div className={styles.shipping}>
                <LocalShippingIcon className='icon' />
                <span>Envío gratis</span>
              </div>}

              {/* Banner de ADDI */}
              {isAddi && <div className={styles.contentAddi}>
                <span>
                  Llévatelo con
                </span>
                <img src="https://finanzasplus.co/wp-content/uploads/2024/03/addi-1024x575.webp" />
              </div>}
            </div>
          }
        </div>
      </div>
    </Grow>
  )
}

export default ItemCard
