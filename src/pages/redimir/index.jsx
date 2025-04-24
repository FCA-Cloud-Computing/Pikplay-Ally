import styles from "./redimirPage.module.scss";

import { useActionState } from "react";
import { getServerSideProps } from '@/pages/perfil/[id]'

// Custom
import Layout from "../../components/layout/Layout";
import { FormRedemption } from "../../components/redemption/FormRedemption";
import {
  initialStateRedemptionCredits,
  redemptionCredits,
} from "../../actions/redemptionCredits";
import { Code } from "../../components/redemption/Code";
import BonusList from "@/components/bonusList/BonusList";
import { getPublicationsSrv } from "@/services/publications/publications";
import ItemCard from "@/components/itemCard/ItemCard";

function CreditRedemptionPage(props) {
  const { productsReq } = props;
  const [{ result, error, success }, actionState, isPending] = useActionState(
    redemptionCredits,
    initialStateRedemptionCredits
  );

  const bonuses = [
    {
      detail: 'Dos(2) Entradas a cine 2D de lunes a jueves',
      title: '100% OFF',
      image: '/images/icons/popcorn.webp',
      // image: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/general%2Fpublications%2Fentradas-cine.png?alt=media&token=2086fcf5-31c8-4b9d-90ab-ef98fba9d999',
      price: 2000,
      // isFavorite: true,
    },
    {
      title: '100% OFF',
      detail: <>Clase de Baile en <br /><a className="text-ul" href='/enrumbatebaq'>Enrumbate BAQ</a></>,
      image: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/profile%2F181%2Fenrumbate_768x768.jpg?alt=media',
      price: 2000,
    },
    {
      title: '100% OFF',
      detail: <>Clase de Musica en <br /><a className="text-ul" href='/musique.fala'>Falamusique</a></>,
      image: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/general%2Fpublications%2Fmusic-icon.png?alt=media&token=d1d8138d-94a8-461f-92ee-ff5448a0178c',
      price: 2000,
    },
    {
      title: '30% OFF',
      detail: <>Perfume de preferencia en <br /><a className="text-ul" href='/le-fragance'>Le Fragance</a></>,
      image: '/images/icons/fragance-perfume.png',
      price: 1000,
    },
    {
      title: '30% OFF',
      detail: <>Tatuaje de preferencia en <br /><a className="text-ul" href='/monster-ink-bq'>Monster Ink</a></>,
      image: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/products%2Ftattoo.png?alt=media&token=0cc0d1f1-1cfb-49f2-bb95-2c89588d8e5c',
      price: 1000,
    },
    // {
    //   title: '100% OFF',
    //   detail: 'Corte de Cabello',
    //   image: 'https://cdn-icons-png.flaticon.com/512/7686/7686607.png',
    //   price: 0,
    // }
  ]

  return (
    <Layout title="Redención de créditos">
      <section className={`page ${styles.RedimirPage}`}>
        {true || result?.verification_code ? (
          <div></div>
          // <FormRedemption
          //   coins={120402.03} // TOOD: Sacar totalCoins de la API/Store
          //   actionState={actionState}
          //   isPending={isPending}
          // />
        ) : (
          null
          // <Code code={result.verification_code} />
        )}

        <section className={styles.headerInfo}>
          <div>
            <img className={`rotating ${styles.imgLights}`} src="/images/elements/luces.png" />
            <img className={styles.giftIcon} src="/images/icons/gift-2.svg" alt="gift" />
          </div>
          <div>
            <h1>¡Redime tus Pikcoins!</h1>
            <p>
              Puedes redimir tus créditos por bonos, descuentos y premios en
              establecimientos afiliados.
            </p>
          </div>
        </section>

        <h2>Bonos</h2>
        <BonusList {...{ bonuses }} />

        <h2>Productos</h2>
        <section className={styles.products}>
          {productsReq.data.map(item => <ItemCard {...item} />)}
        </section>
      </section>
    </Layout>
  );
}

CreditRedemptionPage.getInitialProps = async (ctx) => {
  const productsReq = await getPublicationsSrv(ctx, 'pikplay-store')

  return {
    productsReq
  }
}

export default CreditRedemptionPage;
