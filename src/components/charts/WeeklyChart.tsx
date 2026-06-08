import dayjs from "dayjs";
import { Chip, Label, Meter, Separator, Typography } from "@heroui/react";

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
    <>
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

      <div className="flex flex-row gap-4">
        <div className="rounded-2xl bg-default-100">
          <p className="text-xs text-default-500">Weekly kcal total</p>
          <p className="text-2xl font-bold">{Math.round(stats.calories)}</p>
        </div>
        <Separator orientation="vertical" />

        <div className="rounded-2xl bg-default-100">
          <p className="text-xs text-default-500">Protein left</p>
          <p className="text-2xl font-bold">
            {Math.max(0, proteinGoal - stats.protein).toFixed(0)}g
          </p>
        </div>
      </div>
    </>
  );
};
