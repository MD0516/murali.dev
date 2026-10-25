"use client"
import { About, Timeline } from '@/types';
import { Loader2, Plus, Trash2Icon, X } from 'lucide-react';
import { Dialog } from 'radix-ui'
import React, { ReactNode, useState } from 'react'
import FormField from '../ui/FormField';
import { z } from 'zod';
import { updateAboutSchema } from "@/lib/validators/about"
import { Form, Formik, FormikHelpers } from 'formik';
import { useUpdateAboutMutation } from '@/api/queries/about';
import { toast } from 'sonner';
import { useCreateTimelineMutation, useDeleteTimelineMutation, useUpdateTimelineMutation } from '@/api/queries/timeline';

type Props = {
  children: ReactNode;
  about?: About;
  timelines: Timeline[]
}

type TimelineRowType = {
  id: string;
  title: string;
  institution: string;
  description: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
}

type AboutFormValues = z.infer<typeof updateAboutSchema>

type TimelineRowProps = {
  row: TimelineRowType;
  handleChange: (
    id: string,
    field: 'title' | 'institution' | 'description' | 'type' | 'status' | 'startDate' | 'endDate',
    value: string
  ) => void;
  deleteRow: (id: string) => void;
  exists: boolean;
}

const TimelineRow = ({
  row, handleChange, deleteRow, exists
}: TimelineRowProps) => {
  const { mutate: createTimeline, isPending: isCreating } = useCreateTimelineMutation()
  const { mutate: updateTimeline, isPending: isUpdating } = useUpdateTimelineMutation()
  const { mutate: deleteTimeline, isPending: isDeleting } = useDeleteTimelineMutation()
  const isLoading = isCreating || isUpdating;

  const handleSubmit = () => {
    const data = {
      title: row.title,
      institution: row.institution,
      description: row.description || undefined,
      type: row.type as 'edu' | 'work',
      status: row.status as 'completed' | 'ongoing' | 'current',
      startDate: row.startDate,
      endDate: row.endDate || "",
    };

    if (exists) {
      updateTimeline({ id: row.id, data });
      return;
    }

    createTimeline({ data });
  };

  const handleDelete = (id: string) => {
    deleteRow(id)
    if (exists) deleteTimeline({ id })
  }

  const SubmitText = exists ? "Update" : "Add"

  return (
    <div key={row.id} className='bg-surface-raised flex flex-col gap-5 rounded-sm px-2 py-4'>
      <div className='flex gap-3'>
        <FormField
          type='text'
          label='Title'
          name='title'
          value={row.title}
          onChange={(e) => handleChange(row.id, 'title', e.target.value)}
        />
        <FormField
          type='text'
          label='Institution'
          name='institution'
          value={row.institution}
          onChange={(e) => handleChange(row.id, 'institution', e.target.value)}
        />
      </div>
      <FormField
        type='text'
        label='Description'
        name='description'
        value={row.description}
        onChange={(e) => handleChange(row.id, 'description', e.target.value)}
      />
      <div className='flex gap-3'>
        <FormField
          type='select'
          label='Type'
          name='type'
          options={[
            { label: "Education", value: "edu" },
            { label: "Work", value: "work" },
          ]}
          value={row.type}
          onChange={(e) => handleChange(row.id, 'type', e.target.value)}
        />
        <FormField
          type='select'
          label='Status'
          name='status'
          options={[
            { label: "Completed", value: "completed" },
            { label: "Ongoing", value: "ongoing" },
            { label: "Current", value: "current" },
          ]}
          value={row.status}
          onChange={(e) => handleChange(row.id, 'status', e.target.value)}
        />
      </div>
      <div className='flex gap-3'>
        <FormField
          type='date'
          label='Start Date'
          name='startDate'
          value={row.startDate}
          onChange={(e) => handleChange(row.id, 'startDate', e.target.value)}
        />
        <FormField
          type='date'
          label='End Date'
          name='endDate'
          value={row.endDate}
          onChange={(e) => handleChange(row.id, 'endDate', e.target.value)}
        />
      </div>
      <div
        className='w-full flex items-center justify-end gap-3'
      >
        <button
          onClick={() => handleDelete(row.id)}
          className='btn-icon-danger size-12'
          disabled={isDeleting}
        >
          {isDeleting
            ? <Loader2 size={15} className={`h-4 w-4 animate-spin ${isDeleting ? 'inline-block' : 'hidden'}`} />
            : <Trash2Icon size={15} />
          }
        </button>
        <button
          className='btn btn-modal-save rounded-sm!'
          onClick={handleSubmit}
          disabled={isLoading}
        >
          <Loader2 className={`mr-2 h-4 w-4 animate-spin ${isLoading ? 'inline-block' : 'hidden'}`} />
          {isLoading ? "Uploading..." : SubmitText}
        </button>
      </div>
    </div>
  )
}

