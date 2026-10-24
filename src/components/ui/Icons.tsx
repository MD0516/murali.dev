import { forwardRef, type SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const GithubIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, className = "", ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.09-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.2.66.79.55A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
);
GithubIcon.displayName = "GithubIcon";

export const LinkedinIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, className = "", ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
);
LinkedinIcon.displayName = "LinkedinIcon";

export const GmailIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, className = "", ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M22 5.5v13a1.5 1.5 0 0 1-1.5 1.5H19V9.6l-7 4.9-7-4.9V20H3.5A1.5 1.5 0 0 1 2 18.5v-13A1.5 1.5 0 0 1 3.5 4h.35L12 9.75 20.15 4h.35A1.5 1.5 0 0 1 22 5.5Z" />
    </svg>
  )
);
GmailIcon.displayName = "GmailIcon";

export const LogoIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, className = "", ...props }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M 16 18 L 48 50 L 16 82"
        fill="none"
        stroke="var(--code-accent)"
        stroke-width="13"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect x="54" y="68" width="32" height="13" rx="6.5" fill="var(--sidebar-primary)" />
    </svg>
  )
);
LogoIcon.displayName = "LogoIcon"