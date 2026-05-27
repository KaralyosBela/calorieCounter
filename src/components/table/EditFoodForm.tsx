import { useState } from "react";
import { Button, Input, Popover } from "@heroui/react";
import { FloppyDisk, Pencil } from "@gravity-ui/icons";
import { useFoods } from "../../hooks/useFoods";

export const EditFoodForm = ({ food }: any) => {
  const { updateFood } = useFoods();

  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState(food.name);
  const [protein, setProtein] = useState(String(food.protein));
  const [calories, setCalories] = useState(String(food.calories));

  const handleSave = async () => {
    await updateFood({
      id: food.id,
      food: {
        name,
        protein: Number(protein),
        calories: Number(calories),
      },
    });

    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <Button isIconOnly size="sm" variant="tertiary">
          <Pencil />
        </Button>
      </Popover.Trigger>

      <Popover.Content placement="left">
        <Popover.Arrow />
        <Popover.Dialog>
          <div className="flex w-64 flex-col gap-2">
            <Input value={name} onChange={(e) => setName(e.target.value)} />

            <Input
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />

            <Input
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />

            <Button onPress={handleSave}>
              <FloppyDisk />
              Save changes
            </Button>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};
