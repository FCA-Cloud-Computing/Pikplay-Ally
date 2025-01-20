import React from 'react';
import Button from '../../button/Button'
import CoinIcon from '../../coinIcon/CoinIcon';
import useSystemStore from '../../../hooks/storeSystem';

const Height = '160px'
const HtmlMessage = <div style={{
    cssText: `
        align-items: center;
        column-gap: 10px;
        display: flex;
        justify-content: center;
        width: max-content;
        `}}>
    Pikcoins <CoinIcon hideNumber />
</div>
const Message = `Claro, te explico. <br />
<b>Pikcoins</b> son los creditos que puedes ganar por:<br /><br />
<li>Compras en aliados</li>
<li>Participar en los eventos de Pikplay por redes sociales y por la web</li>
<li>Completar desafios semanales</li>
<li>Quedar en el TOP del ranking de tus amigos</li>
<p>Podrás utilizar estos creditos redimiendolos en compras de nuestros aliados o duplicarlos jugando con otros usuarios dentro de Pikplay </p>`
// <a target="_BLANK" href="/articulo/pikcoins-que-son-y-como-redimir-cupones">Conoce más sobre los Pikcoins aquí</a>`
const Expresion = 'loved'
const Options = ({ handleUserMessage, set }) => {
    const { isOnboardingProcess } = useSystemStore()
    // debugger;

    return <>
        {/* <Button color='transparent'>
            Saber más de Pikcoins
        </Button> */}
        {!isOnboardingProcess && <Button color='transparent' onClick={() => handleUserMessage('inicio', set)}>
            Volver al inicio
        </Button>}
    </>
}

export {
    Expresion,
    Height,
    HtmlMessage,
    Message,
    Options
}
