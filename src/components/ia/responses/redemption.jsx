import React from "react";
import Button from "../../button/Button";
import { useIAStore } from "../IAstore";

const Message = (credits) =>
  `¿Estás seguro que quieres redimir ${credits} créditos?`;

const HTML = <></>;

const Options = ({ handleUserMessage, set, options }) => {
  const { setIsvisible } = useIAStore();
  const redemptionClick = () => {
    setIsvisible(false);
    options.form.current.requestSubmit();
  };
  const cancelClick = () => {
    setIsvisible(false);
  };
  return (
      <div className="flex items-center gap-2">
        <Button color="blue" type="submit" onClick={redemptionClick}>
          Redimir
        </Button>
        <Button color="red" type="button" onClick={cancelClick}>
          Cancelar
        </Button>
      </div>
  );
};

export { HTML, Message, Options };
