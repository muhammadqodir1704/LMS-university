"use client";
import { useTheme } from "@/app/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex gap-2 items-center justify-center">
      <button
        aria-label="Light mode"
        onClick={() => theme !== "light" && toggleTheme()}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 font-medium shadow-sm
          ${theme === "light" ? "bg-[var(--color-primary)] text-white" : "bg-gray-200 text-gray-600 hover:bg-[var(--color-primary-hover)] hover:text-white"}`}
      >
        <Sun className="w-4 h-4" /> Light
      </button>
      <button
        aria-label="Dark mode"
        onClick={() => theme !== "dark" && toggleTheme()}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 font-medium shadow-sm
          ${theme === "dark" ? "bg-gray-900 text-[var(--color-accent)]" : "bg-gray-200 text-gray-600 hover:bg-gray-400"}`}
      >
        <Moon className="w-4 h-4" /> Dark
      </button>
    </div>
  );
};

export default ThemeToggle;
