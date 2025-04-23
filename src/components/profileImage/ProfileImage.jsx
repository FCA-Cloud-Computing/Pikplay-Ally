import styles from './profileImage.module.scss';

import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';

import { getImageSize } from '@/lib/utils';
import { getExperiencesSrv } from '@/services/experience';
import { useProfileImage } from '@/hooks/useProfileImage';

const ProfileImage = ({ className, handleClickImage, picture, small, changeAvatar, percentageBar }) => {
  const { handlerInputFile, fileInputRef } = useProfileImage()

  return (
    <div className={`ProfileImageComponent ${styles.ProfileImageComponent}`} onClick={handleClickImage}>
      <picture className={`${styles.ProfileImage} ${styles[className]}`}>
        <img src={getImageSize(picture) || '/images/logos/logo-pikplay-bg-azul_768x768.png'} alt="Perfil" />
        <svg
          className={`${small ? styles.small : ''} ${styles.circularProgress}`}
          height="250"
          style={{ '--progress-bar': percentageBar }}
          viewBox="0 0 250 250"
          width="250"
          >
          <circle className={styles.bg} />
          <circle className={styles.fg} />
        </svg>
        {changeAvatar && (
          <button
            className={styles.profileChangeImage}
            title="Cambiar foto de perfil"
            onClick={() => fileInputRef.current.click()}>
            <input ref={fileInputRef} onChange={handlerInputFile} type="file" />
            {/* <img src="/images/icons/picture.svg" alt="Cambiar foto de perfil" /> */}
            <CreateIcon className={`icon ${styles.icon}`} />
          </button>
        )}
      </picture>
    </div>
  );
};

export default ProfileImage;
