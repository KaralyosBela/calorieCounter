import { AddFoodForm } from "./AddFoodForm";
import { Search } from "./Search";
import { FoodTable } from "./table/FoodTable";
import { PageTransition } from "../App";

export const MainPage = () => {
  return (
    <PageTransition>
      <div className="h-full flex flex-col bg-gray-100 p-4 overflow-auto md:overflow-hidden">
        <div className="flex flex-col gap-4 h-full w-full max-w-7xl mx-auto md:flex-row md:w-full">
          <div className=" w-full flex flex-col gap-4">
            <Search />
            <FoodTable />
          </div>
          <div className="w-full h-full flex flex-col gap-4 md:w-2/5 sm:flex-row md:flex-col">
            <AddFoodForm />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
