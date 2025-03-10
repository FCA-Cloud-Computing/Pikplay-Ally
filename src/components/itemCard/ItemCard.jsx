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

// Custom
import useCommonStore from '../../hooks/commonStore'
import CashbackTag from './cashbackTag/CashbackTag'
import Author from './Author'
import { formatNumber } from '../../lib/utils'

const ItemCard = (props) => {
  const {
    acceptChanges,
    cashbackAvailable,
    following,
    freeShipping,
    handleFavorite,
    isAddi,
    id: publicationId,
    images,
    isUsed,
    likes,
    price,
    slug,
    tags,
    title,
    user,
    whatsappNumber
  } = props

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
  const shareLink = `https://api.whatsapp.com/send?phone=&text=Revisa%20esta%20publicacion%20en%20Pikplay%20que%20esta%20potente%20https://pikplay.com.co/${user.slug}%23${slug}`

  return (
    <Grow key={publicationId} in={true} style={{ opacity: 1 }}>
      <div
        id={slug}
        key={publicationId}
        className={`${styles.ItemCard} ${isDestacada ? styles.isDestacada : ''}`}>
        <div className={styles.descripcion_imagen}>
          <div className={styles.content_imagen}>
            {/* Image */}
            <a
              as={slug ? `/publicacion/${slug}` : 'javascript:void(0)'}
              className={styles.image_wrapper}
              href={`https://api.whatsapp.com/send?phone=${user.whatsappNumber}&text=¡Hola! me interesa este producto de Pikplay ${title}`}
              key={publicationId}
              target='_blank'
            // href={slug ? '/publicacion/[id]' : 'javascript:void(0)'}
            >
              {
                images && images.length > 0 && images.map(image => (
                  <Image
                    alt="imagen del producto"
                    layout='fill'
                    objectFit='contain'
                    src={image?.url}
                  />
                ))
              }
            </a>
          </div>
          <div className={`tags ${styles.tags}`}>
            {isUsed && (
              <span
                title='El articulo es de segunda mano'
                className={styles.condition}>
                Usado
              </span>
            )}
            {/* Si aplica cashback */}
            {cashbackAvailable && <CashbackTag />}
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
          {/* Si tiene precio y Cashback */}
          {cashbackAvailable && price && <div className={styles.cashbackInformation}>
            Con esta compra obtienes <b>{(price * 0.01) / 100} Points</b></div>}
          {/* Si no tiene precio */}
          {cashbackAvailable && !price && <div className={styles.cashbackInformation}>
            Preguntale al vendedor sobre los créditos por esta compra</div>}
          {
            <div className={styles.descripcion}>
              <div className={styles.icons}>
                <Tooltip title='Seguir publicación'>
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
                </Tooltip>
                <Tooltip title='Compartir'>
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
                </Tooltip>
              </div>
              <a
                as={slug ? `/publicacion/${slug}` : 'javascript:void(0)'}
                className={publicationId == 1 ? styles.destacada_Card : ''}
                // href={slug ? '/publicacion/[id]' : 'javascript:void(0)'}
                href={`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=¡Hola! me interesa este producto de Pikplay ${title}`}
                target='_blank'
              >
                <h2>
                  {title ? title : 'Espacio para el título de la publicación'}
                </h2>
              </a>
              {user?.name && <Author user={user} />}
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
