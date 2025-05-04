import styles from "./challengesList.module.scss"
import { useRouter } from "next/router"

import { getServerSideProps } from "@/pages/perfil/[id]"
import { getChallengesByUser } from "@/services/challenges/challenges"
import useCommonStore from "@/hooks/commonStore"
import { slugify } from "@/lib/utils"
import { useChallengesList } from "./useChallengeList"

const ChallengesList = (props) => {
  const { challenges } = props
  const router = useRouter()
  const userLogged = useCommonStore((state) => state.userLogged)
  const { startVisualIndicator } = useChallengesList()

  const handleClick = (challenge) => {
    startVisualIndicator(challenge.id)
    /*
    if (challenge.title.includes("comercio") || challenge.title.includes("producto")) {
      router.push("/fundacion-codigo-abierto?helper=sellerFavorite")
      return
    }
    if (
      challenge.title.includes("perfil") ||
      challenge.detail.includes("perfil") ||
      challenge.title.includes("referido")
    ) {
      router.push(`/perfil/${slugify(userLogged.name)}`)
      return
    }*/
  }

  if (challenges?.code !== 200) {
    return <div>Error obteniendo los desafios</div>
  }

  const challengesSorted = challenges.data.sort((a, b) => {
    if (a.completed && !b.completed) return -1
    if (!a.completed && b.completed) return 1
    return 0
  })

  return (
    <section className={styles.cardContainer}>
      {challenges.data.length > 0 &&
        challengesSorted.map((challenge) => (
          <Challenge
            key={challenge.id}
            title={challenge.title}
            points={challenge.coins}
            description={challenge.detail}
            completed={challenge.completed}
            onClick={() => handleClick(challenge)}
          />
        ))}
    </section>
  )
}

export default ChallengesList

const Challenge = ({ title, points, description, completed, ...others }) => (
  <div
    className={`${styles.card} ${completed && styles.completed}`}
    {...others}
  >
    <header className={styles.cardHeader}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <strong className={styles.cardPoints}>{points} pts</strong>
    </header>
    <p className={styles.cardDescription}>{description}</p>
  </div>
)
