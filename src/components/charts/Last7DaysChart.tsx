import dayjs from "dayjs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Surface, Typography } from "@heroui/react";
import { useFoods } from "../../hooks/useFoods";

export const Last7DaysChart = () => {
  const { foods } = useFoods();

  const data = Array.from({ length: 7 }, (_, index) => {
    const date = dayjs().subtract(6 - index, "day");

    const dayFoods = foods.filter((food) =>
      dayjs(food.createdAt).isSame(date, "day"),
    );

    return {
      day: date.format("ddd"),
      calories: dayFoods.reduce((sum, food) => sum + food.calories, 0),
      protein: dayFoods.reduce((sum, food) => sum + food.protein, 0),
    };
  });

  return (
    <Surface
      className="h-80 w-full rounded-3xl p-4 shadow-lg"
      variant="default"
    >
      <Typography type="h5" className="mb-4">
        Last 7 days
      </Typography>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="calories" radius={[8, 8, 0, 0]} />
          <Bar dataKey="protein" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Surface>
  );
};
