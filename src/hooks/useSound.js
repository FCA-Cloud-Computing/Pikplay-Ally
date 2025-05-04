import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export const useSound = (src, { volume = 1, loop = false } = {}) => {
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [src],
      volume,
      loop,
      preload: true
    });

    return () => {
      soundRef.current.unload(); // limpia la memoria al desmontar
    };
  }, [src, volume, loop]);

  const play = () => {
    soundRef.current?.play();
  };

  const stop = () => {
    soundRef.current?.stop();
  };

  return { play, stop };
};
