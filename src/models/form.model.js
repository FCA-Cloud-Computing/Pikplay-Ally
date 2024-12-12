import { z } from "zod";

export const schema = z.object({
  customerName: z.string().min(1, "El nombre del cliente es obligatorio"),
  productName: z.string().min(1, "El nombre del producto es obligatorio"),
  productDescription: z
    .string()
    .min(1, "La descripción del producto es obligatorio"),
  productPrice: z
    .string()
    .min(1, "El precio del producto es obligatorio")
    .transform((val) => {
      const numberValue = parseFloat(val);
      if (isNaN(numberValue)) throw new Error("El precio debe ser un número");
      return numberValue;
    }),
  purchaseDate: z
    .string()
    .refine(
      (date) => !isNaN(new Date(date).getTime()),
      "Debe ser una fecha válida"
    ),
});
