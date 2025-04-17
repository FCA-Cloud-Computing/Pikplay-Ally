import CustomFetch from "../../components/fetch/CustomFetch";

const { get, post, put } = CustomFetch();

const BASE_URL = "/publications";

const getPublicationsSrv = async (ctx, sellerSlug) => {
  let url = BASE_URL;
  if (sellerSlug) {
    url += `?sellerSlug=${sellerSlug}`;
  }

  const data = await get(ctx, url);
  return data;
}

export {
  getPublicationsSrv
}
