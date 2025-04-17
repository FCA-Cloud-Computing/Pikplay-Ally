import useCommonStore from "@/hooks/commonStore"

export const ToastContent = (message, type) => {
  const { setStoreValue } = useCommonStore((state => state))
  return <>
    <img src="/images/ia/5.png" />
    <span className={type} onClick={() => setStoreValue('leftMenuBar', { isShow: true })}>{message}</span>
  </>
}