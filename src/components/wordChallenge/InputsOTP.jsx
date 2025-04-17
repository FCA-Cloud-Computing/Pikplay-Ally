import { useOtpInput } from "@/hooks/useOtpInput"
import { useCooldown } from "@/hooks/useCooldown"
import useCommonStore from "@/hooks/commonStore"
import styles from "./wordChallenge.module.scss"
import { toast } from "react-toastify"
import Button from "../button/Button"
import { sendWordChallenge } from "@/services/challenges/challenges"

export const InputsOTP = ({ wordLength }) => {
  const { word, inputRefs, handleChange, cleanWord } = useOtpInput(wordLength)
  const { isCooldown, triggerCooldown } = useCooldown()
  const { userLogged } = useCommonStore()

  const handleValidate = async () => {
    if (isCooldown) {
      toast("Debes esperar un minuto antes de enviar otra palabra.")
      return
    }
    if (word.join("").length !== wordLength) {
      toast("No puedes dejar ningún campo vacío.")
      return
    }

    const wordToSend = word.join("")
    // await sendWordChallenge({ word: wordToSend, uid: userLogged.uid })
    toast.success("Palabra enviada con éxito.")
    triggerCooldown()
    cleanWord()
  }

  return (
    <div className={styles.InputComponent}>
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
      <Button
        fullWidth
        className="m-t-20"
        color="blue"
        realistic
        onClick={handleValidate}
        disabled={wordLength !== word.length}
      >
        Validar
      </Button>
    </div>
  )
}