import React from 'react'
import Perfil from '../../components/profile/Perfil'
import Layout from '../../components/layout/Layout'
// import { gql, useMutation } from '@apollo/client'
import { cookiesToObject } from '../../lib/utils'
import { toast } from 'react-toastify'
import { useContext, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import useCommonStore from '../../hooks/commonStore'
import { validateTokenSrv, getExperiencesSrv, getUsersSrv, getReferralsSrv } from '../../services/user/user'
import { getChallengesByUser } from '@/services/challenges/challenges'

const PerfilPage = props => {
  const { userInfoFromServer, referrals } = props
  const descripcion =
    'Pikplay es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas e independientes de alta confiabilidad ofreciendo videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch con los mejores precios del mercado en Colombia'
  const image = ''
  const title = 'Pikplay | Perfil'
  const url = 'https://pikplay.co/perfil'
  const router = useRouter()
  const showSavedMessage = !!Object.keys(router.query).find(x => x == 'updated')
  const setStoreValue = useCommonStore(state => state.setStoreValue)
  const userLogged = useCommonStore(state => state.userLogged)
  const [userDataUpdated, setUserData] = useState({
    ...userLogged,
  })
  const [isSaving, setIsSaving] = useState(false)
  // const [isProfileComplete, setIsProfileComplete] = useState(true)
  // const loadUserInformation = () => {
  //   const user = user
  //   delete user.login_code
  //   if (!user.name || !user.email || !user.picture) setIsProfileComplete(false)
  //   else setIsProfileComplete(true)
  //   setUserData(user)
  // }

  const handleSave = async () => {
    setIsSaving(true)
    const imageUpdated = await handleUploadImage() // Updating Image
    if (imageUpdated) userDataUpdated.picture = imageUpdated
      // updateProfileSrv(userDataUpdated) // Updating Information
      .then(data => {
        setStoreValue('userLogged', userDataUpdated, null, true);
      })
      .catch(err => {
        toast('Error')
      })

    // Message to user
    setTimeout(() => {
      setIsSaving(false)
      toast('Perfil actualizado')
    }, 1000)
  }

  // useEffect(() => {
  //   // setStoreValue('userLogged', userInfoFromServer)
  //   // console.log(userInfoFromServer);
  //   debuggger;    
  // }, [userInfoFromServer])

  return (<Layout image={image} descripcion={descripcion} title={title} url={url}>
    <Perfil
      challenges={props.challenges}
      handleSave={handleSave}
      isSaving={isSaving}
      referrals={referrals}
      setUserData={setUserData}
      userLogged={userDataUpdated}
    />
  </Layout>)
}

export const getServerSideProps = async (ctx) => {
  const respValidate = await validateTokenSrv(ctx)
  const reqReferrals = await getReferralsSrv(ctx, null)
  const { data: referrals, code: statusCodeReferrals } = reqReferrals
  const { data, code: statusCode } = respValidate

  if (!statusCode == 200) { // Invalid
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const uid = cookiesToObject(ctx.req.headers?.cookie)['User-ID']
  const challenges = await getChallengesByUser(ctx);
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
      referrals,
      userInfoFromServer,
      challenges,
    }
  }
}

export default PerfilPage
