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
    createdAt: dayjs(food.created_at).format("YYYY-MM-DD HH:mm"),
    userId: food.user_id,
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
    mutationFn: async ({
      food,
      servingSize,
    }: {
      food: AddFood;
      servingSize: number;
    }) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("User is not authenticated");

      const rows = Array.from({ length: servingSize }, (_, index) => ({
        name: food.name,
        protein: food.protein / servingSize,
        calories: food.calories / servingSize,
        created_at: dayjs().add(index, "day").format("YYYY-MM-DD HH:mm"),
        user_id: user.id,
      }));

      const { error } = await supabase.from("foods").insert(rows);

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
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("User is not authenticated");

      const { error } = await supabase
        .from("foods")
        .update({
          user_id: user.id,
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
