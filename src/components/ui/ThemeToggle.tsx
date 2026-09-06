"use client"

import { Moon, SunDimIcon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTheme(saved);
        } else {
            localStorage.setItem("theme", "dark");
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("light", theme === "light");

        const link = document.getElementById("app-favicon") as HTMLLinkElement | null;
        if (link) {
            link.href = theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg";
        }
    }, [theme]);

    const handleChangeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };


    return (
        <button
            className='flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-all hover:border-code-accent/60 hover:text-foreground focus:outline-none cursor-pointer'
            onClick={handleChangeTheme}
        >
            {
                theme === "dark" ?
                    <SunDimIcon className="h-4 w-4" /> :
                    <Moon className="h-4 w-4" />
            }
        </button>
    )
}

export default ThemeToggle