import { getExperiencesSrv } from '@/services/user/userService';
import styles from './profileImage.module.scss';

import React, { useEffect, useState } from 'react';
import { getImageSize } from '@/lib/utils';

const ProfileImage = ({ className, handleClickImage, picture, progress = 0, small }) => {
  const [percentageBar, setPercentageBar] = useState(progress)

  const getExperienceData = () => {
    getExperiencesSrv()
      .then(data => {
        const { percentageBar } = data
        setPercentageBar(percentageBar)
      });
  }

  useEffect(() => {
    if (!progress) getExperienceData()
  });

  return (
    <div className={styles.profileImageContainer} onClick={handleClickImage}>
      <picture className={`${styles.ProfileImage} ${styles[className]}`}>
        <img src={getImageSize(picture) || '/images/users/user1.jpg'} alt="Perfil" />
        <svg
          width="250"
          height="250"
          viewBox="0 0 250 250"
          className={`${small ? styles.small : ''} ${styles.circularProgress}`}
          style={{ '--progress-bar': progress }}>
          <circle className={styles.bg} />
          <circle className={styles.fg} />
        </svg>
      </picture>
    </div>
  );
};

export default ProfileImage;
