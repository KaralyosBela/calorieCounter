import { create } from "zustand";
import type { Selection } from "@heroui/react";

type AppStore = {
  selected: Selection;
  setSelected: (selected: Selection) => void;
  selectedFilter: string;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
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
}));
