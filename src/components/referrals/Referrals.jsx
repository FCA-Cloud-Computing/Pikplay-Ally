import styles from "./referrals.module.scss";

import ProfileImage from "../profileImage/ProfileImage";
import { formatNumber } from "@/lib/utils";
import Button from "../button/Button";
import Messages from "@/consts/messages";

const Referrals = (props) => {
    const { INVITATION_MESSAGE } = Messages;
    const { referrals } = props

    const inviteLink = (phone) => {
        const link = INVITATION_MESSAGE(phone);
        return link;
    };

    return (
        <div className={styles.ReferralsComponent}>
            {referrals && referrals.map(item => {
                const {
                    league,
                    name,
                    picture,
                    credits,
                    phone,
                } = item

                return <div className={styles.item}>
                    {picture && <ProfileImage picture={picture} small />}
                    <div className={styles.contentName}>
                        <h3>{name}</h3>
                        {league && <small className={`leagueBox`}>{league}</small>}
                        {credits && <div className={styles.points}>
                            +{formatNumber(credits)} Puntos
                        </div>}
                        {!credits && <div className={styles.inviteButton}>
                            <Button color='yellow'>
                                <a href={inviteLink(phone)} target="_BLANK">Invitar</a>
                            </Button>
                        </div>}
                    </div>
                </div>
            })}
        </div>
    );
}

export default Referrals;
