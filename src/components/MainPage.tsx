import { AddFoodForm } from "./AddFoodForm";
import { useState } from "react";
import { Search } from "./Search";
import { FoodTabs } from "./Tabs";
import { FoodTable } from "./table/FoodTable";
import { DailyGoalCard } from "./charts/DailyGoalCard";

export const MainPage = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="h-full flex flex-col bg-gray-100 p-4 overflow-hidden">
      <div className="flex flex-row gap-4 h-full w-full max-w-7xl mx-auto">
        <div className="w-60 flex gap-4 flex-col items-end">
          <FoodTabs />
          {/* <Avg /> */}
          {/* <BarChart
            data={[
              { label: "Mon", value: 2200 },
              { label: "Tue", value: 1900 },
              { label: "Wed", value: 2400 },
              { label: "Thu", value: 2100 },
              { label: "Fri", value: 2600 },
              { label: "Sat", value: 1800 },
              { label: "Sun", value: 2300 },
            ]}
          /> */}
        </div>
        <div className=" w-full flex flex-col gap-4">
          {/* ha nincs width specifikalva, akkor content a default flexnek */}
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
          <FoodTable searchValue={searchValue} />
        </div>
        <div className="w-2/5 flex flex-col gap-4">
          {/* ha nincs width specifikalva, akkor content a default flexnek, w-full felülírja */}
          <AddFoodForm />
          <DailyGoalCard />
        </div>
      </div>
    </div>
  );
};
