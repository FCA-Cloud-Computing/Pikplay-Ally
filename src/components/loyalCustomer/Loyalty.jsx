import styles from "./Loyalty.module.scss"
import Button from "../button/Button"
import { getLoyaltyInfo } from "@/services/loyalty/loyalty"
import { useEffect, useState } from "react"
import { useIAStore } from "../ia/IAstore"

export function Loyalty({ uid, sellerId }) {
  const { handleUserMessage } = useIAStore()
  const [loyaltyInfo, setLoyaltyInfo] = useState({
    instructions:
      "Por cada 5 compras en nuestra tienda, obtén un corte de cabello o barba gratis. Recuerda que debes presentar tu tarjeta de lealtad para que podamos registrar tus compras.",
    message: "¡Corte de cabello o barba Gratis!",
    items: [
      {
        tid: 12,
        status: 1,
        compliance: true,
        created_at: new Date("2024-01-17T02:56:34.000Z"),
      },
      {
        tid: 34,
        status: 0,
        compliance: false,
        created_at: new Date("2024-01-17T02:56:34.000Z"),
      },
      {
        tid: null,
      },
      {
        tid: null,
      },
      {
        tid: null,
      },
    ],
  })

  // useEffect(() => {
  //   const fetchLoyaltyInfo = async () => {
  //     try {
  //       const response = await getLoyaltyInfo(uid, sellerId)
  //       setLoyaltyInfo(response.json())
  //     } catch (error) {
  //       console.error(`Error: ${error}`)
  //     }
  //   }
  //   fetchLoyaltyInfo()
  // }, [])
  const { message, instructions } = loyaltyInfo
  return (
    <article>
      <header className={styles.header}>
        <h3>Premio a la fidelidad</h3>
        <Button
          realistic
          color="blue"
          onClick={() =>
            handleUserMessage("loyalty", { message, instructions })
          }
        >
          Redimir
        </Button>
      </header>
      <div>
        <p>{loyaltyInfo?.instructions}</p>
        <p>{loyaltyInfo?.message}</p>
        <ul>
          {loyaltyInfo?.items.map((item, index) => (
            <li key={index}>
              {item.tid ? (
                <span>
                  {item.compliance ? "✅" : "❌"} {item.tid}
                </span>
              ) : (
                <span>---</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
// }
// "instructions": "Por cada 5 compras en nuestra tienda, obtén un corte de cabello o barba gratis. Recuerda que debes presentar tu tarjeta de lealtad para que podamos registrar tus compras.",
// "message": "¡Corte de cabello o barba Gratis!",
// "items": [
//     {
//         "tid": 12,
//         "status": 1,
//         "compliance": true,
//         "created_at": "2024-01-17T02:56:34.000Z"
//     },
//     {
//         "tid": 34,
//         "status": 0,
//         "compliance": false,
//         "created_at": "2024-01-17T02:56:34.000Z"
//     },
//     {
//         "tid": null
//     },
//     {
//         "tid": null
//     },
//     {
//         "tid": null
//     }
// ]
// }
