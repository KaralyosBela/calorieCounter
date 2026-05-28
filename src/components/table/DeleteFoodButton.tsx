import { TrashBin } from "@gravity-ui/icons";
import { Popover, Button, toast } from "@heroui/react";
import { useFoods } from "../../hooks/useFoods";
import type { Food } from "../../types/types";

export const DeleteFoodButton = ({ food }: { food: Food }) => {
  const { deleteFood } = useFoods();

  const onDeletePress = async () => {
    console.log(food.id);
    await deleteFood(food.id);
    toast.success("successfully deleted!");
  };

  return (
    <Popover>
      <Popover.Trigger>
        <Button
          isIconOnly
          size="sm"
          variant="danger-soft"
          className="hover:rotate-25 hover:scale-110 transition-transform duration-300"
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
            className="hover:scale-105 duration-300 ease-in-out transition-all"
            onPress={onDeletePress}
          >
            Confirm
          </Button>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};
