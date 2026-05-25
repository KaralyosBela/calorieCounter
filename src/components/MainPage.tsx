import { Table, Tabs } from "@heroui/react";
import { useState, useEffect } from "react";
import { supabase } from "../database/supabase";
export const MainPage = () => {
  const [foods, setFoods] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from("foods").select("*");

      if (error) {
        console.error(error);
        return;
      }

      setFoods(data ?? []);
    };

    load();
  }, []);

  return (
    <div className="h-full flex flex-col bg-gray-100 p-4 overflow-hidden">
      {/* CENTER WRAPPER */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 h-full">
        {/* Tabs */}
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

        {/* TABLE AREA */}
        <div className="flex-1 overflow-hidden">
          <Table className="h-full w-full">
            <Table.ScrollContainer className="h-full overflow-auto">
              <Table.Content>
                <Table.Header className="h-full w-full sticky top-0 bg-gray-200">
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
    </div>
  );
};
