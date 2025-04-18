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
      description: 'Entradas a cine 2D de lunes a viernes',
      title: 'Entradas a cine',
      image: '/images/icons/popcorn.webp',
      // image: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/general%2Fpublications%2Fentradas-cine.png?alt=media&token=2086fcf5-31c8-4b9d-90ab-ef98fba9d999',
      price: 4,
      isFavorite: true,
    },
    {
      title: '50% OFF Perfume',
      description: <>Perfume de preferencia en <br /><a className="text-ul" href='/le-fragance'>Le Fragance</a></>,
      image: '/images/icons/fragance-perfume.png',
      price: 50,
    },
    {
      title: '20% OFF Tatuaje',
      description: <>Tatuaje de preferencia en <br /><a className="text-ul" href='/monster-ink-bq'>Monster Ink</a></>,
      image: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/products%2Ftattoo.png?alt=media&token=0cc0d1f1-1cfb-49f2-bb95-2c89588d8e5c',
      price: 4,
    },
    {
      description: 'Corte de corte para caballero',
      title: 'Corte de Cabello',
      image: 'https://cdn-icons-png.flaticon.com/512/7686/7686607.png',
      price: 0,
    }
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
