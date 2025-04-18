import styles from './ranking.module.scss'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"

// Custom
import { formatNumber, logout } from '@/lib/utils'
import ProfileImage from '../profileImage/ProfileImage'
import { rankingDataPoints } from './rankingData'
import Button from '../button/Button'
import { useIAStore } from '../ia/IAstore'
import useCommonStore from '@/hooks/commonStore'
import { getUsersSrv } from '@/services/user/user'
import { addRankingDetailSrv, getRankingDetailSrv } from '@/services/rankings/rankings'

const RankingComponent = (props) => {
  const { rankingId } = props
  const [rankingData, setRankingData] = useState([])
  const { setIAMessage } = useIAStore()
  const { setStoreValue } = useCommonStore((state => state))

  useEffect(() => {
    try {
      getRankingDetailSrv(null, rankingId)
        .then(rankingDataPointsRes => {
          const { data: rankingDataPoints } = rankingDataPointsRes
          const uids = rankingDataPoints.map(member => member.uid)
          getUsersSrv(null, { uids: uids.join() })
            .then(({ code, data }) => {
              // debugger
              const pointsAndUserData = rankingDataPoints.map(member => {
                const user = data && data.find(user => user.uid === member.uid)
                return {
                  ...user,
                  league: 'bronce',
                  points: member.points,
                  pointsDetail: member.pointsDetail,
                }
              })
              setRankingData(pointsAndUserData)
            })
            .catch(err => {
              debugger
              console.log('Error getting users', err)
            })
        })
    } catch (error) {
      console.log('Error getting ranking data', error)
    }
  }, [])

  const handlePointsDetail = (pointsDetail) => {
    const HTML = <div>
      <p>Detalles de los puntos:</p>
      {pointsDetail.map(item => <li>{item.detail} - {item.points}</li>)}
    </div>
    setIAMessage(HTML, null, null)
  }

  const handleParticipate = () => {
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

  return (
    <div className={styles.RankingComponent}>
      <Button color="blue" realistic fullWidth className="p-10" onClick={handleParticipate}>Quiero participar</Button>
      <div className={styles.list}>
        {rankingData && rankingData.length > 0 && rankingData.sort((a, b) => b.points - a.points).map((member, index) => {
          const { league } = member
          return <motion.div
            animate={{ x: 0, }}
            className={`${index == 0 ? 'starsFallingDown' : ''} ${styles.item} ${member.uid}`}
            initial={{ x: '-400px' }}
            key={index}
            transition={{ delay: index * 0.3 }}
            onClick={() => handlePointsDetail(member.pointsDetail)}>
            <div className={styles.number}>
              {index + 1}
              <span className={styles.arrow}>
                «
              </span>
            </div>
            <div className={styles.picture}>
              <ProfileImage picture={member.picture} small progress={member.points} />
            </div>
            <div className={styles.name}>
              <span>
                {member.name}
              </span>
              <div>
                {league && <small className={`leagueBox`}>{league}</small>}
              </div>
            </div>
            <div className={styles.points}>
              {formatNumber(member.points)} Points
            </div>
          </motion.div>
        })}
      </div>
    </div>
  )
}

export default RankingComponent
