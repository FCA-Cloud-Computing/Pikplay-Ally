import React from 'react';
import Button from '../../button/Button'
import { motion } from "framer-motion"
import Link from 'next/link';

const Message = () => {
    let name = ''
    if (typeof window !== 'undefined') {
        name = JSON.parse(localStorage.getItem("userLogged"))?.name
    }
    return <div>Hola {name || ""}! en que te puedo ayudar?</div>
}

const Expresion = 'neutral'
const Options = ({ handleUserMessage, set }) => {
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return <>
        <motion.div variants={item}>
            <Link href='/onboarding'>
                <Button
                    color='transparent'>
                    &nbsp;&nbsp;Guía para nuevos usuarios
                </Button>
            </Link>
        </motion.div>
        <motion.div variants={item}>
            <Button color='transparent' onClick={() => handleUserMessage('pikcoins', set)}>
                &nbsp;&nbsp;¿Que son los Pikcoins?
            </Button>
        </motion.div>
        <motion.div variants={item}>
            <Button color='transparent' onClick={() => handleUserMessage('gift', set)}>
                &nbsp;&nbsp;Asesoria para un regalo
            </Button>
        </motion.div>
        <motion.div variants={item}>
            <Button color='transparent' onClick={() => handleUserMessage('referrals', set)}>
                &nbsp;&nbsp;
                Referidos
            </Button>
        </motion.div>
        <motion.div variants={item}>
            <Button color='transparent' onClick={() => handleUserMessage('referrals', set)}>
                &nbsp;&nbsp;
                <span>Hablar con asesor</span>
            </Button>
        </motion.div>
        {/* <Button color='transparent' onClick={() => handleUserMessage('playstation', set)}>
            Jugadores Playstation
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('xbox', set)}>
            Jugadores XBOX
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('competition/list', set)}>
            Concursos
        </Button> */}
        {/* <Button color='transparent' onClick={() => handleUserMessage('otros-temas', set)}>
            Otros temas
        </Button> */}
    </>
}

export {
    Expresion,
    Message,
    Options,
}
