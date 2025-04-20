import { postRedemptionSrv } from "@/services/redemption/redemption"
import useCommonStore from "./commonStore"
import MESSAGES from "@/consts/messages"

const useRedemption = () => {
  const { setStoreValue } = useCommonStore()
  const { REDEMPTION_SUCCESS } = MESSAGES

  const handleRedemption = async (pid) => {
    postRedemptionSrv(pid)
      .then(res => {
        const { code, data, message } = res
        if (code == 200) setStoreValue('messageTop', { message, type: 'success' })
        else setStoreValue('messageTop', { message, type: 'error' })
      })
      .catch(err => {
        console.error(err)
      })
  }

  return { handleRedemption }
}

export default useRedemption
