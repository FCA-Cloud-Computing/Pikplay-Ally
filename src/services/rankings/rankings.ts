import CustomFetch from "../../components/fetch/CustomFetch";

const { get, post, put } = CustomFetch();

const BASE_URL = "/rankings";

const getRankingSrv = async (ctx, rankingId) => {
  const url = BASE_URL + '/' + rankingId;
  const data = await get(null, url);
  return data;
}

const getRankingDetailSrv = async (ctx, rankingId) => {
  const url = BASE_URL + '/' + rankingId + '/members';
  const data = await get(null, url);
  return data;
}

const addRankingDetailSrv = async (ctx, body) => {
  const url = BASE_URL + '/member/add';
  const data = await post(null, url, body);
  return data;
}

export { 
  addRankingDetailSrv,
  getRankingSrv,
  getRankingDetailSrv,
}
