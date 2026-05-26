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

  useEffect(() => {
    fetchFoods();
  }, []);

  return { foods, fetchFoods, addFood };
};
