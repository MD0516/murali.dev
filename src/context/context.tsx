"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSession } from "@/api/queries/auth";

type Theme = "light" | "dark";

type AppContextType = {
    isAdmin: boolean;
    isSessionLoading: boolean;
    theme: Theme;
    toggleTheme: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading: isSessionLoading } = useSession();
    const isAdmin = !!data?.isAdmin;

    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTheme(saved);
        }
    }, []);

    // DOM SYNC ONLY — no writes here
    useEffect(() => {
        document.documentElement.classList.toggle("light", theme === "light");

        const link = document.getElementById("app-favicon") as HTMLLinkElement | null;
        if (link) {
            link.href = theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg";
        }
    }, [theme]);

    // WRITE happens here, only when the user actually acts
    const toggleTheme = () => {
        setTheme((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", next);
            return next;
        });
    };

    const state: AppContextType = { isAdmin, isSessionLoading, theme, toggleTheme };

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext) as AppContextType;