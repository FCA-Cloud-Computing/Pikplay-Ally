import styles from '../../../components/competitions/competitions.module.scss'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Card, Tab, Tabs, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { ArrowBackIos } from '@mui/icons-material'
import { ArrowBackIosNew } from '@mui/icons-material'
import { ArrowBackIosNewOutlined } from '@mui/icons-material'
import { createGlobalStyle } from "styled-components";

// Custom
import { useCompetitionsStore } from '../../../components/competitions/hooks/useCompetitions'
import { getComptSrv } from '../../../services/competition/competitionService'
import useSystemStore from '../../../hooks/storeSystem'
import Layout from '../../../components/layout/Layout'
import CompetitionsList from '../../../components/competitions/CompetitionsList'
import useCompetitions from '../../../components/competitions/hooks/useCompetitions'
import CompetitionDetail from '../../../components/competitions/CompetitionDetail'
import { isEmpty } from '../../../lib/utils'
import { sellersInformation } from '../../../data/dataSellers'

const ConcursoDetailPage = (props) => {
  const {
    competitionDetail
  } = props

  const { seller: { slug: sellerSlug } } = competitionDetail

  const {
    competitions,
    competitionMembers,
    getCompetitions,
    handleCompetitionClick,
    selectedNumber,
    setSelectedNumber,
    setCompetitionMembers
  } = useCompetitions()

  const {
    authorInformation,
  } = sellersInformation[sellerSlug?.toLowerCase()] || {}

  const GlobalStyle = createGlobalStyle`
    main.App {
      background-image: url("${authorInformation?.pageBackground}");
    }`;

  const { set } = useCompetitionsStore()
  const { userLogged: { picture: userPicture, uid: uidLogged } } = useSystemStore()

  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    set({ competitionDetail })
    getCompetitions(null)
  }, [])

  return <div className={styles.CompetitionsComponent}>
    <GlobalStyle />
    <Layout title="Concursos">
      <section className="page">
        <div className={`${styles.contentTitle} contentTitle`}>
          {/* <Link href='/concursos'>
            <ArrowBackIosNew className='icon backIcon' />
          </Link> */}
          <h1 className="main">{competitionDetail.title}</h1>
        </div>
        <Card>
          <CompetitionDetail
            {...{
              // competitions,
              competitionDetail,
              competitionMembers,
              setCompetitionMembers,
              setSelectedNumber,
              selectedNumber,
              userPicture,
              uidLogged
            }}
          />
        </Card>
      </section>
    </Layout>
  </div>
}

ConcursoDetailPage.getInitialProps = async (ctx) => {
  const { query: { id: slug } } = ctx
  let res = await getComptSrv(ctx, slug)
  return { competitionDetail: res }
}

export default ConcursoDetailPage
