import styles from "./ranking.module.scss"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import StarIcon from '@mui/icons-material/Star';

// Custom
import { formatNumber, getContacts, logout } from "@/lib/utils"
import ProfileImage from "../profileImage/ProfileImage"
import { rankingDataPoints } from "./rankingData"
import Button from "../button/Button"
import { useIAStore } from "../ia/IAstore"
import useCommonStore from "@/hooks/commonStore"
import { useRanking } from "@/hooks/useRanking"
import { getExperiencesSrv } from "@/services/experience"
import { addRankingDetailSrv } from "@/services/rankings/rankings"

const RankingComponent = (props) => {
  const {
    rankingId,
    isButtonJoinRanking,
    isButtonReferral,
    isInviteButton,
    isPointsByExperience,
  } = props
  const setIAMessage = useIAStore((item) => item.setIAMessage)
  const setStoreValue = useCommonStore((state) => state.setStoreValue)
  const userLogged = useCommonStore((state) => state.userLogged)
  const {
    currentPosition,
    fetchRankingData,
    getReferrals,
    moveItem,
    rankingData,
    title: rankingTitle,
  } = useRanking({
    isPointsByExperience,
    rankingId,
    uid: userLogged?.uid,
    userLogged,
  })

  const handlePointsDetail = (pointsDetail) => {
    const HTML = (
      <div>
        <p>Detalles de los puntos:</p>
        {pointsDetail.map((item) => (
          <li>
            {item.detail} - {item.points}
          </li>
        ))}
      </div>
    )
    setIAMessage(HTML, null, null)
  }

  const handleParticipate = () => {
    const isLogged = !!userLogged?.uid
    if (!isLogged) {
      setStoreValue({ isOpenLoginModal: true, leftMenuBar: { isShow: true } })
      return
    }

    addRankingDetailSrv(null, { rid: rankingId })
      .then((res) => {
        // debugger
        const { code, errorCode, message } = res
        if (code === 200) {
          fetchRankingData()
          setIAMessage("Te has unido al ranking", null, null)
        } else if (errorCode == 403) {
          setStoreValue("leftMenuBar", { isShow: true })
          setStoreValue("isOpenLoginModal", true)
          logout()
        }
      })
      .catch((err) => {
        console.log("Error adding ranking detail", err)
      })
  }

  const callbackSuccess = () => {
    setStoreValue("messageTop", {
      message: "Se han añadido tus amigos",
      type: "success",
    })
    getReferrals()
  }

  return (
    <div className={styles.RankingComponent}>
      <div className={`contentTitle`}>
        <h1>
          <StarIcon className={styles.starIcon} />
          &nbsp;{rankingTitle}
        </h1>
      </div>
      {currentPosition && <div className={styles.currentPosition}>Posición actual: {currentPosition}</div>}

      {isButtonJoinRanking && !currentPosition && (
        <Button
          color="blue"
          realistic
          fullWidth
          className="p-10"
          onClick={handleParticipate}
        >
          Quiero participar
        </Button>
      )}
      {isButtonReferral && (
        <Button
          className="p-10"
          color="blue"
          fullWidth
          onClick={() => getContacts(callbackSuccess)}
          realistic
          style={{ marginBottom: "10px" }}
        >
          Añadir a un amigo
        </Button>
      )}

      <ul className={styles.list}>
        <AnimatePresence>
          {rankingData &&
            rankingData.length > 0 &&
            rankingData.map((member, index) => {
              const { league } = member
              const percentageBar = member.points / 100

              return (
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className={`${index == 0 ? "starsFallingDown" : ""} ${styles.item
                    }`}
                  onClick={() =>
                    member.pointsDetail &&
                    handlePointsDetail(member.pointsDetail)
                  }
                  key={member.uid}
                >
                  <div className={styles.number}>
                    {index + 1}
                    <span className={styles.arrow}>«</span>
                  </div>
                  <div className={styles.picture}>
                    <ProfileImage
                      isZoom
                      percentageBar={percentageBar}
                      picture={member.picture}
                      small
                    />
                  </div>
                  <div className={styles.name}>
                    <span>{member.name}</span>
                    <div>
                      {league && (
                        <small className={`${styles.leagueBox} leagueBox`}>
                          {league}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className={styles.points}>
                    {formatNumber(member.points)} Pts.
                  </div>
                  {!member.points && isInviteButton && (
                    <Button class="f-r" color="yellow" target="_link">
                      Invitar
                    </Button>
                  )}
                  {/* <button onClick={() => moveItem(member.uid, -1)}>+1</button>
                     <button onClick={() => moveItem(member.uid, 1)}>-1</button>*/}
                </motion.div>
              )
            })}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export default RankingComponent
