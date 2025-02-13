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

const DefaultSellerPage = (props) => {
  const { params } = props
  const router = useRouter()
  const { sellerSlug } = router.query

  const {
    authorInformation,
    competitions: competitionsArray,
    bonuses,
    products,
  } = sellersInformation[sellerSlug?.toLowerCase()] || {}
  const { rankingId } = authorInformation || {}

  const GlobalStyle = createGlobalStyle`
  main.App {
    background-image: url("${authorInformation?.pageBackground}");
  }`;

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

  return <Layout title="Concursos" cssClassPage={authorInformation?.cssClassPage}>
    <GlobalStyle />
    <section className="page">
      <AuthorInformation authorInformation={authorInformation} />
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
              whatsappNumber: authorInformation.whatsappNumber
            }}
          />
        )}
      </>}
    </section>
  </Layout>
}

DefaultSellerPage.getInitialProps = (ctx) => {
  const { asPath, req } = ctx
  return {

  }
}

export default DefaultSellerPage
