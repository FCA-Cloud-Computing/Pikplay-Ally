const { default: RankingComponent } = require("@/components/ranking/Ranking")

const RankingPage = () => {
    return <div>
        <RankingComponent rankingId={3} />
    </div>
}

// export const getServerSideProps = async ctx => {

// }

export default RankingPage
