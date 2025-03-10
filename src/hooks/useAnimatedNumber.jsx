import { useState, useEffect } from "react";

const useAnimatedNumber = (from, to, speed) => {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (from === to) return;

    const step = (to - from) / (speed / 10);
    let current = from;

    const interval = setInterval(() => {
      current += step;
      if ((from < to && current >= to) || (from > to && current <= to)) {
        setValue(to);
        clearInterval(interval);
      } else {
        setValue(Math.round(current));
      }
    }, 10);

    return () => clearInterval(interval);
  }, [from, to, speed]);

  return value;
};

export default useAnimatedNumber;
