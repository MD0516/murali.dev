"use client"
import { motion } from 'framer-motion'
import ProjectCard from '../projects/ProjectCard';
import ProjectDetailsModal from '../projects/ProjectDetailsModal';
import { useProjectsQuery } from '@/api/queries/projects';
import ProjectFormModal from '../admin/ProjectFormModal';
import { useAppContext } from '@/context/context';

const Projects = () => {
  const { data: projects, isLoading } = useProjectsQuery();
  const { isAdmin } = useAppContext()
  if (isLoading) {
    return null;
  }
  return (
    <section id='projects' className="w-full pb-20 pt-15">
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
          02 / selected work
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='flex justify-between items-center mb-10'
        >
          <h2 className='text-3xl font-medium tracking-[0.04em] text-foreground'>
            A few things I&apos;ve made.
          </h2>
          <div className="font-mono text-xs text-text-muted flex items-center gap-4">
            <p>(03 projects)</p>
            {isAdmin && <ProjectFormModal />}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className='max-w-6xl'
      >
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects?.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <ProjectDetailsModal
                Trigger={<ProjectCard project={project} />}
                project={project}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects