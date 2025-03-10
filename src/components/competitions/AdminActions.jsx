import styles from './competitions.module.scss'

import React, { useEffect, useState } from 'react'
import Button from '../button/Button'
import { Checkbox } from '@mui/material'
import BottomSheets from '../bottomSheets/BottomSheets'
import { PieChart } from '@mui/x-charts'
import { pieArcLabelClasses } from '@mui/x-charts/PieChart'
import BuildIcon from '@mui/icons-material/Build';
import useCommonStore from '@/hooks/commonStore'

const Grafica = ({
  freeNumbers = 10,
  paidNumbers = 2,
  takenNumbers = 3
}) => {
  return <PieChart
    legend={{ hidden: true }}
    series={[
      {
        arcLabel: (item) => `${item.label} ${item.value}`,
        data: [
          { id: 0, value: takenNumbers, label: 'Tomados' },
          { id: 1, value: paidNumbers, label: 'Pagados' },
          { id: 2, value: freeNumbers, label: 'Libres' },
        ],
      },
    ]}
    sx={{
      [`& .${pieArcLabelClasses.root}`]: {
        fill: 'white',
        fontSize: '12px',
        // fontWeight: 'bold',
      },
    }}
    height={200}
    width={260}
  />
}

const AdminActions = ({
  freeNumbers,
  paidNumbers,
  takenNumbers,
  deleteNotPaidNumbers,
  setShowMembersNames
}) => {
  const [isShowOptions, setIsShowOptions] = useState(false)
  const { setStoreValue } = useCommonStore()

  useEffect(() => {
    setStoreValue('leftBottomMenuContent', <button className="btnLeftBottomMenu" onClick={() => setIsShowOptions(true)}>
      <BuildIcon />
    </button>)
  }, [])

  return (
    <div className={`AdminActions ${styles.AdminActions}`}>
      <Grafica {...{
        freeNumbers,
        paidNumbers,
        takenNumbers
      }} />
      {isShowOptions && <BottomSheets isBottomSheets setIsBottomSheets={setIsShowOptions}>
        <div className={styles.actions}>
          {/* <div>
              <Checkbox id="check_available_numbers" onClick={(e) => setShowMembersNames(e.target.checked)} />
              Mostrar nombre de los participantes
          </div> */}
          <Button color="yellow">Cancelar concurso</Button>
          <Button color="blue" onClick={deleteNotPaidNumbers}>Liberar números<br />no pagados</Button>
        </div>
      </BottomSheets>}
    </div>
  )
}

export default AdminActions