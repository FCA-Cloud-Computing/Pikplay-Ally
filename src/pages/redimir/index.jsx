import styles from "./redimirPage.module.scss";

import Layout from "../../components/layout/Layout";
import { FormRedemption } from "../../components/redemption/FormRedemption";
import {
  initialStateRedemptionCredits,
  redemptionCredits,
} from "../../actions/redemptionCredits";
import { useActionState } from "react";
import { Code } from "../../components/redemption/Code";
import BonusList from "@/components/bonusList/BonusList";

function CreditRedemptionPage() {
  const [{ result, error, success }, actionState, isPending] = useActionState(
    redemptionCredits,
    initialStateRedemptionCredits
  );

  const bonuses = [
    {
      description: 'Entradas a cine 2D de lunes a viernes',
      title: 'Entradas a cine',
      image: '/images/icons/popcorn.webp',
      price: 4,
      isFavorite: true,
    },
    {
      description: <>Perfume de preferencia en <a className="text-ul" href='/le-fragance'>Le Fragance</a></>,
      title: 'Perfume de preferencia',
      image: '/images/icons/fragance-perfume.png',
      price: 50,
    },
    {
      description: 'Helado McFlury',
      title: 'Helado McFlury',
      image: '/images/icons/ice-cream.png',
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

        <section>
          <img className={`rotating ${styles.imgLights}`} src="/images/elements/luces.png" />
          <img className={styles.giftIcon} src="/images/icons/gift-2.svg" alt="gift" />
          <h1>¡Redime tus Pikcoins!</h1>
          <p>
            Puedes redimir tus créditos por bonos, descuentos y premios en
            establecimientos afiliados.
          </p>
        </section>
        <BonusList {...{ bonuses }} />
      </section>
    </Layout>
  );
}

export default CreditRedemptionPage;
