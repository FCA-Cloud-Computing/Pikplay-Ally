import './redemption.module.scss'

import React from "react"
import Perfil from "../../components/profile/Perfil"
import Layout from "../../components/layout/Layout"
// import { gql, useMutation } from '@apollo/client'
import { cookiesToObject } from "../../lib/utils"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
// import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router"
import useCommonStore from "../../hooks/commonStore"
import {
  validateTokenSrv,
  getExperiencesSrv,
  getUsersSrv,
  getReferralsSrv,
} from "../../services/user/user"
import { getChallengesByUser } from "@/services/challenges/challenges"
import styles from "./redemption.module.scss"
import { MenuItem, Select, TextField } from "@mui/material"
import Image from "next/image"
import Button from "@/components/button/Button"
import CoinIcon from "@/components/coinIcon/CoinIcon"
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const RedeemPage = (props) => {
  const descripcion =
    "Pikplay es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas e independientes de alta confiabilidad ofreciendo videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch con los mejores precios del mercado en Colombia"
  const image = ""
  const title = "Pikplay | Canjear"
  const url = "https://pikplay.com.co/canjear"
  const router = useRouter()
  const userLogged = useCommonStore((state) => state.userLogged)
  const [phone, setPhone] = useState(null)
  const [country, setCountry] = useState(null)
  const [redemptions, setRedemptions] = useState([])

  useEffect(() => {
    // Mocked redemptions data
    setRedemptions([
      {
        id: 1,
        name: "Redención 1",
        credits: 100,
        date: "2023-10-01",
      },
      {
        id: 2,
        name: "Redención 2",
        credits: 200,
        date: "2024-11-01",
      },
      {
        id: 3,
        name: "Redención 3",
        credits: 300,
        date: "2025-12-01",
      },
    ])
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const { phone } = Object.entries(new FormData(event.currentTarget))

    console.log(phone)
  }

  const handleAcceptRedemption = (id) => {
    setRedemptions((prevRedemptions) =>
      prevRedemptions.filter((redemption) => redemption.id !== id)
    );
  };

  return (
    <Layout image={image} descripcion={descripcion} title={title} url={url}>
      <section className={`page ${styles.redemptionPage}`}>
        <div>
          <h1>Canjear</h1>
          <p>
            Ingresa el número de celular para aceptar o rechazar sus redenciones
          </p>
        </div>
        <form className={styles.contryAndPhone} onSubmit={handleSubmit}>
          <label htmlFor="phone">Número de celular</label>
          <div className={styles.phoneInputContainer}>
            <input
              onChange={(event) => setPhone(event.target.value)}
              value={phone}
              minLength={1}
              maxLength={10}
              className={styles.phoneInput}
              id="phone"
              name="phone"
              type="text"
            />
            <Button color="blue" realistic type="submit">
              Buscar
            </Button>
          </div>
        </form>
        {redemptions.length > 0 && (
          <div>
            <h2>🎁 Redenciones</h2>
            <TransitionGroup component="ul" className={styles.list}>
              {redemptions.map((redemption, index) => (
                <CSSTransition
                  key={redemption.id}
                  timeout={300}
                  classNames="fade"
                >
                  <li className={styles.item}>
                    <div className={styles.info}>
                      <span className={styles.name}>{redemption.name}</span>
                      <span className={styles.date}>{redemption.date}</span>
                    </div>
                    <div className={styles.credits}>
                      <CoinIcon coins={redemption.credits} />
                    </div>
                    <div className={styles.switchContainer}>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          onChange={() => handleAcceptRedemption(redemption.id)}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default RedeemPage
