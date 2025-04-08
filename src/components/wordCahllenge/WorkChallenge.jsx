import React, { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { Dialog, DialogContent, Slide } from "@mui/material"
import styles from "./wordChallenge.module.scss"
import { AnimatePresence } from "framer-motion"
import Button from "../button/Button"
import { useFetch } from "@/hooks/useFetch"
import { sendWordChallenge } from "@/services/challenges/challenges"
import useCommonStore from "@/hooks/commonStore"

const InputsOTP = ({ fullWord = "alvaro" }) => {
  const [word, setWord] = useState(Array(fullWord.length).fill(""))
  const [letterIndexActive, setLetterIndexActive] = useState(0)
  const { userLogged } = useCommonStore()
  const inputRefs = useRef([])

  useEffect(() => {
    if (inputRefs.current[letterIndexActive]) {
      inputRefs.current[letterIndexActive].focus()
    }
  }, [letterIndexActive])

  const handleChange = (event, index) => {
    const updatedWord = [...word]
    const letter = event.currentTarget?.value
    const key = event?.key
    if (letter === " ") return null

    // delete logic
    if (key === "Backspace" && index > 0) {
      const currentLetter = updatedWord[index]

      currentLetter.length === 0
        ? (updatedWord[index - 1] = "")
        : (updatedWord[index] = "")

      if (currentLetter.length === 0) setLetterIndexActive(index - 1)
      setWord(updatedWord)
      return
    }

    // handle letter input
    updatedWord[index] = letter
    if (letter && index < fullWord.length - 1 && !key) {
      setLetterIndexActive(index + 1)
    }
    if (!letter && index > 0 && !key) {
      setLetterIndexActive(index - 1)
    }

    setWord(updatedWord)
  }

  const handleValidate = async () => {
    const wordToSend = word.join("")
    const isValid = wordToSend === fullWord
    if (!isValid) {
      toast("No has acertado la palabra clave")
      return
    }
    await sendWordChallenge({ word: wordToSend, uid: userLogged.uid })
  }

  return (
    <div className={styles.InputComponent}>
      <div className={styles.inputContainer}>
        {fullWord.split("").map((_, index) => {
          return (
            <div className={styles.inputContent} key={index}>
              <input
                type="text"
                ref={(el) => (inputRefs.current[index] = el)}
                value={word[index] || ""}
                maxLength={1}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleChange(e, index)}
              />
            </div>
          )
        })}
      </div>
      <Button
        fullWidth
        className="m-t-20"
        color="blue"
        realistic
        onClick={handleValidate}
        disabled={fullWord.length !== word.length}
      >
        Validar
      </Button>
    </div>
  )
}

const woekChallengeInformation = <div className={styles.wordChallengeInformation}>
  <p>El Word Challenge 🔥 es una dinamica en la cual se debe colocar una palabra clave de acuerdo a las instrucciones del aliado comercial.</p>
  <p>
    El primer jugador en descubrir la palabra se lleva el&nbsp;
    <span>100% de los puntos de categoria.</span><br />
    El segundo jugador se llevará el 50%, y los demás consecuentes el 20%
  </p>
</div>

const WordChallenge = (props) => {
  const { showModal, setShowModal } = props
  const [[page, direction], setPage] = useState([0, 0])
  // const { data, error, isLoading } = useFetch("/api/word-challenge")
  const word = "asd3"

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
  })

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      onClose={() => setShowModal(false)}
      className={styles.WordChallenge}
    >
      <DialogContent>
        <div className={styles.content}>
          <AnimatePresence initial={true} custom={direction}>
            <p className={styles.title}>Ingresa la palabra clave</p>
            <div key="subtitle" className={styles.subtitle}>
              Puedes obtener muchos{" "}
              <span>
                puntos <br />
                de categoria
              </span>
            </div>
            <InputsOTP key="inputs" fullWord={word} />
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
  // return <div className={styles.WordChallenge}>
  //     WordChallenge
  // </div>
  // return <Dialog
  //   open={true}
  //   TransitionComponent={Transition}
  //   onClose={() => setShowModal(false)}
  //   className={styles.WordChallenge}>
  //   <DialogContent>
  //     <div className={styles.content}>
  //       <AnimatePresence initial={true} custom={direction}>
  //         <p className={styles.title}>
  //           Ingresa la palabra clave
  //         </p>
  //         <div className={styles.subtitle}>
  //           Puedes obtener muchos <span>puntos <br />de categoria</span>
  //         </div>
  //         <InputComponent />
  //         <center>
  //           <Button fullWidth className="m-t-20" color="blue" realistic >Validar</Button>
  //         </center>
  //         <Button color="link" onClick={() => {
  //           setShowModal(false)
  //           setIAMessage(woekChallengeInformation)
  //         }}>
  //           ¿Como funciona el Word Challenge?
  //         </Button>
  //       </AnimatePresence>
  //     </div>
  //   </DialogContent>
  // </Dialog>
}

export default WordChallenge
