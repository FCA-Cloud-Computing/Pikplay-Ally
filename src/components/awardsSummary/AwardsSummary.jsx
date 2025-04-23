import styles from './awardsSummary.module.scss'

import React, { memo, useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import ReactTyped from 'react-typed'
import CoinIcon from '../coinIcon/CoinIcon';
import Button from '../button/Button'
import { animatePrice, formatNumber, startConfetti } from '../../lib/utils'
import classNames from 'classnames';
import ProfileSummaryExperience from '../profileSummaryExperience/ProfileSummaryExperience';
import { motion, AnimatePresence } from "framer-motion"
import useCommonStore from '../../hooks/commonStore';
import { createExperienceSrv, getExperiencesSrv } from '@/services/experience';
import { getNotificationsSrv } from '@/services/user/user';

const AwardsSummary = ({ handleCloseModal, page, setPage }) => {
  const awardsSummaryModalHTML = useCommonStore(state => state.awardsSummaryModalHTML)
  const awardSummaryModalDetail = useCommonStore(state => state.awardSummaryModalDetail)
  const currentCoins = useCommonStore(state => state.currentCoins)
  const notifications = useCommonStore(state => state.notifications)
  const setStoreValue = useCommonStore(state => state.setStoreValue)

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

  const handleUpdateExperience = () => { // Haciendo el UPDATE en la BD
    setPage(1)
    setTimeout(() => {
      const createExpReq = createExperienceSrv(null, {
        coins: gainedCoins,
        experience: gainedExperience,
        nid,
        type: notification_type
      })
        .then(() => {
          getExperiencesSrv()
            .then(data => {
              const { currentPikcoins } = data
              setStoreValue('currentCoins', currentPikcoins)
            })
        })
    }, 5000)
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
            className={styles.subtitle}
            dangerouslySetInnerHTML={{ __html: description }}
            initial={{ y: '0px', x: '600px' }}
            transition={{ delay: .2 }}
          >
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
        <ProfileSummaryExperience {
          ...{
            gainedCoins,
            gainedExperience,
            changeAvatar: false,
          }}
        />
        <Button className={styles.closeModal} color='red' realistic onClick={handleCloseModal}>Cerrar</Button>
      </>}
    </>
  )
}

const AwardsSummaryModal = (props) => {
  const setStoreValue = useCommonStore(state => state.setStoreValue)
  const [page, setPage] = useState(0)
  const direction = 0

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
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
            {/* <AnimatePresence initial={true} custom={direction}> */}
            <AwardsSummary
              handleCloseModal={handleCloseModal}
              page={page}
              setPage={setPage}
            />
            {/* </AnimatePresence> */}
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
}

export default memo(AwardsSummaryModal);
