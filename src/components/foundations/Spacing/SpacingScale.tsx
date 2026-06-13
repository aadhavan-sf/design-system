import { Text } from '../Typography';
import { spacing, spacingPx } from '../../../styling/theme/spacing.js';
import './spacingScale.css';

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

const radiusClassNames: Record<SpacingKey, string> = {
  0: 'rounded-0',
  0.5: 'rounded-2px',
  1: 'rounded-4',
  1.5: 'rounded-6px',
  2: 'rounded-8',
  2.5: 'rounded-10px',
  3: 'rounded-12',
  4: 'rounded-16',
  5: 'rounded-20',
  6: 'rounded-24',
  8: 'rounded-32',
  10: 'rounded-40',
  12: 'rounded-48',
  16: 'rounded-64',
  20: 'rounded-80',
  24: 'rounded-96',
  32: 'rounded-128',
};

function SpacingRow({ step, value }: SpacingRowProps) {
  const tailwindClasses = `p-${step} gap-${step} ${radiusClassNames[step]}`;

  return (
    <div className="ds-spacing-row gap-4 rounded-8 border-ds-border bg-ds-surface px-3 py-2 max-sm:gap-2">
      <div className="ds-spacing-row__label gap-1">
        <Text as="span" variant="text-md" weight="semibold">
          {step}
        </Text>
        <code>{tailwindClasses}</code>
      </div>
      <div className="ds-spacing-row__bar-wrap">
        <div className="ds-spacing-row__bar rounded-full bg-brand-500" style={{ width: typedSpacing[step] }} />
      </div>
      <Text as="span" variant="text-sm" weight="medium" className="ds-spacing-row__value text-ds-text-muted">
        {value}
      </Text>
    </div>
  );
}

export function SpacingScale({ showCssVariable = true }: SpacingScaleProps) {
  const previewPillClassName = 'rounded-8 bg-ds-surface px-3 text-ds-text shadow-xs';

  return (
    <div className="ds-spacing gap-6 font-sans text-ds-text-strong">
      <div className="ds-spacing__header gap-4">
        <div>
          <Text as="span" variant="text-sm" weight="semibold" className="text-brand-600">
            Spacing
          </Text>
          <Text as="h2" variant="display-xs" weight="semibold" className="mt-1">
            4px-based layout scale
          </Text>
        </div>
        {showCssVariable ? <code>Tailwind spacing classes</code> : null}
      </div>

      <div className="ds-spacing__preview gap-4" aria-label="Spacing examples">
        <div className="gap-2 rounded-8 border-ds-border bg-ds-surface-subtle p-3">
          <Text as="span" variant="text-sm" weight="medium" className={previewPillClassName}>gap 2</Text>
          <Text as="span" variant="text-sm" weight="medium" className={previewPillClassName}>padding 3</Text>
          <Text as="span" variant="text-sm" weight="medium" className={previewPillClassName}>space 4</Text>
        </div>
        <div className="gap-4 rounded-8 border-ds-border bg-ds-surface-subtle p-6">
          <Text as="span" variant="text-sm" weight="medium" className={previewPillClassName}>gap 4</Text>
          <Text as="span" variant="text-sm" weight="medium" className={previewPillClassName}>padding 6</Text>
          <Text as="span" variant="text-sm" weight="medium" className={previewPillClassName}>space 8</Text>
        </div>
      </div>

      <div className="ds-spacing__list gap-2">
        {SPACING_STEPS.map((step) => (
          <SpacingRow key={step} step={step} value={typedSpacingPx[step]} />
        ))}
      </div>
    </div>
  );
}
