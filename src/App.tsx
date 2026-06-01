import Auth from "./components/Auth";
import { useAuth } from "./hooks/useAuth";
import { MainPage } from "./components/MainPage";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router";
import { GoalCard } from "./components/GoalCard";
import { AnimatePresence } from "framer-motion";

import { motion } from "framer-motion";

export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{
      opacity: 0,
      scale: 0.98,
    }}
    animate={{
      opacity: 1,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      scale: 1.02,
    }}
    transition={{
      duration: 0.18,
    }}
    className="h-full"
  >
    {children}
  </motion.div>
);

export default function App() {
  const session = useAuth();

  // if (!session) return <Auth />;s

  return (
    // <Dashboard />
    // <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      {/* flex kitölti a maradék helyet, h-full okés ha a parent fullos, flex-1 biztosabb*/}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/goalCard" element={<GoalCard />} />
            {/* <Route path="/analytics" element={<AnalyticsPage />} /> */}
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

// import { Routes, Route } from "react-router";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<DashboardPage />} />
//       <Route path="/foods" element={<FoodsPage />} />
//       <Route path="/analytics" element={<AnalyticsPage />} />
//     </Routes>
//   );
// }
