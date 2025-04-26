import { useState, useEffect, useRef } from "react"

export const useOtpInput = (wordLength) => {
  const [word, setWord] = useState(Array(wordLength).fill(""))
  const [letterIndexActive, setLetterIndexActive] = useState(0)
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

    if (key === "Backspace" && index > 0) {
      const currentLetter = updatedWord[index]

      currentLetter.length === 0
        ? (updatedWord[index - 1] = "")
        : (updatedWord[index] = "")

      if (currentLetter.length === 0) setLetterIndexActive(index - 1)
      setWord(updatedWord)
      return
    }

    updatedWord[index] = letter
    if (letter && index < wordLength - 1 && !key) {
      setLetterIndexActive(index + 1)
    }
    if (!letter && index > 0 && !key) {
      setLetterIndexActive(index - 1)
    }
    setWord(updatedWord.map(letter => letter.toLowerCase()))
  }

  const cleanWord = () => {
    setWord(Array(wordLength).fill(""))
    setLetterIndexActive(0)
    inputRefs.current[0].focus()
  }

  return { word, setWord, inputRefs, handleChange, cleanWord }
}
