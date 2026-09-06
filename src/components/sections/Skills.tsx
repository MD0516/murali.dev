"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const skillGroups = {
  Languages: ["JavaScript", "TypeScript", "PHP"],
  Frontend: ["HTML", "CSS", "React", "Bootstrap", "Tailwind CSS", "Next.js"],
  Backend: ["Node.js", "Express", "Nest.js", "Laravel"],
  Databases: ["MySQL", "PostgreSQL", "MongoDB"],
  "Cloud / DevOps": ["Google Cloud Run"],
  Tools: ["Git", "GitHub"],
}

const Skills = () => {
  const [activeGroup, setActiveGroup] = useState("Languages")
  const [typedCommand, setTypedCommand] = useState("")
  const [showSkills, setShowSkills] = useState(true)
  const groups = Object.entries(skillGroups)

  useEffect(() => {
    const command = `ls skills/${activeGroup.toLowerCase().replace(/ \/ /g, "-")}`
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSkills(false)
    setTypedCommand("")

    let charIndex = 0
    const typeTimer = setInterval(() => {
      if (charIndex < command.length) {
        setTypedCommand(command.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeTimer)
        setTimeout(() => setShowSkills(true), 200)
      }
    }, 50)

    return () => clearInterval(typeTimer)
  }, [activeGroup])

  useEffect(() => {
    const groupNames = Object.keys(skillGroups);

    const cycleTimer = setInterval(() => {
      setActiveGroup((current) => {
        const currentIndex = groupNames.indexOf(current);
        const nextIndex = (currentIndex + 1) % groupNames.length;
        return groupNames[nextIndex];
      })
    }, 4000)

    return () => clearInterval(cycleTimer)
  }, [])

  return (
    <section id='skills' className='w-full pb-20 pt-15'>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-mono text-xs uppercase text-code-accent tracking-[0.2em] mb-2"
        >
          03 / toolkit
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='flex justify-between items-center mb-10'
        >
          <h2 className='text-3xl font-medium tracking-[0.04em] text-foreground'>
            Built to move fast
          </h2>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className='p-5 overflow-hidden max-h-130 rounded-xl border border-border bg-surface shadow-[0_0_20px_color-mix(in_srgb,var(--color-code-accent)_30%,transparent)] cursor-pointer'
        >
          <div className='w-full flex justify-between items-center h-12 px-4 border-b border-border'>
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
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.3 }}
              className='font-mono text-xs text-text-muted'
            >
              skills.sh
            </motion.span>
          </div>

          <div className='font-mono text-sm space-y-2 p-4 min-h-75 transition-all duration-500 leading-7'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className='text-xs text-text-muted leading-7'
            >
              <p>$ cd skills</p>
              <p>$ ls</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className='flex gap-3 items-center flex-wrap'
            >
              {groups.map(([category]) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveGroup(category)}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 + category.length * 0.01, duration: 0.3 }}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex justify-center items-center gap-3 transition-colors duration-200 cursor-pointer ${activeGroup === category
                    ? "text-code-accent"
                    : "text-text-muted hover:text-sidebar-foreground"
                    }`}
                >
                  <motion.span
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                    className='group-hover:translate-x-2 transition-all duration-200'
                  >
                    📁
                  </motion.span>
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Autotyped command */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2, duration: 0.5 }}
              className='text-code-accent mb-4 h-6'
            >
              <span>$ </span>
              <span>{typedCommand}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block"
              >
                ▌
              </motion.span>
            </motion.div>

            {/* Skills list with AnimatePresence */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="mt-7 border-l border-code-accent/40 pl-4 leading-7 text-foreground"
            >
              <AnimatePresence mode="wait">
                {showSkills && (
                  <motion.div
                    key={activeGroup}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {skillGroups[activeGroup as keyof typeof skillGroups].map(
                      (item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i, duration: 0.3 }}
                        >
                          - {item}
                        </motion.div>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Skills