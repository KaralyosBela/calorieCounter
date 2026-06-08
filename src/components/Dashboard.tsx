import { Button, Card, Typography } from "@heroui/react";
import { PageTransition } from "../App";
import { DayChart, getStatsBetween } from "./charts/DayChart";
import { WeeklyChart } from "./charts/WeeklyChart";
import dayjs from "dayjs";
import { useState } from "react";
import { useFoods } from "../hooks/useFoods";
import { ArrowRight } from "@gravity-ui/icons";
import { ArrowLeft } from "@gravity-ui/icons";
import { CaloriesProteinChart, getChartData } from "./charts/DayBar";

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
      <div className="flex flex-col gap-4 bg-gray-100 p-4">
        <Card className="flex flex-col p-4 w-full max-w-4xl mx-auto rounded-3xl shadow-md bg-white">
          <div className="flex flex-col gap-2">
            <div className="flex justify-left gap-2">
              <Button
                variant={mode === "day" ? "primary" : "secondary"}
                onPress={() => setMode("day")}
              >
                Daily view
              </Button>

              <Button
                variant={mode === "week" ? "primary" : "secondary"}
                onPress={() => setMode("week")}
              >
                Weekly view
              </Button>
            </div>
            <div className="flex items-center justify-between bg-white">
              {/* Mobile */}
              <Button isIconOnly onPress={goPrev} className="md:hidden">
                <ArrowLeft />
              </Button>

              {/* Desktop */}
              <Button onPress={goPrev} className="hidden md:flex">
                <ArrowLeft />
                Previous {mode === "day" ? "day" : "week"}
              </Button>

              <Typography type="h5">{label}</Typography>

              {/* Mobile */}
              <Button isIconOnly onPress={goNext} className="md:hidden">
                <ArrowRight />
              </Button>

              {/* Desktop */}
              <Button onPress={goNext} className="hidden md:flex">
                Next {mode === "day" ? "day" : "week"}
                <ArrowRight />
              </Button>
            </div>
          </div>
        </Card>
        <Card className="flex flex-col p-4 w-full max-w-4xl mx-auto rounded-3xl shadow-md">
          {mode === "day" ? (
            <DayChart stats={stats} selectedDate={selectedDate} />
          ) : (
            <WeeklyChart stats={stats} selectedDate={selectedDate} />
          )}
        </Card>
        <div className="mx-auto flex w-full max-w-4xl">
          <CaloriesProteinChart
            data={getChartData(foods, selectedDate, mode)}
            mode={mode}
          />
        </div>
      </div>
    </PageTransition>
  );
};



// return (
//     <PageTransition>
//       <div className="min-h-full bg-gradient-to-br from-gray-100 via-white to-gray-100 p-4">
//         <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
//           {/* Header / Controls */}
//           <Card className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg backdrop-blur">
//             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//               <div>
//                 <Typography type="h3">Dashboard</Typography>
//                 <Typography className="text-gray-500">
//                   Calories and protein overview
//                 </Typography>
//               </div>

//               <div className="flex gap-2 rounded-2xl bg-gray-100 p-1">
//                 <Button
//                   variant={mode === "day" ? "primary" : "ghost"}
//                   onPress={() => setMode("day")}
//                 >
//                   Daily
//                 </Button>
//                 <Button
//                   variant={mode === "week" ? "primary" : "ghost"}
//                   onPress={() => setMode("week")}
//                 >
//                   Weekly
//                 </Button>
//               </div>
//             </div>

//             <div className="mt-4 flex items-center justify-between rounded-2xl bg-gray-50 p-2">
//               <Button isIconOnly onPress={goPrev} className="md:hidden">
//                 <ArrowLeft />
//               </Button>

//               <Button onPress={goPrev} className="hidden md:flex">
//                 <ArrowLeft />
//                 Previous {mode === "day" ? "day" : "week"}
//               </Button>

//               <div className="text-center">
//                 <Typography type="h5">{label}</Typography>
//                 <Typography className="text-sm text-gray-500">
//                   {mode === "day" ? "Daily summary" : "Weekly summary"}
//                 </Typography>
//               </div>

//               <Button isIconOnly onPress={goNext} className="md:hidden">
//                 <ArrowRight />
//               </Button>

//               <Button onPress={goNext} className="hidden md:flex">
//                 Next {mode === "day" ? "day" : "week"}
//                 <ArrowRight />
//               </Button>
//             </div>
//           </Card>

//           {/* KPI cards */}
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             <Card className="rounded-3xl bg-white p-5 shadow-md">
//               <Typography className="text-gray-500">Calories</Typography>
//               <Typography type="h2">
//                 {Math.round(stats.calories)} kcal
//               </Typography>
//             </Card>

//             <Card className="rounded-3xl bg-white p-5 shadow-md">
//               <Typography className="text-gray-500">Protein</Typography>
//               <Typography type="h2">{Math.round(stats.protein)} g</Typography>
//             </Card>

//             <Card className="rounded-3xl bg-white p-5 shadow-md">
//               <Typography className="text-gray-500">
//                 {mode === "day" ? "Meals today" : "Meals this week"}
//               </Typography>
//               <Typography type="h2">{stats.count ?? foods.length}</Typography>
//             </Card>
//           </div>

//           {/* Main layout */}
//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr] items-start">
//             <Card className="rounded-3xl bg-white p-4 shadow-md">
//               <div className="mb-3">
//                 <Typography type="h4">
//                   {mode === "day" ? "Daily progress" : "Weekly progress"}
//                 </Typography>
//                 <Typography className="text-sm text-gray-500">
//                   Main calorie / protein overview
//                 </Typography>
//               </div>

//               {mode === "day" ? (
//                 <DayChart stats={stats} selectedDate={selectedDate} />
//               ) : (
//                 <WeeklyChart stats={stats} selectedDate={selectedDate} />
//               )}
//             </Card>
//             <Card className="rounded-3xl bg-white p-4 shadow-md">
//               <div className="mb-3">
//                 <Typography type="h4">Breakdown</Typography>
//                 <Typography className="text-sm text-gray-500">
//                   {mode === "day" ? "Hourly view" : "Daily view"}
//                 </Typography>
//               </div>

//               <CaloriesProteinChart
//                 data={getChartData(foods, selectedDate, mode)}
//                 mode={mode}
//               />
//             </Card>
//           </div>
//         </div>
//       </div>
//     </PageTransition>
//   );