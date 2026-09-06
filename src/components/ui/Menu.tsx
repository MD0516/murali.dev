"use client"
import { MenuIcon, X, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
    links: {
        label: string;
        link: string;
    }[]
}

const Menu = ({ links }: Props) => {
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={menuRef} className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className='relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-all hover:border-code-accent/60 hover:text-foreground hover:bg-accent/5 focus:outline-none cursor-pointer overflow-hidden'
                aria-label="Toggle menu"
                aria-expanded={open}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {open ? (
                        <motion.span
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute"
                        >
                            <X className="h-4 w-4" />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute"
                        >
                            <MenuIcon className="h-4 w-4" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute right-0 mt-2 min-w-50 rounded-lg border border-border bg-card p-2 shadow-[0_25px_100px_rgba(0,0,0,0.55),0_0_70px_rgba(124,58,237,0.1)] backdrop-blur-xl z-50"
                    >
                        
                        {links.map((item, i) => (
                            <motion.div
                                key={item.link}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * (i + 1) }}
                            >
                                <Link
                                    href={item.link}
                                    onClick={() => setOpen(false)}
                                    className="group flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-code-accent/10 hover:text-code-accent cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 text-[11px] font-semibold text-text-muted uppercase">
                                        {item.label}
                                    </div>
                                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Menu