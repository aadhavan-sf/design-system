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

function SpacingRow({ step, value }: SpacingRowProps) {
  const token = `--spacing_${step.replace('.', '_')}`;

  return (
    <div className="ds-spacing-row">
      <div className="ds-spacing-row__label">
        <Text as="span" variant="text-md" weight="semibold" className="ds-spacing-row__name">
          {step}
        </Text>
        <code>{token}</code>
      </div>
      <div className="ds-spacing-row__bar-wrap">
        <div className="ds-spacing-row__bar" style={{ width: typedSpacing[step] }} />
      </div>
      <Text as="span" variant="text-sm" weight="medium" color="var(--neutral_500)" className="ds-spacing-row__value">
        {value}
      </Text>
    </div>
  );
}

export function SpacingScale({ showCssVariable = true }: SpacingScaleProps) {
  return (
    <div className="ds-spacing">
      <div className="ds-spacing__header">
        <div>
          <Text as="span" variant="text-sm" weight="semibold" color="var(--brand_600)" className="ds-spacing__eyebrow">
            Spacing
          </Text>
          <Text as="h2" variant="display-xs" weight="semibold" className="ds-spacing__title">
            4px-based layout scale
          </Text>
        </div>
        {showCssVariable ? <code>var(--spacing_*)</code> : null}
      </div>

      <div className="ds-spacing__preview" aria-label="Spacing examples">
        <div className="gap-2 p-3">
          <Text as="span" variant="text-sm" weight="medium">gap 2</Text>
          <Text as="span" variant="text-sm" weight="medium">padding 3</Text>
          <Text as="span" variant="text-sm" weight="medium">space 4</Text>
        </div>
        <div className="gap-4 p-6">
          <Text as="span" variant="text-sm" weight="medium">gap 4</Text>
          <Text as="span" variant="text-sm" weight="medium">padding 6</Text>
          <Text as="span" variant="text-sm" weight="medium">space 8</Text>
        </div>
      </div>

      <div className="ds-spacing__list">
        {SPACING_STEPS.map((step) => (
          <SpacingRow key={step} step={step} value={typedSpacingPx[step]} />
        ))}
      </div>
    </div>
  );
}
