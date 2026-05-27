// hooks/useFoods.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../database/supabase";
import dayjs from "dayjs";

const mapper = (foods: any[]) =>
  foods.map((food) => ({
    id: food.id,
    name: food.name,
    protein: food.protein,
    calories: food.calories,
    createdAt: food.created_at,
  }));

export const useFoods = () => {
  const queryClient = useQueryClient();

  const foodsQuery = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("foods")
        .select("*")
        .order("created_at");

      if (error) throw error;

      const x = mapper(data);

      return x ?? [];
    },
  });

  const addFood = useMutation({
    mutationFn: async (food: {
      name: string;
      protein: number;
      calories: number;
    }) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });

  return {
    foods: foodsQuery.data ?? [],
    isLoading: foodsQuery.isLoading,
    error: foodsQuery.error,
    addFood: addFood.mutateAsync,
    isAdding: addFood.isPending,
    deleteFood: deleteFood.mutateAsync,
  };
};
