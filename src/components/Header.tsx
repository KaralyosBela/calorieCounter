import { Button } from "@heroui/react";
import { supabase } from "../database/supabase";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { NavLink } from "react-router";

const linkClass = "hover:text-blue-500 transition-all duration-300";

export const Header = () => {
  const onLogoutPress = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="flex flex-row h-12 p-4 gap-4 items-center justify-end bg-white sticky border-b-2 border-gray-200 z-10">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? "text-blue-500 " : ""}`
        }
        viewTransition
      >
        Database
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? "text-blue-500" : ""}`
        }
        viewTransition
      >
        Charts
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? "text-blue-500" : ""}`
        }
        viewTransition
      >
        Settings
      </NavLink>
      <Button
        onPress={onLogoutPress}
        className="hover:scale-105 duration-300 ease-in-out transition-all hover:rotate-5"
      >
        <ArrowRightFromSquare />
        Logout
      </Button>
    </div>
  );
};
