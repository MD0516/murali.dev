'use client'

import React, { useCallback, useId, useRef, useState } from 'react'
import {
    UploadCloud,
    File,
    FileText,
    FileImage,
    FileArchive,
    FileCode,
    FileVideo,
    FileAudio,
    X,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react'

/* ---------------------------------------------
   Types
   --------------------------------------------- */

type AcceptedFile = {
    id: string
    file: File
    preview?: string
}

type DropZoneProps = {
    name?: string
    label?: string
    hint?: string
    error?: string
    required?: boolean
    disabled?: boolean

    /** Comma-separated list, e.g. "image/*,.pdf" */
    accept?: string
    /** Max file size in bytes (default 10 MB) */
    maxSize?: number
    /** Max number of files (default 5) */
    maxFiles?: number
    /** Allow multiple files (default true) */
    multiple?: boolean

    files?: AcceptedFile[]
    onFilesChange?: (files: AcceptedFile[]) => void
    onError?: (message: string) => void
}

/* ---------------------------------------------
   Helpers
   --------------------------------------------- */

const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const getFileIcon = (mime: string) => {
    if (mime.startsWith('image/')) return FileImage
    if (mime.startsWith('video/')) return FileVideo
    if (mime.startsWith('audio/')) return FileAudio
    if (
        mime.includes('zip') ||
        mime.includes('tar') ||
        mime.includes('rar') ||
        mime.includes('7z') ||
        mime.includes('gzip')
    )
        return FileArchive
    if (
        mime.includes('json') ||
        mime.includes('javascript') ||
        mime.includes('typescript') ||
        mime.includes('html') ||
        mime.includes('css') ||
        mime.includes('xml')
    )
        return FileCode
    if (mime.includes('pdf') || mime.includes('text')) return FileText
    return File
}

const matchesAccept = (file: File, accept?: string) => {
    if (!accept) return true
    const rules = accept.split(',').map((r) => r.trim().toLowerCase())
    const name = file.name.toLowerCase()
    const type = file.type.toLowerCase()

    return rules.some((rule) => {
        if (rule.startsWith('.')) return name.endsWith(rule)
        if (rule.endsWith('/*')) return type.startsWith(rule.slice(0, -1))
        return type === rule
    })
}

const uid = () => Math.random().toString(36).slice(2, 10)

const getAcceptLabels = (accept?: string): string => {
    if (!accept) return 'Any file type'

    return accept
        .split(',')
        .map((rule) => {
            const r = rule.trim().toLowerCase()

            // Already an extension
            if (r.startsWith('.')) return r.slice(1).toUpperCase()

            // Wildcard like image/* -> "IMAGE"
            if (r.endsWith('/*')) return r.slice(0, -2).toUpperCase()

            // "image/png" -> "PNG", "image/jpeg" -> "JPEG"
            const sub = r.split('/')[1]
            return sub ? sub.toUpperCase() : r.toUpperCase()
        })
        .join(', ')
}

/* ---------------------------------------------
   Component
   --------------------------------------------- */

const DropZone = ({
    name = 'file',
    label = 'Upload files',
    hint,
    error,
    required,
    disabled,
    accept,
    maxSize = 10 * 1024 * 1024,
    maxFiles = 5,
    multiple = true,
    files: controlledFiles,
    onFilesChange,
    onError,
}: DropZoneProps) => {
    const id = useId()
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [internalError, setInternalError] = useState<string>('')

    // Support both controlled and uncontrolled usage
    const [uncontrolledFiles, setUncontrolledFiles] = useState<AcceptedFile[]>([])
    const files = controlledFiles ?? uncontrolledFiles
    const updateFiles = (next: AcceptedFile[]) => {
        if (onFilesChange) onFilesChange(next)
        else setUncontrolledFiles(next)
    }

    const describedBy = [hint && `${id}-hint`, (error || internalError) && `${id}-error`]
        .filter(Boolean)
        .join(' ') || undefined

    const hasError = Boolean(error || internalError)
    const displayedError = error || internalError

    const reportError = (msg: string) => {
        setInternalError(msg)
        onError?.(msg)
    }

    /* -------------------------
       File processing
       ------------------------- */
    const processFiles = useCallback(
        (incoming: FileList | File[]) => {
            setInternalError('')
            const incomingArr = Array.from(incoming)

            const validated: AcceptedFile[] = []
            for (const file of incomingArr) {
                if (!matchesAccept(file, accept)) {
                    reportError(`"${file.name}" is not an accepted file type.`)
                    continue
                }
                if (file.size > maxSize) {
                    reportError(`"${file.name}" is ${formatBytes(file.size)} — max is ${formatBytes(maxSize)}.`)
                    continue
                }
                // prevent duplicates by name+size
                if (files.some((f) => f.file.name === file.name && f.file.size === file.size)) continue
                validated.push({ id: uid(), file })
            }

            if (!validated.length) return

            const combined = multiple ? [...files, ...validated] : [validated[0]]
            if (combined.length > maxFiles) {
                reportError(`You can upload up to ${maxFiles} files.`)
            }
            updateFiles(combined.slice(0, maxFiles))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [accept, maxSize, maxFiles, multiple, files],
    )

    /* -------------------------
       Event handlers
       ------------------------- */
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        if (disabled) return
        if (e.dataTransfer.files?.length) processFiles(e.dataTransfer.files)
    }

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (disabled) return
        setIsDragging(true)
    }

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) processFiles(e.target.files)
        e.target.value = '' // reset so same file can be reselected
    }

    const openPicker = () => {
        if (disabled) return
        inputRef.current?.click()
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openPicker()
        }
    }

    const removeFile = (fileId: string) => {
        updateFiles(files.filter((f) => f.id !== fileId))
        setInternalError('')
    }

    /* -------------------------
       Render
       ------------------------- */
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={`${id}-input`} className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-wider text-text-secondary">
                    {label}
                    {required && (
                        <span aria-hidden="true" className="text-danger">
                            {' '}*
                        </span>
                    )}
                </label>
            )}

            {/* Drop area */}
            <div
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-label="Upload files by dragging and dropping, or click to browse"
                aria-describedby={describedBy}
                aria-disabled={disabled || undefined}
                onClick={openPicker}
                onKeyDown={onKeyDown}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnter={onDragOver}
                onDragLeave={onDragLeave}
                className={[
                    'group relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-all duration-200 outline-none',
                    'focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:border-accent',
                    disabled
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer',
                    isDragging
                        ? 'border-accent bg-accent/5 scale-[1.01]'
                        : hasError
                            ? 'border-danger hover:border-danger'
                            : 'border-border hover:border-border-strong hover:bg-surface-raised',
                ].join(' ')}
            >
                <input
                    ref={inputRef}
                    id={`${id}-input`}
                    type="file"
                    name={name}
                    accept={accept}
                    multiple={multiple}
                    onChange={onInputChange}
                    disabled={disabled}
                    className="sr-only"
                />

                {/* Icon badge */}
                <div
                    className={[
                        'flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200',
                        isDragging
                            ? 'bg-accent/15 text-accent'
                            : 'bg-surface-raised text-text-muted group-hover:text-accent',
                    ].join(' ')}
                >
                    <UploadCloud className="h-6 w-6" strokeWidth={1.75} />
                </div>

                <div className="space-y-1">
                    <p className="font-mono text-sm text-text-primary">
                        {isDragging ? (
                            <span className="text-accent">Drop files to upload</span>
                        ) : (
                            <>
                                <span className="text-accent underline underline-offset-4 decoration-dotted">Click to upload</span>
                                <span className="text-text-muted"> or drag and drop</span>
                            </>
                        )}
                    </p>
                    <p className="font-mono text-xs text-text-muted">
                        {getAcceptLabels(accept)}
                        {' · '}
                        Up to {formatBytes(maxSize)}
                        {multiple && ` · ${maxFiles} ${maxFiles === 1 ? 'file' : 'files'} max`}
                    </p>
                </div>
            </div>

            {/* Hints / errors */}
            {hint && !displayedError && (
                <p id={`${id}-hint`} className="mt-1.5 font-mono text-xs text-text-muted">
                    {hint}
                </p>
            )}
            {displayedError && (
                <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1 font-mono text-xs text-danger">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {displayedError}
                </p>
            )}

            {/* File list */}
            {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                    {files.map(({ id: fileId, file }) => {
                        const Icon = getFileIcon(file.type)
                        return (
                            <li
                                key={fileId}
                                className="group flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2 transition-colors hover:border-border-strong"
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-surface-raised text-code-accent">
                                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-mono text-sm text-text-primary">{file.name}</p>
                                    <p className="font-mono text-xs text-text-muted">{formatBytes(file.size)}</p>
                                </div>

                                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-label="Uploaded" />

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeFile(fileId)
                                    }}
                                    disabled={disabled}
                                    aria-label={`Remove ${file.name}`}
                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-danger/10 hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/40 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default DropZone