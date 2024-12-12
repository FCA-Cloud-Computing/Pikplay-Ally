import styles from "./styles.module.scss";

import React from "react";

const ProfileImage = ({ className, handleClickImage, picture }) => {
  return (
    <picture
      className={`${styles.ProfileImage} ${styles[className]}`}
      onClick={handleClickImage}
    >
      <img src={picture || "/images/users/user1.jpg"} />
    </picture>
  );
};

export default ProfileImage;
