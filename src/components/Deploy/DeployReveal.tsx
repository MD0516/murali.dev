"use client"

import { ReactNode, useState } from "react"
import FourOhFour from "./FourOhFour"
import DeployLoader from "./DeployLoader"

type Props = {
    children: ReactNode,
    className?: string
}

const DeployReveal = ({
    children,
    className
}: Props) => {
    const [stage, setStage] = useState<"404" | "deploying" | "deployed">("404")

    // if (stage === "404") return <FourOhFour onDeploy={() => setStage("deploying")} />
    // if (stage === "deploying") return <DeployLoader onComplete={() => setStage("deployed")} />
    return <div className={`${className}`}>{children}</div>
}

export default DeployReveal