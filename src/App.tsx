import Auth from "./components/Auth";
import { useAuth } from "./hooks/useAuth";
import { MainPage } from "./components/MainPage";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router";
import { AnimatePresence } from "framer-motion";

import { motion } from "framer-motion";
import { Dashboard } from "./components/Dashboard";
import { SettingsPage } from "./components/SettingsPage";

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

  if (!session) return <Auth />;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}
