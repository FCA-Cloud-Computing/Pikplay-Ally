import styles from './awardsSummary.module.scss'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import ReactTyped from 'react-typed'
import CoinIcon from '../coinIcon/CoinIcon';
import Button from '../button/Button'
import { animatePrice, formatNumber, startConfetti } from '../../lib/utils'
import classNames from 'classnames';
import ProfileSummaryExperience from '../profileSummaryExperience/ProfileSummaryExperience';
import { motion, AnimatePresence } from "framer-motion"
import useCommonStore from '../../hooks/commonStore';
import { createExperienceSrv } from '@/services/experience';
import { getNotificationsSrv } from '@/services/user/user';

const AwardsSummary = ({ handleCloseModal }) => {
  const [page, setPage] = useState(0);
  const currentUserCoins = 10
  const { awardsSummaryModalHTML, awardSummaryModalDetail, setStoreValue, notifications } = useCommonStore()
  const {
    coins: gainedCoins,
    description,
    nid,
    experience: gainedExperience,
    type: notification_type
  } = awardSummaryModalDetail
  useEffect(() => {
    setTimeout(() => {
      startConfetti()
    }, 500)
  }, [])

  const handleUpdateExperience = () => {
    // handlePickRewardUp()
    createExperienceSrv(null, {
      coins: gainedCoins,
      experience: gainedExperience,
      nid,
      type: notification_type
    })
    getNotificationsSrv().then(res => {
      const currentNotifications = res.data;
      if (JSON.stringify(notifications) !== JSON.stringify(currentNotifications)) {
        setStoreValue('notifications', res.data);
      };
    });
    setPage(1)
  }

  return (
    <>
      {page == 0 && <>
        <motion.div
          animate={{ y: 0, x: 0 }}
          initial={{ x: '-600px' }}
          transition={{ delay: .5 }}
          className={styles.title}>
          <img className={styles.ganasteLabel} src="/images/backgrounds/ganaste-v2.svg" />
        </motion.div>
        {description
          && <motion.div
            animate={{ x: 0, y: 10 }}
            initial={{ y: '0px', x: '600px' }}
            transition={{ delay: .2 }}
            className={styles.subtitle}>
            {description}
          </motion.div>
        }
        <img className={`rotating ${styles.imgLights}`} src="/images/elements/luces.png" />
        <div className={styles.box}>
          {/* <img src="/images/type_notification/coupon_gift_available.png" alt="bronze" /> */}
          <p className={styles.description}>
            {!!gainedCoins && <CoinIcon coins={gainedCoins} multicoin showX />}
            {/* <ReactTyped strings={[awardsSummaryModalHTML]} typeSpeed={20} /> */}
            {awardsSummaryModalHTML}
          </p>
          {gainedExperience && <p className={`animatedZoom ${styles.points}`}>
            +{formatNumber(gainedExperience)} Points
          </p>}
        </div>

        <div className={styles.actions}>
          <motion.div
            initial={{ x: '-600px' }}
            animate={{ x: 0, }}
            transition={{ delay: 2 }}>
            <Button
              className={styles.main_button}
              color="red"
              onClick={handleUpdateExperience}
              realistic
              shine>
              Recoger
            </Button>
            {/* <Button
              color=""
              onClick={handleUpdateExperience}
              style={{ color: 'white' }}>
              Conocer de los créditos
            </Button> */}
          </motion.div>
        </div>
      </>}
      {page == 1 && <>
        <ProfileSummaryExperience {...{ gainedCoins, gainedExperience, changeAvatar: false }} />
        <Button className={styles.closeModal} color='red' realistic onClick={handleCloseModal}>Cerrar</Button>
      </>}
    </>
  )
}

const AwardsSummaryModal = (props) => {
  const { setStoreValue } = useCommonStore((state => state))
  const [[page, direction], setPage] = useState([0, 0]);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  })

  const handleCloseModal = () => {
    setStoreValue('isAwardSummaryModalOpen', false)
    setStoreValue('isOpenPreviewProfile', false)
    setStoreValue('isGainFirstcoinsPictureProfile', false)
  }

  return <Dialog
    open={true}
    TransitionComponent={Transition}
    onClose={handleCloseModal}
    className={styles.Dialog}>
    <DialogContent>
      <div id="AwardsSummary" className={styles.AwardsSummary}>
        <div className={styles.bg_city}></div>
        <div className={styles.content}>
          <div className={styles.content_child}>
            <AnimatePresence initial={true} custom={direction}>
              <AwardsSummary page={page} handleCloseModal={handleCloseModal} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
}

export default AwardsSummaryModal;
