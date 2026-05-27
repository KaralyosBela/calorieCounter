import { Button, Popover, Table } from "@heroui/react";
import dayjs from "dayjs";
import { Pencil } from "@gravity-ui/icons";
import { TrashBin } from "@gravity-ui/icons";
import { EditFoodForm } from "./EditFoodForm";
import { useFoods } from "../../hooks/useFoods";

export const FoodTable = ({ searchValue }: any) => {
  const { foods } = useFoods();

  const filteredFoods = foods.filter((food: any) => {
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
              {filteredFoods.map((food: any) => (
                <Table.Row key={food.id}>
                  <Table.Cell>{food.name}</Table.Cell>
                  <Table.Cell>{food.protein}</Table.Cell>
                  <Table.Cell>{food.calories}</Table.Cell>
                  <Table.Cell>
                    {dayjs(food.createdAt).format("MMM D, HH:mm")}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center justify-end gap-2">
                      <Popover>
                        <Popover.Trigger>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="tertiary"
                            className="hover:rotate-25 hover:scale-110 transition-transform duration-300"
                            onPress={() => console.log(food.id)}
                          >
                            <Pencil />
                          </Button>
                        </Popover.Trigger>

                        <Popover.Content placement="left">
                          <Popover.Arrow />
                          <Popover.Dialog>
                            <Popover.Heading />
                            <EditFoodForm food={food} />
                          </Popover.Dialog>
                        </Popover.Content>
                      </Popover>
                      <Popover>
                        <Popover.Trigger>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="danger-soft"
                            className="hover:rotate-25 hover:scale-110 transition-transform duration-300"
                            onPress={() => console.log(food.id)}
                          >
                            <TrashBin />
                          </Button>
                        </Popover.Trigger>
                        <Popover.Content placement="left">
                          <Popover.Arrow />
                          <Popover.Dialog className="p-1">
                            <Popover.Heading />
                            <Button
                              variant="danger"
                              className="hover:scale-105 duration-300 ease-in-out transition-all "
                            >
                              Confirm
                            </Button>
                          </Popover.Dialog>
                        </Popover.Content>
                      </Popover>
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
