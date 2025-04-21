import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

// Custom
import Button from '../../../button/Button'
import { saveReferralSrv } from '@/services/user/user'
import { getContacts } from '@/lib/utils'

const HTML = <></>

const Message = () => <p>Con cada referido ganas 🎉 <br /><br />
  Recuerdale a tus referidos aceptar la invitacion enviada por wsp ó por mensaje de texto.</p>

const Options = ({ handleUserMessage, set }) => {
  const callBackContacsSuccess = async (contacts) => {
    alert('Contacts retrieved successfully.')
  }

  const callBackContacsFail = async (contacts) => {
    alert('Failed to get contacts. Please try again.')
  }

  return <>
    <Button color='blue' realistic onClick={() => getContacts(callBackContacsSuccess, callBackContacsFail)}>
      Agregar referidos
    </Button>
    {/* <Link href='/perfil'>
      <Button color='yellow' realistic>
        Ver premios por completar Onboarding
      </Button>
    </Link> */}
  </>
}

export {
  HTML,
  Message,
  Options,
}
