"use client"

import { ReactNode, useEffect, useState } from "react"
import FourOhFour from "./FourOhFour"
import DeployLoader from "./DeployLoader"
import { useAppContext } from "@/context/context"
import Loader from "../layouts/Loader"
import { useSession } from '@/api/queries/auth';
import { useProjectsQuery } from '@/api/queries/projects';
import { useSkillsQuery } from '@/api/queries/skills';
import { useAboutQuery } from '@/api/queries/about';
import { useTimelineQuery } from '@/api/queries/timeline';

type Stage = "404" | "deploying" | "deployed" | "cooldown"

type Props = {
    children: ReactNode,
    className?: string
}

const DeployReveal = ({
    children,
    className
}: Props) => {
    useSession()
    useProjectsQuery()
    useSkillsQuery()
    useAboutQuery()
    useTimelineQuery()

    const { storageKey, recentlyDeployed } = useAppContext()
    const [stage, setStage] = useState<Stage | null>(null)

    const markDeployed = () => {
        try {
            localStorage.setItem(storageKey, String(Date.now()))
        } catch { }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStage(recentlyDeployed() ? "deployed" : "404")
    }, [])

    if (stage === null) return <Loader />
    if (stage === "404") return <FourOhFour onDeploy={() => setStage("deploying")} />
    if (stage === "deploying")
        return (
            <DeployLoader
                onComplete={() => {
                    markDeployed()
                    setStage("deployed")
                }}
            />
        )
    return <div className={`${className}`}>{children}</div>
}

export default DeployReveal