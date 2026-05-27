import { TrashBin } from "@gravity-ui/icons";
import { Popover, Button, toast } from "@heroui/react";
import { useFoods } from "../../hooks/useFoods";

export const DeleteFoodButton = () => {
  const { deleteFood } = useFoods();

  const onDeletePress = (id: any) => {
    deleteFood(id);
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
          onPress={() => console.log()}
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
