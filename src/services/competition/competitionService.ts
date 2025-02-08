import CustomFetch from '../../components/fetch/CustomFetch';
const { get, post } = CustomFetch()

const getComptSrv = async (ctx, slug = null) => {
  const path = slug ? `/competitions/${slug}` : '/competitions'
  return get(ctx, path);
}

const getEnvVariablesSrv = async (ctx, slug = null) => {
  return get(ctx, '');
}

const postCompetitionMemberSrv = async (ctx, competitionID, number, uid) => {
  const path = `/competition-members/${competitionID}/register`
  return post(ctx, path, { competitionID, number, uid })
}

const setPaidNumberSrv = (ctx, competitionId, number, uid) => {
  const path = '/competition-members/paid'
  return post(ctx, path, { competitionId, number, uid })
}

const deleteCompetitionMemberSrv = (ctx, competitionId, number) => {
  const path = `/competition-members/${competitionId}/delete`
  return post(ctx, path, { number })
}

const deleteNotPaidNumbersSrv = async (ctx, competitionId) => {
  const path = `/competitions/${competitionId}/delete-not-paid`
  return post(ctx, path, {})
}

export {
  deleteCompetitionMemberSrv,
  deleteNotPaidNumbersSrv,
  getComptSrv,
  getEnvVariablesSrv,
  postCompetitionMemberSrv,
  setPaidNumberSrv
}
