import styles from "./styles.module.scss";

import React, { useEffect, useRef, useState } from "react";
import { formatNumber } from "../../lib/utils";
import classNames from "classnames";

const CoinIcon = ({ coins, isLabel, hideNumber = false, multicoin, textColor }) => {
  const prevCountCoins = useRef();
  const previousCoins = prevCountCoins.current ? prevCountCoins.current : 0;

  const animateValue = (start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // setCoins(Math.floor(progress * (end - start) + start))
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const initialCoins = 0;
    animateValue(previousCoins, initialCoins, 1000);
  }, []);

  return (
    <div
      className={classNames("Coins", {
        [styles.Coins]: true,
        [styles.animatedZoom]: true,
        // [styles.animated]: true
      })}
    >
      {!hideNumber && coins && (
        <span
          className={`f-s-14 ${styles.number} number`}
          style={{ color: textColor ? textColor : "#e5961d" }}>
          {formatNumber(coins)}
          &nbsp;x&nbsp;
        </span>
      )}
      <picture className={`shine ${styles.coin}`} />
      {multicoin && (
        <picture className={`shine ${styles.coin} ${styles.multicoin}`} />
      )}
      {isLabel && (
        <label style={{ color: textColor ? textColor : "#e5961d" }}>
          Pikcoins
        </label>
      )}
    </div>
  );
};

export default CoinIcon;
