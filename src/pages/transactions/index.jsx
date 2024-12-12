import { getTransactions } from "@/services/transactions/transactions";
import { useState, useEffect } from "react";
import {
  ListTransactions,
  Header,
  Statistics,
} from "@/components/transactions";
import Layout from "@/components/layout/Layout";
import "./styles.scss";

function Transactions() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getTransactions();
        setData(res);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleNotification = () => {
    console.log("click");
  };

  const totalProfit = data?.transactions?.reduce(
    (acc, curr) => acc + curr.profit,
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
        <Statistics totalProfit={totalProfit} />
        {data?.transactions && <ListTransactions transactions={data.transactions} />}
      </section>
    </Layout>
  );
}

export default Transactions;
