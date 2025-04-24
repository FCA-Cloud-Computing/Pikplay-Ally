import CustomFetch from "@/components/fetch/CustomFetch";

const { get, post } = CustomFetch();

const BASE_URL = '/experiences';

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
    console.error('Error al obtener las experiencias del usuario', err)
    return {
      expTotal: 0,
      experiences: [],
    };
  }
}

const createExperienceSrv = async (ctx, body) => {
  try {
    await post(ctx, `/experiences`, body)
    const currentCoins = await getExperiencesSrv(ctx)
    return currentCoins
  } catch (err) {
    // TODO - Implementar un logger
    console.error('Error al crear la experiencia del usuario', err)
    return {
      expTotal: 0,
      experiences: [],
    };
  }
}

export {
  createExperienceSrv,
  getExperiencesSrv,
}
