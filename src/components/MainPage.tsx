import { AddFoodForm } from "./AddFoodForm";
import { useGetFoods } from "../hooks/useGetFoods";
import { useState } from "react";
import { Search } from "./Search";
import { FoodTable } from "./FoodTable";
import { SurfaceStuff } from "./Accordion";
import { FoodTabs } from "./Tabs";
import { BarChart } from "./charts/BarChart";

export const MainPage = () => {
  //Ha kétszer hívom meg ezt, pl az addFoodForm-ba akkor 2 instance 2 hívás
  const { foods, addFood } = useGetFoods();
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="h-full flex flex-col bg-gray-100 p-4 overflow-hidden">
      <div className="flex flex-row gap-4 h-full w-full max-w-7xl mx-auto">
        {/*full width, max widthje 6xl és px */}
        <div className="w-60 flex gap-4 flex-col items-end">
          {/* w-60 helyett 1/5 2/5 volt */}
          <FoodTabs />
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
          <FoodTable foods={foods} searchValue={searchValue} />
        </div>
        <div className="w-2/5 flex flex-col gap-4">
          {/* ha nincs width specifikalva, akkor content a default flexnek, w-full felülírja */}
          <AddFoodForm addFood={addFood} />
          <SurfaceStuff />
        </div>
      </div>
    </div>
  );
};
