import styles from '../../components/transactions/transactions.module.scss'

import { useEffect } from 'react';
import { useState } from 'react';
import { createGlobalStyle } from "styled-components";
import AddIcon from '@mui/icons-material/Add';
import { Alert } from '@mui/material';

// Custom
import { ListTransactions } from '../../components/transactions';
import Layout from '../../components/layout/Layout';
import { useTransactionsStore } from '../../store/transactions.store';
import useSystemStore from '@/hooks/storeSystem';
import { FormAllied } from '@/components/transactions/FormAllied';
import ModalTransactions from '@/components/modal/ModalTransactions';

function Transactions() {
  const { transactions, getTransactionsStore } = useTransactionsStore();
  const { userLogged } = useSystemStore();
  const image = '';
  const descripcion = '';
  const title = 'Transacciones';
  const url = '';
  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] = useState(false);

  useEffect(() => {
    getTransactionsStore();
  }, [getTransactionsStore]);

  const totalCredits = transactions.reduce(
    (acc, curr) => acc + curr.credits,
    0
  );

  const { setStoreValue } = useSystemStore()

  useEffect(() => {
    setStoreValue('leftBottomMenuContent', <button className="btnLeftBottomMenu" onClick={() => setIsModalAddTransactionOpen(true)}>
      <AddIcon />
    </button>)
  }, [])

  const GlobalStyle = createGlobalStyle`
  section.page {
    background-image: url(/images/backgrounds/general-bg.png);
  }`;

  return (
    <Layout title={title} descripcion={descripcion} image={image} url={url}>
      <GlobalStyle />
      <section className={`${styles.TransactionsPage} page`}>
        <div className="flex items-center justify-between">
          <ModalTransactions {...{ open: isModalAddTransactionOpen, handleClose: () => setIsModalAddTransactionOpen(false) }}>
            <FormAllied />
          </ModalTransactions>
        </div>
        <div className={`${styles.topMessage}`}>
          <p className={styles.message}>
            <Alert severity="warning">
              {<img src="/images/ia/3.png" />}
              Actualmente tienes <b>58 Pikcoins</b> que no han sido abonados ya que no has evidenciado tu compra con su factura.</Alert>
          </p>
        </div>
        <ListTransactions transactions={transactions} />
      </section>
    </Layout>
  );
}

export default Transactions;
