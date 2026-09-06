"use client"

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion'
import ThemeToggle from '../ui/ThemeToggle';

type Props = {
    onDeploy: () => void;
}

const FourOhFour = ({
    onDeploy
}: Props) => {
    return (
        <div className='relative flex min-h-screen items-center justify-center'>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className='absolute left-6 top-7 font-mono font-thin tracking-[.25em] text-[11px] text-text-muted flex items-center gap-3 p-5'
            >
                <motion.span
                    animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className='h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_12px_#fb7185]'
                />
                SYSTEM_STATUS: LOST
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className='absolute right-6 top-6 sm:right-10 sm:top-8 flex items-center p-5 gap-4'
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className='hidden sm:block font-mono font-thin tracking-[.25em] text-[11px] text-text-muted'
                >
                    ERR_404 / {new Date().getFullYear()}
                </motion.p>

                <ThemeToggle />
            </motion.div>

            <div className="body flex flex-col justify-center items-center mx-3">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="tagline text-code-accent text-xs tracking-[0.26em] font-mono flex gap-2 items-center mb-5 uppercase"
                >
                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='h-px w-8 bg-code-accent/60 origin-right'
                    />
                    route not found
                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='h-px w-8 bg-code-accent/60 origin-left'
                    />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    className='glitch-text select-none font-mono text-[clamp(8rem,28vw,17rem)] font-bold leading-[0.77] tracking-[-0.11em] text-foreground me-8 sm:me-14'
                >
                    404
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className='text-center font-mono text-text-muted mt-8 max-w-lg leading-7 sm:text-base sm:leading-8'
                >
                    You&apos;ve reached the page where my portfolio should be
                    It&apos;s not here. But I know how to fix it.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className='cursor-pointer group mt-9 inline-flex items-center gap-3 rounded-sm border border-code-accent/60 bg-code-accent/6 px-5 py-3 font-mono text-sm text-code-accent shadow-[0_0_30px_color-mix(in_srgb,var(--color-code-accent)_30%,transparent)] transition-all duration-300 hover:border-code-accent hover:bg-code-accent/13 hover:text-code-text focus:outline-none hover:scale-102 active:scale-98'
                    onClick={onDeploy}
                >
                    <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        $
                    </motion.span>
                    Deploy Fix
                    <motion.span
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.3 }}
                        className="inline-flex"
                    >
                        <ArrowRight size={15} />
                    </motion.span>
                </motion.button>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className='text-text-muted text-[10px] tracking-[0.2em] mt-16 uppercase'
                >
                    press button to continue
                </motion.p>
            </div>
        </div>
    )
}

export default FourOhFour