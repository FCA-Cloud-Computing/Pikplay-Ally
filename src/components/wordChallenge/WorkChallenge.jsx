import styles from "./wordChallenge.module.scss"
import { useState, forwardRef } from "react"
import { Dialog, DialogContent, Slide } from "@mui/material"
import { AnimatePresence } from "framer-motion"
import { InputsOTP } from "./InputsOTP"
import { getLengthWord } from "@/services/challenges/challenges"

const WordChallenge = (props) => {
  const { showModal, setShowModal } = props
  const [[page, direction], setPage] = useState([0, 0])
  const [wordLength, setWordLength] = useState(5)

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
  })

  // useEffect(() => {
  //   getLengthWord().then((res) => {
  //     setWordLength(res.data.wordLength)
  //   })
  // }, [])

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
            <p className={styles.title}>Trivia Challenge</p>
            <div key="subtitle" className={styles.subtitle}>
              Puedes obtener muchos{" "}
              <span>
                puntos <br />
                de categoria
              </span>
            </div>
            <InputsOTP key="inputs" wordLength={wordLength} />
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WordChallenge
