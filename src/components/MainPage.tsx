import { Label, SearchField, Table, Tabs } from "@heroui/react";
import { AddFoodForm } from "./AddFoodForm";
import { useGetFoods } from "../hooks/useGetFoods";

// const MotionButton = motion(Button);

export const MainPage = () => {
  //Ha kétszer hívom meg ezt, pl az addFoodForm-ba akkor 2 instance 2 hívás
  const { foods, addFood } = useGetFoods();

  return (
    <div className="h-full flex flex-col bg-gray-100 p-4 overflow-hidden">
      {/* CENTER WRAPPER */}
      <div className="flex flex-row gap-4 w-full h-full max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 w-full">
          {/* Tabs, TODO: daily, weekly, moonthly */}
          <Tabs className="shrink-0">
            <Tabs.ListContainer>
              <Tabs.List aria-label="Options">
                <Tabs.Tab id="overview">
                  Overview
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="analytics">
                  Analytics
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="reports">
                  Reports
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
          <div>
            <SearchField name="search">
              <Label>Search</Label>
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
          </div>
          <div className="flex-1 overflow-hidden">
            <Table className="h-full w-full">
              <Table.ScrollContainer>
                <Table.Content aria-label="Food table">
                  <Table.Header>
                    <Table.Column isRowHeader>Name</Table.Column>
                    <Table.Column>Protein</Table.Column>
                    <Table.Column>Calories</Table.Column>
                    <Table.Column>Date</Table.Column>
                  </Table.Header>

                  <Table.Body>
                    {foods.map((food) => (
                      <Table.Row key={food.id}>
                        <Table.Cell>{food.name}</Table.Cell>
                        <Table.Cell>{food.protein}</Table.Cell>
                        <Table.Cell>{food.calories}</Table.Cell>
                        <Table.Cell>{food.created_at}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </div>
        </div>
        <div className="w-full md:w-2/5">
          {/* //alapból full, de md fölött 2/5 */}
          <AddFoodForm addFood={addFood} />
        </div>
      </div>
    </div>
  );
};
