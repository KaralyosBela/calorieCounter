import dayjs from "dayjs";
import type { Food } from "../../types/types";
import {
  Card,
  Chip,
  Label,
  Meter,
  Separator,
  Typography,
} from "@heroui/react";
import { useAppStore } from "../../store/store";

// eslint-disable-next-line react-refresh/only-export-components
export const getStatsBetween = (
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

export const DayChart = ({ stats, selectedDate }: any) => {
  const calorieGoal = useAppStore((state) => state.calorieGoal);
  const proteinGoal = useAppStore((state) => state.proteinGoal);

  const isToday = selectedDate.isSame(dayjs(), "day");

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div>
          <Typography type="h5">
            {isToday ? "Today" : selectedDate.format("YYYY. MM. DD.")}
          </Typography>
          <p className="text-sm text-default-500">Daily nutrition summary</p>
        </div>
        <Chip color="default">{stats.count} meals</Chip>
      </div>

      <div className="flex flex-col gap-4">
        <Meter
          color="success"
          value={stats.calories}
          minValue={0}
          maxValue={Number(calorieGoal)}
        >
          <div className="mb-2 flex items-center justify-between">
            <Label>Calories</Label>
            <span className="font-semibold">
              {Math.round(stats.calories)} / {calorieGoal}
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
          maxValue={Number(proteinGoal)}
        >
          <div className="mb-2 flex items-center justify-between">
            <Label>Protein</Label>
            <span className="font-semibold">
              {Math.round(stats.protein)}g / {proteinGoal}g
            </span>
          </div>

          <Meter.Track>
            <Meter.Fill />
          </Meter.Track>
        </Meter>
      </div>

      <div className="flex flex-row gap-4">
        <div className="rounded-2xl bg-default-100">
          <p className="text-xs text-default-500">Calories left</p>
          <p className="text-2xl font-bold">
            {Math.max(0, Number(calorieGoal) - stats.calories).toFixed(0)}
          </p>
        </div>
        <Separator orientation="vertical" />

        <div className="rounded-2xl bg-default-100">
          <p className="text-xs text-default-500">Protein left</p>
          <p className="text-2xl font-bold">
            {Math.max(0, Number(proteinGoal) - stats.protein).toFixed(0)}g
          </p>
        </div>
      </div>
    </>
  );
};
