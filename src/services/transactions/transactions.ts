import CustomFetch from "@/components/fetch/CustomFetch";

const { get, post } = CustomFetch();

const BASE_URL = "/api/transactions";

const getTransactions = async () => {
  const url = BASE_URL
  const data = await get({ headers: { 'Content-Type': 'application/json' } }, url);
  return data;
}


export { getTransactions }