import PropTypes from 'prop-types';
import { shadowValues, shadows } from '../../../styling/theme/shadows';
import './shadowScale.css';

const SHADOW_STEPS = Object.keys(shadows);

function ShadowCard({ name, value }) {
  return (
    <div className="ds-shadow-card">
      <div className="ds-shadow-card__preview" style={{ boxShadow: shadows[name] }} />
      <div className="ds-shadow-card__meta">
        <div className="ds-shadow-card__name">{name}</div>
        <code>{`--shadow_${name}`}</code>
        <div className="ds-shadow-card__value">{value}</div>
      </div>
    </div>
  );
}

ShadowCard.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export function ShadowScale({ showValues = true }) {
  return (
    <div className="ds-shadows">
      <div className="ds-shadows__header">
        <div>
          <div className="ds-shadows__eyebrow">Shadow</div>
          <h2 className="ds-shadows__title">Elevation scale</h2>
        </div>
        <code>var(--shadow_*)</code>
      </div>

      <div className="ds-shadows__grid">
        {SHADOW_STEPS.map((name) => (
          <ShadowCard
            key={name}
            name={name}
            value={showValues ? shadowValues[name] : 'Use this token for elevation.'}
          />
        ))}
      </div>
    </div>
  );
}

ShadowScale.propTypes = {
  showValues: PropTypes.bool,
};
