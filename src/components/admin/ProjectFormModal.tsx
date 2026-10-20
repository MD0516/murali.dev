"use client"

import { Project } from '@/types'
import { Plus, X } from 'lucide-react'
import { Dialog } from 'radix-ui'
import React, { useState } from 'react'
import FormField from '../ui/FormField'
import DropZone from '../ui/DropZone'

type Props = {
  project?: Project
}

type FormData = Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>

const ProjectFormModal = ({
  project
}: Props) => {

  const isEditMode = project ? true : false

  const [formData, setFormData] = useState<FormData>({
    title: project?.title || '',
    shortDescription: project?.shortDescription || '',
    fullDescription: project?.fullDescription || '',
    techStack: project?.techStack || [],
    imageUrl: project?.imageUrl || '',
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || '',
    featured: project?.featured || false,
    order: project?.order || 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className='flex items-center gap-2 bg-surface rounded border border-border hover:border-code-accent/30 py-1 px-2 hover:bg-secondary/50 transition-all duration-300 cursor-pointer text-md'
      >
        <Plus size={18} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[80vh] overflow-auto rounded-xl border border-border bg-surface shadow-[0_0_50px_color-mix(in_srgb,var(--code-accent)_20%,transparent)]">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h1 className="text-lg font-medium text-foreground">
              {isEditMode ? "Edit Project" : "Add Project"}
            </h1>
            <Dialog.Close className="cursor-pointer rounded-sm p-1 text-text-muted hover:text-code-accent transition-colors duration-200">
              <X size={20} />
            </Dialog.Close>
          </div>
          <div className="p-4 space-y-4">
            <DropZone
              name='image'
              label='upload image'
              maxSize={5 * 1024 * 1024}
              maxFiles={1}
              accept="image/png,image/jpeg,image/jpg,image/webp"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Project Name"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                required
              />
              <FormField
                label="order" 
                name="order"
                type='number'
                value={formData.order || ''}
                onChange={handleChange}
                required
                min={1}
              />
            </div>
            <FormField
              label="Short Description"
              name="shortDescription"
              value={formData.shortDescription || ''}
              onChange={handleChange}
              required
            />
            <FormField
              label="Full Description"
              name="fullDescription"
              value={formData.fullDescription || ''}
              type='textarea'
              onChange={handleChange}
              required
            />
            <FormField
              label="Live URL"
              name="liveUrl"
              value={formData.liveUrl || ''}
              onChange={handleChange}
            />
            <FormField
              label="GitHub URL"
              name="githubUrl"
              value={formData.githubUrl || ''}
              onChange={handleChange}
            />
            <FormField
              label="Featured"
              name="featured"
              type='checkbox'
              checked={Boolean(formData.featured)}
              onChange={e => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
            />

          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ProjectFormModal