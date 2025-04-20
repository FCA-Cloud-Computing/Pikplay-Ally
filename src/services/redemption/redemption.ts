import CustomFetch from "../../components/fetch/CustomFetch";

const { get, post, put, del } = CustomFetch();

const BASE_URL = "/redemptions";

const getRedemptionSrv = async (credits) => {
  const json = await post(
    { headers: { "Content-Type": "application/json" } },
    `${BASE_URL}`,
    { amount: credits }
  );
  return json;
}

const cancelRedemptionSrv = async (id) => {
  const json = await del(
    { headers: { "Content-Type": "application/json" } },
    `${BASE_URL}/cancel/${id}`
  );
  return json;
}

const postRedemptionSrv = async (pid) => {
  const data = await post(null, `${BASE_URL}/create`, { pid });
  return data;
}

export { getRedemptionSrv, cancelRedemptionSrv, postRedemptionSrv };
