import styles from './messagesTop.module.scss';

import classNames from 'classnames'
import { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"

// Custom
import useSystemStore from '@/hooks/storeSystem';
import { startConfetti } from '@/lib/utils';

const MessagesTop = () => {
  const { messageTop, setStoreValue } = useSystemStore()

  const handleClick = () => {
    setStoreValue('messageTop', null)
    setTimeout(() => setStoreValue('leftMenuBar', { isShow: true }), 500)
  }

  useEffect(() => {
    messageTop && startConfetti()
  }, [messageTop])

  return (
    <>
      {
        messageTop && <motion.div
          animate={{ y: 0 }}
          initial={{ y: '-200px' }}
          transition={{ delay: .5 }}
          className={classNames('MessagesTop', {
            [styles.MessagesTop]: true,
            [styles.isVisible]: messageTop
          })}
          onClick={handleClick}>
          {messageTop}
        </motion.div>}

    </>
  )
}

export default MessagesTop;
