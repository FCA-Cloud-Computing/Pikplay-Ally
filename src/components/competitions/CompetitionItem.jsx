/* eslint-disable react/jsx-key */
import styles from './competitions.module.scss'

import Link from 'next/link'
import { toast } from 'react-toastify'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Zoom from 'react-medium-image-zoom'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';

const { motion } = require('framer-motion')

// Custom
import Button from '../../components/button/Button'
import { formatNumber } from '@/lib/utils'
import Marquee from './Marquee'

const CompetitionItem = ({ competition, ind }) => {
  const linkShare = `https://api.whatsapp.com/send?text=¡Te%20invito%20a%20participar%20en%20este%20concurso%20de%20${competition.seller?.storeName}%20${competition.title}%20dando%20click%20en%20este%20enlace%20https://pikplay.com.co/${competition.seller?.slug}%23${competition.slug}`
  const goToastNotAvailable = () => toast('Esta actividad ya ha pasado')
  const linkToDetail = `/${competition.seller?.slug}/${competition.slug}`
  // const awardLink = competition?.awardLink ? competition?.awardLink + '?origin=/concursos' : ''

  return <motion.article
    animate={{ y: 0 }}
    className={`Card ${styles.CompetitionItem}`}
    id={competition.slug}
    initial={{ y: '100%' }}
    key={ind}
    // onClick={() => competition.isActive ? handleCompetitionClick(competition.slug) : goToastNotAvailable}
    // whileHover={{ scale: 1.1 }}
    style={{ backgroundImage: `url(${competition.picture})` }}>
    <h2>
      <Link href={linkToDetail}>{competition.title}</Link>
    </h2>
    <div className={styles.news}>
      <Marquee />
    </div>
    <div className={styles.seller}>
      <div>
        <Zoom>
          <img width={80} src={competition.picture} />
        </Zoom>
      </div>
      <div>
        <div>
          Números disponibles:
          <span className={styles.availableNumbers}>
            {competition.availableNumbers}
          </span>
        </div>
        {/* <img width={200} style={{ right: competition.right }} src={competition.image} /> */}
        {/* <div className={styles.calification}>
          Calificación: {[1, 1, 1].map(item => <FontAwesomeIcon className='icon' icon={faStar} />)}
        </div> */}
        <div>Precio: ${formatNumber(competition.price)}</div>
      </div>
    </div>
    <div className={styles.actions}>
      <Link href={linkShare} target='_blank'>
        <Button color='yellow' className={styles.award}>
          <WhatsAppIcon className='icon m-r-5' />
          Compartir</Button>
      </Link>
      <Link href={linkToDetail}>
        <Button shine color='blue' className={styles.award}>
          <SportsHandballIcon className='icon m-r-5' />
          Participar</Button>
      </Link>
    </div>
  </motion.article >
}

export default CompetitionItem
