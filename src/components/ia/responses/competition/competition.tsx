import React from 'react'
import Link from 'next/link'
import Button from '../../../button/Button'
import useCompetitions from '../../../competitions/hooks/useCompetitions'
import useSystemStore from '../../../../hooks/storeSystem'
import { DeleteOutlined, MessageOutlined, WorkspacePremium } from '@mui/icons-material'
import { postCompetitionMemberSrv } from '../../../../services/competition/competitionService'

const Message = (props) => {
  const { options: { number } } = props
  return <p>Estarás jugando con el número <span className='highlighted'>{number}</span>, deseas reservarlo?</p>
}

const handleYes = async (handleUserMessage, set, options, setStoreValue) => {
  const { competitionID, number, uid, element } = options
  if (!uid) {
    element.click()
    return
  }
  try {
    const resp = await postCompetitionMemberSrv(null, competitionID, number, uid)
    const { status } = resp
    // Abriendo la modal con los premios obtenidos
    // const { htmlChallengeObtained, nowCompleted } = resp.challengeUpdated
    // if (nowCompleted) {
    //   // Setting on true the award modal
    //   setTimeout(() => {
    //     setStoreValue('awardsSummaryModalHTML', htmlChallengeObtained)
    //     setStoreValue('isAwardSummaryModalOpen', true)
    //   }, 4000)
    // }
    if (status == 400) { // Number already taken
      handleUserMessage('competition/yes/taken', set, options)
    } else {
      const { data: { messageTop }, message, status } = resp
      handleUserMessage('competition/yes', set, options)
      messageTop && setStoreValue('messageTop', messageTop)
    }
  } catch (err) {
    console.log(err)
  }
}

const Options = ({ handleUserMessage, set, options }) => {
  const { userLogged: { uid }, setStoreValue } = useSystemStore()
  options.uid = uid
  const element: HTMLElement | null = document.querySelector('#btnStart');
  options.element = element
  if (!uid && element) element.click()
  const { liberarNumero, getCompetitions } = useCompetitions();
  return <>
    <a href="#">
      <Button color='blue' onClick={() => handleYes(handleUserMessage, set, options, setStoreValue)}>
        Si
      </Button>
    </a>
    {/* <Link target='_BLANK' href='https://api.whatsapp.com/send?phone=573204863547&text=Quisiera adquirir este número de ahora y próximos sorteos'>
      <Button color='transparent' disabled border>
        &nbsp;Casar número
        <WorkspacePremium style={{ color: '#fad426' }} />
      </Button>
    </Link> */}
    <Link target='_BLANK' href='https://api.whatsapp.com/send?phone=573204863547&text=Tengo dudas sobre el sorteo'>
      <Button color='transparent' border>
        &nbsp;Envíar mensaje&nbsp;
        <MessageOutlined className='icon' />
      </Button>
    </Link>
  </>
}

const MyNumberMessage = () => {
  return <p>¿Quieres liberar el número?</p>
}

const MyNumberOptions = ({ handleUserMessage, set, options }) => {
  const { liberarNumero } = useCompetitions();
  return <a href="#">
    <Button style={{ color: 'white' }} color='red' onClick={() => {
      liberarNumero();
      handleUserMessage('hideIA', set);
    }}>
      <DeleteOutlined className='icon' />
      &nbsp;Liberar número
    </Button>
  </a>
}

export {
  Message,
  MyNumberOptions,
  MyNumberMessage,
  Options,
}
