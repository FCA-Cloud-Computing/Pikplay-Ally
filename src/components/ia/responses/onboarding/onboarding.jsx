import React, { useState, useEffect } from 'react';
import Button from '../../../button/Button'

const Message = () => <p>
  Hola, soy pepe, de Pikplay.<br />
  Solo para avisarte que encontramos la formula perfecta 🧪 para que los clientes sean fieles a sus marcas.<br /><br />
  Cashback, concursos, desafios, premios por referidos, ranking entre amigos y otros serán los elementos claves para hacer de las compras una experiencia única.
  <br /><br />
  Si tienes alguna duda, puedes contactarnos <a target="_blank" href="https://api.whatsapp.com/send?phone=573204863547&text=%C2%A1Hola!%20vengo%20de%20Pikplay%20y%20tengo%20una%20duda,%20podrias%20ayudarme%20a%20resolverla%20por%20favor">aquí</a>
</p>

const Options = ({ handleUserMessage, set }) => {
  const handleSaveName = () => {
    const name = document.getElementById('inptOnboardingName').value
    localStorage.setItem('onboardingName', name)
  }

  return <>
  </>
}

export {
  Message,
  Options
}
