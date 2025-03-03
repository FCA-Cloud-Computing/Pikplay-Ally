import styles from './ranking.module.scss'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"

// Custom
import { formatNumber } from '@/lib/utils'
import ProfileImage from '../profileImage/ProfileImage'
import { rankingDataPoints } from './rankingData'
import Button from '../button/Button'
import { getUsersSrv } from '@/services/user/userService'
import { getRankingDetailSrv } from '@/services/rankings/rankings'

const RankingComponent = (props) => {
  const { rankingId } = props
  const [rankingData, setRankingData] = useState([])

  useEffect(() => {
    try {
      getRankingDetailSrv(null, rankingId).then(rankingDataPoints => {
        const uids = rankingDataPoints.map(member => member.uid)
        getUsersSrv(null, { uids: uids.join() })
          .then(data => {
            const pointsAndUserData = rankingDataPoints.map(member => {
              const user = data && data.find(user => user.uid === member.uid)
              return {
                ...user,
                league: 'bronce',
                points: member.points,
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
  }, [])

  return (
    <div className={styles.RankingComponent}>
      {/* <Button color="blue" fullWidth className="p-10">Quiero participar</Button> */}
      <div className={styles.list}>
        {rankingData && rankingData.length > 0 && rankingData.sort((a, b) => b.points - a.points).map((member, index) => {
          const { league } = member
          return <motion.div
            animate={{ x: 0, }}
            className={`${index == 0 ? 'starsFallingDown' : ''} ${styles.item} ${member.uid}`}
            initial={{ x: '-400px' }}
            key={index}
            transition={{ delay: index * 0.3 }}>
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
