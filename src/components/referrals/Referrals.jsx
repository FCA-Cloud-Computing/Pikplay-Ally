import styles from "./referrals.module.scss";

import ProfileImage from "../profileImage/ProfileImage";

const Referrals = (props) => {
    const { referrals } = props
    return (
        <div className={styles.ReferralsComponent}>
            {referrals && referrals.map(item => {
                const { picture, points, referralName } = item
                return <div className={styles.item}>
                    {picture && <ProfileImage picture={picture} small />}
                    <div className={styles.contentName}>
                        <h3>{referralName}</h3>
                        <small>Club de Ingles</small>
                        {points && <div className={styles.points}>{points} Puntos</div>}
                    </div>
                </div>
            })}
        </div>
    );
}

export default Referrals;
