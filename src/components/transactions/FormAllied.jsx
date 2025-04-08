import {
  AppBar,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  Box,
  Select,
  MenuItem,
} from "@mui/material"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useTheme } from "@mui/material/styles"
import { useState } from "react"

// CUSTOM
import { getAccessibilityPropsTabs } from "@/lib/utils"
import { schema } from "@/models/form.model"
import { useTransactionsStore } from "@/store/transactions.store"
import useCommonStore from "@/hooks/commonStore"
import Button from "@/components/button/Button"
import { InputTransactions } from "./InputTransactions"
import { TabPanel } from "@/components/tabs/Tab"
import { sellersInformation } from '../../data/dataSellers'

export function FormAllied() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      sellerId: null,
      clientPhone: "",
      description: "",
      amount: "",
      redemptionCode: "",
      purchaseDate: `${new Date().toISOString().split("T")[0]}`,
    },
  })

  const { addTransactionStore } = useTransactionsStore()
  const { userLogged } = useCommonStore()
  const theme = useTheme()
  const [value, setValue] = useState(0)
  const [checked, setChecked] = useState(true)
  const [selectedSeller, setSselectedSeller] = useState(null)

  const onSubmit = (newTransaction) => {
    addTransactionStore({
      ...newTransaction,
      uid: userLogged.uid,
      clientDocument: 1234,
    })
    reset()
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeCheckbox = (event) => {
    setChecked(event.target.checked)
  }

  const handleClick = () => {
    if (Object.keys(errors).length > 0) {
      toast("Falta uno o varios campos por rellenar, por favor verifica")
    } else handleSubmit(onSubmit)()
  }

  const handleChangeSeller = (event) => {
    setSselectedSeller(event.target.value)
  }

  return (
    <Box sx={{ bgcolor: "background.paper", width: 400, borderRadius: "10px" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          sx={{ bgcolor: "#0095b3" }}
        >
          <Tab
            label="Información del cliente"
            {...getAccessibilityPropsTabs(0)}
          />
          <Tab
            label="Información de la compra"
            {...getAccessibilityPropsTabs(1)}
          />
        </Tabs>
      </AppBar>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          {/* <InputTransactions
            name="clientDocument"
            control={control}
            label="Documento del cliente"
            placeholder="CC 103242252"
            type="number"
            error={errors.clientDocument}
          /> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedSeller}
            label="Age"
            onChange={handleChangeSeller}
          >
            {Object.keys(sellersInformation).map((item) => {
              const sellerId = sellersInformation[item].authorInformation?.uid
              return sellerId && <MenuItem value={sellerId}>{sellersInformation[item]?.authorInformation.name}</MenuItem>
            })}
            {/* <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>} */}
          </Select>
          <InputTransactions
            name="clientPhone"
            control={control}
            label="Número de celular del cliente"
            placeholder="Ej: 3024285521"
            type="number"
            error={errors.clientPhone}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <InputTransactions
            name="description"
            control={control}
            label="Descripción del producto"
            placeholder="Pizza sin jamón"
            type="multiline"
            error={errors.description}
          />
          <InputTransactions
            name="amount"
            control={control}
            label="Monto total de la factura"
            placeholder="$1200, $5000, $3000.."
            type="number"
            error={errors.amount}
          />
          <InputTransactions
            name="redemptionCode"
            control={control}
            label="Código de redención (opcional)"
            placeholder="123-AS3-24V-D22"
            type="string"
            error={errors.redemptionCode}
          />
          <FormControlLabel
            control={
              <Checkbox onChange={handleChangeCheckbox} defaultChecked />
            }
            label="¿La compra se hizo hoy?"
          />
          {!checked && (
            <>
              {/* <DatePicker label="Basic date picker" /> */} // TODO: Implementar date picker
              <InputTransactions
                name="purchaseDate"
                control={control}
                label="Fecha de compra"
                type="date"
                error={errors.purchaseDate}
              />
            </>
          )}
          <Button
            color="blue"
            className="transition duration-300 w-full text-center text-sm"
            type="button"
            style={{ width: "100%", textAlign: "center" }}
            realistic
            onClick={handleClick}
          >
            Crear transacción
          </Button>
        </TabPanel>
      </Box>
    </Box>
  )
}
