"use client";

import { Transaction } from "./Transaction";

export function ListTransactions({ transactions }) {
  const transactionsSorted = transactions.toSorted(
    (a, b) => b.status - a.status
  );

  return (
    <ul className="flex gap-3 w-full flex-col-reverse">
      {transactionsSorted.map((transaction) => (
        <Transaction transaction={transaction} key={transaction.id}/>
      ))}
    </ul>
  );
}
