import { getRankingDetailSrv } from "@/services/rankings/rankings";
import { getUsersSrv } from "@/services/user/user";
import { useEffect, useState } from "react";
import useCommonStore from "./commonStore";

export const useRanking = (rankingId) => {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    try {
      getRankingDetailSrv(null, rankingId)
        .then((rankingDataPointsRes) => {
          const { data: rankingDataPoints } = rankingDataPointsRes;
          const uids = rankingDataPoints.map((member) => member.uid);
          getUsersSrv(null, { uids: uids.join() })
            .then(({ code, data }) => {
              const pointsAndUserData = rankingDataPoints.map((member) => {
                const user = data && data.find((user) => user.uid === member.uid);
                return {
                  ...user,
                  league: "bronce",
                  points: member.points,
                  pointsDetail: member.pointsDetail,
                };
              });
              // Compare and update positions
              const storedPositions = JSON.parse(localStorage.getItem(`ranking${rankingId}`)) || {};
              pointsAndUserData.forEach((user, index) => {
                const previousPosition = storedPositions[user.uid];
                if (previousPosition !== undefined && previousPosition !== index) {
                  moveItem(user.uid, index - previousPosition);
                }
                storedPositions[user.uid] = index;
              });

              localStorage.setItem(`ranking${rankingId}`, JSON.stringify(storedPositions));
              setRankingData(pointsAndUserData.sort((a, b) => b.points - a.points));
            })
            .catch((err) => {
              console.log("Error getting users", err);
            });
        });
    } catch (error) {
      console.log("Error getting ranking data", error);
    }
  }, [rankingId]);

  const moveItem = (uid, positions) => {
    const index = rankingData.findIndex((item) => item.uid === uid);
    if (index < 0) return;

    let newIndex = index + positions;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= rankingData.length) newIndex = rankingData.length - 1;

    if (index === newIndex) return; // No hay cambio

    let newItems = [...rankingData];

    // Animación paso a paso
    const animateStep = (stepIndex) => {
      if (stepIndex === newIndex) return; // Ya llegó

      let nextIndex = stepIndex < newIndex ? stepIndex + 1 : stepIndex - 1;
      [newItems[stepIndex], newItems[nextIndex]] = [
        newItems[nextIndex],
        newItems[stepIndex],
      ];
      setRankingData(newItems);
      setTimeout(() => animateStep(nextIndex), 300); // Espera para cada paso
    };
    
    animateStep(index);
  };

  return { moveItem, rankingData };
};