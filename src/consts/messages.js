const MESSAGES = {
  // IA
  CLAIM_IA_MESSAGE: "Actualmente no cumples con los Pikcoins necesarios, ¡sigue acumulando!",

  // Onboarding
  ONBOARDING_LEAD_SUCCESS: 'Ahora eres un Pikplayer, te envíaremos las últimas noticias a tu whatsapp',
  ONBOARDING_LEAD_DUPLICATED: 'Ya te encuentras en nuestra BD, te notificaremos de todo lo que pase por aquí',

  // Perfil
  DEFAULT_NAME: 'Cambiar nombre',

  INVITATION_MESSAGE: (phone) => `https://api.whatsapp.com/send?phone=${phone}&text=¡Hola!, te invito a unirte a Pikplay, donde ambos ganamos cashback por referir amigos y compras en: tiendas del barrio, barberias, tiendas geek, gamer y más!`,

  // Seller
  REGISTER_INVOICE_LABEL: 'Registrar factura',
}

export const NOTIFICATION_TYPES = {
  CHALLENGE: 'Desafio',
  PURCHASE: 'Compra',
}

export default MESSAGES;
