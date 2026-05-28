import { Button } from "@heroui/react";
import { supabase } from "../database/supabase";
import { ArrowRightFromSquare } from "@gravity-ui/icons";

const linkClass =
  "hover:text-blue-500 hover:scale-105 transition-all duration-300";

export const Header = () => {
  const onLogoutPress = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="flex h-12 p-4 items-center justify-end bg-white ">
      <div className="flex flex-row gap-4 justify-center items-center">
        <a href="#" className={linkClass}>
          About this project
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
