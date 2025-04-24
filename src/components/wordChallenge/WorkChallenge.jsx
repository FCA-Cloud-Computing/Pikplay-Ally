import styles from "./wordChallenge.module.scss"
import { useState, forwardRef, useEffect } from "react"
import { Dialog, DialogContent, Slide } from "@mui/material"
import { AnimatePresence } from "framer-motion"
import { InputsOTP } from "./InputsOTP"
import { getLengthWord } from "@/services/challenges/challenges"
import { getTriviaSrv } from "@/services/trivias/trivias"
import { get } from "http"
import { useIAStore } from "../ia/IAstore"

const WordChallenge = (props) => {
  const { setShowWorkChallenge } = props
  const { setIAMessage } = useIAStore()
  const [showModal, setShowModal] = useState(false)
  const [[page, direction], setPage] = useState([0, 0])
  const [wordLength, setWordLength] = useState(5)
  const [triviaQuestion, setTriviaQuestion] = useState("")
  const [triviaId, setTriviaId] = useState(null)
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
  })

  const getTrivia = () => {
    getTriviaSrv()
      .then((res) => {
        if (res.data.messagePepe) {
          // debugger
          setIAMessage(<>{res.data.messagePepe.message}</>)
          setShowWorkChallenge(false)
          return
        }
        setShowModal(true)
        setTriviaId(res.data.id)
        setWordLength(res.data.length)
        setTriviaQuestion(res.data.question)
      })
  }

  useEffect(() => {
    getTrivia()
  }, [])

  return (
    <Dialog
      open={showModal}
      // TransitionComponent={Transition}
      className={styles.WordChallenge}
      onClose={() => setShowWorkChallenge(false)}
    >
      <DialogContent>
        <div className={styles.content}>
          <AnimatePresence initial={true} custom={direction}>
          <p className={styles.title}>Trivia Challenge</p>
          <small key="subtitle" className={styles.subtitle}>
            Puedes obtener muchos{" "}
            <span>
              Puntos <br />
              de Categoria y Pikcoins
            </span>
          </small>
          <p className={styles.question}>
            {triviaQuestion}
          </p>
          <InputsOTP
            key="inputs"
            setShowModal={setShowModal}
            triviaId={triviaId}
            wordLength={wordLength}
          />
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WordChallenge
