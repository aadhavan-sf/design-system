function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

export interface UploadFileDashedBorderProps {
  active?: boolean;
  cornerRadius?: number;
  className?: string;
}

export function UploadFileDashedBorder({
  active = false,
  cornerRadius = 8,
  className,
}: UploadFileDashedBorderProps) {
  return (
    <svg
      aria-hidden="true"
      className={buildClassName([
        'storybook-upload-file-dashed-border pointer-events-none absolute inset-0 size-full text-neutral-200',
        active && 'text-brand-400',
        className,
      ])}
      preserveAspectRatio="none"
    >
      <rect
        fill="none"
        height="calc(100% - 1px)"
        rx={cornerRadius}
        stroke="currentColor"
        strokeDasharray="4 4"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        width="calc(100% - 1px)"
        x="0.5"
        y="0.5"
      />
    </svg>
  );
}
