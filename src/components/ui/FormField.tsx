import React, { useId } from 'react'

type Option = {
  label: string
  value: string | number
}

type BaseProps = {
  label?: string
  name: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
}

type InputFieldProps = BaseProps & {
  type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'date'
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  min?: number
  max?: number
  step?: number
}

type TextareaFieldProps = BaseProps & {
  type: 'textarea'
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
}

type SelectFieldProps = BaseProps & {
  type: 'select'
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: Option[]
  placeholder?: string
}

type CheckboxFieldProps = BaseProps & {
  type: 'checkbox'
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type RadioFieldProps = BaseProps & {
  type: 'radio'
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  options: Option[]
}

export type FormFieldProps =
  | InputFieldProps
  | TextareaFieldProps
  | SelectFieldProps
  | CheckboxFieldProps
  | RadioFieldProps

/* ---------------------------------------------
   Shared class strings (keep styling consistent)
   --------------------------------------------- */
const baseControl =
  'w-full rounded-md border bg-surface px-3 py-2 font-mono text-sm text-text-primary placeholder:text-text-muted transition-colors duration-200 ' +
  'focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'

const controlBorder = (hasError?: boolean) =>
  hasError
    ? 'border-danger focus:border-danger focus:ring-danger/40'
    : 'border-border hover:border-border-strong focus:border-accent focus:ring-accent/40'

const labelClass = 'mb-1.5 block font-mono text-xs font-medium uppercase tracking-wider text-text-secondary'
const errorClass = 'mt-1.5 flex items-center gap-1 font-mono text-xs text-danger'
const hintClass = 'mt-1.5 font-mono text-xs text-text-muted'

const RequiredMark = () => (
  <span aria-hidden="true" className="text-danger">
    {' '}*
  </span>
)

const FormField = (props: FormFieldProps) => {
  const id = useId()
  const { label, name, required, disabled, error, hint } = props
  const type = props.type ?? 'text'
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined
  const hasError = Boolean(error)

  /* -------------------------
     Render the control itself
     ------------------------- */
  const renderControl = () => {
    switch (props.type) {
      case 'textarea':
        return (
          <textarea
            id={id}
            name={name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            rows={props.rows ?? 4}
            required={required}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={`${baseControl} ${controlBorder(hasError)} min-h-25 resize-y`}
          />
        )

      case 'select':
        return (
          <div className="relative">
            <select
              id={id}
              name={name}
              value={props.value}
              onChange={props.onChange}
              required={required}
              disabled={disabled}
              aria-invalid={hasError || undefined}
              aria-describedby={describedBy}
              className={`${baseControl} ${controlBorder(hasError)} cursor-pointer appearance-none pr-9`}
            >
              {props.placeholder && (
                <option value="" disabled>
                  {props.placeholder}
                </option>
              )}
              {props.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {/* Chevron */}
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            >
              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )

      case 'checkbox':
        return (
          <label
            htmlFor={id}
            className="group inline-flex cursor-pointer items-start gap-2.5 select-none"
          >
            <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
              <input
                id={id}
                type="checkbox"
                name={name}
                checked={props.checked}
                onChange={props.onChange}
                required={required}
                disabled={disabled}
                aria-invalid={hasError || undefined}
                aria-describedby={describedBy}
                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-border bg-surface transition-colors checked:border-accent checked:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                className="pointer-events-none absolute h-3 w-3 text-text-on-accent opacity-0 transition-opacity peer-checked:opacity-100"
              >
                <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {label && (
              <span className="font-mono text-sm leading-snug text-text-primary group-hover:text-accent transition-colors">
                {label}
                {required && <RequiredMark />}
              </span>
            )}
          </label>
        )

      case 'radio':
        return (
          <div className="flex flex-col gap-2" role="radiogroup" aria-invalid={hasError || undefined} aria-describedby={describedBy}>
            {props.options.map((opt) => {
              const optId = `${id}-${opt.value}`
              const checked = String(props.value) === String(opt.value)
              return (
                <label
                  key={opt.value}
                  htmlFor={optId}
                  className="group inline-flex cursor-pointer items-center gap-2.5 select-none"
                >
                  <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                    <input
                      id={optId}
                      type="radio"
                      name={name}
                      value={opt.value}
                      checked={checked}
                      onChange={props.onChange}
                      required={required}
                      disabled={disabled}
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-border bg-surface transition-colors checked:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <span className="pointer-events-none absolute h-2 w-2 scale-0 rounded-full bg-accent transition-transform peer-checked:scale-100" />
                  </span>
                  <span className="font-mono text-sm text-text-primary group-hover:text-accent transition-colors">
                    {opt.label}
                  </span>
                </label>
              )
            })}
          </div>
        )

      default:
        return (
          <input
            id={id}
            type={type}
            name={name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            min={props.min}
            max={props.max}
            step={props.step}
            required={required}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={`${baseControl} ${controlBorder(hasError)} ${type === 'number' ? 'no-spinner' : ''}`}
          />
        )
    }
  }

  /* -------------------------
     Radio: group label + control
     ------------------------- */
  if (props.type === 'radio') {
    return (
      <div className="w-full">
        {label && (
          <span id={`${id}-label`} className={labelClass}>
            {label}
            {required && <RequiredMark />}
          </span>
        )}
        {renderControl()}
        {hint && !error && (
          <p id={hintId} className={hintClass}>
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className={errorClass} role="alert">
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

  /* -------------------------
     Checkbox: control + label (inline)
     ------------------------- */
  if (props.type === 'checkbox') {
    return (
      <div className="w-full">
        {renderControl()}
        {hint && !error && (
          <p id={hintId} className={`${hintClass} pl-6`}>
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className={`${errorClass} pl-6`} role="alert">
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

  /* -------------------------
     Default: label above control
     ------------------------- */
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
          {required && <RequiredMark />}
        </label>
      )}
      {renderControl()}
      {hint && !error && (
        <p id={hintId} className={hintClass}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={errorClass} role="alert">
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

export default FormField