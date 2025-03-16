import styles from "./fullScreenLoading.module.scss"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"

const FullScreenLoading = ({ isFullLoading = false }) => {
  const controls = useAnimation()
  const isCancelled = useRef(false)

  useEffect(() => {
    const loopAnimation = async () => {
      try {
        while (isFullLoading) { // Si no ha sido cancelado
          await controls.start({
            rotate: 360,
            transition: { duration: 1, ease: "easeInOut" },
          });

          for (let i = 0; i < 3; i++) { // Animacion 3 zoom
            if (!isFullLoading) return;
            await controls.start({
              scale: 1.2,
              transition: { duration: 0.4, ease: "easeInOut" },
            });
            await controls.start({
              scale: 1,
              transition: { duration: 0.4, ease: "easeInOut" },
            });
          }

          await controls.set({ rotate: 0 }); // Rotacion
        }
      } catch (err) {
        console.log('Something happened with the PP animation', err)
      }
    }

    setTimeout(() => {
      if (isFullLoading) {
        loopAnimation();
      }
    }, 500)

    return () => {
      isCancelled.current = true; // ✋ Cancela animación al desmontar o cuando ya no esté cargando
    };
  }, [isFullLoading])

  useEffect(() => {
  }, []);

  return (
    <div className={`${styles.FullScreenLoadingComponent} ${isFullLoading ? styles.active : null}`}>
      <motion.img
        src="/images/logos/pp.svg"
        alt="Cargando..."
        animate={controls}
      />
    </div>
  );
}

export default FullScreenLoading
