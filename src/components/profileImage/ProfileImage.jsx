import styles from './profileImage.module.scss';

import React, { useEffect, useState } from 'react';
import { getImageSize } from '@/lib/utils';
import { getExperiencesSrv } from '@/services/experience';

const ProfileImage = ({ className, handleClickImage, picture, progress = 0, small }) => {
  const [percentageBar, setPercentageBar] = useState(progress)

  const getExperienceData = () => {
    getExperiencesSrv(null)
      .then(data => {
        const { percentageBar } = data
        setPercentageBar(percentageBar)
      });
  }

  useEffect(() => {
    if (!progress) getExperienceData()
  }, []);

  return (
    <div className={`ProfileImageComponent ${styles.ProfileImageComponent}`} onClick={handleClickImage}>
      <picture className={`${styles.ProfileImage} ${styles[className]}`}>
        <img src={getImageSize(picture) || '/images/logos/logo-pikplay-bg-azul_768x768.png'} alt="Perfil" />
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
