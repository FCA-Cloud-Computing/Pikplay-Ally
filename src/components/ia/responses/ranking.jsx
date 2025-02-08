import React, { useState, useEffect } from 'react';
import Button from '../../button/Button'

const HTML = <></>

// TODO: Cambiar aquí el texto
const Message = () => <div>
  <center>
    <img src="/images/icons/ranking-icon.png" style={{ margin: '20px auto 0', width: '80px' }} />
  </center>
  <p>
    En Pikplay así como en la vida, el esfuerzo tiene recompensa. <br /><br />Por cada amigo, compra, recomendación, participación en concursos, entre otras cosas, recibirás EXP y con ella podrás subir en el Ranking de temporada en Pikplay.
  </p>
</div>
const Options = ({ handleUserMessage, set }) => {
  return <>
    {/* <Button color='blue' realistic onClick={() => handleUserMessage('inicio', set)}>
      &nbsp;¡Seré el primero! 🔝&nbsp;
    </Button> */}
  </>
}

export {
  HTML,
  Message,
  Options,
}
