import React, { useState } from 'react'
import { Dialog, DialogContent, Slide } from '@mui/material'
import styles from './wordChallenge.module.scss'
import { AnimatePresence } from 'framer-motion'
import Button from '../button/Button'

const InputComponent = () => {
  return <div className={styles.InputComponent}>
    {[1, 2, 3, 4].map(item => {
      return <div className={styles.inputContent}>
        <input type="text" />
      </div>
    })}
  </div>
}

const WordChallenge = (props) => {
  const { showModal, setShowModal } = props
  const [[page, direction], setPage] = useState([0, 0]);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  })

  // return <div className={styles.WordChallenge}>
  //     WordChallenge
  // </div>
  return <Dialog
    open={true}
    TransitionComponent={Transition}
    onClose={() => setShowModal(false)}
    className={styles.WordChallenge}>
    <DialogContent>
      <div className={styles.content}>
        <AnimatePresence initial={true} custom={direction}>
          <p className={styles.title}>
            Ingresa la palabra clave
          </p>
          <div className={styles.subtitle}>
            Puedes obtener muchos <span>puntos <br />de categoria</span>
          </div>
          <InputComponent />
          <center>
            <Button fullWidth className="m-t-20" color="blue" realistic >Validar</Button>
          </center>
        </AnimatePresence>
      </div>
    </DialogContent>
  </Dialog>
}

export default WordChallenge
