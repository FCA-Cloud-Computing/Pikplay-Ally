import React from "react";
import Button from "../../button/Button";

const link = `https://api.whatsapp.com/send?phone=573204863547&text=¡Hola!, Quisiera registrar una factura en Pikplay`
const AddTransactionSteps = (credits) =>
  <>
    <p>Registra facturas y obtén Cashback por ellas para luego redimir en productos increíbles.</p>
    <p>1. Asegurate de tener la factura a la mano 📝. Debe verse tu nombre, documento de identidad y monto total</p>
    <p>2. Validaremos la información 🔍</p>
    <p>3. Tendrás tu Cashback listo para utilizar en 3 días habiles 💰</p>
  </>

const AddTransactionSteps_Options = ({ handleUserMessage, set, options }) => {
  return <>
    <Button color='blue' realistic>
      <a href={link} target="_blank">
        Añadir factura
      </a>
    </Button>
    <Button color='transparent' onClick={() => handleUserMessage('pikcoins', set)}>
      ¿Que es el Cashback?
    </Button>
  </>
};

export { AddTransactionSteps, AddTransactionSteps_Options };
