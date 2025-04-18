import styles from "./coinIcon.module.scss";

import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { motion } from 'framer-motion'

// Custom
import useAnimatedNumber from '@/hooks/useAnimatedNumber'
import { formatNumber } from "../../lib/utils";

const CoinIcon = ({
  coins = 0,
  hideNumber = false,
  initialCoins = 200,
  isLabel,
  gainedCoins = 0,
  multicoin,
  textColor,
  size,
}) => {
  // const prevCountCoins = useRef();
  // const previousCoins = prevCountCoins.current ? prevCountCoins.current : 0;

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
    animateValue(0, initialCoins, 1000);
  }, []);

  const animatedCoins = gainedCoins > 0
    ? useAnimatedNumber(coins, (coins + gainedCoins), 2000)
    : coins
  return (
    <div
      className={classNames("Coins", {
        [styles.Coins]: true,
        // [styles.animatedZoom]: true,
        // [styles.animated]: true
      })}>
      <div className={styles.coinsContainer}>
        <motion.picture
          animate={{ scale: 1 }}
          style={{ width: size + 'px', height: size + 'px', backgroundSize: size + 'px' }}
          initial={{ scale: 1.5 }}
          className={`shine ${styles.coin}`}
          transition={{ delay: .2, type: "spring", stiffness: 400, damping: 10 }}
        />
        {multicoin && (<>
          <motion.picture
            animate={{ scale: 1 }}
            style={{ width: size + 'px', height: size + 'px', backgroundSize: size + 'px' }}
            initial={{ scale: 1.5 }}
            className={`shine ${styles.coin}`}
            transition={{ delay: .6, type: "spring", stiffness: 400, damping: 10 }}
          />
          <motion.picture
            animate={{ scale: 1 }}
            style={{ width: size + 'px', height: size + 'px', backgroundSize: size + 'px' }}
            initial={{ scale: 1.5 }}
            className={`shine ${styles.coin}`}
            transition={{ delay: 1, type: "spring", stiffness: 400, damping: 10 }}
          />
        </>)}
      </div>
      {!hideNumber && (<>
        <span
          className={`f-s-14 ${styles.number} number`}
          style={{ color: textColor ? textColor : "#e5961d" }}>
          {formatNumber(animatedCoins)}
        </span>
      </>
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
