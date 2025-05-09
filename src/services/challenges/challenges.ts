import CustomFetch from "../../components/fetch/CustomFetch";

const { get, post, put } = CustomFetch();

const BASE_URL = "/challenges";

const getChallenges = async (ctx) => {
  const url = BASE_URL
  const data = await get(ctx, url);
  return data;
}

const getChallengesByUser = async (ctx) => {
  const url = BASE_URL + '/completed'
  const data = await get(ctx, url);
  return data;
}

const postChallengeDetailSrv = async (ctx, body) => {
  const url = BASE_URL + '/detail/save'
  const data = await post(ctx, url, body);
  return data;
}

export {
  getChallenges,
  getChallengesByUser,
  postChallengeDetailSrv,
}
