import React, { useState, useEffect } from 'react';
import Button from '../../../button/Button'

const Message = () => <p>
  <b>Pikplay</b> tiene como función impulsar las <b>Pymes</b> en Colombia brindandole a los usuarios finales <b>Cashback</b> por sus compras, concursos y demás dinámicas.
  <br /><br />
  Gracias a las alianzas de estos comercios de diferentes areas, el usuario final sea premiado por su lealtad a la marca
</p>

const Options = ({ handleUserMessage, set }) => {
  const handleSaveName = () => {
    const name = document.getElementById('inptOnboardingName').value
    localStorage.setItem('onboardingName', name)
  }

  return <>
    <Button realistic shine color='blue' onClick={() => {
      handleSaveName()
      handleUserMessage('onboarding/name-saved', set)
    }}>
      Seguir
    </Button>
  </>
}

export {
  Message,
  Options
}
