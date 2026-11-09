import { Project } from '@/types'
import { motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'

type Prop = {
  project?: Project
  type?: 'default' | 'admin' | 'add'
  onClick?: () => void
}

const ProjectCard = ({ project, type = 'default', onClick }: Prop) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project?._id || 'add-project',
    disabled: type != "admin",
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  }

  const baseCardClasses = "group flex flex-col w-full h-full min-h-[280px] rounded-lg border p-5 sm:p-6 transition-all duration-300 relative overflow-hidden";

  if (type === 'add') {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        className={`${baseCardClasses} items-center justify-center gap-3 border-2 border-dashed border-border hover:border-code-accent hover:bg-secondary/50 cursor-pointer text-text-muted hover:text-code-accent`}
      >
        <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Plus size={24} strokeWidth={1.5} />
        </div>
        <span className="font-mono text-sm tracking-wide">Add Project</span>
      </motion.button>
    )
  }

  if (!project) return null

  const order = project.order.toString().padStart(2, '0')

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${baseCardClasses} bg-surface border-border hover:border-code-accent/30 hover:bg-secondary/50 hover:-translate-y-1 transition-all duration-300 ${type === 'default' ? 'cursor-pointer' : 'cursor-pointer active:cursor-grabbing'
        }`}
    >
      <div className="flex justify-between items-start mb-3">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs text-text-muted"
        >
          {order}
        </motion.p>

        <ArrowUpRight
          size={16}
          className="text-text-muted opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-code-accent"
        />
      </div>

      <div className="mt-auto mb-5 text-left">
        <h3 className="text-xl font-medium mb-2 text-foreground group-hover:text-code-accent transition-colors duration-300 line-clamp-1 break-words">
          {project.title}
        </h3>

        <p className="text-sm leading-6 text-text-muted line-clamp-2 break-words">
          {project.shortDescription}
        </p>
      </div>

      <div className="relative">
        <div className="flex flex-wrap gap-2 max-h-[64px] overflow-hidden">
          {project.techStack.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
              className="px-2.5 py-1 text-xs bg-secondary rounded text-text-muted group-hover:bg-code-accent/10 group-hover:text-code-accent transition-colors duration-300 h-fit whitespace-nowrap"
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {project.techStack.length > 4 && (
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-surface group-hover:from-secondary/0 pointer-events-none transition-colors duration-300" />
        )}
      </div>
    </motion.div>
  )
}

export default ProjectCard