import styles from './awardsSummary.module.scss'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import ReactTyped from 'react-typed'
import CoinIcon from '../coinIcon/CoinIcon';
import Button from '../button/Button'
import { animatePrince, startConfetti } from '../../lib/utils'
import classNames from 'classnames';
import ProfileSummaryExperience from '../profileSummaryExperience/ProfileSummaryExperience';
import { motion, AnimatePresence } from "framer-motion"
import useSystemStore from '../../hooks/storeSystem';

const AwardsSummary = ({ callback }) => {
  const gainedCoins = 10
  const currentUserCoins = 10
  const { awardsSummaryModalHTML } = useSystemStore()

  useEffect(() => {
    setTimeout(() => {
      startConfetti()
    }, 500)
  }, [])

  const handleUpdateExperience = () => {
    handlePickRewardUp()
    // callback(1)
  }

  const handlePickRewardUp = () => {
    // Sumando coins al Coins del header
    const element = document.querySelector('#PreviewProfile--Coins .number')
    const fromNumber = element?.innerHTML
    const targetNumber = currentUserCoins + gainedCoins
    animatePrince(element, targetNumber, fromNumber)

    // Restando coins
    const secondElement = document.querySelector('#AwardsSummary .number')
    animatePrince(secondElement, 0, gainedCoins)
  }

  return (
    <>
      <motion.div
        animate={{ y: 0, x: 0 }}
        initial={{ x: '-600px' }}
        transition={{ delay: .5 }}
        className={styles.title}>
        ¡Recoge tus recompensas!
      </motion.div>
      <motion.div
        animate={{ x: 0, y: 10 }}
        initial={{ y: '0px', x: '600px' }}
        transition={{ delay: .2 }}
        className={styles.subtitle}>
        Recibiste tus primeros créditos, ¡sigue así!
      </motion.div>
      <img className={`rotating ${styles.imgLights}`} src="/images/elements/luces.png" />
      <div className={styles.box}>
        {/* <img src="/images/type_notification/coupon_gift_available.png" alt="bronze" /> */}
        <p className={styles.description}>
          <CoinIcon coins={gainedCoins} multicoin />
          {/* <ReactTyped strings={[awardsSummaryModalHTML]} typeSpeed={20} /> */}
          {awardsSummaryModalHTML}
        </p>
      </div>

      <div className={styles.actions}>
        <motion.div
          initial={{ x: '-600px' }}
          animate={{ x: 0, }}
          transition={{ delay: 2 }}>
          <Button
            className={styles.main_button}
            color="link"
            onClick={handleUpdateExperience}
            style={{ color: 'white' }}>
            Conocer de los créditos
          </Button>

          <Button
            className={styles.main_button}
            color="blue"
            onClick={handleUpdateExperience}
            realistic
            shine>
            Recoger
          </Button>
        </motion.div>
      </div>
    </>
  )
}

const AwardsSummaryModal = (props) => {
  const { setStoreValue } = useSystemStore((state => state))
  const [[page, direction], setPage] = useState([0, 0]);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  })

  const handleCloseModal = () => {
    setStoreValue('isAwardSummaryModalOpen', false)
    setStoreValue('isOpenPreviewProfile', false)
    setStoreValue('isGainFirstcoinsPictureProfile', false)
  }

  const callback = (number) => {
    // setTimeout(() => {
    setPage([number, 1])
    // }, 1000)
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
              {page === 0 && <AwardsSummary callback={callback} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
}

export default AwardsSummaryModal;
