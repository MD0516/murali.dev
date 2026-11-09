"use client"

import { Project } from '@/types'
import { Loader2, X } from 'lucide-react'
import { Dialog } from 'radix-ui'
import React, { ReactNode, useRef, useState } from 'react'
import { Formik, Form, type FormikHelpers, FormikProps } from 'formik'
import FormField from '../ui/FormField'
import DropZone, { type AcceptedFile } from '../ui/DropZone'
import TagInput from '../ui/TagInput'
import { useUploadFileMutation } from '@/api/queries/upload'
import { useCreateProjectMutation, useDeleteImageMutation, useUpdateProjectMutation } from '@/api/queries/projects'
import z from 'zod'
import { CreateProjectPayload } from '@/lib/validators/project'
import { isAxiosError } from 'axios'

const projectFormSchema = z.object({
  title: z.string().trim().min(1, 'Project name is required').max(100, 'Project name is too long').default(''),
  shortDescription: z.string().trim().min(1, 'Short description is required').max(160, 'Keep it under 160 characters').default(''),
  fullDescription: z.string().trim().min(1, 'Full description is required').default(''),
  techStack: z.array(z.string().trim().min(1)).min(1, 'Add at least one technology').default([]),
  images: z.array(
    z.object({
      src: z.string().min(1, "Image source is required"),
      alt: z.string().min(1, "Image alt text is required"),
    })
  ),
  liveUrl: z.string().trim().url('Must be a valid URL').or(z.literal('')).optional().default(''),
  githubUrl: z.string().trim().url('Must be a valid URL').or(z.literal('')).optional().default(''),
  featured: z.boolean().default(false),
})

type FormValues = z.infer<typeof projectFormSchema>

type Props = {
  project?: Project
  children?: ReactNode
}

