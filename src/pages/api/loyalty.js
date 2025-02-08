export default function handler(req, res) {
    const data = {
        instructions: "<div>Por cada <b>5 compras en nuestra tienda</b>, obtén un corte de cabello o barba gratis. Recuerda que debes presentar tu <b>tarjeta de lealtad</b> para que podamos registrar tus compras.</div>",
        message: "¡Corte de cabello o barba Gratis!",
        items: [
            {
                tid: 12,
                status: 1,
                compliance: true,
                created_at: "2024-01-17T02:56:34.000Z",
            },
            {
                tid: 34,
                status: 0,
                compliance: false,
                created_at: "2024-01-17T02:56:34.000Z",
            },
            {
                tid: null,
            },
            {
                tid: null,
            },
            {
                tid: null,
            }
        ]
    }
    res.status(200).json(data)
}
