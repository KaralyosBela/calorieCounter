import { Plus } from "@gravity-ui/icons";
import { Typography, Input, Button, Surface, toast } from "@heroui/react";
import { useState } from "react";
import { useFoods } from "../hooks/useFoods";

export const AddFoodForm = () => {
  const { addFood } = useFoods();
  const [name, setName] = useState("");
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");

  const handleAdd = () => {
    addFood({
      name,
      protein: Number(protein),
      calories: Number(calories),
    });
    toast.success("successfully added!");
  };

  return (
    <Surface className="rounded-3xl p-4" variant="default">
      <Typography type="h5" className="pb-2">
        Add new food
      </Typography>
      <div className="flex gap-2 flex-col ">
        <Input
          className="w-full"
          type="text"
          aria-label="Name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className="w-full"
          type="number"
          aria-label="Protein"
          placeholder="Protein"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
        <Input
          className="w-full"
          type="number"
          aria-label="Calories"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <Button
          className="w-full sm:w-auto"
          isDisabled={!name || !calories || !protein}
          onPress={handleAdd}
        >
          <Plus />
          Add food
        </Button>
      </div>
    </Surface>
  );
};
