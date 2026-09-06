import { Project } from '@/types';
import { Dialog } from 'radix-ui'
import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Calendar, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../ui/Icons';

type Props = {
  Trigger: ReactNode;
  project: Project
}

const ProjectDetailsModal = ({
  Trigger,
  project
}: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>
          {Trigger}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-xl border border-border bg-surface shadow-[0_0_50px_color-mix(in_srgb,var(--code-accent)_20%,transparent)]">
          {/* Header */}
          <div className="flex items-center h-12 px-4 border-b border-border">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 bg-danger rounded-full" />
              <span className="w-2.5 h-2.5 bg-warning rounded-full" />
              <span className="w-2.5 h-2.5 bg-success rounded-full" />
            </div>
            <span className="mx-auto font-mono text-xs text-text-muted">
              project_{project.order}.sh
            </span>
            <Dialog.Close asChild>
              <button className="p-1.5 rounded-md hover:bg-secondary transition-colors duration-200 cursor-pointer">
                <X size={16} className="text-text-muted hover:text-foreground" />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-48px)]">
            {/* Image */}
            {project.imageUrl && (
              <div className="mb-6 overflow-hidden rounded-lg border border-border">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Title & Order */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-mono text-xs text-code-accent mb-2">
                  {'//'} project_{project.order}
                </p>
                <h2 className="text-2xl font-bold text-foreground tracking-tight">
                  {project.title}
                </h2>
              </div>
              {project.featured && (
                <span className="px-2 py-1 rounded bg-code-accent/10 text-code-accent text-xs font-mono">
                  ★ featured
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-text-muted text-sm leading-6 mb-4">
              {project.shortDescription}
            </p>

            {/* Full Description */}
            <div className="mb-6">
              <h3 className="font-mono text-xs text-code-accent mb-2">
                $ cat description.txt
              </h3>
              <p className="text-foreground text-sm leading-7">
                {project.fullDescription}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="font-mono text-xs text-code-accent mb-3">
                $ cat tech-stack.txt
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs bg-secondary rounded text-text-muted hover:bg-code-accent/10 hover:text-code-accent transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 border-t border-border pt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-md bg-sidebar-primary px-4 py-2.5 font-mono text-xs text-page transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-code-accent cursor-pointer"
                >
                  <ExternalLink size={14} />
                  Live Demo
                  <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 font-mono text-xs text-foreground transition-all duration-300 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-code-accent cursor-pointer"
                >
                  <GithubIcon size={14} />
                  GitHub Repo
                  <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ProjectDetailsModal