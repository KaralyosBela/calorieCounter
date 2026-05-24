import { Button } from "@mui/material";
import Auth from "./components/Auth";
import { useAuth } from "./hooks/useAuth";
import { supabase } from "./database/supabase";

export default function App() {
  const session = useAuth();

  if (!session) return <Auth />;

  return (
    <div>
      Logged in 🎉
      <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
    </div>
  );
}
