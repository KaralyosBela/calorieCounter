import { Surface, Tabs } from "@heroui/react";

export const FoodTabs = () => {
  return (
    <Tabs className="w-full" orientation="vertical">
      <Tabs.ListContainer className="w-full">
        <Tabs.List className="w-full" aria-label="Options">
          <Tabs.Tab className="w-full justify-start" id="overview">
            All
            <Tabs.Indicator />
          </Tabs.Tab>

          <Tabs.Tab className="w-full justify-start" id="analytics">
            Today
            <Tabs.Indicator />
          </Tabs.Tab>

          <Tabs.Tab className="w-full justify-start" id="reports">
            This week
            <Tabs.Indicator />
          </Tabs.Tab>

          <Tabs.Tab className="w-full justify-start" id="asd">
            This month
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
};
