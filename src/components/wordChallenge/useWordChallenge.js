import { useState } from "react"

// Custom
import { getTriviaSrv, postTriviaResponseSrv } from "@/services/trivias/trivias"
import { useIAStore } from "../ia/IAstore"
import { useOtpInput } from "@/hooks/useOtpInput"
import { create } from "zustand"

const useWordChallenge = (setStoreValue, setShowWorkChallenge) => {
    const { set, triviaInformation } = useWordChallengeStore(state => state)
    const { length: wordLength } = triviaInformation || {}
    const [showModal, setShowModal] = useState(false)
    const [triviaId, setTriviaId] = useState(null)
    const [triviaQuestion, setTriviaQuestion] = useState("")
    const [triviaOptions, setTriviaOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)
    const setIAMessage = useIAStore(state => state.setIAMessage)
    const { cleanWord } = useOtpInput(wordLength)

    const getTrivia = (sellerUid) => {
        getTriviaSrv(null, sellerUid)
            .then((res) => {
                const { code } = res
                if (code == 500) return
                if (res.data.messagePepe) {
                    // debugger
                    setIAMessage(<>{res.data.messagePepe.message}</>)
                    setShowWorkChallenge(false)
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

    const handleSendResponse = (word) => {
        set({ loading: true })
        postTriviaResponseSrv(null, { response: word, triviaId: triviaInformation.id })
            .then(res => {
                set({ loading: false })
                const { data: { closeModal, isCleanWord, messageTop, message } } = res
                if (closeModal) setShowModal(false)
                if (messageTop && type == 'success') {
                    const { message, type } = messageTop || {}
                    setStoreValue("messageTop", { message, type })
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

    return {
        getTrivia,
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
    loading: false,
    triviaInformation: { id: null },
    showModal: false,
    setShowModal: (value) => set({ showModal: value }),
    set,
}));

export default useWordChallenge
