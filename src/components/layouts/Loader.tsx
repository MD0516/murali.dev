import { Loader2 } from 'lucide-react'

const Loader = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background text-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-code-accent" />
            <p className="mt-4 font-mono text-xs text-text-muted uppercase tracking-widest">
                Booting environment...
            </p>
        </div>
    )
}

export default Loader