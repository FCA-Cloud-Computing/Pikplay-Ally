import CustomFetch from '../../components/fetch/CustomFetch';
const { get, post } = CustomFetch()

const getCouponsSrv = async (ctx, sellerSlug = null) => {
    const path = sellerSlug ? `/coupons/${sellerSlug}` : '/coupons'
    return get(ctx, path);
}

export {
    getCouponsSrv,
}
