import React from 'react';
import Button from '../../../button/Button';
import useCompetitions, { useCompetitionsStore } from '../../../competitions/hooks/useCompetitions';
import { DoneAll } from '@mui/icons-material';
import { DeleteOutlined } from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Message = () => {
  const { competitionDetail: { title }, selectedNumberPhone, selectedNumber, selectedNumberName } = useCompetitionsStore();
  return <div>
    Número seleccionado: {selectedNumber}<br />
    Nombre: {selectedNumberName}<br />
    <p>¿Que desea hacer?</p>
  </div>
};

const Options = ({ handleUserMessage, set, options }) => {
  const { liberarNumero, setPaidNumber } = useCompetitions();
  const { competitionDetail: { title }, selectedNumberPhone } = useCompetitionsStore();

  const habdleSendMessage = () => window.open(`https://api.whatsapp.com/send?text=¡Hola! Este es un recordatorio para el pago del sorteo ${title}&phone=` + selectedNumberPhone, '_blank')

  return <>
    <Button color='blue' onClick={setPaidNumber}>
      <DoneAll className='icon' />
      &nbsp;Marcar como pagado
    </Button>
    <Button style={{ color: 'white' }} color='link' onClick={habdleSendMessage}>
      <WhatsAppIcon className='icon' />
      &nbsp;Enviar mensaje
    </Button>
    <Button style={{ color: 'white' }} color='link' onClick={() => {
      liberarNumero();
      handleUserMessage('hideIA', set);
    }}>
      <DeleteOutlined className='icon' />
      &nbsp;Liberar número
    </Button>
  </>;
};

export {
  Message,
  Options
};
