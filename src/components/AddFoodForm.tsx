import { Plus } from "@gravity-ui/icons";
import {
  Typography,
  Input,
  Button,
  Surface,
  toast,
  Label,
  Tag,
  TagGroup,
  type Key,
} from "@heroui/react";
import { useState } from "react";
import { useFoods } from "../hooks/useFoods";

const badgeHoverStyle = "hover:scale-110 transition-transform duration-300";

export const AddFoodForm = () => {
  const { addFood } = useFoods();
  const [name, setName] = useState("");
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  const [foodType, setFoodType] = useState<Iterable<Key>>(new Set([]));
  const [servingType, setServingType] = useState<Iterable<Key>>(new Set([]));

  const handleAdd = () => {
    addFood({
      name,
      protein: Number(protein),
      calories: Number(calories),
    });
    toast.success("successfully added!");
  };

  return (
    <Surface className="rounded-3xl p-4 shadow-lg" variant="default">
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
        <TagGroup
          selectionMode="single"
          size="md"
          aria-label="food-type-badge"
          onSelectionChange={(keys) => setFoodType(keys)}
        >
          <TagGroup.List>
            <Tag id="breakfast" className={badgeHoverStyle}>
              Breakfast
            </Tag>
            <Tag id="lunch" className={badgeHoverStyle}>
              Lunch
            </Tag>
            <Tag id="dinner" className={badgeHoverStyle}>
              Dinner
            </Tag>
            <Tag id="snack" className={badgeHoverStyle}>
              Snack
            </Tag>
          </TagGroup.List>
        </TagGroup>
        <TagGroup
          selectionMode="single"
          size="md"
          aria-label="serving-type"
          onSelectionChange={(keys) => setServingType(keys)}
        >
          <TagGroup.List>
            <Tag className={badgeHoverStyle}>Single serving</Tag>
            <Tag className={badgeHoverStyle}>Full serving</Tag>
          </TagGroup.List>
        </TagGroup>
        <Button
          className="w-full"
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
