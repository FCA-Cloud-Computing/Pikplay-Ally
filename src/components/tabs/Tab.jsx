import Box from "@mui/material/Box"

export function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, color: "#1976D2", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {children}
        </Box>
      )}
    </div>
  )
}
