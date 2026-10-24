import React, { useId, useState } from 'react'
import { X } from 'lucide-react'

type Props = {
  label?: string
  value: string[]
  onChange: (tags: string[]) => void
  suggestions?: string[]
  placeholder?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
}

/* Shared label & error classes matching FormField */
const labelClass = 'mb-1.5 block font-mono text-xs font-medium uppercase tracking-wider text-text-secondary'
const errorClass = 'mt-1.5 flex items-center gap-1 font-mono text-xs text-danger'
const hintClass = 'mt-1.5 font-mono text-xs text-text-muted'

const TagInput = ({
  label,
  value,
  onChange,
  suggestions = [],
  placeholder,
  error,
  hint,
  required,
  disabled,
}: Props) => {
  const id = useId()
  const [input, setInput] = useState('')

  const addTag = (raw: string) => {
    const tag = raw.trim()
    if (!tag) return
    if (value.some((t) => t.toLowerCase() === tag.toLowerCase())) return
    onChange([...value, tag])
    setInput('')
  }

  const removeTag = (tag: string) => onChange(value.filter((t) => t !== tag))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && !input && value.length) {
      removeTag(value[value.length - 1])
    }
  }

  const hasError = Boolean(error)

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={labelClass}
        >
          {label}
          {required && (
            <span aria-hidden="true" className="text-danger">
              {' '}*
            </span>
          )}
        </label>
      )}

      <div
        className={[
          'flex min-h-[42px] w-full flex-wrap items-center gap-2 rounded-md border px-3 py-2 transition-colors duration-200',
          'bg-surface font-mono text-sm',
          hasError
            ? 'border-danger focus-within:border-danger focus-within:ring-2 focus-within:ring-danger/40'
            : 'border-border hover:border-border-strong focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/40',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-text',
        ].join(' ')}
        onClick={() => !disabled && document.getElementById(id)?.focus()}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-sm bg-secondary px-2 py-0.5 text-xs text-text-primary transition-colors hover:bg-secondary/80"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeTag(tag)
              }}
              disabled={disabled}
              aria-label={`Remove ${tag}`}
              className="flex h-3.5 w-3.5 items-center justify-center rounded-sm text-text-muted transition-colors hover:bg-danger/20 hover:text-danger focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-danger cursor-pointer"
            >
              <X size={12} strokeWidth={2.5} />
            </button>
          </span>
        ))}

        <input
          id={id}
          list={`${id}-suggestions`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={value.length === 0 ? placeholder : ''}
          disabled={disabled}
          required={required && value.length === 0}
          aria-invalid={hasError || undefined}
          aria-describedby={[error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined}
          className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none min-w-[120px]"
        />
      </div>

      <datalist id={`${id}-suggestions`}>
        {suggestions
          .filter((s) => !value.includes(s))
          .map((s) => (
            <option key={s} value={s} />
          ))}
      </datalist>

      {hint && !hasError && (
        <p id={`${id}-hint`} className={hintClass}>
          {hint}
        </p>
      )}
      {hasError && (
        <p id={`${id}-error`} className={errorClass} role="alert">
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 4.75v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="11" r="0.75" fill="currentColor" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export default TagInput