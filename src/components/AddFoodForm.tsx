import { Plus } from "@gravity-ui/icons";
import { Typography, Input, Button } from "@heroui/react";
import { useState } from "react";
// import { Plus } from "@gravity-ui/icons";
// import { motion } from "framer-motion";

export const AddFoodForm = ({ addFood }: { addFood: any }) => {
  const [name, setName] = useState("");
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");

  const handleAdd = () => {
    addFood({
      name,
      protein,
      calories,
    });
  };

  return (
    <div>
      <Typography>Add new food</Typography>
      <div className="flex gap-2 flex-col sm:flex-row">
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
        {/* <MotionButton
              className="w-full sm:w-auto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              isDisabled={!name || !calories || !protein}
              onPress={() => console.log(name, protein, calories)}
            >
              <Plus />
              Add food
            </MotionButton> */}
        <Button
          className="w-full sm:w-auto"
          isDisabled={!name || !calories || !protein}
          onPress={handleAdd}
        >
          <Plus />
          Add food
        </Button>
      </div>
    </div>
  );
};
