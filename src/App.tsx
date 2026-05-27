import Auth from "./components/Auth";
import { useAuth } from "./hooks/useAuth";
import { MainPage } from "./components/MainPage";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

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
        <MainPage />
      </div>
    </div>
  );
}
