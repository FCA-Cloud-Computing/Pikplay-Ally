import styles from "./transactions.module.scss"

import { useState } from "react"
import Image from "next/image"
import ScheduleIcon from "@mui/icons-material/Schedule"

// Custom
import ModalTransactions from "../modal/ModalTransactions"
import { ButtonVoucher } from "./ButtonVoucher"
import { TRANSACTION_STATUS } from "@/consts/transactions.js"
import Button from "../button/Button"
import { formatNumber, timeAgo } from "@/lib/utils"
import CoinIcon from "../coinIcon/CoinIcon"

export function Transaction({ transaction }) {
  // const [open, setOpen] = useState(true)
  const { credits } = transaction
  const statusClass = transaction.status == 0 ? styles.pending : styles.success

  return (
    <article
      key={transaction.id}
      className={`Card ${styles.TransactionComponent} ${transaction.status === TRANSACTION_STATUS.SUCCESS ? "opacity-70" : ""
        } rounded-md`}
    >
      <section className={styles.topSection}>
        {/* <Image
          src="/images/users/hiro.jpeg"
          alt={`Avatar ${transaction.customer}`}
          className="rounded-full object-cover aspect-auto self-start"
          width={36}
          height={36}
        /> */}
        <strong className={`${styles.status} ${statusClass}`}>
          {transaction.status === TRANSACTION_STATUS.PENDING
            ? "Pendiente"
            : "Completada"}
        </strong>

        <div className={styles.time}>
          <ScheduleIcon className="icon" />
          &nbsp;{timeAgo(new Date(transaction.createdAt))}
        </div>
      </section>

      <section>
        <header className={`${statusClass}`}>
          <strong className="text-sm font-semibold">
            T{transaction.id} | {transaction.description}
          </strong>
          {credits && <CoinIcon coins={credits} label />}
          <div className="flex flex-col">
            <span className={styles.exp}>{transaction.experience} EXP</span>
            {transaction.amount && (
              <span className="">
                Valor total: ${formatNumber(transaction.amount)}
              </span>
            )}
          </div>
        </header>

        <footer>
          <div>{transaction.seller?.city}</div>
          {transaction.status === TRANSACTION_STATUS.PENDING && (
            <>
              <ButtonVoucher
                transactionId={transaction.id}
                uid={transaction.uid}
              />
              {/* <Button color="blue" onClick={() => setOpen(true)}>
                Subir comprobante
              </Button>
              <ModalTransactions
                handleClose={() => setOpen(false)}
                open={open}
                setOpen={setOpen}
                label="Subir comprobante"
                className="w-full text-[0.7rem] text-white bg-primary px-2 py-1 rounded-md"
              >
              </ModalTransactions> */}
            </>
          )}
        </footer>
      </section>
    </article>
  )
}
