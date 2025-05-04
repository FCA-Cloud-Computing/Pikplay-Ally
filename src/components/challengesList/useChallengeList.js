import useCommonStore from "@/hooks/commonStore"

export const useChallengesList = () => {
    const set = useCommonStore(state => state.set)
    const steps = useCommonStore(state => state.visualIndicator.steps)
    const currentStep = useCommonStore(state => state.visualIndicator.currentStep)
    const visualIndicator = useCommonStore(state => state.visualIndicator)

    const visualIndicatorsChallenges = [
        {
            cid: 13,
            steps: [
                {
                    targetId: 'user-profile--image',
                    text: 'Da clic en el menu',
                    textStyle: { top: '-30px', width: '70px' }
                },
                {
                    targetId: 'menu--my-account',
                    text: 'Visita aquí tu cuenta',
                    textStyle: { top: '0px', width: '100px' }
                },
                {
                    containerStyle: { margin: '-6px 0 0 -40px' },
                    targetId: 'perfil--input',
                    text: 'Cambia tu nombre de perfil',
                    textStyle: { top: '5px', width: '100px' },
                }
            ]
        },
        {
            cid: 1,
            steps: [
                {
                    targetId: 'user-profile--image',
                    text: 'Da clic en el menu',
                    textStyle: { top: '-30px', width: '70px' }
                },
                {
                    targetId: 'menu--my-account',
                    text: 'Visita aquí tu cuenta',
                    textStyle: { top: '0px', width: '100px' }
                },
                {
                    containerStyle: { margin: '-30px 0px 0px 20px' },
                    targetId: 'profile--change-picture',
                    text: 'Sube aquí tu foto de perfil',
                    textStyle: { top: '5px', width: '100px' },
                }
            ]
        }
    ]

    const startVisualIndicator = (challendeId) => {
        const { steps } = visualIndicatorsChallenges.find(item => item.cid == challendeId) || {}
        if (!steps) return false
        const initialStep = 0

        set({
            visualIndicator: {
                currentStep: 0,
                steps,
                targetId: steps[initialStep].targetId,
                text: steps[initialStep].text,
                textStyle: steps[initialStep].textStyle || null,
            }
        })
    }

    const nextVisualIndicator = () => {
        if (!visualIndicator.targetId) return
        visualIndicator;
        const nextStep = currentStep + 1
        const newVisualIndicator = {
            ...steps[nextStep],
            steps,
            currentStep: nextStep
        }

        if (!newVisualIndicator.targetId || steps.length <= nextStep) return false

        set({ visualIndicator: newVisualIndicator })
    }

    return {
        nextVisualIndicator,
        startVisualIndicator,
    }
}
