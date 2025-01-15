/* eslint-disable no-empty-pattern */
import { Message as IAMessageWelcome, Options as IAOptionsWelcome, HTML as HTMLwelcome } from './responses/welcome';
import { HTMLOnboarding, Message as IAMessageOnboarding, Options as IAOptionsOnboarding, HTMLOnboardingNameSaved } from './responses/onboarding/onboarding';
import { Message as IAMessageDefault, Options as IAOptionsDefault } from './responses/default';
import { HtmlMessage as IAHtmlMessagePikcoins, Message as IAMessagePikcoins, Options as IAOptionsPikcoins, Height as IAcontainerHeightPikcoins } from './responses/pikcoins';
import { HTML as IAHtmlMessageRedemption, Message as IAMessageRedemption, Options as IAOptionsRedemption } from './responses/redemption';

// Competitions
import { Message as IAMessageCompetition, Options as IAOptionsCompetition } from './responses/competition/competition';
import { Message as IAMessageCompetition_Yes, Options as IAOptionsCompetition_Yes, HTMLMessage as HTMLMEssage_Competition_Yes } from './responses/competition/yes/yes';
import { Message as IAMessageCompetition_Yes_Taken, Options as IAOptionsCompetition_Yes_Taken } from './responses/competition/yes/taken';
import { Message as IAMessageCompetition_List, Options as IAOptionsCompetition_List } from './responses/competition/list';
import { Message as IAMessageCompetition_Admin, Options as IAOptionsCompetition_Admin } from './responses/competition/admin';
// End competitions

const renderMiddleWare = (Component, set, options = {}) => {
  return <Component handleUserMessage={handleUserMessage} options={options} set={set} />;
};

export const handleUserMessage = async (mensaje, set, options) => {
  let IAMessageSelected;
  let loadingOptions = ['Hmmm...', 'Ya veo...', 'Que podria ser...', 'Ok, te entiendo...'];
  let seleccionAleatoria = loadingOptions[Math.floor(Math.random() * loadingOptions.length)];
  const loadingMessage = <span>{seleccionAleatoria}</span>;
  let IAOptionsSelected = () => <></>;
  let containerHeightSelected;
  let IAExpressionSelected = 'happy';
  let IAHTMLMessageSelected;
  let IAHTMLSecondMessageSelected;
  var HTML, Message, Options;

  switch (mensaje) {
    case 'competition/admin':
      IAMessageSelected = 'Que deseas hacer?';
      IAOptionsSelected = IAOptionsCompetition_Admin;
      break;

    case 'competition':
      IAMessageSelected = IAMessageCompetition(options);
      IAOptionsSelected = IAOptionsCompetition;
      break;

    case 'competition/list':
      IAMessageSelected = IAMessageCompetition_List;
      IAOptionsSelected = IAOptionsCompetition_List;
      break;

    case 'competition/yes':
      IAMessageSelected = IAMessageCompetition_Yes;
      IAOptionsSelected = IAOptionsCompetition_Yes;
      IAHTMLMessageSelected = HTMLMEssage_Competition_Yes;
      break;

    case 'competition/yes/taken':
      IAMessageSelected = IAMessageCompetition_Yes_Taken;
      IAOptionsSelected = IAOptionsCompetition_Yes_Taken;
      break;
    // End competitions

    case 'ranking':
      var { } = ({ HTML, Message, Options } = await import('./responses/ranking.jsx'));
      IAHTMLMessageSelected = HTML;
      IAMessageSelected = Message;
      IAOptionsSelected = Options;
      break;

    case 'onboarding':
      IAMessageSelected = IAMessageOnboarding;
      IAOptionsSelected = IAOptionsOnboarding;
      IAHTMLSecondMessageSelected = <HTMLOnboarding />;
      break;

    case 'onboarding/name-saved':
      // IAHTMLSecondMessageSelected = <HTMLOnboardingNameSaved />
      IAMessageSelected = HTMLOnboardingNameSaved();
      // IAOptionsSelected = <></>
      break;

    case 'referrals':
      var {} = ({ HTML, Message, Options } = await import('./responses/referrals/referrals.jsx'));
      IAHTMLMessageSelected = HTML;
      IAMessageSelected = Message;
      IAOptionsSelected = Options;
      break;

    case 'guide':
      IAMessageSelected = IAMessageWelcome;
      IAOptionsSelected = IAOptionsWelcome;
      IAHTMLMessageSelected = HTMLwelcome;
      break;

    case 'pikcoins':
      IAHTMLMessageSelected = IAHtmlMessagePikcoins;
      IAMessageSelected = IAMessagePikcoins;
      IAOptionsSelected = IAOptionsPikcoins;
      containerHeightSelected = IAcontainerHeightPikcoins;
      break;

    case 'redemption':
      IAHTMLMessageSelected = IAHtmlMessageRedemption;
      IAMessageSelected = IAMessageRedemption(options.credits);
      IAOptionsSelected = IAOptionsRedemption;
      break;

    default:
      IAHTMLMessageSelected = null;
      IAExpressionSelected = 'happy';
      IAMessageSelected = IAMessageDefault;
      IAOptionsSelected = IAOptionsDefault;
      containerHeightSelected = '210px';
      break;
  }

  // Applying actions
  set({ IAMessage: loadingMessage, IAHTMLMessage: null }); // Seeting the loading message
  setTimeout(() => {
    set({
      isVisible: true,
      IAMessage: IAMessageSelected ? IAMessageSelected : null,
      IAOptions: renderMiddleWare(IAOptionsSelected, set, options),
      IAExpression: IAExpressionSelected,
      IAHTMLMessage: IAHTMLMessageSelected,
      IAHTMLSecondMessage: IAHTMLSecondMessageSelected,
      containerHeight: containerHeightSelected
    });
  }, 1000);
};
