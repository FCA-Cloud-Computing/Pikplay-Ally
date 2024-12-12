import React from "react";
import { Notifications } from "@mui/icons-material";
import Image from "next/image";

export function Header({handleNotification}) {
  return (
    <header className="flex justify-between items-center w-full">
      <Image
        src="/images/users/hiro.jpeg"
        alt="Avatar"
        width={50}
        height={50}
        className="rounded-full"
      />
      <small className="grow text-center text-secondary text-base font-bold">
        Transacciones
      </small>
      <button onClick={handleNotification}>
        <Notifications className="text-secondary" />
      </button>
    </header>
  );
}
