import { Project } from '@/types';
import { Dialog } from 'radix-ui'
import { ReactNode } from 'react'
import { X, ExternalLink, ArrowUpRight, Pencil } from 'lucide-react'
import { GithubIcon } from '../ui/Icons';
import Carousel from '../ui/Carousel';
import { useAppContext } from '@/context/context';
import ProjectFormModal from '../admin/ProjectFormModal';
import RichText from '../ui/RichText';

type Props = {
  Trigger: ReactNode;
  project: Project
}

const ProjectDetailsModal = ({
  Trigger,
  project
}: Props) => {
  const { isAdmin } = useAppContext()
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="cursor-pointer">
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
            {project.images && (
              <div className="mb-6 overflow-hidden rounded-lg border border-border">
                <Carousel images={project.images} type='preview' />
              </div>
            )}

            {/* Title & Order */}
            <div className="flex items-start justify-between mb-4">
              <div>
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
            <RichText className="text-text-muted text-sm leading-6 mb-4">
              {project.shortDescription}
            </RichText>

            {/* Full Description */}
            <div className="mb-6">
              <h3 className="font-mono text-xs text-code-accent mb-2">
                $ cat description.txt
              </h3>
              <RichText className="text-foreground text-sm leading-7">
                {project.fullDescription}
              </RichText>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="font-mono text-xs text-code-accent mb-3">
                $ cat tech-stack.txt
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
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
                  Live Preview
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
              {isAdmin && (
                <div
                  onPointerDown={e => e.stopPropagation}
                  onClick={e => e.stopPropagation()}
                >
                  <ProjectFormModal project={project}>
                    <div className='group inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 font-mono text-xs text-foreground transition-all duration-300 hover:bg-code-accent/40 focus:outline-none focus:ring-2 focus:ring-code-accent cursor-pointer'>
                      <Pencil
                        size={16}
                      />
                      Edit Project
                    </div>
                  </ProjectFormModal>
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ProjectDetailsModal