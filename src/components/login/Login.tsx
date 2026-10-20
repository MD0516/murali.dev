"use client"
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LogoIcon } from '../ui/Icons'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLoginMutation } from '@/api/queries/auth'

const Login = () => {
    const { mutate: loginMutate, isPending } = useLoginMutation();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [rememberMe, setRememberMe] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const payload = {
            ...formData,
            rememberMe
        }
        loginMutate(payload)
    }

    return (
        <div className='w-full max-w-md mx-auto'>
            <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => router.push("/")}
                className='flex items-center justify-start gap-2 font-mono text-sm text-text-muted hover:text-code-accent transition-colors duration-200 cursor-pointer group'
            >
                <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
                <span>
                    back to portfolio
                </span>
            </motion.span>

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                className='bg-surface border border-border rounded-md p-6 mt-10 shadow-[0_0_30px_color-mix(in_srgb,var(--code-accent)_10%,transparent)]'
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex flex-col items-start gap-3"
                >
                    <LogoIcon size={48} />
                    <div>
                        <p className='text-[11px] uppercase text-code-accent tracking-[0.2em] font-mono font-light'>
                            private access / 01
                        </p>
                    </div>
                </motion.div>

                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className='mt-5 text-3xl font-semibold text-foreground tracking-tight'
                >
                    Welcome back.
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className='text-sm text-text-muted mt-2'
                >
                    Sign in to preview your portfolio dashboard
                </motion.p>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label htmlFor="email" className="block font-mono text-xs text-text-muted mb-2">
                            <span className="text-code-accent">$</span> email or username
                        </label>
                        <div className="relative">
                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full rounded-md border border-border bg-page pl-10 pr-4 py-2.5 font-mono text-sm text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-code-accent focus:ring-1 focus:ring-code-accent transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block font-mono text-xs text-text-muted mb-2">
                            <span className="text-code-accent">$</span> password
                        </label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full rounded-md border border-border bg-page pl-10 pr-10 py-2.5 font-mono text-sm text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-code-accent focus:ring-1 focus:ring-code-accent transition-all duration-200"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors duration-200 cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                className="w-3.5 h-3.5 rounded border border-border bg-page cursor-pointer accent-code-accent"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <span className="text-xs text-text-muted">Remember me</span>
                        </label>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isPending}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group w-full inline-flex items-center justify-center gap-2 rounded-md bg-sidebar-primary px-4 py-3 font-mono text-sm font-medium text-page transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_20px_color-mix(in_srgb,var(--code-accent)_30%,transparent)] focus:outline-none focus:ring-2 focus:ring-code-accent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isPending ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin" />
                                Authenticating...
                            </span>
                        ) : (
                            <>
                                <span>Log In</span>
                                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                            </>
                        )}
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    )
}

export default Login