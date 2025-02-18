import CustomFetch from '../../components/fetch/CustomFetch';
import cookieCutter from '@boiseitguru/cookie-cutter';
import { getCookies, logout } from '../../lib/utils';

const { get, post } = CustomFetch();

const BASE_URL = '/users';

const getUserSrv = async (ctx, uid, slug) => {
  const url = BASE_URL + (uid ? `/${uid || slug}` : '');
  const data = await get(ctx, url);
  return data;
};

const getUsersSrv = async (ctx, { phones, uids }) => { // No envía informacion PII, solo nombre, imagen, etc.
  const url = BASE_URL;
  const data = await post(ctx, url, { phones, uids });
  return data;
};

const saveLeadSrv = (ctx, phone) => {
  const path = BASE_URL + '/lead/save';
  return post(ctx, path, {
    phone
  });
};

const saveReferralSrv = (ctx, item) => {
  const path = BASE_URL + '/referral/save';
  return post(ctx, path, item);
};

const loginSrv = async (ctx: any, phone: string, code: number, name: string) => {
  const path = BASE_URL + '/login';
  try {
    const data = await post(ctx, path, { code, phone, name })
    const { token, uid } = data.data
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
    const cookieConfig = { expires: oneYearFromNow } // Definiendo las cookies de login sin expiración
    cookieCutter.set('X-Auth-Token', token, cookieConfig);
    cookieCutter.set('User-ID', uid, cookieConfig);
    return data;
  } catch (err) {
    return {
      data: null,
      status: 400,
      message: 'Error al iniciar sesión'
    };
  }
};

const validateTokenSrv = async (ctx) => {
  // Valida el token que esta en el navegador así mismo el UserId, si alguno de estos dos no se encuentra, cierra la session.
  const path = BASE_URL + '/validate-token';
  const headers = getCookies(ctx);
  if (!headers['User-ID'] || !headers['X-Auth-Token']) {
    logout();
    return {
      code: 403,
      data: {},
    };
  }
  // const data = await post(ctx, path, {});
  return {
    code: 200,
    data: {},
  };
};

const sendCodeSrv = async (ctx, phone) => {
  const path = BASE_URL + '/login';
  const data = await post(ctx, path, { phone });
  return data;
};

const updateProfileSrv = (ctx, uid, data) => {
  const path = BASE_URL + `/${uid}/update`;
  return post(ctx, path, data);
};

const getExperiencesSrv = async (ctx) => {
  try {
    const { data: experiences } = await get(ctx, `/experiences`)
    const expTotal = experiences.reduce((total, obj) => total + obj.experience, 0)
    const percentageBar = (expTotal / 1000) * 100
    const currentPikcoins = experiences.reduce((total, obj) => total + obj.coins, 0)

    return {
      currentPikcoins,
      expTotal,
      experiences,
      percentageBar,
    };
  } catch (err) {
    // TODO - Implementar un logger
    console.error('Error al obtener las experiencias del usuario', err);
    return {
      expTotal: 0,
      experiences: [],
    };
  }
};

const getNotificationsSrv = async (ctx) => {
  const data = await get(ctx, BASE_URL + `/notifications`);
  return data;
};

const getReferralsSrv = async (ctx) => {
  const data = await get(ctx, BASE_URL + `/referrals`);
  return data;
};

export {
  // getTopMessagesSrv,
  getExperiencesSrv,
  getNotificationsSrv,
  getReferralsSrv,
  getUserSrv,
  getUsersSrv,
  loginSrv,
  saveLeadSrv,
  saveReferralSrv,
  sendCodeSrv,
  updateProfileSrv,
  validateTokenSrv,
};
