// hooks/useFoods.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../database/supabase";
import dayjs from "dayjs";
import type { AddFood, Food, FoodFromDb } from "../types/types";

const mapper = (foods: FoodFromDb[]): Food[] =>
  foods.map((food) => ({
    id: food.id,
    name: food.name,
    protein: food.protein,
    calories: food.calories,
    createdAt: dayjs
      .utc(food.created_at)
      .tz("Europe/Budapest")
      .format("YYYY-MM-DD HH:mm"),
  }));

export const useFoods = () => {
  const queryClient = useQueryClient();

  const foodsQuery = useQuery<Food[]>({
    queryKey: ["foods"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("foods")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      return mapper(data ?? []);
    },
  });

  const addFood = useMutation({
    mutationFn: async (food: AddFood) => {
      console.log(food);
      const { error } = await supabase.from("foods").insert(food);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });

  const deleteFood = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("foods").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });

  const updateFood = useMutation({
    mutationFn: async ({ id, food }: { id: string; food: AddFood }) => {
      const { error } = await supabase
        .from("foods")
        .update({
          name: food.name,
          protein: food.protein,
          calories: food.calories,
          created_at: food.createdAt,
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });

  return {
    foods: foodsQuery.data ?? [],
    isLoading: foodsQuery.isLoading,
    error: foodsQuery.error,
    addFood: addFood.mutateAsync,
    isAdding: addFood.isPending,
    deleteFood: deleteFood.mutateAsync,
    updateFood: updateFood.mutateAsync,
  };
};
