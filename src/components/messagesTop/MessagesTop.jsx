import styles from './messagesTop.module.scss';

import classNames from 'classnames'
import { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { toast } from 'react-toastify';

// Custom
import useCommonStore from '@/hooks/commonStore';
import { startConfetti } from '@/lib/utils';

const MessagesTop = () => {
  const { messageTop, setStoreValue } = useCommonStore()
  const { message, type } = messageTop || {}

  const handleClick = () => {
    setStoreValue('messageTop', null)
    // setTimeout(() => setStoreValue('leftMenuBar', { isShow: true }), 500)
  }

  useEffect(() => {
    if (messageTop && type === 'success') startConfetti()
  }, [messageTop])

  const contentClassType = type == 'error' ? styles.error : styles.success

  return (
    <>
      {
        messageTop && <motion.div
          animate={{ y: 0 }}
          className={classNames('MessagesTop', {
            [styles.MessagesTop]: true,
            [styles.isVisible]: messageTop,
          })}
          initial={{ y: '-200px' }}
          onClick={handleClick}
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
        </motion.div>}

    </>
  )
}

export default MessagesTop;
