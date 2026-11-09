"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSession } from "@/api/queries/auth";
import { useProjectsQuery } from '@/api/queries/projects';
import { useSkillsQuery } from '@/api/queries/skills';
import { useAboutQuery } from '@/api/queries/about';
import { useTimelineQuery } from '@/api/queries/timeline';

const THEME_KEY = "md_port_theme";
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
    useProjectsQuery()
    useSkillsQuery()
    useAboutQuery()
    useTimelineQuery()
    
    const isAdmin = !!data?.isAdmin;

    const [theme, setTheme] = useState<Theme>("dark");
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(THEME_KEY);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (saved === "light" || saved === "dark") setTheme(saved);
        setHydrated(true);
    }, []);

    // DOM sync only, and skip until the saved theme has been loaded
    useEffect(() => {
        if (!hydrated) return;

        document.documentElement.classList.toggle("light", theme === "light");
    }, [theme, hydrated]);

    // WRITE happens here, only when the user actually acts
    const toggleTheme = () => {
        setTheme((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem(THEME_KEY, next);
            return next;
        });
    };

    const state: AppContextType = { isAdmin, isSessionLoading, theme, toggleTheme };

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext) as AppContextType;