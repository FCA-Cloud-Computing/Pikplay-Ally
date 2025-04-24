import { getRankingDetailSrv } from "@/services/rankings/rankings"
import { getUsersSrv } from "@/services/user/user"
import { useEffect, useState } from "react"
import useCommonStore from "./commonStore"

export const useRanking = (rankingId, uid) => {
  const [rankingData, setRankingData] = useState([])

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const rankingDataPointsRes = await getRankingDetailSrv(null, rankingId)
        const { data: rankingDataPoints } = rankingDataPointsRes
        const uids = rankingDataPoints.map((member) => member.uid)

        const usersRes = await getUsersSrv(null, { uids: uids.join() })
        const { data: usersData } = usersRes

        const pointsAndUserData = rankingDataPoints.map((member) => {
          const user =
            usersData && usersData.find((user) => user.uid === member.uid)
          return {
            ...user,
            league: "bronce",
            points: member.points,
            pointsDetail: member.pointsDetail,
          }
        })

        const storedPosition = JSON.parse(
          localStorage.getItem(`ranking${rankingId}-${uid}`)
        )
        const currentUserIndex = pointsAndUserData.findIndex(
          (user) => user.uid === uid
        )

        if (!uid || currentUserIndex < 0) {
          setRankingData(pointsAndUserData.sort((a, b) => b.points - a.points))
          return
        }

        if (storedPosition !== null && storedPosition !== currentUserIndex) {
          moveItem(uid, currentUserIndex - storedPosition)
        }

        localStorage.setItem(
          `ranking${rankingId}_${uid}`,
          JSON.stringify(currentUserIndex)
        )
        setRankingData(pointsAndUserData.sort((a, b) => b.points - a.points))
      } catch (error) {
        console.log("Error fetching ranking data", error)
      }
    }

    fetchRankingData()
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
