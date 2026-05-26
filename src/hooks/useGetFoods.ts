import { useEffect, useState } from "react";
import { supabase } from "../database/supabase";

export const useGetFoods = () => {
  const [foods, setFoods] = useState<any[]>([]);

  const fetchFoods = async () => {
    const { data } = await supabase.from("foods").select("*");
    setFoods(data ?? []);
  };

  const addFood = async (food: any) => {
    await supabase.from("foods").insert(food);
    await fetchFoods();
  };

  const searchFoods = async (search: string) => {
    const isNumber = !isNaN(Number(search));

    let query = supabase.from("foods").select("*");

    if (isNumber) {
      query = query.or(
        `name.ilike.%${search}%,protein.eq.${Number(search)},calories.eq.${Number(search)}`,
      );
    } else {
      query = query.ilike("name", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      return;
    }

    setFoods(data ?? []);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return { foods, fetchFoods, addFood, searchFoods };
};
