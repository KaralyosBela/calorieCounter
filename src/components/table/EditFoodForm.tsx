import { useState } from "react";
import {
  Button,
  DateField,
  Input,
  Popover,
  TimeField,
  type TimeValue,
} from "@heroui/react";
import { Clock, FloppyDisk, Pencil, Calendar } from "@gravity-ui/icons";
import { useFoods } from "../../hooks/useFoods";
import type { Food } from "../../types/types";
import { parseDate, parseTime, type DateValue } from "@internationalized/date";

const parseCreatedAt = (createdAt: string) => {
  const [rawDate = "", rawTime = ""] = createdAt?.split(" ") ?? [];

  return {
    date: rawDate ? parseDate(rawDate) : null,
    time: rawTime ? parseTime(rawTime) : null,
  };
};

export const EditFoodForm = ({ food }: { food: Food }) => {
  const { updateFood } = useFoods();
  const [isOpen, setIsOpen] = useState(false);
  const { date, time } = parseCreatedAt(food.createdAt ?? "");

  const [name, setName] = useState(food.name);
  const [protein, setProtein] = useState(String(food.protein));
  const [calories, setCalories] = useState(String(food.calories));
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(date);
  const [selectedTime, setSelectedTime] = useState<TimeValue | null>(time);

  const createdAt =
    selectedDate && selectedTime
      ? `${setSelectedDate.toString()} ${selectedTime.toString()}`
      : food.createdAt;

  const handleSave = async () => {
    await updateFood({
      id: food.id,
      food: {
        name,
        protein: Number(protein),
        calories: Number(calories),
        createdAt,
      },
    });

    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <Button
          isIconOnly
          size="sm"
          variant="tertiary"
          className="hover:rotate-25 hover:scale-110 transition-transform duration-300"
        >
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
            <DateField
              name="date"
              aria-label="date"
              value={selectedDate}
              onChange={setSelectedDate}
            >
              <DateField.Group>
                <DateField.Prefix>
                  <Calendar className="size-4 text-muted" />
                </DateField.Prefix>
                <DateField.Input>
                  {(segment) => <DateField.Segment segment={segment} />}
                </DateField.Input>
              </DateField.Group>
            </DateField>
            <TimeField
              name="time"
              aria-label="time"
              value={selectedTime}
              onChange={setSelectedTime}
            >
              <TimeField.Group>
                <TimeField.Prefix>
                  <Clock className="size-4 text-muted" />
                </TimeField.Prefix>
                <TimeField.Input>
                  {(segment) => <TimeField.Segment segment={segment} />}
                </TimeField.Input>
              </TimeField.Group>
            </TimeField>
            <Button className="w-full" onPress={handleSave}>
              <FloppyDisk />
              Save changes
            </Button>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};
