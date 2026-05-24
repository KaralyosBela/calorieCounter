import { Button } from "@mui/material";
import Auth from "./components/Auth";
import { useAuth } from "./hooks/useAuth";
import { supabase } from "./database/supabase";
import { useEffect, useState } from "react";

export default function App() {
  const session = useAuth();
  const [foods, setFoods] = useState<any[]>([]);

  console.log(import.meta.env);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from("foods").select("*");

      if (error) {
        console.error(error);
        return;
      }

      setFoods(data ?? []);
    };

    load();
  }, []);

  if (!session) return <Auth />;

  return (
    <div>
      <pre>{JSON.stringify(foods, null, 2)}</pre>
      Logged in 🎉
      <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
    </div>
  );
}
