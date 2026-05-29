import { AddFoodForm } from "./AddFoodForm";
import { Search } from "./Search";
import { FoodTable } from "./table/FoodTable";
import { DailyGoalCard } from "./charts/DailyGoalCard";

export const MainPage = () => {
  return (
    <div className="h-full flex flex-col bg-gray-100 p-4 overflow-auto md:overflow-hidden">
      <div className="flex flex-col gap-4 h-full w-full max-w-7xl mx-auto md:flex-row md:w-full">
        <div className=" w-full flex flex-col gap-4">
          {/* ha nincs width specifikalva, akkor content a default flexnek */}
          <Search />
          <FoodTable />
        </div>
        <div className="w-full h-full flex flex-col gap-4 md:w-2/5 sm:flex-row md:flex-col">
          {/* ha nincs width specifikalva, akkor content a default flexnek, w-full felülírja */}
          <AddFoodForm />
          <DailyGoalCard />
        </div>
      </div>
    </div>
  );
};
