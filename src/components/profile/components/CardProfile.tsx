import React from "react";
import styles from "./CardProfile.module.scss";
import Image from "next/image";

interface Props {
  name: string;
  range: string;
  experience?: number;
  notifications?: number;
  avatar: string;
  background: string
}

export function CardProfile({
  name,
  range,
  experience = 0,
  notifications = 0,
  avatar,
}: Props) {
  const isHasNotification = notifications > 0;
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <img src="/images/icons/settings.svg" alt="Settings Icon" />
        <img
          src={`/images/icons/${
            isHasNotification
              ? "notification-empty.svg"
              : "notification-active.svg"
          }`}
          alt="Notifications Icons"
        />
      </header>
      <div>
        <picture>
          <Image src={avatar} alt={`${name} Avatar`} />
        </picture>
        <div>
          <h2>{name}</h2>
          <span>{range}</span>
        </div>
      </div>
      <footer>
        <div>
          <span>{experience}</span>
          <div></div>
        </div>
      </footer>
    </article>
  );
}

export default CardProfile;
