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
  const [phone, setPhone] = useState(null)
  const [name, setName] = useState(null)
  const [buttonText, setButtonText] = useState('Enviar código')

  const numberValidated = phone => phone.length === 10

  const handleTengoCodigo = () => {
    const phone = document.getElementById('phoneLogin').value
    if (!phone || !numberValidated(phone)) {
      toast('Debes escribir un número de celular válido, recuerda que a este número llegará el código de acceso')
      setButtonText('Enviar código')
      return
    }
    setButtonText('Ingresar')
    setIsCodeSent(true)
  }

  const validateLogin = async (code) => {
    // Numero de telefono y codigo son necesarios
    const contryCode = '57'
    const fullPhone = contryCode + phone
    try {
      const req = await loginSrv(null, fullPhone, parseInt(code, 10))
      const { data } = req
      if (data) {
        const { token, uid } = data
        setStoreValue("userLogged", data)
        handleCloseDialog()
        // cookieCutter.set('X-Auth-Token', token)
        // cookieCutter.set('User-ID', uid)
        router.push('?login=true')
      } else {
        document.getElementById('verificationCode').value = ''
        toast('Código no valido')
        setButtonText('Validar')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEnviarCodigo = async () => {
    setButtonText('Enviando...')
    const phone = document.getElementById('phoneLogin').value
    if (!phone || !numberValidated(phone)) {
      toast('Debes escribir un número de celular válido, recuerda que a este número llegará el código de acceso')
      setButtonText('Enviar código')
      return false
    }
    const contryCode = '57'
    const fullPhone = contryCode + phone
    const req = await loginSrv(null, fullPhone, null, name)
    setButtonText('Validar')
    setIsCodeSent(true)
  }

  const handleCloseDialog = () => {
    setIsHuman(false)
    setIsCodeSent(false)
    setIsOpen(false)
  }

  const handleFixPhone = () => {
    setIsCodeSent(false)
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
      phone,
      setIsCodeSent,
      setPhone,
      setName
    }}
  />)
}

export default Login
