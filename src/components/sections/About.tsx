"use client"
import { useAboutQuery } from '@/api/queries/about';
import { useTimelineQuery } from '@/api/queries/timeline';
import { motion } from 'framer-motion'
import { SkeletonTag, SkeletonText, SkeletonTimelineItem } from '../ui/Skeleton';
import { FolderGit2, NotepadText } from 'lucide-react';
import { useAppContext } from '@/context/context';
import AboutEditModal from '../admin/AboutEditModal';
import { Timeline } from '@/types';
import { useEffect, useState } from 'react';

const EmptyTimeline = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-page/50 px-6 py-10 text-center"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-muted">
      <FolderGit2 size={18} />
    </div>
    <div className="space-y-1">
      <p className="text-xs font-medium text-text-secondary">
        No commits to show
      </p>
      <p className="text-[11px] text-text-muted">
        <span className="text-code-accent">$</span> git log --all
        <span className="ml-1 text-text-muted/70">returned no entries</span>
      </p>
    </div>
  </motion.div>
)

const About = () => {
  const { isAdmin } = useAppContext()
  const { data: about, isLoading: aboutLoading } = useAboutQuery();
  const { data: timelines = [], isLoading: timelineLoading } = useTimelineQuery();

  const showAboutSkeleton = aboutLoading && !about
  const showTimelineSkeleton = timelineLoading && timelines.length === 0
  const timelinesEmpty = !timelineLoading && timelines.length === 0

  const formatDate = (date: Date | string): string => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <section id='about' className='w-full pb-20 pt-15'>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex justify-between items-center"
      >
        <div>
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
        </div>
        {isAdmin &&
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <AboutEditModal about={about} timelines={timelines}>
              <div className='btn btn-icon'>
                <NotepadText />
              </div>
            </AboutEditModal>
          </motion.div>
        }
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className='p-6 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_0_20px_color-mix(in_srgb,var(--color-code-accent)_30%,transparent)] font-mono text-sm leading-7'
      >
        <div className='flex gap-2 text-xs'>
          {showAboutSkeleton ? (
            <>
              <SkeletonTag width='5rem' />
              <SkeletonTag width='5rem' />
            </>
          ) : (
            <>
              {about?.role && (
                <p className='rounded bg-code-accent/12 px-2 py-1 text-code-accent'>
                  {about.role}
                </p>
              )}
              {about?.location && (
                <p className='rounded bg-secondary px-2 py-1 text-sidebar-foreground'>
                  {about.location}
                </p>
              )}
            </>
          )}
        </div>

        <h2 className='text-xl font-medium my-4'>
          # About me
        </h2>

        {showAboutSkeleton ? (
          <SkeletonText lines={6} />
        ) : (
          <p>{about?.bio}</p>
        )}

        {showAboutSkeleton ? (
          <div className='mt-3 border-s-2 border-accent ps-3'>
            <SkeletonText lines={1} />
          </div>
        ) : (
          <p className='mt-3 border-s-2 border-accent ps-3 text-text-muted italic'>
            &gt; {about?.tagline}
          </p>
        )}

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

          {showTimelineSkeleton ? (
            <>
              <SkeletonTimelineItem delay={0.2} />
              <SkeletonTimelineItem delay={0.3} />
              <SkeletonTimelineItem delay={0.4} />
            </>
          ) : timelinesEmpty ? (
            <EmptyTimeline />
          ) : (
            timelines.map((item, index) => (
              <motion.article
                key={item._id}
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
                      {formatDate(item.startDate)} — {item.endDate ? formatDate(item.endDate) : "Present"}
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
            ))
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default About