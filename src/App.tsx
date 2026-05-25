import Auth from "./components/Auth";
import { useAuth } from "./hooks/useAuth";
import { supabase } from "./database/supabase";
import { MainPage } from "./components/MainPage";
import { Button, Typography } from "@heroui/react";

export default function App() {
  const session = useAuth();

  if (!session) return <Auth />;

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between p-2 border-b bg-white shrink-0">
        <Typography className="text-md font-semibold">
          Logged in as {session.user.email}
        </Typography>
        <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <MainPage />
      </div>
    </div>
  );
}
