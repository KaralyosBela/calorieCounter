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
        <Card className="flex flex-col p-4 w-full max-w-4xl mx-auto rounded-3xl shadow-md bg-gray-50">
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
            <div className="flex items-center justify-between rounded-3xl bg-white p-2 shadow-sm">
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
