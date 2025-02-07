import styles from "./referrals.module.scss";

import ProfileImage from "../profileImage/ProfileImage";

const Referrals = () => {
    return (
        <div className={styles.ReferralsComponent}>
            <div className={styles.item}>
                <ProfileImage picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6yCz6NvztBI0_l3oTjS3NGloRiPzKbJEl5g&s" small />
                <div className={styles.contentName}>
                    <div>Amit Kimar</div>
                    <div>Casa</div>
                </div>
            </div>
        </div>
    );
}

export default Referrals;
