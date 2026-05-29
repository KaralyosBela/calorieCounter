import { create } from "zustand";
import type { Selection } from "@heroui/react";

type AppStore = {
  selected: Selection;
  setSelected: (selected: Selection) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  selected: new Set(["All"]),
  setSelected: (selected) => set({ selected }),
  searchValue: "",
  setSearchValue: (searchValue) => set({ searchValue }),
}));
