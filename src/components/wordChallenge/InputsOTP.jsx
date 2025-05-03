import styles from "./wordChallenge.module.scss"

import { useEffect, useState } from "react"

// Custom
import Button from "../button/Button"
import { useOtpInput } from "@/hooks/useOtpInput"
import { useCooldown } from "@/hooks/useCooldown"
import useCommonStore from "@/hooks/commonStore"
import { sendWordChallenge } from "@/services/challenges/challenges"
import { postTriviaResponseSrv } from "@/services/trivias/trivias"
import useWordChallenge, { useWordChallengeStore } from "./useWordChallenge"

export const InputsOTP = ({ triviaId, setShowModal, wordLength }) => {
  const { inputRefs, cleanWord } = useOtpInput(wordLength)
  const { isCooldown, triggerCooldown } = useCooldown()
  const { messageTop, userLogged, setStoreValue } = useCommonStore()
  const { handleSendResponse, handleChange, handleKeyUp } = useWordChallenge(setStoreValue)
  const { errorMessage, letterIndexActive, loading, word } = useWordChallengeStore(state => state)

  const handleValidate = () => {
    if (isCooldown) {
      setStoreValue("messageTop", { message: "Debes esperar un minuto antes de enviar otra palabra.", type: "error" })
      return
    }

    if (word.join("").length !== wordLength) {
      setStoreValue("messageTop", { message: "No puedes dejar ningún campo vacío.", type: "error" })
      return
    }

    handleSendResponse(word.join(""))

    // const wordToSend = word.join("")
    // // await sendWordChallenge({ word: wordToSend, uid: userLogged.uid })
    // toast.success("Palabra enviada con éxito.")
    // triggerCooldown()
    // cleanWord()
  }

  useEffect(() => {
    if (inputRefs.current[letterIndexActive]) {
      inputRefs.current[letterIndexActive].focus()
    }
  }, [letterIndexActive])

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
              onKeyDown={(e) => handleKeyUp(e, index)}
            />
          </div>
        ))}
      </div>

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