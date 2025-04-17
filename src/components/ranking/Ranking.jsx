import styles from './ranking.module.scss'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"

// Custom
import { formatNumber } from '@/lib/utils'
import ProfileImage from '../profileImage/ProfileImage'
import { rankingDataPoints } from './rankingData'
import Button from '../button/Button'
import { getUsersSrv } from '@/services/user/user'
import { getRankingDetailSrv } from '@/services/rankings/rankings'
import { useIAStore } from '../ia/IAstore'
import useCommonStore from '@/hooks/commonStore'
import { useRanking } from '@/hooks/useRanking'

const RankingComponent = (props) => {
  const { rankingId } = props
  const { setIAMessage } = useIAStore()
  const { setStoreValue } = useCommonStore()
  const { rankingData, moveItem } = useRanking(rankingId)

  const handlePointsDetail = (pointsDetail) => {
    const HTML = <div>
      <p>Detalles de los puntos:</p>
      {pointsDetail.map(item => <li>{item.detail} - {item.points}</li>)}
    </div>
    setIAMessage(HTML, null, null)
  }

  return (
    <div className={styles.RankingComponent}>
      {/* <Button color="blue" fullWidth className="p-10">Quiero participar</Button> */}
      <ul className={styles.list}>
      <AnimatePresence>
        {rankingData && rankingData.length > 0 && rankingData.map((member, index) => {
          const { league } = member
          return <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className={`${index == 0 ? 'starsFallingDown' : ''} ${styles.item}`}
            key={member.uid}
            >
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
            {/* <button onClick={() => moveItem(member.uid, -1)}>+1</button>
            <button onClick={() => moveItem(member.uid, 1)}>-1</button> */}
          </motion.div>
        })}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export default RankingComponent
