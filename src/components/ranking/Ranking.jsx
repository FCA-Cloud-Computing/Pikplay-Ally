import styles from './ranking.module.scss'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"

// Custom
import { formatNumber, getContacts, logout } from '@/lib/utils'
import ProfileImage from '../profileImage/ProfileImage'
import { rankingDataPoints } from './rankingData'
import Button from '../button/Button'
import { useIAStore } from '../ia/IAstore'
import useCommonStore from '@/hooks/commonStore'
import { getReferralsSrv, getUsersSrv } from '@/services/user/user'
import { addRankingDetailSrv, getRankingDetailSrv } from '@/services/rankings/rankings'
import { getExperiencesSrv } from '@/services/experience'

const RankingComponent = (props) => {
  const {
    rankingData: rankingDataProp,
    rankingId,
    isButtonJoinRanking,
    isButtonReferral,
    isInviteButton,
    isPointsByExperience,
  } = props
  const [rankingData, setRankingData] = useState(rankingDataProp ? rankingDataProp : [])
  const setIAMessage = useIAStore(item => item.setIAMessage)
  const setStoreValue = useCommonStore(state => state.setStoreValue)
  const userLogged = useCommonStore(state => state.userLogged)

  const getRankingDetail = () => {
    try {
      getRankingDetailSrv(null, rankingId)
        .then(rankingDataPointsRes => {
          const { data: rankingDataPoints } = rankingDataPointsRes
          const uids = rankingDataPoints.map(member => member.uid)
          getUsersSrv(null, { uids: uids.join() })
            .then(async ({ code, data }) => {
              // debugger
              const uidsAndExperiences = await getExperiencesSrv(null, uids)

              const pointsAndUserData = rankingDataPoints.map(member => { // Recorriendo usuarios
                const user = data && data.find(user => user.uid === member.uid)
                // const currentExperience = experiences.data && experiences.data.reduce((acc, exp) => exp.uid === member.uid ? exp : acc, null)
                const currentExperience = uidsAndExperiences.reduce((acc, exp) => {
                  if (exp.uid === member.uid) {
                    return exp.experience
                  }
                  return acc
                }, 0)

                return {
                  ...user,
                  currentExperience,
                  league: 'bronce',
                  points: isPointsByExperience ? currentExperience : member.points,
                  pointsDetail: !isPointsByExperience ? member.pointsDetail : null,
                }
              })
              setRankingData(pointsAndUserData)
            })
            .catch(err => {
              console.log('Error getting users', err)
            })
        })
    } catch (error) {
      console.log('Error getting ranking data', error)
    }
  }

  const getReferrals = async () => {
    const req = await getReferralsSrv(null, null)
    if (req.code === 200) {
      setRankingData(req.data)
    }
  }

  useEffect(() => {
    !rankingDataProp && getRankingDetail()
    getReferrals()
  }, [])

  const handlePointsDetail = (pointsDetail) => {
    const HTML = <div>
      <p>Detalles de los puntos:</p>
      {pointsDetail.map(item => <li>{item.detail} - {item.points}</li>)}
    </div>
    setIAMessage(HTML, null, null)
  }

  const handleParticipate = () => {
    const isLogged = !!userLogged?.uid
    if (!isLogged) {
      setStoreValue({ isOpenLoginModal: true, leftMenuBar: { isShow: true } })
      return
    }

    addRankingDetailSrv(null, { rid: rankingId })
      .then(res => {
        debugger
        const { code, errorCode, message } = res
        if (code === 200) {
          setIAMessage('Te has unido al ranking', null, null)
        } else if (errorCode == 403) {
          setStoreValue('leftMenuBar', { isShow: true })
          setStoreValue('isOpenLoginModal', true)
          logout()
        }
      })
      .catch(err => {
        console.log('Error adding ranking detail', err)
      })
  }

  const callbackSuccess = () => {
    setStoreValue('messageTop', { message: 'Se han añadido tus amigos', type: 'success' })
    getReferrals()
  }

  return (
    <div className={styles.RankingComponent}>
      {isButtonJoinRanking && <Button color="blue" realistic fullWidth className="p-10" onClick={handleParticipate}>Quiero participar</Button>}
      {isButtonReferral && <Button
        className="p-10"
        color="blue"
        fullWidth
        onClick={() => getContacts(callbackSuccess)}
        realistic
        style={{ marginBottom: '10px' }}
      >
        Añadir a un amigo
      </Button>}

      <div className={styles.list}>
        {rankingData && rankingData.length > 0 && rankingData
          .sort((a, b) => b.points - a.points)
          .map((member, index) => {
            const { league } = member
            const percentageBar = member.points / 100;

            return <motion.div
              animate={{ x: 0, }}
              className={`${index == 0 ? 'starsFallingDown' : ''} ${styles.item} ${member.uid}`}
              initial={{ x: '-400px' }}
              key={index}
              transition={{ delay: index * 0.3 }}
              onClick={() => member.pointsDetail && handlePointsDetail(member.pointsDetail)}>
              <div className={styles.number}>
                {index + 1}
                <span className={styles.arrow}>«</span>
              </div>
              <div className={styles.picture}>
                <ProfileImage picture={member.picture} small percentageBar={percentageBar} />
              </div>
              <div className={styles.name}>
                <span>
                  {member.name}
                </span>
                <div>
                  {league && <small className={`${styles.leagueBox} leagueBox`}>{league}</small>}
                </div>
              </div>
              {member.points >= 0 && <div className={styles.points}>
                {formatNumber(member.points)} Pts.
              </div>}
              {(!member.points && isInviteButton) && <Button class="f-r" color="yellow" target='_link'>Invitar</Button>}
            </motion.div>
          })}
      </div>
    </div>
  )
}

export default RankingComponent
