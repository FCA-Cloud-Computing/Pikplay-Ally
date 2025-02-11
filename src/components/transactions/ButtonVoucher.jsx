"use client"

import { styled } from "@mui/material/styles"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { useState } from "react"
import uploadFile from "../../services/uploadFile"
import { toast } from "react-toastify"
import { Button } from "@mui/material"
import { textTransform } from "@mui/system"

export const ButtonVoucher = ({ uid, transactionId }) => {
  // Botón para subir el comprobante de pago de la transacción
  const [fileUploaded, setFileUploaded] = useState(false)

  const handleChange = async (event) => {
    const file = event.target.files[0]
    if (!file) {
      toast("No se ha seleccionado un archivo.")
      setFileUploaded(false)
      return
    }
    setFileUploaded(true)
    console.log(file)
    // await uploadFile('invoices', file.current, `${uid}/${transactionId}`, transactionId);
  }

  return (
    <Button
      component="label"
      type="button"
      variant="contained"
      tabIndex={-1}
      size="small"
      style={{
        textTransform: "none",
        letterSpacing: "0",
        backgroundColor: "#0095b3",
        fontWeight: "500",
      }}
      startIcon={<CloudUploadIcon />}
    >
      {fileUploaded ? "Archivo cargado" : "Subir comprobante"}
      <VisuallyHiddenInput
        type="file"
        accept=".jpg, .jpeg, .png"
        name="file"
        onChange={handleChange}
      />
    </Button>
  )
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})
