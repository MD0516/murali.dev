"use client"
import { TimelineEntry } from '@/types';
import { motion } from 'framer-motion'

const timeline: TimelineEntry[] = [
  {
    id: "bcom",
    title: "B.Com in Computer Applications",
    institution: "Hindustan College of Arts & Science",
    type: "edu",
    status: "completed",
    startDate: "2019",
    endDate: "2022",
  },
  {
    id: "fita",
    title: "Full-stack development training",
    institution: "FITA Academy",
    type: "edu",
    status: "completed",
    startDate: "2022",
    endDate: "2023",
  },
  {
    id: "arkfa",
    title: "Internship",
    institution: "ARKFA Technologies",
    description:
      "Designed and built a full Learning Management System from scratch: JWT/RBAC authentication, 100+ REST APIs, deployed on Google Cloud Run.",
    type: "work",
    status: "completed",
    startDate: "2023",
    endDate: "2024",
  },
  {
    id: "mca",
    title: "MCA (Master of Computer Applications) via correspondence",
    institution: "University of Madras",
    description: "Currently in progress",
    type: "edu",
    status: "ongoing",
    startDate: "2025",
    endDate: "Expected 2028",
  },
  {
    id: "swe",
    title: "Software Engineer",
    institution: "Current role",
    type: "work",
    status: "current",
    startDate: "2026",
  },
];

const About = () => {
  return (
    <section id='about' className='w-full pb-20 pt-15'>
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
          04 / about
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='flex justify-between items-center mb-10'
        >
          <h2 className='text-3xl font-medium tracking-[0.04em] text-foreground'>
            A little context
          </h2>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className='p-6 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_0_20px_color-mix(in_srgb,var(--color-code-accent)_30%,transparent)] font-mono text-sm leading-7'
      >
        <div className='flex gap-2 text-xs'>
          <p className='rounded bg-code-accent/12 px-2 py-1 text-code-accent'>
            Full Stack Developer
          </p>
          <p className='rounded bg-secondary px-2 py-1 text-sidebar-foreground'>
            Chennai, India
          </p>
        </div>

        <h2 className='text-xl font-medium my-4'>
          # About me
        </h2>

        <p>
          Full-stack developer based in Chennai, India. Around a year of production experience from an internship at ARKFA Technologies, where I designed and built a Learning Management System from scratch — JWT/RBAC authentication, 100+ REST APIs, deployed on Google Cloud Run.
          Core stack is MERN (React, Node.js, Express, MongoDB) plus Laravel/PHP, and I&apos;ve since picked up Next.js.
          Studied B.Com in Computer Applications at Hindustan College of Arts & Science, completed full-stack training at FITA Academy, and currently pursuing an MCA via correspondence at University of Madras.
          Now working as a Software Engineer. I like building things end-to-end — from database schema to the pixels on screen — and this site itself is one of those things.
        </p>

        <p className='mt-3 border-s-2 border-accent ps-3 text-text-muted italic'>
          &gt; I like building things end-to-end — from database schema to the pixels on screen.
        </p>
        
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className='mt-7 mb-4 text-code-accent flex items-center gap-3'
        >
          <span className="h-px w-6 bg-code-accent/50" />
          $ git log --all
        </motion.h3>

        <div className="relative space-y-3 pl-7">
          <div className="absolute bottom-5 left-2 top-5 border border-dashed border-border" />

          {timeline.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: 0.2 + (index * 0.1),
                duration: 0.5,
                ease: "easeOut"
              }}
              className="relative rounded-lg border border-border bg-page p-4 hover:border-code-accent/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300"
            >
              <motion.span
                className={`absolute -left-6 top-5 h-2 w-2 rounded-full ${item.status === "current"
                  ? "bg-success shadow-[0_0_12px_color-mix(in_srgb,var(--success)_80%,transparent)]"
                  : item.status === "ongoing"
                    ? "bg-warning shadow-[0_0_12px_color-mix(in_srgb,var(--warning)_80%,transparent)]"
                    : "bg-code-accent"
                  }`}
              >
                {(item.status === "current" || item.status === "ongoing") && (
                  <span className={`absolute inset-0 rounded-full animate-ping opacity-30 
                    ${item.status === "current" ? "bg-success" : "bg-warning"}`} />
                )}
              </motion.span>

              {/* Content */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">
                    {item.institution}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2 text-[10px] uppercase tracking-[0.16em]">
                  <span className="text-text-muted">
                    {item.startDate} — {item.endDate ? item.endDate : "Present"}
                  </span>
                  <span
                    className={
                      item.type === "work" ? "text-success" : "text-code-accent"
                    }
                  >
                    {item.type}
                  </span>
                  {item.status === "ongoing" && (
                    <p className="rounded border border-dashed border-warning/60 px-1.5 py-0 text-warning">
                      ongoing
                    </p>
                  )}
                  {item.status === "current" && (
                    <p className="rounded bg-success/15 px-1.5 py-0 text-success">
                      current
                    </p>
                  )}
                </div>
              </div>

              {item.description && (
                <p className="mt-3 max-w-2xl text-xs leading-5 text-text-muted">
                  {item.description}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default About