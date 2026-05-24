/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import { supabase } from "./utils/util";
// import { useUser } from "./useGetUser";

// export default function App() {
//   const user = useUser();
//   console.log(user);
//   const [data, setData] = useState<any>([]);
//   useEffect(() => {
//     async function getTodos() {
//       const { data } = await supabase.from("foods").select();
//       setData(data);
//       console.log(data);
//     }

//     getTodos();
//   }, []);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       console.log("session:", data.session);
//     });

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         console.log("auth changed:", session);
//       },
//     );

//     return () => listener.subscription.unsubscribe();
//   }, []);

//   //NAPI
//   // supabase
//   // .from("food_logs")
//   // .select("calories, protein")
//   // .eq("user_id", user.id)
//   // .gte("eaten_at", "2026-05-23")

//   //HETI
//   // supabase
//   // .from("food_logs")
//   // .select("*")
//   // .gte("eaten_at", startOfWeek)

//   return (
//     <>
//       asd
//       {data.map((d: any) => {
//         return <p>{d.name}</p>;
//       })}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { supabase } from "./database/supabase";
import Auth from "./components/Auth";

export default function App() {
  console.log(import.meta.env);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!session) return <Auth />;

  return (
    <div>
      Logged in 🎉
      <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
    </div>
  );
}
