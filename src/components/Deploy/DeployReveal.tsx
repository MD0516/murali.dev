"use client"

import { ReactNode, useEffect, useState } from "react"
import FourOhFour from "./FourOhFour"
import DeployLoader from "./DeployLoader"

const STORAGE_KEY = "deploy-at"
const COOLDOWN_MS = 1000 * 60 * 60 * 24 // 1 day

type Stage = "404" | "deploying" | "deployed" | "cooldown"

const recentlyDeployed = () => {
    try {
        const at = Number(localStorage.getItem(STORAGE_KEY))
        return at > 0 && Date.now() - at < COOLDOWN_MS
    } catch {
        return false
    }
}

const markDeployed = () => {
    try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()))
    } catch { }
}

type Props = {
    children: ReactNode,
    className?: string
}

const DeployReveal = ({
    children,
    className
}: Props) => {
    const [stage, setStage] = useState<Stage>("cooldown")

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStage(recentlyDeployed() ? "deployed" : "404")
    }, [])

    if (stage === "cooldown") return <div className={`bg-page`} />
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