import CustomFetch from "@/components/fetch/CustomFetch";

const { get, post } = CustomFetch();

const BASE_URL = '/experiences';

const getExperiencesSrv = async (ctx: any, uids: string[] | null = null) => {
  if (uids) {
    let uidsAndExperiences: { uid: string; experience: any }[] = [];
    const uidsString = uids.join();
    const { data: experiences } = await get(ctx, `/experiences?uids=${uidsString}`)
    // debugger
    uids.forEach((uid) => {
      const experience = experiences.reduce((acc, obj) => {
        if (obj.uid === uid) acc += obj.experience;

        return acc;
      }, 0);

      // debugger
      uidsAndExperiences.push({
        uid,
        experience,
      });
    });

    return uidsAndExperiences;
  }

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
