import { z } from "zod";

export const schema = z.object({
  description: z
    .string()
    .min(1, "La descripción del producto es obligatorio"),
  experience: z
    .string()
    .min(1, "La experiencia por la compra es obligatoria")
    .transform((val) => {
      const numberValue = parseFloat(val);
      if (isNaN(numberValue)) throw new Error("El precio debe ser un número");
      return numberValue;
    }),
  credits: z
    .string()
    .min(1, "Los créditos son obligatorios")
    .transform((val) => {
      const numberValue = parseFloat(val);
      if (isNaN(numberValue)) throw new Error("Los créditos deben ser un número");
      return numberValue;
    }),
  purchase_date: z
    .string()
    .refine(
      (date) => !isNaN(new Date(date).getTime()),
      "Debe ser una fecha válida"
    ),
  client_document: z
    .string()
    .min(1, "El documento del cliente es obligatorio")
    .transform((val) => {
      const numberValue = parseFloat(val);
      if (isNaN(numberValue)) throw new Error("El documento del cliente deben ser un número");
      return numberValue;
    }),
    amount: z
    .string()
    .min(1, "El monto total es obligatorio")
    .transform((val) => {
      const numberValue = parseFloat(val);
      if (isNaN(numberValue)) throw new Error("El monto total debe ser un número");
      return numberValue;
    }),
});
