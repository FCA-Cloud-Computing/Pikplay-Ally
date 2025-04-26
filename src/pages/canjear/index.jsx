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
      },
      {
        id: 2,
        name: "Redención 2",
        credits: 200,
      },
      {
        id: 3,
        name: "Redención 3",
        credits: 300,
      },
    ])
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const { phone } = Object.entries(new FormData(event.currentTarget))

    console.log(phone)
  }

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
            <ul className={styles.list}>
              {redemptions.map((redemption, index) => (
                <li className={styles.item} key={index}>
                  <div className={styles.number}>
                    {index + 1}
                    <span className={styles.arrow}>«</span>
                  </div>
                  <div className={styles.name}>
                    <span>{redemption.name}</span>
                  </div>
                  <div className={styles.points}>{redemption.credits}</div>
                </li>
                // <li key={redemption.id}>
                //   <div className={styles.redemption}>
                //     <div className={styles.redemptionInfo}>
                //       <h2>{redemption.title}</h2>
                //       <p>{redemption.description}</p>
                //     </div>
                //     <div className={styles.redemptionActions}>
                //       <button onClick={() => handleAccept(redemption.id)}>
                //         Aceptar
                //       </button>
                //       <button onClick={() => handleReject(redemption.id)}>
                //         Rechazar
                //       </button>
                //     </div>
                //   </div>
                // </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default RedeemPage
