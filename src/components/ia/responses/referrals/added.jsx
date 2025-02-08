import React, { useState, useEffect } from 'react';
import Button from '../../../button/Button'
import Link from 'next/link';
import useSystemStore from '../../../../hooks/storeSystem';

const HTML = <>
  {/* <img src="/images/icons/ranking-icon.png" style={{ margin: '20px auto 0', width: '140px' }} /> */}
</>

const Message = () => <p>Ir a tu perfil</p>
const Options = ({ handleUserMessage, set }) => {
  const { userLogged } = useSystemStore()
  // alert(JSON.stringify(userLogged))

  return <>
    <Link href="/perfil">
      <Button color='blue' realistic>
        &nbsp;Ir a mis notificaciones&nbsp;
      </Button>
    </Link>
  </>
}

export {
  HTML,
  Message,
  Options,
}
