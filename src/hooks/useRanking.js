import { getRankingDetailSrv, getRankingSrv } from "@/services/rankings/rankings"
import { getUsersSrv } from "@/services/user/user"
import { useEffect, useState } from "react"
import useCommonStore from "./commonStore"
import { getExperiencesSrv } from "@/services/experience"

export const useRanking = ({
  isPointsByExperience,
  rankingId,
  uid,
  userLogged
}) => {
  const [rankingData, setRankingData] = useState([])
  const [currentPosition, setCurrentPosition] = useState(null)
  const [title, setTitle] = useState('')

  const fetchRankingData = async () => {
    try {
      const rankingDataPointsRes = await getRankingDetailSrv(null, rankingId)
      const rankingDataRes = await getRankingSrv(null, rankingId)
      if (rankingDataRes.data?.title) setTitle(rankingDataRes.data.title)
      const { data: rankingDataPoints } = rankingDataPointsRes
      const uids = rankingDataPoints.map((member) => member.uid)

      const usersRes = await getUsersSrv(null, { uids: uids.join() })
      const { data: usersData } = usersRes
      const uidsAndExperiences = await getExperiencesSrv(null, uids)
      const pointsAndUserData = rankingDataPoints.map((member) => {
        const user =
          usersData && usersData.find((user) => user.uid === member.uid)

        const currentExperience = uidsAndExperiences.reduce((acc, exp) => {
          if (exp.uid === member.uid) {
            return exp.experience
          }
          return acc
        }, 0)

        return {
          ...user,
          currentExperience,
          league: "bronce",
          points: isPointsByExperience ? currentExperience : member.points,
          pointsDetail: !isPointsByExperience ? member.pointsDetail : null,
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

      const orderedItems = pointsAndUserData.sort((a, b) => b.points - a.points)
      setRankingData(orderedItems)
      if (userLogged.uid) {
        const _currentPosition = (orderedItems.findIndex(item => item.uid == userLogged.uid) + 1)
        // debugger
        setCurrentPosition(_currentPosition)
      }
    } catch (error) {
      console.log("Error fetching ranking data", error)
    }
  }

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

  const getReferrals = async () => {
    const req = await getReferralsSrv(null, null)
    if (req.code === 200) {
      setRankingData(req.data)
    }
  }

  useEffect(() => {
    fetchRankingData()
  }, [rankingId, uid])

  return {
    currentPosition,
    fetchRankingData,
    getReferrals,
    moveItem,
    rankingData,
    title,
  }
}
