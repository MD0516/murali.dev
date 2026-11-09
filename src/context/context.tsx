"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSession } from "@/api/queries/auth";
import { useProjectsQuery } from '@/api/queries/projects';
import { useSkillsQuery } from '@/api/queries/skills';
import { useAboutQuery } from '@/api/queries/about';
import { useTimelineQuery } from '@/api/queries/timeline';
import Loader from "@/components/layouts/Loader";

const THEME_KEY = "md_port_theme";
type Theme = "light" | "dark";

type AppContextType = {
    isAdmin: boolean;
    isSessionLoading: boolean;
    theme: Theme;
    toggleTheme: () => void;
    storageKey: string;
    cooldownMS: number;
    recentlyDeployed: () => boolean;
};

const STORAGE_KEY = "deploy-at"
const COOLDOWN_MS = 1000 * 60 * 60 * 24 // 1 day

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading: isSessionLoading } = useSession();
    const { isLoading: isProjectLoading } = useProjectsQuery()
    const { isLoading: isSkillsLoading } = useSkillsQuery()
    const { isLoading: isAboutLoading } = useAboutQuery()
    const { isLoading: isTimelinesLoading } = useTimelineQuery()

    const isLoading = isProjectLoading || isSkillsLoading || isAboutLoading || isTimelinesLoading;

    const isAdmin = !!data?.isAdmin;

    const [theme, setTheme] = useState<Theme>("dark");
    const [hydrated, setHydrated] = useState(false);
    const [hasDeployed, setHasDeployed] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(THEME_KEY);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (saved === "light" || saved === "dark") setTheme(saved);

        try {
            const at = Number(localStorage.getItem(STORAGE_KEY));
            if (at > 0 && Date.now() - at < COOLDOWN_MS) {
                setHasDeployed(true);
            }
        } catch { }

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

    const recentlyDeployed = () => {
        try {
            const at = Number(localStorage.getItem(STORAGE_KEY))
            return at > 0 && Date.now() - at < COOLDOWN_MS
        } catch {
            return false
        }
    }

    const state: AppContextType = {
        isAdmin,
        isSessionLoading,
        theme,
        toggleTheme,
        storageKey: STORAGE_KEY,
        cooldownMS: COOLDOWN_MS,
        recentlyDeployed
    };

    if (isLoading && hasDeployed) {
        return <Loader />;
    }

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext) as AppContextType;