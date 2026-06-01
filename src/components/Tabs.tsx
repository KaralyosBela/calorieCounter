import { Tabs } from "@heroui/react";

export const FoodTabs = () => {
  return (
    <Tabs className="w-full" orientation="horizontal">
      <Tabs.ListContainer className="w-full">
        <Tabs.List className="w-full" aria-label="Options">
          <Tabs.Tab className="w-full" id="overview">
            All
            <Tabs.Indicator />
          </Tabs.Tab>

          <Tabs.Tab className="w-full" id="analytics">
            Today
            <Tabs.Indicator />
          </Tabs.Tab>

          <Tabs.Tab className="w-full" id="reports">
            This week
            <Tabs.Indicator />
          </Tabs.Tab>

          <Tabs.Tab className="w-full" id="asd">
            This month
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
};
