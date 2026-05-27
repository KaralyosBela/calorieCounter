import dayjs from "dayjs";
import { useFoods } from "../hooks/useFoods";

export const Avg = () => {
  const { foods } = useFoods();
  const groupedFoods = foods.reduce(
    (acc, food) => {
      const week = dayjs(food.createdAt)
        .startOf("isoWeek")
        .format("YYYY-MM-DD");

      if (!acc[week]) {
        acc[week] = [];
      }

      acc[week].push(food);

      return acc;
    },
    {} as Record<string, typeof foods>,
  );

  console.log(groupedFoods);

  return (
    <div>
      {Object.entries(groupedFoods).map(([week, foods]) => {
        const totalCalories = foods.reduce(
          (sum, food) => sum + Number(food.calories),
          0,
        );

        const totalProtein = foods.reduce(
          (sum, food) => sum + Number(food.protein),
          0,
        );

        return (
          <div key={week}>
            <h3>{dayjs(week).format("MMM D")} week</h3>

            <p>Total calories: {totalCalories}</p>
            <p>Average calories/day: {Math.round(totalCalories / 7)}</p>
            <p>Total protein: {totalProtein}g</p>
            <p>Average protein/day: {Math.round(totalProtein / 7)}g</p>
          </div>
        );
      })}
    </div>
  );
};
