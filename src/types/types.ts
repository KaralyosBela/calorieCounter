export type FoodFromDb = {
  id: string;
  name: string;
  protein: number;
  calories: number;
  created_at: string | null;
};

export type Food = {
  id: string;
  name: string;
  protein: number;
  calories: number;
  createdAt: string | null;
};

export type AddFood = Partial<Omit<Food, "id">>;