const AboutEditModal = ({
  children,
  about,
  timelines,
}: Props) => {
  const [open, setOpen] = useState(false)
  const { mutate: updateAbout, isPending: isUpdating } = useUpdateAboutMutation()

  const [timelineRows, setTimelineRows] = useState<TimelineRowType[]>(timelines.map(timeline => ({
    id: timeline._id,
    title: timeline.title,
    description: timeline.description ?? "",
    institution: timeline.institution,
    status: timeline.status,
    type: timeline.type,
    startDate: timeline.startDate ? new Date(timeline.startDate).toISOString().split('T')[0] : "",
    endDate: timeline.endDate ? new Date(timeline.endDate).toISOString().split('T')[0] : "",
  })))

  const addTimeline = () => {
    setTimelineRows(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        institution: "",
        description: "",
        type: "",
        status: "",
        startDate: "",
        endDate: "",
      }
    ])
  }

  const handleChange = (
    id: string,
    field: 'title' | 'institution' | 'description' | 'type' | 'status' | 'startDate' | 'endDate',
    value: string
  ) => {
    setTimelineRows(timelineRows.map(
      row => row.id === id
        ? { ...row, [field]: value }
        : row
    ))
  }

  const deleteRow = (id: string) => {
    if (timelineRows.length === 1) {
      toast.error("At least one row must exist!", { id })
      return
    }

    setTimelineRows(
      timelineRows.filter(t => t.id != id)
    )
  }

  const createTimelineRows = (timelines: Timeline[]): TimelineRowType[] => {
    const rows = timelines.map(timeline => ({
      id: timeline._id,
      title: timeline.title,
      description: timeline.description ?? "",
      institution: timeline.institution,
      status: timeline.status,
      type: timeline.type,
      startDate: timeline.startDate ? new Date(timeline.startDate).toISOString().split('T')[0] : "",
      endDate: timeline.endDate ? new Date(timeline.endDate).toISOString().split('T')[0] : "",
    }))

    return rows.length > 0
      ? rows
      : [{
        id: crypto.randomUUID(),
        title: "",
        description: "",
        institution: "",
        status: "",
        type: "",
        startDate: "",
        endDate: "",
      }]
  }

  const initialValues: AboutFormValues = {
    role: about?.role || "",
    location: about?.location || "",
    bio: about?.bio || "",
    tagline: about?.tagline || "",
  }

  const validate = (values: AboutFormValues) => {
    const result = updateAboutSchema.safeParse(values)
    if (result.success) return {}

    const errors: Record<string, string> = {}
    for (const issue of result.error.issues) {
      const key = String(issue.path[0])
      if (!errors[key]) errors[key] = issue.message
    }
    return errors
  }

  const handleSubmit = (
    values: AboutFormValues,
    { resetForm }: FormikHelpers<AboutFormValues>
  ) => {
    try {
      updateAbout({
        data: {
          bio: values.bio,
          location: values.location,
          role: values.role,
          tagline: values.tagline,
        }
      })
    } finally {
      resetForm()
    }
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next)

    if (next) {
      setTimelineRows(createTimelineRows(timelines))
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Dialog.Trigger asChild>
        <button>
          {children}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[80vh] overflow-auto rounded-xl border border-border bg-surface shadow-[0_0_50px_color-mix(in_srgb,var(--code-accent)_20%,transparent)]">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h1 className="text-lg font-medium text-foreground ">
              About
            </h1>
            <Dialog.Close className="cursor-pointer rounded-sm p-1 text-text-muted hover:text-code-accent transition-colors duration-200">
              <X size={20} />
            </Dialog.Close>
          </div>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
            enableReinitialize
            validateOnMount={false}
            validateOnBlur
            validateOnChange
          >
            {({ values, errors, touched, handleChange }) => (
              <Form noValidate className="p-4 flex flex-col gap-5">
                <div className='flex gap-4'>
                  <FormField
                    label='Role'
                    name='role'
                    value={values.role || ""}
                    onChange={handleChange}
                    error={touched.role && typeof errors.role === 'string' ? errors.role : undefined}
                  />
                  <FormField
                    label='Location'
                    name='location'
                    value={values.location || ""}
                    onChange={handleChange}
                    error={touched.location && typeof errors.location === 'string' ? errors.location : undefined}
                  />
                </div>
                <FormField
                  type='textarea'
                  label='Bio'
                  name='bio'
                  value={values.bio || ""}
                  onChange={handleChange}
                  error={touched.bio && typeof errors.role === 'string' ? errors.bio : undefined}
                />
                <FormField
                  label='Tagline'
                  name='tagline'
                  value={values.tagline || ""}
                  onChange={handleChange}
                  error={touched.tagline && typeof errors.tagline === 'string' ? errors.tagline : undefined}
                />
                <div className="flex items-center justify-between gap-2 my-4">
                  <button
                    type="submit"
                    className="btn btn-modal-save"
                    disabled={isUpdating}
                  >
                    <Loader2 className={`mr-2 h-4 w-4 animate-spin ${isUpdating ? 'inline-block' : 'hidden'}`} />
                    {isUpdating ? "Uploading..." : 'Update'}
                  </button>

                  <button
                    className='btn btn-icon-text py-3!'
                    type='button'
                    onClick={addTimeline}
                  >
                    <Plus size={15} /> Add Timeline
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className='p-4 pt-0'>
            <div className="text-sm text-text-muted font-mono flex flex-col gap-3">
              {timelineRows.map((row) => {
                const exists = timelines.find(t => t._id === row.id)
                return (
                  <TimelineRow key={row.id} row={row} handleChange={handleChange} deleteRow={deleteRow} exists={!!exists} />
                )
              })}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AboutEditModal