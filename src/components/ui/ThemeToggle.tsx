"use client"

import { useAppContext } from "@/context/context";
import { Moon, SunDimIcon } from "lucide-react";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useAppContext();

    return (
        <button
            className='flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-all hover:border-code-accent/60 hover:text-foreground focus:outline-none cursor-pointer'
            onClick={toggleTheme}
        >
            {theme === "dark" ? <SunDimIcon className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    );
};

export default ThemeToggle;