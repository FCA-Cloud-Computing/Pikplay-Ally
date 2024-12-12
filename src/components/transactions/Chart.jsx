import { ScatterChart } from "@mui/x-charts";

export function Chart() {
  return (
    <ScatterChart
      xAxis={[{}]}
      yAxis={[
        {
          colorMap: {
            type: "continuous",
            min: -10,
            max: 10,
            color: ["red", "green"],
          },
        },
      ]}
    />
  );
}
