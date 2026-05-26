import { Typography, Button } from "@heroui/react";
import { supabase } from "../database/supabase";
import { ArrowRightFromSquare } from "@gravity-ui/icons";

const linkClass =
  "hover:text-blue-500 hover:scale-105 transition-all duration-300";

export const Header = () => {
  const onLogoutPress = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="flex h-12 p-4 items-center justify-between bg-white ">
      <Typography type="h5">
        {/* Logged in as {session.user.email} */}
        Count your{" "}
        <span className="inline-block text-yellow-500 hover:text-red-500 hover:rotate-360 transition-all duration-300 hover:cursor-pointer">
          calories
        </span>{" "}
        and protein intake easily!
      </Typography>

      <div className="flex flex-row gap-4 justify-center items-center">
        <a href="#" className={linkClass}>
          About
        </a>
        <a href="#" className={linkClass}>
          Something
        </a>
        <a href="#" className={linkClass}>
          Settings
        </a>
        <Button
          onPress={onLogoutPress}
          className="hover:scale-105 duration-300 ease-in-out transition-all hover:rotate-5"
        >
          <ArrowRightFromSquare />
          Logout
        </Button>
      </div>
    </div>
  );
};
