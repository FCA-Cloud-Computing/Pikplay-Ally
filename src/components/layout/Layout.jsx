import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify';

import useCommonStore from '../../hooks/commonStore'
import Body from './Body.jsx'
import { useIAStore } from '../ia/IAstore.js'
import AwardsSummaryModal from '../awardsSummary/AwardsSummary.jsx';
import MessagesTop from '../messagesTop/MessagesTop.jsx';
import FullScreenLoading from '../fullScreenLoading/FullScreenLoading.jsx';
import Header from './Head.jsx';

const Layout = (props) => {
  const [isReady, setIsReady] = useState(false)
  const {
    children,
    cssClassPage,
    description,
    image,
    mobileMenuHidden,
    title,
    url,
  } = props

  const env = useCommonStore(state => state.env)
  const isAwardSummaryModalOpen = useCommonStore(state => state.isAwardSummaryModalOpen)
  const isFullLoading = useCommonStore(state => state.isFullLoading)
  const leftMenuBar = useCommonStore(state => state.leftMenuBar)
  const messageTop = useCommonStore(state => state.messageTop)
  const notifications = useCommonStore(state => state.notifications)
  const setStoreValue = useCommonStore(state => state.setStoreValue)
  const userLogged = useCommonStore(state => state.userLogged)
  const { checkIAMessage, IAMessage, setIsvisible } = useIAStore()

  const { isShow: isShowLeftMenu } = leftMenuBar
  const router = useRouter()

  Router.onRouteChangeStart = url => {
    // Restableciendo cosas
    setStoreValue('leftMenuBar', { isShow: false }) // Ocultando menu izquierdo cuando se cambia de URL
    setStoreValue('leftBottomMenuContent', null) // Ocultando menu izquierdo cuando se cambia de URL
    setIsvisible(false) // Ocultando a la IA

    if (url.includes('perfil')) { // Si va al perfil y no esta logueado
      if (!userLogged?.uid) Router.push('/?action=play-button&origin=onboarding')
      // else Router.push('/perfil' + userLogged?.name)
    }
  }

  useEffect(() => {
    const handleRouteChange = (url) => { // Cambio de pagina
      setIsvisible(false) // Ocultando a la IA
      if (isShowLeftMenu && !url.includes("#menu")) {
        setStoreValue('leftMenuBar', { isShow: false })
      }
      // else if (url.includes("#paco")) {
      // }
    };
    router.events.on('hashChangeStart', handleRouteChange); // Al cambiar de hash en la URL
    // router.events.on("routeChangeStart", handleStart);
    // router.events.on("routeChangeComplete", handleComplete);
    return () => {
      router.events.off('hashChangeStart', handleRouteChange);
    };
  }, []);

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

  const headerProps = {
    title: title || 'Pikplay',
    description,
    image,
    url,
  }

  return (
    <>
      <Header {...headerProps} />
      {/* <Head>
        <title>{title}</title>
        <meta property='title' content={title} />
        <meta property='og:title' content={title} />
        <meta name='description' content={description} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta name='url' content={url} />
        <meta name='og:url' content={url} />
        <meta name='og:site_name' content='Pikplay' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0' />
        <meta name='twitter:description' content={description} />
        <meta name='country' content='COL' />
        <meta httpEquiv='ScreenOrientation' content='autoRotate:disabled' />
        <link rel='alternate' href={url} hrefLang='es-CO' />
        <link rel='canonical' href={url} />
      </Head> */}
      <Body
        cssClassPage={cssClassPage}
        isReady={isReady}
        mobileMenuHidden={mobileMenuHidden}
        notifications={notifications}
        userLogged={userLogged}>
        <ToastContainer />
        {messageTop && <MessagesTop messageTop={messageTop} setStoreValue={setStoreValue} />}
        {isFullLoading && <FullScreenLoading />}
        {isAwardSummaryModalOpen && <AwardsSummaryModal />}
        {children}
      </Body>
    </>
  )
}

export default Layout
