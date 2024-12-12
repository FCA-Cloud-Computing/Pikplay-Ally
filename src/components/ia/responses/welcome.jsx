import styles from './welcome.module.scss'

import React from 'react';
import Link from 'next/link'
import Button from '../../button/Button'
import CoinIcon from '../../coinIcon/CoinIcon';

const Message = null

const HTML = <div className={styles.Welcome}>
  <p>
    <span class='highlighted-2'>
      <b>Bienvenido, </b>
    </span>
    esta es una guía para que puedas sacarle todo el provecho a &nbsp;
    <span class='highlighted'><b>Pikplay</b></span>
  </p>
  <li className={styles.normalText}>
    <input type="checkbox" checked onClick={(e) => e.preventDefault()} />
    <Link href="/">Entérate de que son los Pikcoins</Link>
  </li>
  <li className={styles.normalText}>
    <input type="checkbox" checked onClick={(e) => e.preventDefault()} />
    <Link href="/publicacion/nuevas-figuritas-de-kimetsu-no-yaiba-pregunta-por-tu-favorita">
      Nuestros aliados comerciales
    </Link>
  </li>
  <br /><br />
  <div severity="info">
    <span className={styles.normalText}>
      Gana tus primeros Pikcoins invitando a <b>5 amigos</b>
      <CoinIcon hideNumber />
    </span>
    <p className={styles.normalText}>
      Estos se convertiran en <b>Referidos</b> y podras obtener Pikcoins por cada uno de ellos
    </p>
  </div>
</div>

const Options = ({ handleUserMessage, set, options }) => {
  return <>
    <Button color='transparent' onClick={() => handleUserMessage('referrals', set, options)}>
      Referidos
    </Button>
    <Button color='transparent' onClick={() => handleUserMessage('welcome', set, options)}>
      Más opciones
    </Button>
  </>
}

export {
  HTML,
  Message,
  Options,
}
