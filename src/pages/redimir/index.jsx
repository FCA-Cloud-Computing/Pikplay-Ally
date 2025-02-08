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
      image: 'https://fesac.com.co/wp-content/uploads/2024/11/cc_combo01.png'
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
        <BonusList {...{ bonuses }} />
      </section>
    </Layout>
  );
}

export default CreditRedemptionPage;
