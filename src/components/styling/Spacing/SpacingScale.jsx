import PropTypes from 'prop-types';
import { Text } from '../Typography';
import { spacing, spacingPx } from '../../../styling/theme/spacing.js';
import './spacingScale.css';

const SPACING_STEPS = Object.keys(spacing);

function SpacingRow({ step, value }) {
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
        <div className="ds-spacing-row__bar" style={{ width: spacing[step] }} />
      </div>
      <Text as="span" variant="text-sm" weight="medium" color="var(--neutral_500)" className="ds-spacing-row__value">
        {value}
      </Text>
    </div>
  );
}

SpacingRow.propTypes = {
  step: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export function SpacingScale({ showCssVariable = true }) {
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
        <div style={{ gap: spacing[2], padding: spacing[3] }}>
          <Text as="span" variant="text-sm" weight="medium">gap 2</Text>
          <Text as="span" variant="text-sm" weight="medium">padding 3</Text>
          <Text as="span" variant="text-sm" weight="medium">space 4</Text>
        </div>
        <div style={{ gap: spacing[4], padding: spacing[6] }}>
          <Text as="span" variant="text-sm" weight="medium">gap 4</Text>
          <Text as="span" variant="text-sm" weight="medium">padding 6</Text>
          <Text as="span" variant="text-sm" weight="medium">space 8</Text>
        </div>
      </div>

      <div className="ds-spacing__list">
        {SPACING_STEPS.map((step) => (
          <SpacingRow key={step} step={step} value={spacingPx[step]} />
        ))}
      </div>
    </div>
  );
}

SpacingScale.propTypes = {
  showCssVariable: PropTypes.bool,
};
