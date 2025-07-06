import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

// Custom
import Button from '../../../button/Button'
import { saveReferralSrv } from '@/services/user/user'
import { getContacts } from '@/lib/utils'
import { useIAStore } from '../../IAstore'

const HTML = <></>


const Message = () => <p>Con cada referido ganas 🎉 <br /><br />
  Recuerdale a tus referidos aceptar la invitacion enviada por wsp ó por mensaje de texto.</p>

const Options = ({ handleUserMessage, set }) => {
  const {
      setIsvisible,
  } = useIAStore((state => state))
  const callBackContacsSuccess = async (contacts) => {
    toast("Contactos se han añadido correctamente.")
    setIsvisible(false)
  }

  const callBackContacsFail = async (contacts) => {
    toast.error("Error al obtener los contactos, comunicate con soporte")
    setIsvisible(false)
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
