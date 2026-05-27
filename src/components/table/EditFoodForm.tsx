import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { supabase } from "../../database/supabase";
import { FloppyDisk } from "@gravity-ui/icons";

export const EditFoodForm = ({ food }: any) => {
  const [name, setName] = useState(food.name);
  const [protein, setProtein] = useState(String(food.protein));
  const [calories, setCalories] = useState(String(food.calories));

  const handleSave = async () => {
    const { error } = await supabase
      .from("foods")
      .update({
        name,
        protein: Number(protein),
        calories: Number(calories),
      })
      .eq("id", food.id);

    if (error) {
      console.error(error);
      return;
    }

    console.log("updated", food.id);

    // ide majd refetch / TanStack invalidate
  };

  return (
    <div className="flex w-64 flex-col gap-2">
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

      <Button className="w-full" onPress={handleSave}>
        <FloppyDisk />
        Save changes
      </Button>
    </div>
  );
};
