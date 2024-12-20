import CustomFetch from "../../components/fetch/CustomFetch";

const { get, post, put } = CustomFetch();

const BASE_URL = "/transactions";

const getTransactions = async () => {
  const url = BASE_URL
  const data = await get({ headers: { 'Content-Type': 'application/json' } }, url);
  return data;
}

const addTransaction = async (transaction) => {
  const data = await post({ headers: { 'Content-Type': 'application/json' } }, `${BASE_URL}`, transaction);
  return data;
}

const addInvoice = async (invoice, idTransaction) => {
  const url = `${BASE_URL}/${idTransaction}`
  const data = await put({ headers: { 'Content-Type': 'application/json' } }, url, invoice);
  return data;
}

export { getTransactions, addInvoice, addTransaction }