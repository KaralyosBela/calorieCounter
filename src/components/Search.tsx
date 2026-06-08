import { Badge, Button, Dropdown, Label, SearchField } from "@heroui/react";
import { Funnel } from "@gravity-ui/icons";
import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../store/store";
import { motion, AnimatePresence } from "framer-motion";

export const Search = () => {
  const { searchValue, setSearchValue, selected, setSelected, selectedFilter } =
    useAppStore(
      useShallow((state) => ({
        searchValue: state.searchValue,
        setSearchValue: state.setSearchValue,
        selected: state.selected,
        setSelected: state.setSelected,
        selectedFilter: state.selectedFilter,
      })),
    );

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <SearchField className="flex-1" name="search" aria-label="search">
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input
            placeholder="Search for something"
            onChange={onSearch}
            value={searchValue}
          />
          <SearchField.ClearButton onPress={clearSearch} />
        </SearchField.Group>
      </SearchField>
      <Dropdown>
        <Badge.Anchor>
          <Button
            isIconOnly
            size="md"
            variant="tertiary"
            className="hover:rotate-25 hover:scale-110 transition-transform duration-300"
          >
            <Funnel />
          </Button>
          <AnimatePresence>
            {selectedFilter !== "every" && (
              <motion.div
                style={{ transformOrigin: "top right" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{
                  type: "keyframes",
                  stiffness: 500,
                  damping: 25,
                }}
              >
                <Badge size="sm" color="accent" />
              </motion.div>
            )}
          </AnimatePresence>
        </Badge.Anchor>
        <Dropdown.Popover placement="bottom right">
          <Dropdown.Menu
            selectedKeys={selected}
            selectionMode="single"
            onSelectionChange={setSelected}
          >
            <Dropdown.Section>
              <Dropdown.Item id="every">
                <Dropdown.ItemIndicator />
                <Label>All</Label>
              </Dropdown.Item>
              <Dropdown.Item id="daily">
                <Dropdown.ItemIndicator />
                <Label>Today</Label>
              </Dropdown.Item>
              <Dropdown.Item id="weekly">
                <Dropdown.ItemIndicator />
                <Label>This week</Label>
              </Dropdown.Item>
            </Dropdown.Section>
            <Dropdown.Item id="monthly">
              <Dropdown.ItemIndicator />
              <Label>This month</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
};
