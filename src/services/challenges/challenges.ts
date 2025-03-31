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

const sendWordChallenge = async (ctx) => {
  const url = BASE_URL + '/word'
  const data = await post(ctx, url, {
    word: ctx.word,
    uid: ctx.uid,
  });
  return data;
}

export { getChallenges, getChallengesByUser, sendWordChallenge }
