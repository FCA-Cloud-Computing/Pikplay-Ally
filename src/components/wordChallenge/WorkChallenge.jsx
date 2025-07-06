import styles from "./wordChallenge.module.scss"

import { useState, forwardRef, useEffect, useRef } from "react"
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { Dialog, DialogContent, Slide } from "@mui/material"
import { get } from "http"
import { AnimatePresence } from "framer-motion"

// Custom
import { InputsOTP } from "./InputsOTP"
import { getLengthWord } from "@/services/challenges/challenges"
import { useIAStore } from "../ia/IAstore"
import Button from "../button/Button"
import useWordChallenge, { useWordChallengeStore } from "./useWordChallenge"
import useCommonStore from "@/hooks/commonStore"

const WordChallenge = (props) => {
  const { setShowWorkChallenge, sellerUid } = props
  const { setIAMessage } = useIAStore()
  const [[page, direction], setPage] = useState([0, 0])
  const { setStoreValue } = useCommonStore()
  const {
    getTrivia,
    handleSendResponse,
    selectedOption,
    setSelectedOption,
    setShowModal,
  } = useWordChallenge(setStoreValue)

  const {
    errorMessage,
    triviaInformation,
    showModal,
    set,
  } = useWordChallengeStore()
  // if (triviaInformation.ud) debugger
  const { length: wordLength, options, triviaId, question } = triviaInformation || {}

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
  })

  const handlerSelectOption = (value) => {
    setSelectedOption(value)
  }

  const handleValidate = () => {
    handleSendResponse(selectedOption)
  }

  // Timer properties
  const [secondsLeft, setSecondsLeft] = useState(60);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const intervalRef = useRef(null);
  const progress = secondsLeft / 60;
  const offset = circumference * (1 - progress);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          // onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }

  useEffect(() => {
    startTimer()
    getTrivia(sellerUid)
  }, [])

  return (
    <Dialog
      open={showModal}
      // TransitionComponent={Transition}
      className={styles.WordChallenge}
      onClose={() => set({ showModal: false })}
    >
      <DialogContent>
        <div className={styles.content}>
          <AnimatePresence initial={true} custom={direction}>
            <p className={styles.title}>Trivia Challenge</p>
            <div className={styles["timer-wrapper"]}>
              <svg width="160" height="160">
                <circle
                  className={styles.bg}
                  r={radius}
                  cx="80"
                  cy="80"
                />
                <circle
                  className={styles.progress}
                  r={radius}
                  cx="80"
                  cy="80"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" className={styles.timerText}>
                  {secondsLeft}s
                </text>
              </svg>
            </div>

            <p className={styles.question}>
              {question}
            </p>
            {/* Trivia sin opciones */}
            {options && options.length == 0 && <InputsOTP
              key="inputs"
              setShowModal={setShowModal}
              triviaId={triviaId}
              wordLength={wordLength}
            />}

            {/* Trivia opciones */}
            {options && options.length > 0 && <div className={styles.triviaOptions}>
              {
                options && options.map(item => {

                  return <motion.div
                    className={selectedOption == item.detalle ? styles.selected : null}
                    key={item.detalle}
                    onClick={() => handlerSelectOption(item.detalle)}
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.7 }}
                  >
                    {item.detalle}
                  </motion.div>
                })
              }
            </div>}

            {errorMessage && <p className={styles.errorMessage} onClick={() => set({ errorMessage: null })}>
              {errorMessage}
            </p>}

            {selectedOption && <Button fullWidth color="main" onClick={handleValidate}>Enviar respuesta</Button>}
            <small key="subtitle" className={`${styles.subtitle}`}>
              Puedes obtener muchos{" "}
              <span className="animatedZoom">puntos de categoria y pikcoins</span>
            </small>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WordChallenge
