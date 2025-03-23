import styles from './challengesList.module.scss'

import { getServerSideProps } from '@/pages/perfil/[id]'
import { getChallengesByUser } from '@/services/challenges/challenges'

const ChallengesList = (props) => {
    const { challenges } = props
    if (challenges.code !== 200) {
        return <div>Error obteniendo los desafios</div>
    }

    return <div className={`${styles.ChallengesList}`}>
        {challenges.data.length > 0 && challenges.data.map(item => <li className={`${item.completed ? styles.done : ''} Card`} key={item.id}>
            <h3>{item.title}</h3>
            <div className={styles.experience}>
                {item.experience} Points
            </div>
            <span>{item.detail}</span>
        </li>)}
    </div>
}

export default ChallengesList
