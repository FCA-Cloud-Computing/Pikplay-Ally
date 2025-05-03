import CustomFetch from "../../components/fetch/CustomFetch";

const { get, post, put } = CustomFetch();

const BASE_URL = "/trivias";

const getTriviaSrv = async (ctx, sellerUid) => {
    // 159 Caribe Dev
    const url = BASE_URL
    const data = await get(ctx, url + '/' + sellerUid);
    return data;
}

const postTriviaResponseSrv = async (ctx, body) => {
    const url = BASE_URL
    const data = await post(ctx, url, body);
    return data;
}

export {
    getTriviaSrv,
    postTriviaResponseSrv,
}
