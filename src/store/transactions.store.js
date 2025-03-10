import { addTransaction, getTransactions } from "../services/transactions/transactions";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const fetchTransactions = async (set) => {
  try {
    const res = await getTransactions();
    set({ transactions: res.data });
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

export const useTransactionsStore = create(
  devtools(
    persist(
      (set) => ({
        transactions: [],
        getTransactionsStore: () => fetchTransactions(set),
        addTransactionStore: async (transaction) => {
          try {
            await addTransaction(transaction);
            await fetchTransactions(set);
          } catch (error) {
            console.error("Error adding transaction:", error);
          }
        },
      }),
      { name: "transactions" }
    )
  )
);