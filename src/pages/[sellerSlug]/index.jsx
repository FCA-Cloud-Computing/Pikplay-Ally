import styles from '@/components/competitions/competitions.module.scss'
import sellerSlugStyles from './sellerSlug.module.scss'

import { useEffect } from 'react'
import { faDiceFive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import StarIcon from '@mui/icons-material/Star';
import { createGlobalStyle } from "styled-components";

// Custom
import { AuthorInformation } from '@/components/authorInformation/AuthorInformation'
import CompetitionsList from '@/components/competitions/CompetitionsList'
import useCompetitions from '@/components/competitions/hooks/useCompetitions'
import ItemCard from '@/components/itemCard/ItemCard'
import Layout from '@/components/layout/Layout'
import RankingComponent from '@/components/ranking/Ranking'
import { sellersInformation } from '../../data/dataSellers'
import BonusList from '@/components/bonusList/BonusList'
import { Loyalty } from '@/components/loyalCustomer/Loyalty'
import Button from '@/components/button/Button'
import { useIAStore } from '@/components/ia/IAstore'
import { HearingTwoTone, HeartBroken, HeartBrokenOutlined, HeartBrokenTwoTone, HeatPumpRounded } from '@mui/icons-material'
import { getUserSrv } from '@/services/user/userService'

const DefaultSellerPage = (props) => {
  const { params, sellerInformation } = props
  const router = useRouter()
  const { sellerSlug } = router.query

  const {
    authorInformation,
    competitions: competitionsArray,
    bonuses,
    products,
  } = sellersInformation[sellerSlug?.toLowerCase()] || {}
  const { aboutHTML, aboutHTMLButtonStyle, name, rankingId } = authorInformation || {}

  const GlobalStyle = createGlobalStyle`
  main.App {
    background-image: url("${sellerInformation?.pageBackground}");
  }`;

  const { setIAMessage } = useIAStore()

  const {
    isLoading: isLoadingCompetition,
    competitions,
    getCompetitions,
    handleCompetitionClick,
    selectedNumber,
    setSelectedNumber,
  } = useCompetitions()

  useEffect(() => {
    competitionsArray && competitionsArray.length > 0 && getCompetitions(competitionsArray)
  }, [])

  useEffect(() => {
    console.log('competitions', competitions)
  }, [competitions])

  return <Layout description={authorInformation.description} image={`https://pikplay.com.co/${authorInformation.picture}`} title={authorInformation.name} cssClassPage={authorInformation?.cssClassPage}>
    <GlobalStyle />
    <section className="page">
      <AuthorInformation authorInformation={sellerInformation} />
      <div className={styles.menu}>
        <div className={styles.aboutMe}>
          <Button color='link' style={aboutHTMLButtonStyle} onClick={() => setIAMessage(aboutHTML)}>
            Acerca de {name}
          </Button>
        </div>
        {/* <div>
          <HeartBrokenOutlined />
          Agregar al menu
        </div> */}
      </div>
      {competitionsArray && competitionsArray.length > 0 && <>
        <div className="contentTitle">
          <h1>
            <FontAwesomeIcon className="icon" icon={faDiceFive} />
            &nbsp;Sorteos
          </h1>
        </div>
        {/* Competitions */}
        <div className={`${styles.CompetitionsComponent}`}>
          {!isLoadingCompetition && competitions.length > 0 && <CompetitionsList
            isLoading={isLoadingCompetition}
            competitions={competitions}
            handleCompetitionClick={handleCompetitionClick}
            selectedNumber={selectedNumber}
            setSelectedNumber={setSelectedNumber}
          />}
          {isLoadingCompetition && <div> {
            new Array(3).fill(null).map((_, i) => (<Skeleton key={i} variant="rectangular" width='100%' height={120} className='Card' />))}
          </div>}
        </div>
      </>}

      {/* Bonos */}
      {bonuses && <BonusList bonuses={bonuses} />}

      <br />
      {/* Ranking */}
      {rankingId && <>
        <div className={`contentTitle ${sellerSlugStyles.Ranking}`}>
          <h1>
            <StarIcon className={sellerSlugStyles.starIcon} />
            &nbsp;Ranking
          </h1>
        </div>
        <RankingComponent {...{ rankingId }} />
      </>}

      {/* Loyalty */}
      {/* <Loyalty uid={12} sellerId={1212} /> */}

      {/* Products */}
      {products && <>
        <div className="contentTitle">
          <h1>
            <FontAwesomeIcon className="icon" icon={faDiceFive} />
            &nbsp;Productos
          </h1>
        </div>
        {products && products.map(product =>
          <ItemCard
            {...product}
            {...{
              user: authorInformation,
              whatsappNumber: authorInformation.phone
            }}
          />
        )}
      </>}
    </section>
  </Layout>
}

DefaultSellerPage.getInitialProps = async (ctx) => {
  const { asPath, req, query: { sellerSlug } } = ctx
  const sellerInformation = await getUserSrv(ctx, sellerSlug)

  return {
    sellerInformation
  }
}

export default DefaultSellerPage
