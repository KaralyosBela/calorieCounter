import { create } from "zustand";
import type { Selection } from "@heroui/react";

type AppStore = {
  selected: Selection;
  setSelected: (selected: Selection) => void;
  selectedFilter: string;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  //Goals page states
  proteinGoal: string;
  calorieGoal: string;
  setProteinGoal: (proteinGoal: string) => void;
  setCalorieGoal: (calorieGoal: string) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  selectedFilter: "every",
  selected: new Set(["every"]), // TODO: type for filter
  setSelected: (selected) =>
    set({
      selected,
      selectedFilter: String(Array.from(selected)[0]), //0 cause its single select
    }),
  searchValue: "",
  setSearchValue: (searchValue) => set({ searchValue }),
  proteinGoal: "140",
  calorieGoal: "1950", //TODO: save this into db
  setProteinGoal: (proteinGoal) => set({ proteinGoal }),
  setCalorieGoal: (calorieGoal) => set({ calorieGoal }),
}));
