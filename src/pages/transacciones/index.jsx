import "./styles.scss";
import { useEffect } from "react";
import {
  ListTransactions,
  Header,
  Statistics,
} from "../../components/transactions";
import Layout from "../../components/layout/Layout";
import { useTransactionsStore } from "../../store/transactions.store";

function Transactions() {
  const { transactions, getTransactionsStore } = useTransactionsStore();

  useEffect(() => {
    getTransactionsStore();
  }, [getTransactionsStore]);

  const handleNotification = () => {
    console.log("click");
  };

  const totalCredits = transactions.reduce(
    (acc, curr) => acc + curr.credits,
    0
  );

  const image = "";
  const descripcion = "";
  const title = "Transacciones";
  const url = "";

  return (
    <Layout title={title} descripcion={descripcion} image={image} url={url}>
      <section className="page min-h-dvh max-w-screen-sm flex flex-col items-center bg-primary p-6 gap-5">
        <Header handleNotification={handleNotification} />
        <Statistics totalCredits={totalCredits} />
        <ListTransactions transactions={transactions} />
      </section>
    </Layout>
  );
}

export default Transactions;
