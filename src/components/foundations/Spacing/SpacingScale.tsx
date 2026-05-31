import { Text } from '../Typography';
import { spacing, spacingPx } from '../../../styling/theme/spacing.js';

type SpacingKey = string;

interface SpacingScaleProps {
  showCssVariable?: boolean;
}

interface SpacingRowProps {
  step: SpacingKey;
  value: string;
}

const typedSpacing = spacing as Record<SpacingKey, string>;
const typedSpacingPx = spacingPx as Record<SpacingKey, string>;
const SPACING_STEPS = Object.keys(typedSpacing);

function SpacingRow({ step, value }: SpacingRowProps) {
  const token = `--spacing_${step.replace('.', '_')}`;

  return (
    <div className="grid min-h-14 grid-cols-1 items-center gap-2 rounded-2 border border-solid border-[var(--ds-border)] bg-[var(--ds-surface)] px-3 py-2 sm:grid-cols-[minmax(160px,220px)_minmax(140px,1fr)_64px] sm:gap-4">
      <div className="flex flex-col gap-1">
        <Text as="span" variant="text-md" weight="semibold">
          {step}
        </Text>
        <code>{token}</code>
      </div>
      <div className="flex min-h-6 items-center">
        <div
          className="h-4 min-w-px rounded-pill bg-brand-500"
          style={{ width: typedSpacing[step] }}
        />
      </div>
      <Text
        as="span"
        variant="text-sm"
        weight="medium"
        color="var(--neutral_500)"
        className="text-left sm:text-right"
      >
        {value}
      </Text>
    </div>
  );
}

export function SpacingScale({ showCssVariable = true }: SpacingScaleProps) {
  return (
    <div className="flex flex-col gap-6 font-sans text-[var(--ds-text-strong)]">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Text as="span" variant="text-sm" weight="semibold" color="var(--brand_600)">
            Spacing
          </Text>
          <Text
            as="h2"
            variant="display-xs"
            weight="semibold"
            className="mt-1"
          >
            4px-based layout scale
          </Text>
        </div>
        {showCssVariable ? <code>var(--spacing_*)</code> : null}
      </div>

      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4"
        aria-label="Spacing examples"
      >
        <div
          className="flex flex-wrap items-center rounded-2 border border-solid border-[var(--ds-border)] bg-[var(--ds-surface-subtle)]"
          style={{ gap: typedSpacing[2], padding: typedSpacing[3] }}
        >
          <Text as="span" variant="text-sm" weight="medium" color="var(--ds-text, var(--neutral_700))" className="inline-flex min-h-10 items-center rounded-2 bg-[var(--ds-surface)] px-3 shadow-xs">gap 2</Text>
          <Text as="span" variant="text-sm" weight="medium" color="var(--ds-text, var(--neutral_700))" className="inline-flex min-h-10 items-center rounded-2 bg-[var(--ds-surface)] px-3 shadow-xs">padding 3</Text>
          <Text as="span" variant="text-sm" weight="medium" color="var(--ds-text, var(--neutral_700))" className="inline-flex min-h-10 items-center rounded-2 bg-[var(--ds-surface)] px-3 shadow-xs">space 4</Text>
        </div>
        <div
          className="flex flex-wrap items-center rounded-2 border border-solid border-[var(--ds-border)] bg-[var(--ds-surface-subtle)]"
          style={{ gap: typedSpacing[4], padding: typedSpacing[6] }}
        >
          <Text as="span" variant="text-sm" weight="medium" color="var(--ds-text, var(--neutral_700))" className="inline-flex min-h-10 items-center rounded-2 bg-[var(--ds-surface)] px-3 shadow-xs">gap 4</Text>
          <Text as="span" variant="text-sm" weight="medium" color="var(--ds-text, var(--neutral_700))" className="inline-flex min-h-10 items-center rounded-2 bg-[var(--ds-surface)] px-3 shadow-xs">padding 6</Text>
          <Text as="span" variant="text-sm" weight="medium" color="var(--ds-text, var(--neutral_700))" className="inline-flex min-h-10 items-center rounded-2 bg-[var(--ds-surface)] px-3 shadow-xs">space 8</Text>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {SPACING_STEPS.map((step) => (
          <SpacingRow key={step} step={step} value={typedSpacingPx[step]} />
        ))}
      </div>
    </div>
  );
}
