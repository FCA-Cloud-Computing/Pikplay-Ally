import styles from './button.module.scss'

import React from 'react'
import { motion } from 'framer-motion'
import { Button as ButtonMat } from '@mui/material'

const Button = (props) => {
  const {
    animation = false,
    border,
    children,
    className: classNameProp,
    color,
    databutton,
    disabled,
    fullWidth,
    isLink,
    id,
    onClick,
    outline,
    style,
    shine,
    realistic,
    textColor,
  } = props
  const className = `${classNameProp} ${animation ? styles.animation : null}`

  return (
    <motion.span
      className={`
      ${styles.ButtonComponent} 
      ${realistic ? styles.realistic : ''}
      ${shine ? styles.shine : ''}
      ${border ? styles.border : ''}
      ${styles[color]}
      ${className}
      ${outline ? styles.outline : ''}
      ${isLink ? styles.link : ''}
      ${fullWidth ? styles.fullWidth : ''}
    `}
      databutton={databutton}
      id={id}
      onClick={disabled ? null : onClick}
      style={style}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}>
      <ButtonMat>{children}</ButtonMat>
    </motion.span>
  )
}

export default Button
