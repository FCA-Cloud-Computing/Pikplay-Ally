import { z } from "zod"

const parseNumber = (val, errorMessage) => {
  const numberValue = parseFloat(val)
  if (isNaN(numberValue)) throw new Error(errorMessage)
  return numberValue
}

export const schema = z.object({
  clientDocument: z
    .string()
    .min(1, "El documento del cliente es obligatorio")
    .transform((val) =>
      parseNumber(val, "El documento del cliente deben ser un número")
    ),
  clientPhone: z
    .string()
    .min(1, "El documento del cliente es obligatorio")
    .transform((val) =>
      parseNumber(val, "El documento del cliente deben ser un número")
    ),
  description: z.string().min(1, "La descripción del producto es obligatorio"),
  amount: z
    .string()
    .min(1, "El monto total es obligatorio")
    .transform((val) => parseNumber(val, "El monto total debe ser un número")),
  redemptionCode: z.string().optional(),
  purchaseDate: z
    .string()
    .refine(
      (date) => !isNaN(new Date(date).getTime()),
      "Debe ser una fecha válida"
    ),
})
