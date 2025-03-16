import styles from "./fullScreenLoading.module.scss";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion"

const FullScreenLoading = ({ isFullLoading = true }) => {
  const controls = useAnimation();
  const isCancelled = useRef(false);


  useEffect(() => {
    const loopAnimation = async () => {
      while (!isCancelled.current) {
        await controls.start({
          rotate: 360,
          transition: { duration: 1, ease: "easeInOut" },
        });

        for (let i = 0; i < 3; i++) {
          if (isCancelled.current) return;
          await controls.start({
            scale: 1.2,
            transition: { duration: 0.4, ease: "easeInOut" },
          });
          await controls.start({
            scale: 1,
            transition: { duration: 0.4, ease: "easeInOut" },
          });
        }

        await controls.set({ rotate: 0 });
      }
    };

    isCancelled.current = false;
    if (isFullLoading) loopAnimation();

    return () => {
      isCancelled.current = true; // ✋ Cancela animación al desmontar o cuando ya no esté cargando
    };
  }, [isFullLoading]);

  return (
    isFullLoading ?
      <div className={styles.FullScreenLoadingComponent}>
        <motion.img
          src="/images/logos/pp.svg"
          alt="Cargando..."
          animate={controls}
        />
      </div>
      : null
  );
}

export default FullScreenLoading;
