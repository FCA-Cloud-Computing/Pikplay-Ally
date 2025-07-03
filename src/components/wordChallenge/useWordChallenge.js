import { useEffect, useState } from "react"
import { create } from "zustand"

// Custom
import { useIAStore } from "../ia/IAstore"
import { getTriviaSrv, postTriviaResponseSrv } from "@/services/trivias/trivias"
import { useSound } from "@/hooks/useSound"

const useWordChallenge = (setStoreValue) => {
  const {
    letterIndexActive,
    set,
    triviaInformation,
    word,
    showModal,
    setShowModal,
  } = useWordChallengeStore(state => state)

  const { length: wordLength } = triviaInformation || {}
  const [triviaId, setTriviaId] = useState(null)
  const [triviaQuestion, setTriviaQuestion] = useState("")
  const [triviaOptions, setTriviaOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const setIAMessage = useIAStore(state => state.setIAMessage)
  // const { cleanWord } = useOtpInput(wordLength)

  const getTrivia = (sellerUid) => {
    getTriviaSrv(null, sellerUid)
      .then((res) => {
        const { code } = res || {}

        if (code == 500) return
        if (res.data.messagePepe) {
          // debugger
          setIAMessage(<>{res.data.messagePepe.message}</>)
          set({ showModal: false })

          return
        }
        set({ triviaInformation: res.data })
        setShowModal(true)
        // setTriviaId(res.data.id)
        // setWordLength(res.data.length)
        // setTriviaQuestion(res.data.question)
        // setTriviaOptions(res.data.options)
      })
  }

  const handleKeyUp = (event, index) => {
    const key = event?.key

    if (key === "Backspace" && index > 0) {
      const updatedWord = [...word]
      const currentLetter = updatedWord[index]
      
      if (currentLetter) updatedWord[index] = ""

      set({ letterIndexActive: currentLetter ? index : index - 1 })
    }
  }

  const handleChange = (event, index) => {
    // Cuando cambia una letra en la trivia sencilla
    const updatedWord = [...word]
    const letter = event.currentTarget?.value
    const key = event?.key

    // if (letter === "") return null

    updatedWord[index] = letter
    if (letter && index < wordLength - 1 && !key) {
      set({ letterIndexActive: index + 1 })
    }

    // if (!letter && index > 0 && !key) {
    //     debugger
    //     setLetterIndexActive(index - 1)
    // }
    // debugger
    // minusculas
    set({ word: updatedWord.map(letter => letter?.toLowerCase()) })
  }

  const handleSendResponse = (word) => {
    set({ loading: true })
    postTriviaResponseSrv(null, { response: word, triviaId: triviaInformation.id })
      .then(res => {
        set({ loading: false })
        const { data: { closeModal, isCleanWord, messageTop }, message } = res
        if (closeModal) set({ showModal: false })
        const { message: messagePepe, type } = messageTop || {}
        if (messageTop) {
          setStoreValue("messageTop", { message: messagePepe, type, mp3: 'wrong.mp3' })
        } else {
          if (isCleanWord) cleanWord()
          set({ errorMessage: message })
        }
      })
      .catch(err => {
        set({ loading: false })
        console.error(err)
      })
  }

  const cleanWord = () => {
    set({ word: Array(wordLength).fill("") })
    // setLetterIndexActive(0)
    // inputRefs.current[0].focus()
  }

  useEffect(() => {
    return () => {
      set({
        letterIndexActive: 0,
        triviaInformation: null,
        word: Array(0).fill('')
      })
    }
  }, [])

  return {
    getTrivia,
    handleChange,
    handleKeyUp,
    handleSendResponse,
    selectedOption,
    setSelectedOption,
    setShowModal,
    setTriviaId,
    showModal,
    triviaId,
    triviaOptions,
    triviaQuestion,
    wordLength,
  }
}

export const useWordChallengeStore = create((set) => ({
  errorMessage: null,
  letterIndexActive: 0,
  loading: false,
  showModal: false,
  triviaInformation: { id: null },
  wordLength: 0,
  word: Array(0).fill(''),
  setShowModal: (value) => set({ showModal: value }),
  set,
}));

export default useWordChallenge
