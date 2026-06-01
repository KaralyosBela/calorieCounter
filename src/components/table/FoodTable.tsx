import { Table } from "@heroui/react";
import { EditFoodForm } from "./EditFoodForm";
import { useFoods } from "../../hooks/useFoods";
import { DeleteFoodButton } from "./DeleteFoodButton";
import { useAppStore } from "../../store/store";
import dayjs from "dayjs";

export const FoodTable = () => {
  const { foods } = useFoods();
  const searchValue = useAppStore((state) => state.searchValue);
  const selectedFilter = useAppStore((state) => state.selectedFilter);

  const dateFilteredFoods = foods.filter((food) => {
    const foodDate = dayjs(food.createdAt);

    switch (selectedFilter) {
      case "daily":
        return foodDate.isSame(dayjs(), "day");

      case "weekly":
        return foodDate.isSame(dayjs(), "isoWeek");

      case "monthly":
        return foodDate.isSame(dayjs(), "month");

      case "every":
      default:
        return true;
    }
  });

  const filteredFoods = dateFilteredFoods.filter((food) => {
    const value = searchValue.trim().toLowerCase();

    if (!value) return true;

    return (
      food.name.toLowerCase().includes(value) ||
      String(food.protein).includes(value) ||
      String(food.calories).includes(value)
    );
  });

  return (
    <div className="flex min-h-0 flex-col gap-2">
      <Table className="flex-1 min-h-0 overflow-hidden">
        <Table.ScrollContainer className="h-full overflow-auto">
          <Table.Content aria-label="Food table">
            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column isRowHeader>Protein</Table.Column>
              <Table.Column isRowHeader>Calories</Table.Column>
              <Table.Column className="hidden sm:table-cell" isRowHeader>
                Date
              </Table.Column>
              <Table.Column className="text-end">Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {filteredFoods.map((food) => (
                <Table.Row key={food.id}>
                  <Table.Cell>{food.name}</Table.Cell>
                  <Table.Cell>{food.protein}</Table.Cell>
                  <Table.Cell>{food.calories}</Table.Cell>
                  <Table.Cell className="hidden sm:table-cell">
                    {food.createdAt}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center justify-end gap-2">
                      <EditFoodForm food={food} />
                      <DeleteFoodButton food={food} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};
