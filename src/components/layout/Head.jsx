import React from 'react'
import Head from 'next/head'

const Header = ({ description, image, title, url }) => {
  return (
    <Head>
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
      <meta name='theme-color' content='#476E95' />
      <meta
        name='google-site-verification'
        content='4IqXj9YLrm5eo3s_c3cTKcAqBwUhCf8qgJgL2sLtJko' />
      <meta name='twitter:description' content={description} />
      <meta name='keywords' value='' />
      <meta name='country' content='COL' />
      <meta name='author' content='pikplay.com.co' />
      <meta name='copyright' content='pikplay.com.co' />
      <meta name='language' content='es-CO'></meta>
      <meta httpEquiv='ScreenOrientation' content='autoRotate:disabled' />
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> {/* TODO Quitar esto una vez se pueda hacer el request al back con https */}
      {/* Global site tag (gtag.js) - Google Ads: 941382150 */}
      <link rel='alternate' href={url} hrefLang='es-CO' />
      <link rel='canonical' href={url} />
      <link rel='icon' type='image/png' href='/images/logos/logo48x48.png' />
      <link rel='manifest' href='/manifest.json' />
      {() => {
        window.dataLayer = window.dataLayer || []
        function gtag() {
          dataLayer.push(arguments) // eslint-disable-line
        }
        gtag('js', new Date())
        gtag('config', 'AW-941382150')
        gtag('event', 'conversion', {
          send_to: 'AW-941382150/e71oCMvon-0BEIa08cAD',
        })
      }}
      ()
    </Head>
  )
}

export default Header
