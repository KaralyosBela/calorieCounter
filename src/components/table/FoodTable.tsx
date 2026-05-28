import { Table } from "@heroui/react";
import { EditFoodForm } from "./EditFoodForm";
import { useFoods } from "../../hooks/useFoods";
import { DeleteFoodButton } from "./DeleteFoodButton";

export const FoodTable = ({ searchValue }: { searchValue: string }) => {
  const { foods } = useFoods();

  const filteredFoods = foods.filter((food) => {
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
              <Table.Column isRowHeader>Date</Table.Column>
              <Table.Column className="text-end">Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {filteredFoods.map((food) => (
                <Table.Row key={food.id}>
                  <Table.Cell>{food.name}</Table.Cell>
                  <Table.Cell>{food.protein}</Table.Cell>
                  <Table.Cell>{food.calories}</Table.Cell>
                  <Table.Cell>{food.createdAt}</Table.Cell>
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
