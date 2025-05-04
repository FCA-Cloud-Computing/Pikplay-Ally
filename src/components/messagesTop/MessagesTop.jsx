import styles from './messagesTop.module.scss';

import classNames from 'classnames'
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { toast } from 'react-toastify';

// Custom
import useCommonStore from '@/hooks/commonStore';
import { startConfetti } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';

const MessagesTop = ({ messageTop, setStoreValue }) => {
  const { message, type, mp3 } = messageTop || {}
  const [closeMessageTopClass, setCloseMessaTopClass] = useState(false)
  const { play: playSound } = useSound('/sounds/' + mp3);
  const delayClose = type == 'success' ? 6000 : 4000

  const handleCloseMessageTop = () => {
    setCloseMessaTopClass(true)
    setTimeout(() => {
      setStoreValue('messageTop', null)
      setCloseMessaTopClass(false)
    }, 1000)
  }

  useEffect(() => {
    if (messageTop) {
      if (type === 'success') startConfetti()
      else playSound() // Error
      setTimeout(() => {
        handleCloseMessageTop()
      }, delayClose)
    }
  }, [messageTop])

  const contentClassType = type == 'error' ? styles.error : styles.success

  return (
    <motion.div
      animate={{ y: 0 }}
      className={classNames('MessagesTop', {
        [styles.MessagesTop]: true,
        // [styles.isVisible]: messageTop,
        [styles.closeMessageTopClass]: closeMessageTopClass,
      })}
      initial={{ y: '200px' }}
      // onClick={handleCloseMessageTop}
      transition={{ delay: .5 }}
    >
      <div className={`${contentClassType} ${styles.content}`} dangerouslySetInnerHTML={{ __html: message }}>
        {/* {message} */}
      </div>
      {type == 'success' && <span className={`${styles.icon}`}>
        <div className={styles.imgLights__container}>
          <img className={`rotating ${styles.imgLights}`} src="/images/elements/luces.png" />
        </div>
        <img src="/images/backgrounds/message-top/star.svg" alt="icon" />
      </span>}
    </motion.div>
  )
}

export default MessagesTop;
