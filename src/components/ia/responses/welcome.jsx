import styles from './welcome.module.scss'

import React from 'react';
import Link from 'next/link'
import Button from '../../button/Button'
import CoinIcon from '../../coinIcon/CoinIcon';

const Message = () => <div></div>

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
  Message,
  Options,
}
