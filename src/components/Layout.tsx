import {
  BrainCircuit,
  FolderKanban,
  Inbox,
  KanbanSquare,
  Search,
  Terminal
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { path: "/", icon: Inbox, label: "Input" },
  { path: "/kanban", icon: KanbanSquare, label: "Kanban" },
  { path: "/para", icon: FolderKanban, label: "PARA" },
  { path: "/search", icon: Search, label: "Search" },
  { path: "/command", icon: Terminal, label: "Command" },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
      <nav className="w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 fixed h-full">
        <Link to="/" className="p-3 mb-6">
          <BrainCircuit className="w-6 h-6 text-sky-600 dark:text-sky-400" />
        </Link>
        <div className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative group ${
                  isActive
                    ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/50"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="absolute left-16 bg-gray-900 dark:bg-gray-700 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </nav>
      <main className="flex-1 ml-16 p-8">
        <Outlet />
      </main>
    </div>
  );
}
