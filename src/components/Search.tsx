import { SearchField } from "@heroui/react";

export const Search = ({ searchValue, setSearchValue }: any) => {
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <SearchField name="search" aria-label="search">
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
  );
};
