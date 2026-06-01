import { Button, DateField, Label, Typography } from "@heroui/react";
import { PageTransition } from "../App";
import { AddFoodForm } from "./AddFoodForm";
import { DayChart, getStatsBetween } from "./charts/DayChart";
import { Last7DaysChart } from "./charts/Last7DaysChart";
import { WeeklyChart } from "./charts/WeeklyChart";
import dayjs from "dayjs";
import { useState } from "react";
import { useFoods } from "../hooks/useFoods";

// export const Dashboard = () => {
//   const { foods } = useFoods();
//   const [mode, setMode] = useState<"day" | "week">("day");
//   const [selectedDate, setSelectedDate] = useState(dayjs());

//   const stats = getStatsBetween(
//     foods,
//     selectedDate.startOf("day"),
//     selectedDate.endOf("day"),
//   );
//   return (
//     <PageTransition>
//       <div className="h-full flex flex-col bg-gray-100 p-4 gap-4 overflow-auto">
//         <div className="flex items-center justify-between">
//           <Button onPress={() => setSelectedDate((d) => d.subtract(1, "day"))}>
//             Prev
//           </Button>

//           <Typography type="h5">
//             {selectedDate.isSame(dayjs(), "day")
//               ? "Today"
//               : selectedDate.format("YYYY. MM. DD.")}
//           </Typography>

//           <Button onPress={() => setSelectedDate((d) => d.add(1, "day"))}>
//             Next
//           </Button>
//         </div>
//         <div className="flex flex-col gap-4 md:flex-row md:w-full md:max-w-7xl md:mx-auto">
//           <DayChart stats={stats} />
//           <WeeklyChart />
//         </div>
//         <div className="flex flex-col gap-4 md:flex-row md:w-full md:max-w-7xl md:mx-auto">
//           <Last7DaysChart />
//         </div>
//       </div>
//     </PageTransition>
//   );
// };

export const Dashboard = () => {
  const { foods } = useFoods();

  const [mode, setMode] = useState<"day" | "week">("day");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const start =
    mode === "day"
      ? selectedDate.startOf("day")
      : selectedDate.startOf("isoWeek");

  const end =
    mode === "day" ? selectedDate.endOf("day") : selectedDate.endOf("isoWeek");

  const stats = getStatsBetween(foods, start, end);

  const goPrev = () => {
    setSelectedDate((date) =>
      mode === "day" ? date.subtract(1, "day") : date.subtract(1, "week"),
    );
  };

  const goNext = () => {
    setSelectedDate((date) =>
      mode === "day" ? date.add(1, "day") : date.add(1, "week"),
    );
  };

  const label =
    mode === "day"
      ? selectedDate.isSame(dayjs(), "day")
        ? "Today"
        : selectedDate.format("YYYY. MM. DD.")
      : `${selectedDate.startOf("isoWeek").format("MMM D")} - ${selectedDate
          .endOf("isoWeek")
          .format("MMM D")}`;

  return (
    <PageTransition>
      <div className="flex h-full flex-col gap-4 overflow-auto bg-gray-100 p-4">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3">
          <div className="flex justify-center gap-2">
            <Button onPress={() => setMode("day")}>Day</Button>

            <Button onPress={() => setMode("week")}>Week</Button>
          </div>

          <div className="flex items-center justify-between rounded-3xl bg-white p-3 shadow-sm">
            <Button onPress={goPrev}>Prev</Button>

            <Typography type="h5">{label}</Typography>

            <Button onPress={goNext}>Next</Button>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:flex-row">
          {mode === "day" ? (
            <DayChart stats={stats} />
          ) : (
            <WeeklyChart stats={stats} selectedDate={selectedDate} />
          )}
        </div>

        {/* <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
          <Last7DaysChart selectedDate={selectedDate} mode={mode} />
        </div> */}
      </div>
    </PageTransition>
  );
};
