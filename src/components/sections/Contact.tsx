"use client"
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { GithubIcon, GmailIcon, LinkedinIcon } from '../ui/Icons'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const [typedCommand, setTypedCommand] = useState("")
  const [showOutput, setShowOutput] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Start typing only when component is in view
  useEffect(() => {
    if (!isInView) return

    const command = './send-message --to murali';
    let charIndex = 0;
    let typeTimer: ReturnType<typeof setInterval>;
    let outputTimer: ReturnType<typeof setTimeout>;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTypedCommand("");
    setShowOutput(false);

    // eslint-disable-next-line prefer-const
    typeTimer = setInterval(() => {
      if (charIndex < command.length) {
        setTypedCommand(command.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeTimer)
        outputTimer = setTimeout(() => {
          setShowOutput(true);
        }, 400)
      }
    }, 40)

    return () => {
      clearInterval(typeTimer)
      if (outputTimer) clearTimeout(outputTimer)
    }
  }, [isInView])

  return (
    <section id='contact' className='w-full pb-20 pt-15'>
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
          05 / say hello
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='flex justify-between items-center mb-10'
        >
          <h2 className='text-3xl font-medium tracking-[0.04em] text-foreground'>
            Have a good problem?
            <p className='text-sm font-normal text-text-muted mt-2 tracking-normal'>
              I&apos;d love to hear about
            </p>
          </h2>
          <div className='flex gap-3 items-center'>
            <motion.a
              href="mailto:msmurali2005@gmail.com"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <GmailIcon size={25} className='cursor-pointer transition-colors duration-200 hover:text-code-accent' />
            </motion.a>
            <motion.a
              href="https://github.com/MD0516"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <GithubIcon size={25} className='cursor-pointer transition-colors duration-200 hover:text-code-accent' />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/md0516"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <LinkedinIcon size={25} className='cursor-pointer transition-colors duration-200 hover:text-code-accent' />
            </motion.a>
          </div>
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
            ref={containerRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='p-5 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_0_20px_color-mix(in_srgb,var(--color-code-accent)_30%,transparent)]'
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
              <span className='font-mono text-xs text-text-muted'>
                contact.sh
              </span>
            </div>

            <div className='font-mono text-sm space-y-2 p-4 min-h-75 transition-all duration-500 leading-7'>
              <div className='text-code-accent h-6'>
                <span>$ </span>
                <span>{typedCommand}</span>
                {!showOutput && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block"
                  >
                    ▌
                  </motion.span>
                )}
              </div>

              {/* Output */}
              {showOutput && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className='text-text-muted'
                >
                  <span>&gt; </span>
                  <span>Waiting for input... </span>
                </motion.div>
              )}

              {/* Form - AnimatePresence */}
              <AnimatePresence mode="wait">
                {showOutput && (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className='w-full mt-5'
                  >
                    <div className='w-full flex flex-col md:flex-row md:items-end gap-1 md:gap-3 mb-7'>
                      <label htmlFor="name" className='cursor-pointer text-code-accent text-md'>
                        [Name]
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder='your name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full border-b border-text-muted/30 border-dashed outline-0 focus:border-solid cursor-text ps-2 '
                      />
                    </div>
                    <div className='w-full flex flex-col md:flex-row md:items-end gap-1 md:gap-3 mb-7'>
                      <label htmlFor="email" className='cursor-pointer text-code-accent text-md'>
                        [Email]
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='you@example.com'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full border-b border-text-muted/30 border-dashed outline-0 focus:border-solid cursor-text ps-2 '
                      />
                    </div>
                    <div className='w-full flex flex-col gap-1 md:gap-3 mb-7'>
                      <label htmlFor="message" className='cursor-pointer text-code-accent text-md'>
                        [Message]
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        placeholder='your message'
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className='w-full border-b border-text-muted/30 border-dashed outline-0 focus:border-solid cursor-text ps-2 '
                      />
                    </div>
                    <button type="submit" className='group flex gap-2 items-center text-code-accent cursor-pointer active:scale-99 active:text-primary transition-all duration-100'>
                      <span>
                        $ Send Message
                      </span>
                      <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact