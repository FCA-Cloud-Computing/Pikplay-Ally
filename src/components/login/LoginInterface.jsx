import styles from './login.module.scss'

import cookieCutter from '@boiseitguru/cookie-cutter'
import React, { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '../button/Button'
import Link from 'next/link'
import Image from 'next/image'
import { MenuItem, Select } from '@mui/material'

export default function LoginInterface({
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
  setPhoneNumber,
  setName,
}) {
  const [contry, setContry] = useState('57')
  const onboardingName = typeof window != 'undefined' ? localStorage.getItem('onboardingName') : ''
  const buttonsBlocked = !isHuman && env != 'dev'

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

  useEffect(() => {
    setName(onboardingName)
    const element = document.querySelector('#loginModal__name')
    if (element) element.value = onboardingName
  }, [])

  return (
    <div className={styles.LoginComponent}>
      <Button
        alt='Ingresar con número de teléfono'
        className={`${styles.playButton}`}
        color='blue'
        id='btnStart'
        onClick={handleClickOpen}
        realistic
        shine>
        Play
      </Button>
      <Dialog
        className={styles.LoginComponent__Modal}
        fullWidth
        maxWidth='sm'
        open={isOpen}
        onClose={handleCloseDialog}
        aria-labelledby='form-dialog-title'>
        <DialogContent>
          <DialogContentText>
            {/* Env:{env}
            isHuman:{String(isHuman)}<br /> */}
            <span className={styles.subtitle}>Solo con tu número de teléfono </span>
            puedes crear tu cuenta y empezar a ganar <b>¡Pikcoins!</b>
          </DialogContentText>
          <Image alt="Imagen de login chica viendo Pikcoins en su telefono" src="images/elements/girl-coin.png" height={200} width={200} style={{ display: 'block', margin: '0 auto' }} />
          {/* Fields */}
          {/* {!isCodeSent && <TextField
            defaultValue={onboardingName}
            fullWidth
            id="loginModal__name"
            label='¿Como te gustaria que te llamemos?'
            margin='dense'
            onKeyUp={e => setName(e.target.value)}
            type='text'
          />} */}
          <div
            className={styles.contryAndPhone}
            style={{ display: isCodeSent ? 'none' : 'flex' }}>
            <Select
              className="selectCountry"
              class="selectCountry"
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={contry}
              onChange={event => setContry(event.target.value)}
              label="Pais"
              style={{
                height: '56px',
                marginRight: '10px',
                marginTop: '8px',
                width: '120px'
              }}>
              <MenuItem value="57">
                <Image
                  height='42'
                  width='40'
                  className={styles.icon_colombia}
                  src='/images/icons/colombia.png'
                  alt='' />
              </MenuItem>
              <MenuItem value="54">
                <Image
                  height='42'
                  width='40'
                  className={styles.icon_colombia}
                  src='/images/icons/argentina_flag.webp'
                  alt='' />
              </MenuItem>
              <MenuItem value="52">
                <Image
                  height='42'
                  width='40'
                  className={styles.icon_colombia}
                  src='/images/icons/mexico_flag.png'
                  alt='' />
                {/* <em>+57</em> */}
              </MenuItem>
            </Select>
            <TextField
              // onKeyUp={e => setPhone(e.target.value)}
              onChange={handleInputChange}
              margin='dense'
              id='phoneLogin'
              label='Número de celular'
              type='text'
              fullWidth
              value={phoneNumber}
            />
          </div>
          {/* {!isCodeSent && env != 'dev' && (
            <center className={`${styles.capchaContent}`}>
              <ReCAPTCHA
                sitekey='6Ldyz98eAAAAAFCJEbBSdSRqNu4Kn1XqZugCi9Qg'
                onChange={onChangeReCaptcha}
              />
            </center>
          )} */}
          {
            isCodeSent && (
              <>
                <TextField
                  autoComplete={false}
                  className={styles.inputCode}
                  disabled={buttonText == 'Validando...' ? true : false}
                  fullWidth
                  id='verificationCode'
                  label={`Coloca aquí tu código`}
                  margin='dense'
                  onChange={handleKeyUp}
                  onKeyUp={handleKeyUp}
                  type='number'
                />
                <small>
                  <a className='link'
                    href='https://api.whatsapp.com/send?phone=573204863547&text=Tengo problemas al recibir mi código de ingreso'
                    target='_BLANK'
                    rel="noreferrer">
                    Tengo problemas al recibir mi código de ingreso
                  </a>
                </small>
              </>
            )
          }
          <small className={styles.terminosCondiciones}>
            Al ingresar en Pikplay aceptas nuestros &nbsp;
            <Link href='/terminos-y-condiciones' as='/terminos-y-condiciones'>
              términos y condiciones
            </Link>
            &nbsp;es posible que te enviemos notificaciones por sms, que puedes
            desactivar cuando quieras.
          </small>
        </DialogContent >
        <DialogActions>
          {isCodeSent && <Button onClick={handleFixPhone} color='link'>
            Corregir número
          </Button>}
          {/* <Button onClick={handleCloseDialog} color='normal'>
            Cancelar
          </Button> */}
          {!isCodeSent && (
            <Button
              onClick={!buttonsBlocked ? handleTengoCodigo : null}
              color={!buttonsBlocked ? 'link' : 'normal'}>
              Tengo código
            </Button>
          )}
          <Button
            color={!buttonsBlocked ? 'blue' : 'normal'}
            onClick={!isCodeSent && !buttonsBlocked ? handleEnviarCodigo : null}
            realistic>
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog >
    </div >
  )
}
