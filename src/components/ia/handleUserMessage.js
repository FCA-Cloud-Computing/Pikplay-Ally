import { Message as IAMessageWelcome, Options as IAOptionsWelcome, HTML as HTMLwelcome } from './responses/welcome'
import { HTMLOnboarding, Message as IAMessageOnboarding, Options as IAOptionsOnboarding, HTMLOnboardingNameSaved } from './responses/onboarding/onboarding'
import { Message as IAMessageDefault, Options as IAOptionsDefault } from './responses/default'
import { HtmlMessage as IAHtmlMessagePikcoins, Message as IAMessagePikcoins, Options as IAOptionsPikcoins, Height as IAcontainerHeightPikcoins } from './responses/pikcoins'

const renderMiddleWare = (Component, set, options = {}) => {
    return <Component
        handleUserMessage={handleUserMessage}
        options={options}
        set={set}
    />
}

export const handleUserMessage = async (mensaje, set, options) => {
    let IAMessageSelected
    let loadingOptions = ["Hmmm...", "Ya veo...", "Que podria ser...", "Ok, te entiendo..."]
    let seleccionAleatoria = loadingOptions[Math.floor(Math.random() * loadingOptions.length)]
    const loadingMessage = <span>{seleccionAleatoria}</span>
    let IAOptionsSelected = () => <></>
    let containerHeightSelected
    let IAExpressionSelected = 'happy'
    let IAHTMLMessageSelected
    let IAHTMLSecondMessageSelected
    var HTML, Message, Options

    switch (mensaje) {
        case 'ranking':
            var { } = { HTML, Message, Options } = await import('./responses/ranking.jsx')
            IAHTMLMessageSelected = HTML
            IAMessageSelected = Message
            IAOptionsSelected = Options
            break;

        case 'onboarding':
            IAMessageSelected = IAMessageOnboarding
            IAOptionsSelected = IAOptionsOnboarding
            IAHTMLSecondMessageSelected = <HTMLOnboarding />
            break;

        case 'onboarding/name-saved':
            // IAHTMLSecondMessageSelected = <HTMLOnboardingNameSaved />
            IAMessageSelected = HTMLOnboardingNameSaved()
            // IAOptionsSelected = <></>
            break;

        case 'referrals':
            var { } = { HTML, Message, Options } = await import('./responses/referrals/referrals.jsx')
            IAHTMLMessageSelected = HTML
            IAMessageSelected = Message
            IAOptionsSelected = Options
            break;

        case 'guide':
            IAMessageSelected = IAMessageWelcome
            IAOptionsSelected = IAOptionsWelcome
            IAHTMLMessageSelected = HTMLwelcome
            break;

        case 'pikcoins':
            IAHTMLMessageSelected = IAHtmlMessagePikcoins
            IAMessageSelected = IAMessagePikcoins
            IAOptionsSelected = IAOptionsPikcoins
            containerHeightSelected = IAcontainerHeightPikcoins
            break;

        default:
            IAHTMLMessageSelected = null
            IAExpressionSelected = 'happy'
            IAMessageSelected = IAMessageDefault
            IAOptionsSelected = IAOptionsDefault
            containerHeightSelected = "210px"
            break;
    }

    // Applying actions
    set({ IAMessage: loadingMessage, IAHTMLMessage: null }) // Seeting the loading message
    setTimeout(() => {
        set({
            isVisible: true,
            IAMessage: IAMessageSelected ? IAMessageSelected : null,
            IAOptions: renderMiddleWare(IAOptionsSelected, set, options),
            IAExpression: IAExpressionSelected,
            IAHTMLMessage: IAHTMLMessageSelected,
            IAHTMLSecondMessage: IAHTMLSecondMessageSelected,
            containerHeight: containerHeightSelected,
        })
    }, 1000)
}
