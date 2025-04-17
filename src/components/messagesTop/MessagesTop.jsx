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

  const handleClick = () => {
    setStoreValue('messageTop', null)
    setTimeout(() => setStoreValue('leftMenuBar', { isShow: true }), 500)
  }

  useEffect(() => {
    if (messageTop) {
      startConfetti()
      toast(messageTop)
    }
  }, [messageTop])

  return <></>
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
