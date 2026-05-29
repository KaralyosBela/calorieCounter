import {
  Badge,
  Button,
  Dropdown,
  Label,
  SearchField,
  type Selection,
} from "@heroui/react";
import { Funnel } from "@gravity-ui/icons";
import { useState } from "react";

export const Search = ({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [selected, setSelected] = useState<Selection>(new Set(["All"]));

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
          <Badge size="sm" color="accent" />
        </Badge.Anchor>
        <Dropdown.Popover placement="bottom right">
          <Dropdown.Menu
            selectedKeys={selected}
            selectionMode="single"
            onSelectionChange={setSelected}
          >
            <Dropdown.Section>
              <Dropdown.Item id="All">
                <Dropdown.ItemIndicator />
                <Label>All</Label>
              </Dropdown.Item>
              <Dropdown.Item id="Daily">
                <Dropdown.ItemIndicator />
                <Label>Today</Label>
              </Dropdown.Item>
              <Dropdown.Item id="Weekly">
                <Dropdown.ItemIndicator />
                <Label>This week</Label>
              </Dropdown.Item>
            </Dropdown.Section>
            <Dropdown.Item id="Monthly">
              <Dropdown.ItemIndicator />
              <Label>This month</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
};
