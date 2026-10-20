"use client"

import { motion, HTMLMotionProps } from 'framer-motion'

const cn = (...classes: (string | false | null | undefined)[]) =>
    classes.filter(Boolean).join(' ')

/* ============================================================================
   BASE SKELETON
   The single building block every other skeleton is composed from.
   Uses your existing theme tokens: --border, --code-accent, --surface, etc.
   ============================================================================ */

type SkeletonVariant = 'line' | 'block' | 'circle' | 'tag'
type SkeletonTone = 'default' | 'accent' | 'muted'

interface SkeletonProps extends HTMLMotionProps<'div'> {
    variant?: SkeletonVariant
    tone?: SkeletonTone
    width?: string | number
    height?: string | number
    rounded?: string
    /** Disable the pulse animation (useful for nested skeletons) */
    static?: boolean
}

const toneMap: Record<SkeletonTone, string> = {
    default: 'bg-border/60',
    accent: 'bg-code-accent/10',
    muted: 'bg-text-muted/15',
}

const variantMap: Record<SkeletonVariant, string> = {
    line: 'rounded',
    block: 'rounded-lg',
    circle: 'rounded-full',
    tag: 'rounded',
}

export const Skeleton = ({
    variant = 'line',
    tone = 'default',
    width,
    height,
    rounded,
    static: isStatic = false,
    className,
    style,
    ...rest
}: SkeletonProps) => {
    return (
        <motion.div
            aria-hidden="true"
            className={cn(
                toneMap[tone],
                variantMap[variant],
                !isStatic && 'animate-pulse',
                className
            )}
            style={{
                width,
                height,
                ...(rounded ? { borderRadius: rounded } : {}),
                ...style,
            }}
            {...rest}
        />
    )
}

/* ============================================================================
   SKELETON TEXT
   Renders N lines with the last line partially filled — mimics paragraph text.
   ============================================================================ */

interface SkeletonTextProps {
    lines?: number
    /** Width of each line. Last line gets the last value. */
    widths?: string[]
    height?: string
    gap?: string
    tone?: SkeletonTone
    className?: string
}

export const SkeletonText = ({
    lines = 3,
    widths,
    height = '0.85rem',
    gap = '0.5rem',
    tone = 'default',
    className,
}: SkeletonTextProps) => {
    const defaultWidths = ['100%', '92%', '78%', '85%', '88%']
    const lineWidths = Array.from({ length: lines }, (_, i) => {
        if (widths && widths[i]) return widths[i]
        return defaultWidths[i % defaultWidths.length]
    })

    return (
        <div className={cn('flex flex-col', className)} style={{ gap }}>
            {lineWidths.map((w, i) => (
                <Skeleton key={i} variant="line" tone={tone} width={w} height={height} />
            ))}
        </div>
    )
}

/* ============================================================================
   SKELETON TAG
   Small pill-shaped placeholder — for role/location tags, category chips, etc.
   ============================================================================ */

interface SkeletonTagProps {
    width?: string
    height?: string
    tone?: SkeletonTone
    className?: string
}

export const SkeletonTag = ({
    width = '5rem',
    height = '1.5rem',
    tone = 'accent',
    className,
}: SkeletonTagProps) => (
    <Skeleton variant="tag" tone={tone} width={width} height={height} className={className} />
)

/* ============================================================================
   SKELETON AVATAR / ICON
   ============================================================================ */

interface SkeletonCircleProps {
    size?: string | number
    tone?: SkeletonTone
    className?: string
}

export const SkeletonCircle = ({
    size = '2.5rem',
    tone = 'default',
    className,
}: SkeletonCircleProps) => (
    <Skeleton variant="circle" tone={tone} width={size} height={size} className={className} />
)

/* ============================================================================
   SKELETON CARD
   Generic card shell — border, bg-page, padding — matching your timeline /
   project / any card layout. Compose children inside.
   ============================================================================ */

interface SkeletonCardProps extends HTMLMotionProps<'div'> {
    children?: React.ReactNode
    className?: string
}

export const SkeletonCard = ({
    children,
    className,
    ...rest
}: SkeletonCardProps) => (
    <div
        className={cn(
            'relative rounded-lg border border-border bg-page p-4',
            className
        )}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
        {children}
    </div>
)

/* ============================================================================
   SKELETON TIMELINE ITEM
   Matches the About timeline article layout exactly — including the left dot.
   ============================================================================ */

interface SkeletonTimelineItemProps {
    delay?: number
    className?: string
}

export const SkeletonTimelineItem = ({
    delay = 0,
    className,
}: SkeletonTimelineItemProps) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ delay, duration: 0.5, ease: 'easeOut' }}
        className={cn(
            'relative rounded-lg border border-border bg-page p-4',
            className
        )}
    >
        <span className="absolute -left-6 top-5 h-2 w-2 rounded-full bg-border" />

        <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex-1 space-y-2">
                <Skeleton width="40%" height="0.85rem" />
                <Skeleton width="60%" height="0.7rem" />
            </div>
            <div className="flex items-center gap-2">
                <Skeleton width="6rem" height="0.6rem" />
                <Skeleton width="3rem" height="0.6rem" />
            </div>
        </div>

        <div className="mt-3 space-y-2">
            <Skeleton width="90%" height="0.65rem" />
            <Skeleton width="75%" height="0.65rem" />
        </div>
    </motion.div>
)

/* ============================================================================
   SKELETON SKILL ITEM
   For the Skills component's `ls skills/...` output — a small `- item` line.
   ============================================================================ */

interface SkeletonSkillLineProps {
    width?: string
    delay?: number
}

export const SkeletonSkillLine = ({
    width = '60%',
    delay = 0,
}: SkeletonSkillLineProps) => (
    <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.3 }}
        className="flex items-center gap-2"
    >
        <span className="text-text-muted">-</span>
        <Skeleton width={width} height="0.75rem" />
    </motion.div>
)

/* ============================================================================
   SKELETON COMMAND LINE
   For terminal-style "loading" lines inside a code block.
   ============================================================================ */

interface SkeletonCommandLineProps {
    prefix?: string
    width?: string
    className?: string
}

export const SkeletonCommandLine = ({
    prefix = '$',
    width = '10rem',
    className,
}: SkeletonCommandLineProps) => (
    <div className={cn('flex items-center gap-2', className)}>
        <span className="text-code-accent">{prefix}</span>
        <Skeleton width={width} height="0.75rem" />
    </div>
)

/* ============================================================================
   SKELETON LIST
   N rows of `- item` style lines. Convenient shortcut.
   ============================================================================ */

interface SkeletonListProps {
    count?: number
    widths?: string[]
    gap?: string
    className?: string
}

export const SkeletonList = ({
    count = 3,
    widths,
    gap = '0.5rem',
    className,
}: SkeletonListProps) => (
    <div className={cn('flex flex-col', className)} style={{ gap }}>
        {Array.from({ length: count }).map((_, i) => (
            <SkeletonSkillLine
                key={i}
                width={widths?.[i] ?? '60%'}
                delay={0.1 * i}
            />
        ))}
    </div>
)