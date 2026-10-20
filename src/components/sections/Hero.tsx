"use client"
import { ArrowUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sequence = [
  { type: "command", text: "whoami" },
  { type: "output", text: "murali dharan" },

  { type: "command", text: "cat role.txt" },
  { type: "output", text: "Full Stack Developer (MERN)" },

  { type: "command", text: "cat skills.txt" },
  { type: "output", text: "React · Node.js · Express · MongoDB" },

  { type: "command", text: "cat location.txt" },
  { type: "output", text: "Chennai, India" },

  { type: "command", text: "git log --oneline -1" },
  { type: "output", text: "Built an LMS with JWT/RBAC auth + 100 REST APIs" },

  { type: "command", text: "echo $STATUS" },
  { type: "output", text: "shipping code, always learning" },
];

const Hero = () => {
  const router = useRouter();
  const terminalRef = useRef<HTMLDivElement>(null);

  const [lines, setLines] = useState<{ type: string; text: string }[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= sequence.length) {
      const resetTimer = setTimeout(() => {
        setLines([]);
        setLineIndex(0);
        setCharIndex(0);
      }, 2000);
      return () => clearTimeout(resetTimer);
    }

    const current = sequence[lineIndex];

    if (current.type === "output") {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, current]);
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 400);
      return () => clearTimeout(timer);
    }

    if (charIndex < current.text.length) {
      const timer = setTimeout(() => {
        setCurrentText(current.text.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 60);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, current]);
        setCurrentText("");
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, charIndex]);

  useEffect(() => {
    if (terminalRef.current) {
      const terminal = terminalRef.current;
      if (terminal.scrollHeight > terminal.clientHeight) {
        terminal.scrollTop = terminal.scrollHeight;
      }
    }
  }, [lines, currentText]);

  return (
    <section id='hero' className='w-full h-100 flex justify-between items-center pb-20 lg:pb-32 pt-40'>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 max-w-xl"
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-mono text-xs uppercase text-code-accent tracking-[0.2em] mb-6"
        >
          01 / hello, world
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-5xl font-semibold leading-[1.05] tracking-[-0.06em] text-foreground sm:text-7xl mb-7'
        >
          I build things for the internet
        </motion.h1>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className='text-text-muted text-lg leading-7 mb-8'
        >
          Full stack developer turning complex problems into quiet, considered digital experiences.
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <button
            className='group inline-flex items-center gap-2 rounded-md bg-sidebar-primary px-6 py-3.5 font-mono text-sm tracking-widest text-page transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_24px_rgba(167,139,250,0.3)] focus:outline-none active:scale-98 cursor-pointer'
            onClick={() => router.push("#projects")}
          >
            View Projects
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="w-[30%] hidden lg:block"
      >
        <motion.div
          className='overflow-hidden rounded-xl border border-border bg-surface shadow-[0_0_70px_color-mix(in_srgb,var(--color-code-accent)_30%,transparent)]'
        >
          <div className='flex items-center h-12 px-4 border-b border-border'>
            <div className="flex gap-1.5">
              <motion.span
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className='w-2.5 h-2.5 bg-danger rounded-full'
              />
              <motion.span
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                className='w-2.5 h-2.5 bg-warning rounded-full'
              />
              <motion.span
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                className='w-2.5 h-2.5 bg-success rounded-full'
              />
            </div>
            <span className='mx-auto font-mono text-xs text-text-muted'>
              terminal
            </span>
          </div>

          <div
            ref={terminalRef}
            className="font-mono text-sm space-y-2 p-4 h-75 overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none transition-all duration-300"
          >
            <AnimatePresence>
              {lines.map((line, i) => (
                <motion.p
                  key={`${line.text}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                  className={line.type === "command" ? "text-code-accent" : "text-text-muted"}
                >
                  {line.type === "command" ? `$ ${line.text}` : line.text}
                </motion.p>
              ))}
            </AnimatePresence>

            {lineIndex < sequence.length && sequence[lineIndex].type === "command" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-code-accent"
              >
                $ {currentText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block"
                >
                  ▌
                </motion.span>
              </motion.p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero