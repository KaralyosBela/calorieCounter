import { Plus } from "@gravity-ui/icons";
import {
  Typography,
  Input,
  Button,
  Surface,
  toast,
  Tag,
  TagGroup,
  type Key,
  ListBox,
  Select,
  Tooltip,
} from "@heroui/react";
import { useState } from "react";
import { useFoods } from "../hooks/useFoods";
import { CircleInfo } from "@gravity-ui/icons";

const badgeHoverStyle = "hover:scale-110 transition-transform duration-300";

export const AddFoodForm = () => {
  const { addFood } = useFoods();
  const [name, setName] = useState("");
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  const [foodType, setFoodType] = useState<Iterable<Key>>(new Set([]));
  const [servingType, setServingType] = useState<Iterable<Key>>(new Set([]));
  const [day, setDay] = useState<Key | null>(1);

  const handleAdd = async () => {
    const servingSize = Array.from(servingType).includes("multiple")
      ? Number(day)
      : 1;

    await addFood({
      food: {
        name,
        protein: Number(protein),
        calories: Number(calories),
      },
      servingSize,
    });
    toast.success("Successfully added!");
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
            <Tag id="single" className={badgeHoverStyle}>
              Single serving
            </Tag>
            <Tag id="multiple" className={badgeHoverStyle}>
              Multiple serving
            </Tag>
          </TagGroup.List>
        </TagGroup>
        {Array.from(servingType).includes("multiple") && (
          <div className="flex flex-row justify-content items-center w-full gap-2">
            <Select
              placeholder="Portion"
              className="w-full flex-1"
              aria-label="portion-select"
              value={day}
              onChange={(value) => setDay(value)}
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="2" textValue="Delaware">
                    2 day
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="3" textValue="California">
                    3 day
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="4" textValue="Texas">
                    4 day
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="5" textValue="New York">
                    5 day
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="6" textValue="Washington">
                    6 day
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="7" textValue="Washington">
                    1 week
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
            <Tooltip delay={1000}>
              <Button isIconOnly variant="tertiary" size="sm">
                <CircleInfo />
              </Button>
              <Tooltip.Content>
                <p>
                  This means that this food will be inserted x times into the
                  database, and its protein and calories wil be shared accross
                  these days starting from today.
                </p>
              </Tooltip.Content>
            </Tooltip>
          </div>
        )}
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
