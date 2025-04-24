import styles from "./wordChallenge.module.scss"

import { useState } from "react"

// Custom
import Button from "../button/Button"
import { useOtpInput } from "@/hooks/useOtpInput"
import { useCooldown } from "@/hooks/useCooldown"
import useCommonStore from "@/hooks/commonStore"
import { sendWordChallenge } from "@/services/challenges/challenges"
import { postTriviaResponseSrv } from "@/services/trivias/trivias"

export const InputsOTP = ({ triviaId, setShowModal, wordLength }) => {
  const { word, inputRefs, handleChange, cleanWord } = useOtpInput(wordLength)
  const { isCooldown, triggerCooldown } = useCooldown()
  const { messageTop, userLogged, setStoreValue } = useCommonStore()
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleValidate = () => {
    if (isCooldown) {
      setStoreValue("messageTop", { message: "Debes esperar un minuto antes de enviar otra palabra.", type: "error" })
      return
    }

    if (word.join("").length !== wordLength) {
      setStoreValue("messageTop", { message: "No puedes dejar ningún campo vacío.", type: "error" })
      return
    }

    setLoading(true)
    postTriviaResponseSrv(null, { response: word.join(""), triviaId })
      .then(res => {
        setLoading(false)
        const { data: { messageTop } } = res
        const { message, type } = messageTop || {}
        if (messageTop && type == 'success') {
          setShowModal(false)
          setStoreValue("messageTop", { message, type })
        } else {
          cleanWord()
          setErrorMessage(message)
        }
      })
      .catch(err => {
        setLoading(false)
        console.error(err)
      })

    // const wordToSend = word.join("")
    // // await sendWordChallenge({ word: wordToSend, uid: userLogged.uid })
    // toast.success("Palabra enviada con éxito.")
    // triggerCooldown()
    // cleanWord()
  }

  return (
    <div className={styles.InputComponent}>
      {/* {JSON.stringify(messageTop)} */}
      <div className={styles.inputContainer}>
        {Array.from({ length: wordLength }).map((_, index) => (
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
        ))}
      </div>

      {errorMessage && <p className={styles.errorMessage} onClick={() => setErrorMessage(null)}>
        {errorMessage}
      </p>}

      <Button
        className="m-t-20"
        color="blue"
        disabled={loading}
        fullWidth
        onClick={handleValidate}
        realistic
      >
        Validar
      </Button>
    </div>
  )
}