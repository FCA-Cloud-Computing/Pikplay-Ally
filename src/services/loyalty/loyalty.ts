import CustomFetch from "../../components/fetch/CustomFetch"

const { post } = CustomFetch()

const BASE_URL = "/loyalty"

const getLoyaltyInfo = async (uid, sellerId) => {
  const url = BASE_URL
  const data = await post(
    { headers: { "Content-Type": "application/json" } },
    `${url}`,
    { uid, seller_id: sellerId }
  )
  return data
}

export { getLoyaltyInfo }
