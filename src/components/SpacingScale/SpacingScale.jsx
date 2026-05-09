import PropTypes from 'prop-types';
import { spacing, spacingPx } from '../../theme/spacing';
import './spacingScale.css';

const SPACING_STEPS = Object.keys(spacing);

function SpacingRow({ step, value }) {
  const token = `--spacing_${step.replace('.', '_')}`;

  return (
    <div className="ds-spacing-row">
      <div className="ds-spacing-row__label">
        <span className="ds-spacing-row__name">{step}</span>
        <code>{token}</code>
      </div>
      <div className="ds-spacing-row__bar-wrap">
        <div className="ds-spacing-row__bar" style={{ width: spacing[step] }} />
      </div>
      <div className="ds-spacing-row__value">{value}</div>
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
          <div className="ds-spacing__eyebrow">Spacing</div>
          <h2 className="ds-spacing__title">4px-based layout scale</h2>
        </div>
        {showCssVariable ? <code>var(--spacing_*)</code> : null}
      </div>

      <div className="ds-spacing__preview" aria-label="Spacing examples">
        <div style={{ gap: spacing[2], padding: spacing[3] }}>
          <span>gap 2</span>
          <span>padding 3</span>
          <span>space 4</span>
        </div>
        <div style={{ gap: spacing[4], padding: spacing[6] }}>
          <span>gap 4</span>
          <span>padding 6</span>
          <span>space 8</span>
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
