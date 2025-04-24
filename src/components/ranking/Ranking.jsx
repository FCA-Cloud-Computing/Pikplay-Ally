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

  const callbackSuccess = () => {
    setStoreValue('messageTop', { message: 'Se han añadido tus amigos', type: 'success' })
    getReferrals()
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
