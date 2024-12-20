"use client";

import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { useState } from "react";
import uploadFile from "../../services/uploadFile";
import { useRef } from "react";

export const FormClient = ({ uid, transactionId }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const file = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file.current) return
    await uploadFile("invoices", file.current, `${uid}/${transactionId}`, transactionId);
    file.current = null;
    setFileUploaded(false);
  };

  const handleChange = (event) => {
    file.current = event.target.files[0];
    setFileUploaded(true);
  };

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
  });

  return (
    <>
      <h2 className="text-white text-center font-bold text-md">
        Crear transacción
      </h2>
      <form onSubmit={handleSubmit} className="p-4">
        <Button
          component="label"
          type="button"
          role={undefined}
          variant="contained"
          className="w-full"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          {fileUploaded ? "Archivo cargado" : "Subir comprobante de pago"}
          <VisuallyHiddenInput
            type="file"
            accept=".jpg, .jpeg, .png"
            name="file"
            onChange={handleChange}
          />
        </Button>
        <button
          type="submit"
          className="border-white/50 hover:bg-white transition duration-300 hover:text-black border py-2 w-full rounded-md mt-4"
        >
          Crear transacción
        </button>
      </form>
    </>
  );
};
