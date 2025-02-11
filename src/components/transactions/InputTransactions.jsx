import { Box, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import { Controller } from "react-hook-form"

export const InputTransactions = ({
  name,
  control,
  label,
  type,
  error,
  placeholder,
}) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            variant="standard"
            label={label}
            id={name}
            type={type}
            multiline={type === "multiline"}
            rows={4}
            error={!!error}
            placeholder={placeholder}
            {...field}
          />
        )}
      />
      {error && (
        <Typography
          sx={{ fontSize: "0.875rem", color: "red", fontWeight: "500" }}
        >
          {error.message}
        </Typography>
      )}
    </Box>
  )
}
