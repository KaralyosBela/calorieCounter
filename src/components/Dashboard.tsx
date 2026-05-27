import { useState } from "react";
import { Button, IconPlus } from "@heroui/react";
import { MainPage } from "./MainPage";

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg
          transition-transform duration-300
          md:static md:translate-x-0 md:shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col p-4">
          <nav className="flex flex-col gap-2">
            <Button variant="primary" className="w-full">
              Dashboard
            </Button>

            <Button variant="primary" className="w-full">
              Foods
            </Button>

            <Button variant="primary" className="w-full">
              Analytics
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-white px-4">
          <Button
            isIconOnly
            variant="primary"
            className="md:hidden"
            onPress={() => setSidebarOpen(true)}
          >
            <IconPlus />
          </Button>

          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        {/* Page content */}
        <div className="min-h-0 flex-1 overflow-auto p-4">
          <MainPage />
        </div>
      </main>
    </div>
  );
};
