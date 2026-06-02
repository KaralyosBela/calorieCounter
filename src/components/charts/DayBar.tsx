import { Card, Typography } from "@heroui/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import dayjs, { type Dayjs } from "dayjs";
import type { Food } from "../../types/types";

export type ChartPoint = {
  label: string;
  calories: number;
  protein: number;
};

// eslint-disable-next-line react-refresh/only-export-components
export const getChartData = (
  foods: Food[],
  selectedDate: Dayjs,
  mode: "day" | "week",
): ChartPoint[] => {
  if (mode === "day") {
    const points: ChartPoint[] = Array.from({ length: 24 }, (_, hour) => ({
      label: `${String(hour).padStart(2, "0")}:00`,
      calories: 0,
      protein: 0,
    }));

    foods.forEach((food) => {
      const date = dayjs(food.createdAt);

      if (!date.isSame(selectedDate, "day")) return;

      const hour = date.hour();

      points[hour].calories += food.calories;
      points[hour].protein += food.protein;
    });

    return points;
  }

  const startOfWeek = selectedDate.startOf("isoWeek");

  const points: ChartPoint[] = Array.from({ length: 7 }, (_, index) => {
    const date = startOfWeek.add(index, "day");

    return {
      label: date.format("ddd"),
      calories: 0,
      protein: 0,
    };
  });

  foods.forEach((food) => {
    const date = dayjs(food.createdAt);

    if (!date.isSame(selectedDate, "isoWeek")) return;

    const index = date.isoWeekday() - 1;

    points[index].calories += food.calories;
    points[index].protein += food.protein;
  });

  return points;
};

type Props = {
  data: ChartPoint[];
  mode: "day" | "week";
};

export const CaloriesProteinChart = ({ data, mode }: Props) => {
  const proteinGoal = 140;

  return (
    <Card className="w-full rounded-3xl bg-white p-5 shadow-md">
      <div className="mb-4 flex flex-col gap-1">
        <Typography type="h5">
          {mode === "day" ? "Hourly breakdown" : "Daily breakdown"}
        </Typography>

        <Typography className="text-sm text-gray-500">
          Calories and protein grouped by {mode === "day" ? "hour" : "day"}
        </Typography>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <ReferenceLine
              y={proteinGoal}
              stroke="#ef4444"
              strokeDasharray="5 5"
              label="Protein Goal"
            />

            <Tooltip content={<ChartTooltip />} cursor={{ fill: "#f3f4f6" }} />

            <Bar
              dataKey="calories"
              name="Calories"
              radius={[8, 8, 0, 0]}
              fill="#3b82f6"
            />

            <Bar
              dataKey="protein"
              name="Protein"
              radius={[8, 8, 0, 0]}
              fill="#22c55e"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-md backdrop-blur">
      <p className="mb-2 text-sm font-semibold text-gray-900">{label}</p>

      <div className="flex flex-col gap-1">
        {payload.map((item: any) => (
          <div
            key={item.dataKey}
            className="flex min-w-36 items-center justify-between gap-4 text-sm"
          >
            <span className="text-gray-500">{item.name}</span>
            <span className="font-medium text-gray-900">
              {Math.round(item.value)}
              {item.dataKey === "protein" ? " g" : " kcal"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
