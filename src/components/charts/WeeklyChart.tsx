import dayjs from "dayjs";
import { useFoods } from "../../hooks/useFoods";
import type { Food } from "../../types/types";
import { Chip, Label, Meter, Surface, Typography } from "@heroui/react";

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

// export const DayCard = () => {
//   const { foods } = useFoods();
//   const stats = getStatsBetween(
//     foods,
//     dayjs().startOf("day"),
//     dayjs().endOf("day"),
//   );

//   //card select, avg vagy teljes

//   return (
//     <Surface
//       className="rounded-3xl p-4 shadow-lg flex flex-col gap-2 w-full max-w-sm mx-auto"
//       variant="default"
//     >
//       <Typography type="h5" className="pb-2">
//         Calorie intake today
//       </Typography>
//       <Meter color="success" size="lg" value={776} minValue={0} maxValue={1000}>
//         <Label>Calories</Label>
//         <Meter.Output />
//         <Meter.Track>
//           <Meter.Fill />
//         </Meter.Track>
//       </Meter>
//       Total for the day
//       <p>Kcal: {Number(stats.calories).toFixed(2)}</p>
//       <p>Protein: {Number(stats.protein).toFixed(2)}</p>
//       <p>Count: {stats.count}</p>
//     </Surface>
//   );
// };

// export const WeeklyChart = ({ stats, selectedDate }: any) => {
//   const { foods } = useFoods();

//   // const stats = getStatsBetween(
//   //   foods,
//   //   dayjs().startOf("isoWeek"),
//   //   dayjs().endOf("isoWeek"),
//   // );

//   const calorieGoal = 1900;
//   const proteinGoal = 140;

//   return (
//     <Surface
//       className="w-full flex flex-col rounded-3xl p-4 gap-6 shadow-lg"
//       variant="default"
//     >
//       <div className="flex flex-row items-center justify-between">
//         <div>
//           <Typography type="h5">This Week</Typography>
//           <p className="text-sm text-default-500">Weekly nutrition summary</p>
//         </div>
//         <Chip color="default">{stats.count} meals</Chip>
//       </div>

//       <div className="flex flex-col gap-4">
//         <Meter
//           color="success"
//           value={stats.calories}
//           minValue={0}
//           maxValue={calorieGoal}
//         >
//           <div className="mb-2 flex items-center justify-between">
//             <Label>Calories</Label>
//             <span className="font-semibold">
//               {Math.round(stats.calories)} / {calorieGoal}
//             </span>
//           </div>

//           <Meter.Track>
//             <Meter.Fill />
//           </Meter.Track>
//         </Meter>

//         <Meter
//           color="accent"
//           value={stats.protein}
//           minValue={0}
//           maxValue={proteinGoal}
//         >
//           <div className="mb-2 flex items-center justify-between">
//             <Label>Protein</Label>
//             <span className="font-semibold">
//               {Math.round(stats.protein)}g / {proteinGoal}g
//             </span>
//           </div>

//           <Meter.Track>
//             <Meter.Fill />
//           </Meter.Track>
//         </Meter>
//       </div>

//       <div className="grid grid-cols-2 gap-3">
//         <div className="rounded-2xl bg-default-100">
//           <p className="text-xs text-default-500">Calories left</p>
//           <p className="text-2xl font-bold">
//             {Math.max(0, calorieGoal - stats.calories).toFixed(0)}
//           </p>
//         </div>

//         <div className="rounded-2xl bg-default-100">
//           <p className="text-xs text-default-500">Protein left</p>
//           <p className="text-2xl font-bold">
//             {Math.max(0, proteinGoal - stats.protein).toFixed(0)}g
//           </p>
//         </div>
//       </div>
//     </Surface>
//   );
// };

type WeeklyChartProps = {
  stats: {
    calories: number;
    protein: number;
    count: number;
  };
  selectedDate: dayjs.Dayjs;
};

export const WeeklyChart = ({ stats, selectedDate }: WeeklyChartProps) => {
  const calorieGoal = 1900;
  const proteinGoal = 140 * 7;

  const avgCalories = stats.calories / 7;

  return (
    <Surface
      className="flex w-full flex-col gap-6 rounded-3xl p-4 shadow-lg"
      variant="default"
    >
      <div className="flex items-center justify-between">
        <div>
          <Typography type="h5">Week summary</Typography>
          <p className="text-sm text-default-500">
            {selectedDate.startOf("isoWeek").format("MMM D")} -{" "}
            {selectedDate.endOf("isoWeek").format("MMM D")}
          </p>
        </div>

        <Chip color="default">{stats.count} meals</Chip>
      </div>

      <div className="flex flex-col gap-4">
        <Meter
          color="success"
          value={avgCalories}
          minValue={0}
          maxValue={calorieGoal}
        >
          <div className="mb-2 flex items-center justify-between">
            <Label>Avg calories / day</Label>
            <span className="font-semibold">
              {Math.round(avgCalories)} / {calorieGoal}
            </span>
          </div>

          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>

        <Meter
          color="accent"
          value={stats.protein}
          minValue={0}
          maxValue={proteinGoal}
        >
          <div className="mb-2 flex items-center justify-between">
            <Label>Protein this week</Label>
            <span className="font-semibold">
              {Math.round(stats.protein)}g / {proteinGoal}g
            </span>
          </div>

          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-default-100">
          <p className="text-xs text-default-500">Weekly kcal total</p>
          <p className="text-2xl font-bold">{Math.round(stats.calories)}</p>
        </div>

        <div className="rounded-2xl bg-default-100">
          <p className="text-xs text-default-500">Protein left</p>
          <p className="text-2xl font-bold">
            {Math.max(0, proteinGoal - stats.protein).toFixed(0)}g
          </p>
        </div>
      </div>
    </Surface>
  );
};
