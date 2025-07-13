import CustomFetch from "../../components/fetch/CustomFetch"

const { get, post } = CustomFetch()

const BASE_URL = "/daily-pikcoins"

export async function getDailyPikcoins(ctx) {
  let url = BASE_URL
  const data = await get(ctx, url);
  return data;
}

export async function redemptionDailyPikcoins(ctx, body) {
    const url = `${BASE_URL}/redemption`
    const data = await post(ctx, url, body);
    return data;
}

