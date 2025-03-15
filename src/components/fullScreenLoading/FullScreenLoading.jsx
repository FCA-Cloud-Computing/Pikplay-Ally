import styles from "./fullScreenLoading.module.scss"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"

const FullScreenLoading = ({ isFullLoading = true }) => {
  const controls = useAnimation()
  const isCancelled = useRef(false)
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const loopAnimation = async () => {
      // debugger
      while (!isCancelled.current && isFullLoading) { // Si no ha sido cancelado
        await controls.start({
          rotate: 360,
          transition: { duration: 1, ease: "easeInOut" },
        });

        for (let i = 0; i < 3; i++) { // Animacion 3 zoom
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

        // await controls.set({ rotate: 0 }); // Rotacion
      }
    }

    if (!isFullLoading) { setTimeout(() => { }, 1000) } // Esperar un segundo
    isCancelled.current = false;
    if (isFullLoading && typeof window != 'undefined') {
      loopAnimation();
    }

    return () => {
      isCancelled.current = true; // ✋ Cancela animación al desmontar o cuando ya no esté cargando
    };
  }, [isFullLoading])

  useEffect(() => {
    setHasMounted(true);
  }, []);

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

export default FullScreenLoading
