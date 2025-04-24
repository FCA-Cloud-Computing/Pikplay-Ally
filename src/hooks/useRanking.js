import { getRankingDetailSrv } from "@/services/rankings/rankings"
import { getUsersSrv } from "@/services/user/user"
import { useEffect, useState } from "react"
import useCommonStore from "./commonStore"

export const useRanking = (rankingId, uid) => {
  const [rankingData, setRankingData] = useState([])

  useEffect(() => {
    try {
      getRankingDetailSrv(null, rankingId).then((rankingDataPointsRes) => {
        const { data: rankingDataPoints } = rankingDataPointsRes
        const uids = rankingDataPoints.map((member) => member.uid)
        getUsersSrv(null, { uids: uids.join() })
          .then(({ code, data }) => {
            const pointsAndUserData = rankingDataPoints.map((member) => {
              const user = data && data.find((user) => user.uid === member.uid)
              return {
                ...user,
                league: "bronce",
                points: member.points,
                pointsDetail: member.pointsDetail,
              }
            })

            // Compare and update position for the current user
            const storedPosition = JSON.parse(
              localStorage.getItem(`ranking${rankingId}_${uid}`)
            )
            const currentUserIndex = pointsAndUserData.findIndex(
              (user) => user.uid === uid
            )

            if (!uid || currentUserIndex < 0) {
              setRankingData(
                pointsAndUserData.sort((a, b) => b.points - a.points)
              )
              return
            }

            if (
              storedPosition !== null &&
              storedPosition !== currentUserIndex
            ) {
              moveItem(uid, currentUserIndex - storedPosition)
            }

            localStorage.setItem(
              `ranking${rankingId}_${uid}`,
              JSON.stringify(currentUserIndex)
            )
            setRankingData(
              pointsAndUserData.sort((a, b) => b.points - a.points)
            )
          })
          .catch((err) => {
            console.log("Error getting users", err)
          })
      })
    } catch (error) {
      console.log("Error getting ranking data", error)
    }
  }, [rankingId, uid])

  const moveItem = (uid, positions) => {
    const index = rankingData.findIndex((item) => item.uid === uid)
    if (index < 0) return

    let newIndex = index + positions
    if (newIndex < 0) newIndex = 0
    if (newIndex >= rankingData.length) newIndex = rankingData.length - 1

    if (index === newIndex) return // No change

    let newItems = [...rankingData]

    // Step-by-step animation
    const animateStep = (stepIndex) => {
      if (stepIndex === newIndex) return // Reached target

      let nextIndex = stepIndex < newIndex ? stepIndex + 1 : stepIndex - 1
      ;[newItems[stepIndex], newItems[nextIndex]] = [
        newItems[nextIndex],
        newItems[stepIndex],
      ]
      setRankingData(newItems)
      setTimeout(() => animateStep(nextIndex), 300) // Wait for each step
    }

    animateStep(index)
  }

  return { moveItem, rankingData }
}
