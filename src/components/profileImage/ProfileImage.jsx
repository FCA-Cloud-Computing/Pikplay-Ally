import styles from './profileImage.module.scss';

import React from 'react';

const ProfileImage = ({ className, handleClickImage, picture, progress = 30, small }) => {
  return (
    <div className={styles.profileImageContainer} onClick={handleClickImage}>
      <picture className={`${styles.ProfileImage} ${styles[className]}`}>
        <img src={picture || '/images/users/user1.jpg'} alt="Perfil" />
        <svg
          width="250"
          height="250"
          viewBox="0 0 250 250"
          className={`${small ? styles.small : ''} ${styles.circularProgress}`}
          style={{ '--progress-bar': progress }}
        >
          <circle className={styles.bg} />
          <circle className={styles.fg} />
        </svg>
      </picture>
    </div>
  );
};

export default ProfileImage;
