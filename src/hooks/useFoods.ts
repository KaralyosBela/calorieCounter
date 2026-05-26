// hooks/useFoods.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../database/supabase";

export const useFoods = () => {
  const queryClient = useQueryClient();

  const foodsQuery = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("foods")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
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

  return {
    foods: foodsQuery.data ?? [],
    isLoading: foodsQuery.isLoading,
    error: foodsQuery.error,
    addFood: addFood.mutateAsync,
    isAdding: addFood.isPending,
  };
};
