/* eslint-disable import/no-unresolved */
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { storage } from "../lib/firebase";
import { addInvoice } from "./transactions/transactions";

async function uploadFileSrv(
  entity,
  file,
  folder = "undefined",
  transactionId
) {
  try {
    // Crea una referencia al archivo en el storage
    const storageRef = ref(storage, `${entity}/${folder}/${file.name}`);
    // Sube el archivo
    const snapshot = await uploadBytes(storageRef, file);
    // Obtén la URL de descarga del archivo subido
    const downloadURL = await getDownloadURL(snapshot.ref);
    // Agrega la URL de descarga al documento de la transacción
    await addInvoice({ invoice_url: downloadURL }, transactionId);

    console.log("Archivo subido exitosamente. URL:", downloadURL);
  } catch (error) {
    console.error("Error al subir archivo:", error);
    throw error;
  }
}

export default uploadFileSrv;
