import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "@/models/form.model";
import { InputTransactions } from "./InputTransactions";
import { Button, TextField } from "@mui/material";

export const FormTransactions = ({ role }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      customerName: "",
      productName: "",
      productDescription: "",
      productPrice: "",
      purchaseDate: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
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
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        {role !== "client" ? (
          <>
            <InputTransactions
              name="customerName"
              control={control}
              label="Nombre del cliente"
              type="text"
              error={errors.customerName}
              placeholder="John Doe.."
            />
            <InputTransactions
              name="productName"
              control={control}
              label="Nombre del producto"
              placeholder="Pizza XXL, CocaCola 3lt..."
              type="text"
              error={errors.productName}
            />
            <InputTransactions
              name="productPrice"
              control={control}
              label="Precio del producto"
              type="number"
              placeholder="$12,000.00"
              error={errors.productPrice}
            />
            <InputTransactions
              name="purchaseDate"
              control={control}
              label="Fecha de compra"
              type="date"
              error={errors.purchaseDate}
            />
            <InputTransactions
              name="productDescription"
              control={control}
              label="Descripción del producto"
              placeholder="Pizza sin jamón"
              type="text"
              error={errors.productDescription}
            />
          </>
        ) : (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            className="w-full"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Subir comprobante de pago
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
        )}
        <button
          type="submit"
          className="border-white/50 hover:bg-white transition duration-300 hover:text-black border py-2 w-full rounded-md mt-4"
          disabled={!isValid}
        >
          Crear transacción
        </button>
      </form>
    </>
  );
};
