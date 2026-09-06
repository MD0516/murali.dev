import { Project } from '@/types'
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

type Prop = {
  project: Project
}

const ProjectCard = ({
  project
}: Prop) => {
  const order = project.order < 10 ? `0${project.order}` : project.order

  return (
    <motion.div
      className='group bg-surface rounded-lg border border-border hover:border-code-accent/30 p-6 hover:bg-secondary/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden'
    >
      <div className='flex justify-between items-start mb-6'>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='font-mono text-xs text-text-muted'
        >
          {order}
        </motion.p>
        <ArrowUpRight
          size={16}
          className="text-text-muted opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-code-accent"
        />
      </div>

      <div className="mb-6 text-left">
        <h3 className='text-xl font-medium mb-3 text-foreground group-hover:text-code-accent transition-colors duration-300'>
          {project.title}
        </h3>
        <p className='mb-6 text-sm leading-6 text-text-muted line-clamp-3'>
          {project.shortDescription}
        </p>
      </div>

      <div className='flex flex-wrap gap-2'>
        {project.techStack.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (i * 0.05), duration: 0.3 }}
            className='px-2.5 py-1 text-xs bg-secondary rounded text-text-muted group-hover:bg-code-accent/10 group-hover:text-code-accent transition-colors duration-300'
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default ProjectCard