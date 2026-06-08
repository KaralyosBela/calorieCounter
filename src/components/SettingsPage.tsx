import { Button, Input, Label, Surface, TextField, toast } from "@heroui/react";
import { PageTransition } from "../App";
import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../store/store";
import { useState } from "react";

export const SettingsPage = () => {
  const { proteinGoal, calorieGoal, setProteinGoal, setCalorieGoal } =
    useAppStore(
      useShallow((state) => ({
        proteinGoal: state.proteinGoal,
        calorieGoal: state.calorieGoal,
        setProteinGoal: state.setProteinGoal,
        setCalorieGoal: state.setCalorieGoal,
      })),
    );

  const [localCalorieGoal, setLocalCalorieGoal] = useState(calorieGoal);
  const [localProteinGoal, setLocalProteinGoal] = useState(proteinGoal);

  const handleUpdate = () => {
    setCalorieGoal(localCalorieGoal);
    setProteinGoal(localProteinGoal);
    toast.success("Goals updated!");
  };

  return (
    <PageTransition>
      <div className="w-full h-full bg-gray-100 flex items-start justify-center p-4">
        <Surface
          className="flex flex-col rounded-3xl p-4 shadow-md w-full max-w-md"
          variant="default"
        >
          <h1 className="text-2xl font-bold mb-2">Your current goals</h1>
          <p className="text-sm text-default-500">
            Manage your protein and calorie goals
          </p>
          <div className="flex flex-col gap-4 mt-6">
            <TextField name="Protein" type="number">
              <Label>Protein goal per day (g)</Label>
              <Input
                placeholder="Enter your protein goal"
                value={localProteinGoal}
                onChange={(e) => setLocalProteinGoal(e.target.value)}
              />
            </TextField>
            <TextField name="Calories" type="number">
              <Label>Calorie goal per week (kcal)</Label>
              <Input
                placeholder="Enter your calorie goal"
                value={localCalorieGoal}
                onChange={(e) => setLocalCalorieGoal(e.target.value)}
              />
            </TextField>
            <Button className="w-full" onClick={handleUpdate}>
              Update goals
            </Button>
          </div>
        </Surface>
      </div>
    </PageTransition>
  );
};
