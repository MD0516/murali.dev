"use client"
import { Skill } from '@/types'
import { Loader2, Plus, Trash2Icon, X } from 'lucide-react'
import { Dialog } from 'radix-ui'
import React, { ReactNode, useEffect, useState } from 'react'
import FormField from '../ui/FormField'
import TagInput from '../ui/TagInput'
import { toast } from 'sonner'
import { useCreateSkillMutation, useDeleteSkillMutation, useUpdateSkillMutation } from '@/api/queries/skills'

type Props = {
  skills?: Skill[];
  children?: ReactNode;
}

type SkillsRowType = {
  id: string;
  category: string;
  skills: string[];
}

type SkillRowProps = {
  row: SkillsRowType;
  handleChange: (
    id: string,
    field: 'category' | 'skills',
    value: string | string[]
  ) => void;
  deleteRow: (id: string) => void;
  exists: boolean;
};

const SkillRow = ({ row, handleChange, deleteRow, exists }: SkillRowProps) => {
  const { mutate: createSkill, isPending: isCreating } = useCreateSkillMutation()
  const { mutate: updateSkill, isPending: isUpdating } = useUpdateSkillMutation()
  const { mutate: deleteSkill, isPending: isDeleting } = useDeleteSkillMutation()
  const isLoading = isCreating || isUpdating;

  const handleSubmit = () => {
    if (exists) {
      updateSkill({
        id: row.id,
        data: {
          category: row.category,
          skills: row.skills,
        }
      })
      return
    }
    createSkill({
      data: {
        category: row.category,
        skills: row.skills,
      }
    })
  }

  const handleDelete = (id: string) => {
    deleteRow(id)
    if(exists) deleteSkill({ id })
  }

  const SubmitText = exists ? "Update" : "Add";

  return (
    <div className="bg-surface-raised flex flex-col gap-5 rounded-sm px-2 py-4">
      <FormField
        label="Category"
        name="category"
        value={row.category}
        onChange={(e) =>
          handleChange(row.id, 'category', e.target.value)
        }
      />

      <TagInput
        label="Skills"
        value={row.skills}
        onChange={(skills) =>
          handleChange(row.id, 'skills', skills)
        }
      />
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
  );
};

const SkillsFormModal = ({
  skills = [], children
}: Props) => {
  const [open, setOpen] = useState(false)

  const [skillRows, setSkillRows] = useState<SkillsRowType[]>(skills.map(skill => ({
    id: skill._id,
    category: skill.category,
    skills: skill.skills
  })))

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSkillRows(skills.map(skill => ({
      id: skill._id,
      category: skill.category,
      skills: skill.skills
    })))
  }, [skills])

  const addNewCategory = () => {
    setSkillRows(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        category: "",
        skills: []
      }
    ])
  }

  const handleChange = (id: string, field: 'category' | 'skills', value: string | string[]) => {
    setSkillRows(skillRows.map(
      row => row.id === id
        ? { ...row, [field]: value }
        : row
    ))
  }

  const deleteRow = (id: string) => {
    if (skillRows.length === 1) {
      toast.error("At least one row must exist!", { id })
      return
    }

    setSkillRows(
      skillRows.filter(s => s.id != id)
    )
  }

  const createSkillRows = (skills: Skill[]): SkillsRowType[] => {
    const rows = skills.map(skill => ({
      id: skill._id,
      category: skill.category,
      skills: [...skill.skills]
    }))

    return rows.length > 0
      ? rows
      : [{
        id: crypto.randomUUID(),
        category: "",
        skills: []
      }]
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next)

    if (next) {
      setSkillRows(createSkillRows(skills))
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
              Manage Skills
            </h1>
            <Dialog.Close className="cursor-pointer rounded-sm p-1 text-text-muted hover:text-code-accent transition-colors duration-200">
              <X size={20} />
            </Dialog.Close>
          </div>

          <div className='p-4 pt-0'>
            <div className="text-sm text-text-muted font-mono">
              <div className='flex justify-end my-5'>
                <button className='btn btn-icon-text' onClick={addNewCategory}>
                  <Plus size={15} /> Add Category
                </button>
              </div>
              <div className='flex flex-col gap-5'>
                {
                  skillRows.map((row) => {
                    const exists = skills.find(s => s._id === row.id)
                    return (
                      <SkillRow key={row.id} row={row} handleChange={handleChange} deleteRow={deleteRow} exists={!!exists} />
                    )
                  })
                }
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default SkillsFormModal