const ProjectFormModal = ({ project, children }: Props) => {
  const isEditMode = Boolean(project)
  const [open, setOpen] = useState(false)
  const [imageFiles, setImageFiles] = useState<AcceptedFile[]>([])
  const [formError, setFormError] = useState<string | null>(null)

  const formikRef = useRef<FormikProps<FormValues>>(null)

  const { mutateAsync: uploadImage, isPending: isUploadingImage } = useUploadFileMutation()
  const { mutateAsync: createProject, isPending: isCreatingProject } = useCreateProjectMutation()
  const { mutateAsync: updateProject, isPending: isUpdatingProject } = useUpdateProjectMutation()
  const { mutateAsync: deleteImage, isPending: isDeletingImage } = useDeleteImageMutation();

  const isLoading = isUploadingImage || isCreatingProject || isUpdatingProject || isDeletingImage

  const initialValues: FormValues = {
    title: project?.title || '',
    shortDescription: project?.shortDescription || '',
    fullDescription: project?.fullDescription || '',
    techStack: project?.techStack || [],
    images: project?.images || [],
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || '',
    featured: project?.featured || false,
  }

  const validate = (values: FormValues) => {
    const result = projectFormSchema.safeParse(values)
    if (result.success) return {}

    const errors: Record<string, string> = {}
    for (const issue of result.error.issues) {
      const key = String(issue.path[0])
      if (!errors[key]) errors[key] = issue.message
    }
    return errors
  }

  const handleSubmit = async (
    values: FormValues,
    { setFieldError, setFieldTouched }: FormikHelpers<FormValues>
  ) => {
    setFormError(null)

    try {
      if (!values.images.length && !imageFiles.length) {
        setFieldError('images', 'At least one image is required')
        setFieldTouched('images', true, false)
        return
      }

      let finalImages = values.images

      if (imageFiles.length > 0) {
        const files = imageFiles.map((image) => image.file)
        const uploadedImages = (await uploadImage({ files, type: "image" })).urls

        const newImages = uploadedImages.map((url, index) => ({
          src: url,
          alt: files[index].name,
        }))

        finalImages = [...finalImages, ...newImages]
      }

      const payload: CreateProjectPayload = { ...values, images: finalImages }

      if (project?._id) {
        await updateProject({ id: project._id, data: payload })
      } else {
        await createProject({ data: payload })
      }

      handleClose()
    } catch (error: unknown) {
      console.error("Failed to save project:", error)

      if (isAxiosError<{ message?: string }>(error)) {
        setFormError(error.response?.data?.message ?? error.message)
      } else if (error instanceof Error) {
        setFormError(error.message)
      } else {
        setFormError("Something went wrong. Please try again.")
      }
    }
  }

  const handleClose = () => {
    setOpen(false);
    setFormError(null);
    setImageFiles([]);
    formikRef.current?.resetForm();
  }

  const submitText = isEditMode
    ? isUpdatingProject ? "Updating..." : "Update Project"
    : isCreatingProject ? "Creating..." : "Create Project"

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (next) {
          setOpen(next)
        } else if (!isLoading) {
          handleClose()
        }
      }}
    >
      <Dialog.Trigger asChild>
        {children || (isEditMode ? "Edit Project" : "Add Project")}
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

          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
            enableReinitialize
            validateOnMount={false}
            validateOnBlur
            validateOnChange
          >
            {({ values, errors, touched, handleChange, setFieldValue, setFieldTouched, setFieldError }) => (
              <Form noValidate className="p-4 space-y-4">
                {formError && (
                  <div className="p-3 text-sm text-danger bg-danger/10 border border-danger/20 rounded-md">
                    {formError}
                  </div>
                )}

                <div
                  onBlur={() => setFieldTouched('images', true)}
                  onClick={() => setFieldTouched('images', true)}
                >
                  <DropZone
                    name="image"
                    label="Upload image"
                    maxSize={5 * 1024 * 1024}
                    multiple={true}
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    files={imageFiles}
                    onFilesChange={(files) => {
                      setImageFiles(files)
                      if (files.length > 0) {
                        setFieldError('images', undefined)
                      }
                    }}
                    images={values.images}
                    error={touched.images && typeof errors.images === 'string' ? errors.images : undefined}
                    required
                    onCarouselDelete={
                      async (src: string) => {
                        if (!project?._id) return

                        await deleteImage({ id: project._id, data: { imageUrl: src } })

                        const updatedImages = values.images.filter(
                          (image) => image.src !== src
                        )

                        await setFieldValue("images", updatedImages)
                      }
                    }
                    maxFiles={10}
                  />
                </div>

                <FormField
                  label="Project Name"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && typeof errors.title === 'string' ? errors.title : undefined}
                  required
                />

                <FormField
                  label="Short Description"
                  name="shortDescription"
                  value={values.shortDescription}
                  onChange={handleChange}
                  error={touched.shortDescription && typeof errors.shortDescription === 'string' ? errors.shortDescription : undefined}
                  required
                />

                <FormField
                  label="Full Description"
                  name="fullDescription"
                  value={values.fullDescription}
                  type="textarea"
                  onChange={handleChange}
                  error={touched.fullDescription && typeof errors.fullDescription === 'string' ? errors.fullDescription : undefined}
                  required
                />

                <TagInput
                  label="Tech Stack"
                  value={values.techStack}
                  onChange={(tags) => setFieldValue('techStack', tags)}
                  suggestions={['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS']}
                  placeholder="Add a technology..."
                  hint="Press Enter or comma to add"
                  error={touched.techStack && typeof errors.techStack === 'string' ? errors.techStack : undefined}
                  required
                />

                <FormField
                  label="Live URL"
                  name="liveUrl"
                  value={values.liveUrl || ""}
                  onChange={handleChange}
                  error={touched.liveUrl && typeof errors.liveUrl === 'string' ? errors.liveUrl : undefined}
                />

                <FormField
                  label="GitHub URL"
                  name="githubUrl"
                  value={values.githubUrl || ""}
                  onChange={handleChange}
                  error={touched.githubUrl && typeof errors.githubUrl === 'string' ? errors.githubUrl : undefined}
                />

                <FormField
                  label="Featured"
                  name="featured"
                  type="checkbox"
                  checked={values.featured}
                  onChange={handleChange}
                />

                <div className="flex items-center justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => handleClose()}
                    className="btn btn-modal-cancel"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-modal-save"
                    disabled={isLoading}
                  >
                    <Loader2 className={`mr-2 h-4 w-4 animate-spin ${isLoading ? 'inline-block' : 'hidden'}`} />
                    {isUploadingImage ? "Uploading..." : submitText}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ProjectFormModal