import { Controller } from "react-hook-form";

export const InputTransactions = ({ name, control, label, type, error, placeholder }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}:</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            {...field}
            className={`form-control ${
              error ? "is-invalid" : ""
            } bg-transparent border-b-white/40 border-b text-slate-300`}
          />
        )}
      />
      {error && <p className="text-sm text-red-500 font-bold">{error.message}</p>}
    </div>
  );
};
