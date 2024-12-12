import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import useSystemStore from '../../hooks/storeSystem.js'
import Body from './Body.jsx'
import { useIAStore } from '../ia/IAstore.js'

const Layout = (props) => {
  const [isReady, setIsReady] = useState(false)
  const { children, descripcion, image, title, url, mobileMenuHidden } = props
  const { darkMode, env, setStoreValue, userLogged, notifications, isAwardSummaryModalOpen } = useSystemStore((state => state))
  const { checkIAMessage, IAMessage, setIsvisible } = useIAStore()

  Router.onRouteChangeStart = url => {
    setIsvisible(false) // Ocultando a la IA
    if (url.includes('perfil')) { // Si va al perfil y no esta logueado
      if (!userLogged?.uid) Router.push('/?action=play-button&origin=onboarding')
      // else Router.push('/perfil' + userLogged?.name)
    }
  }

  useEffect(() => {
    checkIAMessage(IAMessage); // Check if there is an IA message to show
    // START Setting env variable
    if (setStoreValue && !env) {
      const url = window.location.href
      if (env) setStoreValue('env', env)
      else if (url.includes('devtunnels')) {
        setStoreValue('env', 'dev')
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='title' content={title} />
        <meta property='og:title' content={title} />
        <meta name='description' content={descripcion} />
        <meta property='og:description' content={descripcion} />
        <meta property='og:image' content={image} />
        <meta name='url' content={url} />
        <meta name='og:url' content={url} />
        <meta name='og:site_name' content='Pikplay' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0' />
        <meta name='twitter:description' content={descripcion} />
        <meta name='country' content='COL' />
        <meta httpEquiv='ScreenOrientation' content='autoRotate:disabled' />
        <link rel='alternate' href={url} hrefLang='es-CO' />
        <link rel='canonical' href={url} />
        <link rel="stylesheet" href="/font-awesome-4.7.0/css/font-awesome.min.css"></link>
      </Head>
      <Body
        isReady={isReady}
        mobileMenuHidden={mobileMenuHidden}
        notifications={notifications}
        userLogged={userLogged}
      >
        {children}
      </Body>
    </>
  )
}

export default Layout
