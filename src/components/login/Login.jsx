'use client'

import cookieCutter from '@boiseitguru/cookie-cutter'
import React, { useState } from 'react'
// import LoginInterface from './LoginInterface'
import { useRouter } from 'next/router'
import useCommonStore from '../../hooks/commonStore'
import { loginSrv } from '../../services/user/userService'
import { toast } from 'react-toastify'
import LoginInterface from './LoginInterface'

function Login(props) {
  const { env, setStoreValue } = useCommonStore()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isHuman, setIsHuman] = useState(env == 'dev')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [name, setName] = useState(null)
  const [buttonText, setButtonText] = useState('Enviar código')

  const numberValidated = phoneNumber => phoneNumber.length === 10

  const handleTengoCodigo = () => {
    // const phoneNumber = document.getElementById('phoneLogin').value
    const formattedPhoneNumber = (phoneNumber || '').replace(/-/g, '');
    if (!phoneNumber || !formattedPhoneNumber || !numberValidated(formattedPhoneNumber)) {
      toast('Debes escribir un número de celular válido, recuerda que a este número llegará el código de acceso')
      setButtonText('Enviar código')
      return
    }
    setButtonText('¡Play!')
    setIsCodeSent(true)
  }

  const validateLogin = async (loginCode) => {
    // Numero de telefono y código son necesarios
    const contryCode = '57'
    const formattedPhoneNumber = phoneNumber.replace(/-/g, '');
    const fullPhone = contryCode + formattedPhoneNumber
    try {
      setStoreValue('isFullLoading', true)
      const req = await loginSrv(null, fullPhone, parseInt(loginCode, 10))
      const { code, data } = req
      if (code == 200) {
        const { token, uid } = data
        setStoreValue("userLogged", data)
        handleCloseDialog()
        // cookieCutter.set('X-Auth-Token', token)
        // cookieCutter.set('User-ID', uid)
        router.push('?login=true')
      }
      else if (code == 400) {
        document.getElementById('verificationCode').value = ''
        toast('Código no valido')
        setButtonText('Validar código')
      }
      setStoreValue('isFullLoading', false)
    } catch (error) {
      console.log(error);
      setButtonText('Validar código')
      setStoreValue('isFullLoading', false)
    }
  }

  const handleEnviarCodigo = async () => {
    // setButtonText('Enviando...')
    const formattedPhoneNumber = phoneNumber.replace(/-/g, '');
    if (!phoneNumber || !numberValidated(formattedPhoneNumber)) {
      toast('Debes escribir un número de celular válido, recuerda que a este número llegará el código de acceso')
      setButtonText('Enviar código')
      return false
    }
    setStoreValue('isFullLoading', true)

    const contryCode = '57'
    const fullPhone = contryCode + phoneNumber
    const req = await loginSrv(null, fullPhone, null, name)
    if (req.code == 200) {
      toast('¡Código enviado!, ahora solo debes colocarlo allí ⬇️')
      setButtonText('Validar')
      setIsCodeSent(true)
    } else {
      toast.error('Parece que tenemos lios al envíarte el código,c omunicate con nuestra linea de atención')
    }
    setStoreValue('isFullLoading', false)
  }

  const handleCloseDialog = () => {
    setIsHuman(false)
    setIsCodeSent(false)
    setIsOpen(false)
  }

  const handleFixPhone = () => {
    setIsCodeSent(false)
    setButtonText('Enviar código')
  }

  const handleClickOpen = () => {
    setIsOpen(true)
  }

  const handleKeyUp = async (e) => {
    const code = e.target.value
    const verificationCode = document.getElementById('verificationCode').value
    if (verificationCode) Number(verificationCode)
    if (verificationCode < 999) return
    setButtonText('Validando...')
    validateLogin(code)
  }

  const onChangeReCaptcha = value => {
    value = !!value
    setIsHuman(value)
  }

  return (<LoginInterface
    {...{
      buttonText,
      env,
      isCodeSent,
      isHuman,
      isOpen,
      handleClickOpen,
      handleEnviarCodigo,
      handleKeyUp,
      handleCloseDialog,
      handleFixPhone,
      handleTengoCodigo,
      onChangeReCaptcha,
      phoneNumber,
      setIsCodeSent,
      setPhoneNumber,
      setName
    }}
  />)
}

export default Login
