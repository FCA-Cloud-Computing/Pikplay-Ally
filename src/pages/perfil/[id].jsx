import React from 'react'
import Layout from '../../components/layout/Layout'
import { cookiesToObject } from '../../lib/utils'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSystemStore from '../../hooks/storeSystem'
import { getUsersSrv } from '../../services/user/userService'

const Index = props => {
  const { userInfoFromServer } = props
  const descripcion =
    'Pikplay es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas e independientes de alta confiabilidad ofreciendo videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch con los mejores precios del mercado en Colombia'
  const image = ''
  const title = 'Pikplay | Perfil'
  const url = 'https://pikplay.co/perfil'
  const router = useRouter()
  const showSavedMessage = !!Object.keys(router.query).find(x => x == 'updated')
  const { userLogged, setStoreValue } = useSystemStore()
  const [userDataUpdated, setUserData] = useState({
    ...userLogged,
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setStoreValue('userLogged', userInfoFromServer)
  }, [userInfoFromServer])

  return (
    <Layout image={image} descripcion={descripcion} title={title} url={url}>
      Componente de perfil
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  const statusCode = 200
  const uid = cookiesToObject(ctx.req.headers?.cookie)['User-ID']
  const userInfoFromServer = await getUsersSrv(ctx, uid)
  if (statusCode === 403) {
    return {
      redirect: {
        destination: '/?action=not_authorized',
        permanent: false,
      },
    }
  }
  return {
    props: {
      userInfoFromServer,
    }
  }
}

export default Index
