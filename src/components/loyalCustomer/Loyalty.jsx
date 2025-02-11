import styles from "./Loyalty.module.scss"
import Button from "../button/Button"
import { getLoyaltyInfo } from "@/services/loyalty/loyalty"
import { useEffect, useState } from "react"
import { useIAStore } from "../ia/IAstore"
import { timeAgo } from "@/lib/utils"
import Image from "next/image"

export function Loyalty({ uid, sellerId }) {
  const { setIAMessage } = useIAStore()
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
  const transactionsNoCompleted = loyaltyInfo.items.reduce(
    (acc, item) => (!item.tid ? acc + 1 : acc),
    0
  )
  return (
    <article className={styles.loyalty}>
      <header className={styles.header}>
        <h3>Premio a la fidelidad</h3>
        <Button
          color="blue"
          onClick={() =>
            setIAMessage(
              <div>
                <h2 style={{ color: "white" }}>{message}</h2>
                <p>{instructions}</p>
              </div>
            )
          }
        >
          Saber más
        </Button>
      </header>
      <div className={styles.wrapper}>
        <ul className={styles.transactions}>
          {loyaltyInfo?.items.map((item, index) => {
            const isLast = index === loyaltyInfo.items.length - 1
            return (
              <div key={index}>
                {!isLast ? (
                  <li className={item.compliance ? styles.completed : ""}>
                    <Image
                      src={`images/icons/${
                        item.compliance ? "check.svg" : "x.svg"
                      }`}
                      width={20}
                      height={20}
                    />
                  </li>
                ) : (
                  <Image
                    className={styles.isLast}
                    width={45}
                    height={45}
                    src="images/icons/gift.svg"
                  />
                )}
                <small>{!isLast ? timeAgo(item.created_at) : "¡GRATIS!"}</small>
              </div>
            )
          })}
        </ul>
        <span className={styles.footerText}>
          Te faltan {transactionsNoCompleted} compras para reclamar la
          recompensa
        </span>
      </div>
    </article>
  )
}
