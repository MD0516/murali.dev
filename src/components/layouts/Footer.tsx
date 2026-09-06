"use client"
import { motion } from 'framer-motion'

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='w-full flex justify-between items-center text-xs text-text-muted mb-10 font-mono border-t border-border/50 pt-6'
        >
            <p className='flex items-center gap-2'>
                <span className="text-code-accent">{'//'}</span>
                deployed successfully from a 404
            </p>

            <p>
                © {year}
            </p>
        </motion.div>
    )
}

export default Footer