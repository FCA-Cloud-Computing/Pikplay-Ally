import { useRef, useState } from "react";
import { toast } from 'react-toastify'
import { ToastContent } from "@/components/toaster/ToastContent";
import uploadFile from "@/services/uploadFile";
import useCommonStore from "./commonStore";
import { getNotificationsSrv, updateProfileSrv } from "@/services/user/user";

export const useProfileImage = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const { setStoreValue, userLogged } = useCommonStore((state => state))
  const { uid } = userLogged
  const fileInputRef = useRef(null);

  const handlerInputFile = async (event) => {
    const [value] = event.target.files
    if (!value) return
    setStoreValue('isFullLoading', true)
    const urlImage = await uploadFile("profile", value, `${uid}`);
    updateProfileSrv(null, uid, { picture: urlImage })
      .then(resp => {
        const { data } = resp
        setStoreValue('userLogged', { ...userLogged, picture: urlImage })
        setStoreValue('isFullLoading', false)
        // if (data.messageTop) setStoreValue('messageTop', data.messageTop)
        toast(ToastContent(data.messageTop, 'success'))
        setStoreValue('leftMenuBar', { isShow: false })
        getNotificationsSrv() // Actualizar notificaciones
      })
      .catch((err) => {
        setStoreValue('isFullLoading', false)
      })
  }

  return { fileInputRef, handlerInputFile, fileUploaded, setFileUploaded };
}