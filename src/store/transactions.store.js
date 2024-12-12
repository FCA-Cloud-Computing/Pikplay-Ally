import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useTransactionsStore = create(
  devtools(
    persist(
      (set) => {
        return {
          transactions: [],

          addTransaction: (transaction) => {
            set((state) => ({
              transactions: [...state.transactions, transaction],
            }));
          },

          removeTransaction: (orderId) => {
            set((state) => ({
              transactions: state.transactions.filter(
                (transaction) => transaction.orderId !== orderId
              ),
            }));
          },
          
          updateTransaction: (orderId, updatedTransaction) => {
            set((state) => ({
              transactions: state.transactions.map((transaction) =>
                transaction.orderId === orderId ? updatedTransaction : transaction
              ),
            }));
          },
        }
      }
    , { name: "transactions" })
  )
)