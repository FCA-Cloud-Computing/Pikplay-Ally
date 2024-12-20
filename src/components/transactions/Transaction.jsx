"use client"

import Image from "next/image";
import ModalTransactions from "../modal/ModalTransactions";
import { FormClient } from "./FormClient";
import { TRANSACTION_STATUS } from "../../consts/transactions.js";

export function Transaction({ transaction }) {
  return (
    <article
      key={transaction.id}
      className={`flex bg-[#1f6a9080] ${
        transaction.status === TRANSACTION_STATUS.SUCCESS ? "opacity-70" : ""
      } rounded-md`}
    >
      <section className="flex flex-col gap-1 bg-[#0d0e39d3] rounded-l-md p-2 items-center justify-between">
        <Image
          src="/images/users/hiro.jpeg"
          alt={`Avatar ${transaction.customer}`}
          className="rounded-full object-cover aspect-auto self-start"
          width={36}
          height={36}
        />
        <strong
          className={`text-[0.75rem] font-bold bg-primary px-2 py-1 rounded-md w-fit`}
        >
          {transaction.status === TRANSACTION_STATUS.PENDING
            ? "Pendiente"
            : "Completada"}
        </strong>
      </section>
      <section className="flex flex-col p-2 grow gap-2">
        <header className="flex justify-between items-center">
          <strong className="text-sm font-semibold">
            {transaction.seller?.name}
          </strong>
          <div className="flex gap-2">
            <span className="text-[0.7rem] text-green-500 font-semibold">
              EXP {transaction.experience}
            </span>
            <span className="text-[0.7rem] text-green-500 font-semibold">
              ${transaction.credits}
            </span>
          </div>
        </header>
        <p className="text-[0.75rem]">
          {transaction.description || "No tenemos descripción disponible"}
        </p>
        <footer className="flex justify-between items-center flex-wrap gap-2">
          <span className="text-[0.7rem] text-gray-400 font-semibold rounded-md w-fit">
            {transaction.seller?.city} {transaction.createdAt?.slice(0, 10)}
          </span>
          {transaction.status === TRANSACTION_STATUS.PENDING && (
            <ModalTransactions
              label="Subir comprobante"
              className="w-full text-[0.7rem] text-white bg-primary px-2 py-1 rounded-md"
            >
              <FormClient
                transactionId={transaction.id}
                uid={transaction.uid}
              />
            </ModalTransactions>
          )}
        </footer>
      </section>
    </article>
  );
}
