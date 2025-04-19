import sellerSlugStyles from './sellerSlug.module.scss'
import styles from '@/components/competitions/competitions.module.scss'

import { useEffect, useState } from 'react'
import { faDiceFive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import StarIcon from '@mui/icons-material/Star';
import { createGlobalStyle } from "styled-components";
import { HearingTwoTone, HeartBroken, HeartBrokenOutlined, HeartBrokenTwoTone, HeatPumpRounded } from '@mui/icons-material'

// Icons
import SavingsIcon from '@mui/icons-material/Savings';
import InfoIcon from '@mui/icons-material/Info';

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
import WordChallenge from '@/components/wordChallenge/WorkChallenge'
import MESSAGES from '@/consts/messages'

import { getUserSrv } from '@/services/user/user'
import { getPublicationsSrv } from '@/services/publications/publications'
import { getCouponsSrv } from '@/services/coupon/couponService'

const DefaultSellerPage = (props) => {
  const router = useRouter()
  const [showWordChallenge, setShowWorkChallenge] = useState(false)

  const { coupons, params, publications, sellerInformation } = props
  const { registerInvoiceLabel } = sellerInformation
  const { sellerSlug } = router.query

  const {
    authorInformation,
    competitions: competitionsArray,
    bonuses,
    productsTitle,
    products,
    rankingId
  } = sellersInformation[sellerSlug?.toLowerCase()] || {}

  const {
    aboutHTML,
    aboutHTMLButtonStyle,
    description,
    name,
    phone,
    picture,
  } = authorInformation || {}
  const GlobalStyle = createGlobalStyle``
  // main.App {
  //   background-image: url("${sellerInformation?.pageBackground}");
  //   ${sellerInformation.pageBackgroundStyles}
  // }`;

  const { handleUserMessage, setIAMessage } = useIAStore()
  const { REGISTER_INVOICE_LABEL } = MESSAGES;

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

  return <Layout description={description} image={`https://pikplay.com.co/${picture}`} title={authorInformation?.name} cssClassPage={authorInformation?.cssClassPage}>
    <GlobalStyle />
    <section className="page">
      <AuthorInformation authorInformation={sellerInformation} />
      <div className={sellerSlugStyles.menu}>
        <div className={`flex ${sellerSlugStyles.aboutMe}`}>
          <Button color='link' className='outline' onClick={() => handleUserMessage('addTransactionSteps')}>
            {/* <SavingsIcon /> */}
            {registerInvoiceLabel || REGISTER_INVOICE_LABEL}
          </Button>
          <Button color='link' className='outline' onClick={() => setShowWorkChallenge(true)}>
            {/* <SavingsIcon /> */}
            Trivia Challenge
          </Button>
          <Button color='link' className='outline' onClick={() => setIAMessage(aboutHTML)}>
            {/* <InfoIcon /> */}
            Acerca de {name}
          </Button>
          <Button color='link' className='outline' onClick={() => handleUserMessage('referrals', { referralOrigin: sellerSlug })}>
            {/* <SavingsIcon /> */}
            Referir amigo
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
      {coupons && <BonusList bonuses={coupons.data} />}

      {showWordChallenge && <WordChallenge showModal={showWordChallenge} setShowModal={setShowWorkChallenge} />}

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
      {publications?.data && <>
        <div className={`${sellerSlugStyles.productsTitle} contentTitle`}>
          <h1>
            <FontAwesomeIcon className="icon" icon={faDiceFive} />
            &nbsp;{productsTitle || 'Productos'}
          </h1>
        </div>
        <div className={sellerSlugStyles.list}>
          {/* {JSON.stringify(publications)} */}
          {publications.data.map(publication => {
            return <ItemCard
              {...publication}
              {...{
                user: authorInformation,
                whatsappNumber: phone
              }}
            />
          }
          )}
        </div>
      </>}
    </section>
  </Layout>
}

DefaultSellerPage.getInitialProps = async (ctx) => {
  const { asPath, req, query: { sellerSlug } } = ctx
  const { data: sellerInformation } = await getUserSrv(ctx, sellerSlug)
  const publications = await getPublicationsSrv(ctx, sellerSlug)
  const coupons = await getCouponsSrv(ctx, sellerSlug)

  return {
    publications,
    sellerInformation,
    coupons,
  }
}

export default DefaultSellerPage
