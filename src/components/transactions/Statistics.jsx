import Image from "next/image";
import { useState } from "react";
import Eye from "../../../public/images/icons/eye.svg";
import EyeSlash from "../../../public/images/icons/eye-slash.svg";
import ModalTransactions from "../modal/ModalTransactions";
import CoinIcon from "../coinIcon/CoinIcon";
import { formatNumberWithCommas } from "../../lib/utils";
import { FormAllied } from "./FormAllied";
import useSystemStore from "../../hooks/storeSystem";

export function Statistics({ totalCredits }) {
  const { userLogged } = useSystemStore();
  const [isVisibleCredits, setisVisibleCredits] = useState(true);
  const totalCreditsFormatted = formatNumberWithCommas(totalCredits);
  const newTotalCredits = isVisibleCredits
    ? totalCreditsFormatted
    : "*".repeat(totalCreditsFormatted.length + 2);
  return (
    <div className="flex items-center gap-3 w-full justify-between">
      <strong className="text-4xl flex items-center gap-1">
        <CoinIcon />
        {newTotalCredits}
      </strong>
      <button
        onClick={() => setisVisibleCredits(!isVisibleCredits)}
        className="grow"
      >
        <Image
          src={isVisibleCredits ? Eye : EyeSlash}
          alt={`${isVisibleCredits ? "Ocultar" : "Mostrar"} contraseña`}
          width={20}
          height={20}
        />
      </button>
      {userLogged.rol === "client" && (
        <ModalTransactions label="+">
          <FormAllied />
        </ModalTransactions>
      )}
    </div>
  );
}
