import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '../ui/ThemeToggle';

type Props = {
    onComplete: () => void;
}

const logs = [
    { text: "$ npm run build", type: "command" },
    { text: "> portfolio-404@1.0.0 build", type: "info" },
    { text: "> next build", type: "info" },
    { text: "", type: "empty" },
    { text: "   Creating an optimized production build...", type: "info" },
    { text: " ✓ Compiled successfully", type: "success" },
    { text: " ✓ Generating static pages (2/2)", type: "success" },
    { text: " ✓ Collecting page data", type: "info" },
    { text: " ✓ Finalizing page optimization", type: "info" },
    { text: "", type: "empty" },
    { text: "Route (app)                    Size     First Load JS", type: "info" },
    { text: "┌ ○ /                        2.1 kB          78.4 kB", type: "info" },
    { text: "└ ○ /_not-found              872 B          77.2 kB", type: "info" },
    { text: "", type: "empty" },
    { text: "○  (Static)   prerendered as static content", type: "muted" },
    { text: "", type: "empty" },
    { text: "Deploying to production...", type: "accent" },
    { text: " ✓ Uploading build artifacts", type: "success" },
    { text: " ✓ Configuring CDN", type: "success" },
    { text: " ✓ Setting up HTTPS certificates", type: "success" },
    { text: " ✓ Deployment successful!", type: "success" },
];

const DeployLoader = ({
    onComplete
}: Props) => {
    const terminalRef = useRef<HTMLDivElement>(null);

    const [visibleLogs, setVisibleLogs] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timers = logs.map((_, index) =>
            setTimeout(() => {
                setVisibleLogs(index + 1)
                setProgress((index + 1) * (100 / logs.length))
            }, 380 + index * 460)
        )
        return () => timers.forEach(clearTimeout)
    }, [])

    useEffect(() => {
        if (terminalRef.current) {
            const terminal = terminalRef.current
            if (terminal.scrollHeight > terminal.clientHeight) {
                terminal.scrollTop = terminal.scrollHeight;
            }
        }
    }, [visibleLogs])

    useEffect(() => {
        if (visibleLogs >= logs.length) {
            const timer = setTimeout(() => {
                onComplete()
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [visibleLogs, onComplete])

    return (
        <div className='relative flex justify-center items-center min-h-screen'>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className='absolute right-6 top-6 sm:right-10 sm:top-8'
            >
                <ThemeToggle />
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="w-full max-w-2xl mx-3"
            >
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className='mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted'
                >
                    <span>deploy / portfolio v1</span>
                    <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className='text-code-accent'
                    >
                        live
                    </motion.span>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className='overflow-hidden rounded-xl border border-border bg-surface shadow-[0_0_80px_color-mix(in_srgb,var(--color-code-accent)_25%,transparent)]'
                >
                    <div className='flex items-center h-12 border-b border-border px-4'>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            className="flex gap-1.5"
                        >
                            <motion.span
                                animate={{ opacity: [1, 0.6, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                                className='w-2.5 h-2.5 bg-danger rounded-full'
                            />
                            <motion.span
                                animate={{ opacity: [1, 0.6, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                className='w-2.5 h-2.5 bg-warning rounded-full'
                            />
                            <motion.span
                                animate={{ opacity: [1, 0.6, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                                className='w-2.5 h-2.5 bg-success rounded-full'
                            />
                        </motion.div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className='mx-auto font-mono pr-10 text-xs text-text-muted'
                        >
                            deploy.sh
                        </motion.span>
                    </div>
                    
                    <div
                        className="h-87.5 sm:h-100 overflow-y-auto font-mono p-6 text-xs sm:text-sm sm:p-10 [&::-webkit-scrollbar]:hidden scrollbar-none transition-all"
                        ref={terminalRef}
                        aria-live='polite'
                    >
                        <AnimatePresence>
                            {visibleLogs === 0 && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="inline-block w-0.75 h-3.25 bg-code-accent cursor-blink"
                                />
                            )}
                            
                            {logs.slice(0, visibleLogs).map((log, i) => (
                                <motion.span
                                    key={`log-${i}-${log.text}`}
                                    initial={{ opacity: 0, x: -10, y: 5 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ 
                                        duration: 0.4, 
                                        ease: [0.4, 0, 0.2, 1],
                                        delay: i === visibleLogs - 1 ? 0.1 : 0 
                                    }}
                                    className={`block log-${log.type}`}
                                >
                                    {log.text}
                                </motion.span>
                            ))}
                            
                            {visibleLogs >= logs.length && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [1, 0, 1, 0, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="inline-block w-0.75 h-3.25 bg-code-accent cursor-blink"
                                />
                            )}
                        </AnimatePresence>
                    </div>
                    
                    <div className="relative h-0.5 w-full bg-border">
                        <motion.div
                            className='h-full bg-code-accent'
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                        <span
                            className='absolute -top-4 tabular-nums transition-all duration-500 ease-out font-mono text-[10px] text-code-accent'
                            style={{
                                left: `${progress}%`,
                                transform: `translateX(-${progress}%)`
                            }}
                        >
                            {Math.round(progress)}%
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default DeployLoader