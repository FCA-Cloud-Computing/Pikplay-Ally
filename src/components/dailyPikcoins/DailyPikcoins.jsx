import Button from "../button/Button";
import CoinIcon from "../coinIcon/CoinIcon";
import styles from './DailyPikcoins.module.scss';

const COINS = {
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 50,
  6: 60,
}

export function DailyPikcoins({ streak }) {
  const days = Array.from({ length: streak }).map((_, i) => i);
  return (
    <ul>
      {days.map(day => {
        const dayFormatted = day + 1
        return <DailyPikcoin
          title={`Día ${dayFormatted}`}
          coins={COINS[dayFormatted]}
          isReclaimed={dayFormatted < streak}
        />
      })}
    </ul>
  );
}

export function DailyPikcoin({ title, coins, isReclaimed = false }) {
  return (
    <article className={`${styles.dailyPikcoin} ${isReclaimed ? 'reclaimed' : ''}`}>
      <strong>{title}</strong>
      <CoinIcon coins={coins} />
    </article>
  )
}