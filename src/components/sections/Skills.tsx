"use client"
import { useSkillsQuery } from '@/api/queries/skills'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Folder } from 'lucide-react';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'

const Skills = () => {
  const { data: skills = [] } = useSkillsQuery();
  const [activeGroup, setActiveGroup] = useState("")
  const [typedCommand, setTypedCommand] = useState("")
  const [showSkills, setShowSkills] = useState(false)
  const cycleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })

  const groupNames = useMemo(() =>
    skills.map(skill => skill.category),
    [skills]
  );

  // Set initial active group — only once section is in view
  useEffect(() => {
    if (isInView && skills.length > 0 && !activeGroup) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveGroup(skills[0].category);
    }
  }, [skills, activeGroup, isInView]);

  // Typing effect
  useEffect(() => {
    if (!activeGroup) return;

    const command = `ls skills/${activeGroup.toLowerCase().replace(/ \/ /g, "-")}`;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSkills(false);
    setTypedCommand("");

    let charIndex = 0;
    const typeTimer = setInterval(() => {
      if (charIndex < command.length) {
        setTypedCommand(command.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => setShowSkills(true), 200);
      }
    }, 50);

    return () => clearInterval(typeTimer);
  }, [activeGroup]);

  // Start/restart cycle timer helper
  const startCycleTimer = useCallback(() => {
    if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
    if (groupNames.length === 0) return;

    cycleTimerRef.current = setInterval(() => {
      setActiveGroup((current) => {
        const currentIndex = groupNames.indexOf(current);
        const nextIndex = (currentIndex + 1) % groupNames.length;
        return groupNames[nextIndex] || groupNames[0];
      });
    }, 4000);
  }, [groupNames]);

  const stopCycleTimer = useCallback(() => {
    if (cycleTimerRef.current) {
      clearInterval(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
  }, []);

  // Auto-cycle ONLY while in view
  useEffect(() => {
    if (!isInView || !activeGroup) {
      stopCycleTimer();
      return;
    }

    startCycleTimer();
    return () => stopCycleTimer();
  }, [isInView, activeGroup, startCycleTimer, stopCycleTimer]);

  // Handle manual click — reset cycle timer
  const handleGroupClick = (category: string) => {
    setActiveGroup(category);
    if (isInView) startCycleTimer();
  };

  const selectedSkills = skills.find((group) => group.category === activeGroup)?.skills || [];

  return (
    <section ref={sectionRef} id='skills' className='w-full pb-20 pt-15'>
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
              {skills.map((skill) => (
                <motion.button
                  key={skill._id}
                  onClick={() => handleGroupClick(skill.category)}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 + skill.category.length * 0.01, duration: 0.3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group inline-flex items-center gap-2 leading-none transition-colors duration-200 cursor-pointer ${activeGroup === skill.category
                    ? "text-code-accent"
                    : "text-text-muted hover:text-sidebar-foreground"
                    }`}
                >
                  <span className='inline-flex items-center justify-center shrink-0'>
                    <Folder
                      size={16}
                      fill='currentColor'
                      strokeWidth={1.5}
                      className='translate-y-[-0.5px]'
                    />
                  </span>
                  <span className='leading-none'>{skill.category}</span>
                </motion.button>
              ))}
            </motion.div>

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

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="mt-5 border-l border-code-accent/40 pl-4 leading-7 text-foreground"
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
                    {selectedSkills.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.3 }}
                      >
                        - {item}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;