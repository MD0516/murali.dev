import { Project } from '@/types'
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Pencil, Plus } from 'lucide-react'
import ProjectFormModal from '../admin/ProjectFormModal'

type Prop = {
  project?: Project
  type?: 'default' | 'admin' | 'add'
  onClick?: () => void
}

const ProjectCard = ({ project, type = 'default', onClick }: Prop) => {
  // 1. Handle "Add Project" state
  if (type === 'add') {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        className="w-full min-h-full flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border hover:border-code-accent hover:bg-secondary/50 transition-all duration-300 cursor-pointer text-text-muted hover:text-code-accent group"
      >
        <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Plus size={24} strokeWidth={1.5} />
        </div>
        <span className="font-mono text-sm tracking-wide">+ Add Project</span>
      </motion.button>
    )
  }

  // Guard clause for default/admin states if project is missing
  if (!project) return null

  const order = project.order < 10 ? `0${project.order}` : project.order

  // 2. Base card content (shared between default and admin)
  const cardContent = (
    <motion.div
      className={`group bg-surface rounded-lg border border-border hover:border-code-accent/30 p-6 hover:bg-secondary/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${type === 'default' ? 'cursor-pointer' : ''
        }`}
      draggable={true}
    >
      <div className="flex justify-between items-start mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs text-text-muted"
        >
          {order}
        </motion.p>

        {/* Render ArrowUpRight for default, Pencil for admin */}
        {type === 'default' && (
          <ArrowUpRight
            size={16}
            className="text-text-muted opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-code-accent"
          />
        )}
        {type === 'admin' && (
          <div onClick={e => e.stopPropagation()}>
            <ProjectFormModal project={project}>
              <Pencil
                size={16}
                className="text-text-muted opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-code-accent"
              />
            </ProjectFormModal>
          </div>
        )}
      </div>

      <div className="mb-6 text-left">
        <h3 className="text-xl font-medium mb-3 text-foreground group-hover:text-code-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="mb-6 text-sm leading-6 text-text-muted line-clamp-3">
          {project.shortDescription}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
            className="px-2.5 py-1 text-xs bg-secondary rounded text-text-muted group-hover:bg-code-accent/10 group-hover:text-code-accent transition-colors duration-300"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )

  // 4. Default state
  return cardContent
}

export default ProjectCard