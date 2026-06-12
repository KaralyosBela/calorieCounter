export type FoodFromDb = {
  id: string;
  user_id: string;
  name: string;
  protein: number;
  calories: number;
  created_at: string;
};

export type Food = {
  userId: string;
  id: string;
  name: string;
  protein: number;
  calories: number;
  createdAt: string | null;
};

// export type AddFood = Omit<Food, "id" | "createdAt"> & {
//   createdAt?: string | null;
// };

export type AddFood = {
  name: string;
  protein: number;
  calories: number;
  createdAt?: string | null;
};
