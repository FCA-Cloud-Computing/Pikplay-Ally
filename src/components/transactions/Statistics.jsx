import Image from "next/image";
import { useState } from "react";
import { formatNumberWithCommas } from "@/lib/utils";
import Eye from "../../../public/images/icons/eye.svg";
import EyeSlash from "../../../public/images/icons/eye-slash.svg";
import ModalTransactions from "../modal/ModalTransactions";
import { FormTransactions } from "./FormTransactions";

export function Statistics({ totalProfit }) {
  const [isVisibleProfit, setisVisibleProfit] = useState(true);
  const totalProfitFormatted = formatNumberWithCommas(totalProfit);
  const newTotalProfit = isVisibleProfit
    ? totalProfitFormatted
    : "*".repeat(totalProfitFormatted?.length + 2);
  return (
    <div className="flex items-center gap-3 w-full justify-between">
      <strong className="text-4xl">${newTotalProfit}</strong>
      <button
        onClick={() => setisVisibleProfit(!isVisibleProfit)}
        className="grow"
      >
        <Image
          src={isVisibleProfit ? Eye : EyeSlash}
          alt={`${isVisibleProfit ? "Ocultar" : "Mostrar"} contraseña`}
          width={20}
          height={20}
        />
      </button>
      <ModalTransactions label="+">
        <FormTransactions role="clienta" />
      </ModalTransactions>
    </div>
  );
}
