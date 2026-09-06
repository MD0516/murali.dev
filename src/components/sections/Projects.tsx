"use client"
import { motion } from 'framer-motion'
import ProjectCard from '../projects/ProjectCard';

const mockProject = [
  {
    id: "1",
    title: "Learning Management System",
    shortDescription: "Full-stack LMS with role-based auth and 100+ REST APIs, built solo during a production internship.",
    fullDescription:
      "Designed and built a complete Learning Management System from the ground up during my internship at ARKFA Technologies. Implemented JWT-based authentication with role-based access control (RBAC) supporting distinct permission levels for admins, instructors, and students. Built and documented over 100 REST API endpoints covering course management, enrollment, content delivery, and user administration. Deployed on Google Cloud Run for scalable, containerized hosting. This was my primary hands-on production experience, taking a real system from architecture through deployment.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Google Cloud Run"],
    imageUrl: "/projects/lms-screenshot.png",
    liveUrl: undefined,
    githubUrl: undefined,
    featured: true,
    order: 1,
  },
];

const Projects = () => {
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
          <div className="font-mono text-xs text-text-muted flex items-center gap-2">
            <p>(03 projects)</p>
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
          {mockProject.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects