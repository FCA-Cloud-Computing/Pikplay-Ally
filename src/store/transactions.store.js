import { addTransaction, getTransactions } from "../services/transactions/transactions";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useTransactionsStore = create(
  devtools(
    persist(
      (set) => {
        return {
          transactions: [],
          getTransactionsStore: async () => {
            try {
              const res = await getTransactions();
              set((_) => ({
                transactions: res.data
              }));
            } catch (error) {
              console.error("Error fetching transactions:", error);
            }
          },

          addTransactionStore: async (transaction) => {
            try {
              await addTransaction(transaction);
              const res = await getTransactions();
              set((_) => ({
                transactions: res.data
              }));
            } catch (error) {
              console.error("Error fetching transactions:", error);
            }
          },
        }
      }
      , { name: "transactions" })
  )
)
