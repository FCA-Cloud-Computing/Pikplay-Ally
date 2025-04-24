import React from 'react';
import Link from 'next/link';

// Custom
import Button from '../../button/Button'
import CoinIcon from '../../coinIcon/CoinIcon';
import useCommonStore from '../../../hooks/commonStore';

const Height = '160px'
const HtmlMessage = <div style={{
    cssText: `
        align-items: center;
        column-gap: 10px;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        width: max-content;
        `}}>
    Pikcoins <CoinIcon hideNumber />
</div>

const Message = () => <p>
    <b>Pikcoins ó Cashback</b> son los créditos que puedes ganar por:<br /><br />
    <li>Compras en aliados</li>
    <li>Participar en los eventos de Pikplay por redes sociales y por la web</li>
    <li>Completar desafios semanales</li>
    <li>Quedar en el TOP del ranking de tus amigos</li>
    <p>Podrás utilizar estos créditos redimiendolos en compras de nuestros aliados o duplicarlos jugando con otros usuarios dentro de Pikplay </p>
</p>

const Expresion = 'loved'
const Options = ({ handleUserMessage, set }) => {
    return <>
        <Button color='link'>
            <Link href='/redimir?paco=que-puedo-redimir'>
                ¿Que puedo redimir con Pikcoins?
            </Link>
        </Button>
    </>
}

export {
    Expresion,
    Height,
    HtmlMessage,
    Message,
    Options
}
