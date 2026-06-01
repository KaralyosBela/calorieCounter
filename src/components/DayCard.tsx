import dayjs from "dayjs";
import { useFoods } from "../hooks/useFoods";
import type { Food } from "../types/types";
import { Surface } from "@heroui/react";

const getTodayStats = (foods: Food[]) => {
  const todayFoods = foods.filter((food) =>
    dayjs(food.createdAt).isSame(dayjs(), "day"),
  );

  return {
    calories: todayFoods.reduce((sum, food) => sum + food.calories, 0),
    protein: todayFoods.reduce((sum, food) => sum + food.protein, 0),
    count: todayFoods.length,
  };
};

const getStatsBetween = (
  foods: Food[],
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
) => {
  const filtered = foods.filter((food) =>
    dayjs(food.createdAt).isBetween(start, end, null, "[]"),
  );

  return {
    calories: filtered.reduce((s, f) => s + f.calories, 0),
    protein: filtered.reduce((s, f) => s + f.protein, 0),
    count: filtered.length,
  };
};

// export const getTodayStats = (foods: Food[]) =>
//   getStatsBetween(foods, dayjs().startOf("day"), dayjs().endOf("day"));

// export const getThisWeekStats = (foods: Food[]) =>
//   getStatsBetween(foods, dayjs().startOf("isoWeek"), dayjs().endOf("isoWeek"));

// export const getThisMonthStats = (foods: Food[]) =>
//   getStatsBetween(foods, dayjs().startOf("month"), dayjs().endOf("month"));

export const DayCard = () => {
  const { foods } = useFoods();
  const stats = getStatsBetween(
    foods,
    dayjs().startOf("day"),
    dayjs().endOf("day"),
  );

  //card select, avg vagy teljes

  return (
    <Surface
      className="rounded-3xl p-4 shadow-lg flex flex-col gap-2 w-full"
      variant="default"
    >
      Total fot the day
      <p>Kcal: {Number(stats.calories).toFixed(2)}</p>
      <p>Protein: {Number(stats.protein).toFixed(2)}</p>
      <p>Count: {stats.count}</p>
    </Surface>
  );
};
