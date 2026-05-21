import { Text } from '../Typography';
import { shadowValues, shadows } from '../../../styling/theme/shadows';
import './shadowScale.css';

type ShadowKey = keyof typeof shadows;

interface ShadowScaleProps {
  showValues?: boolean;
}

interface ShadowCardProps {
  name: ShadowKey;
  value: string;
}

const SHADOW_STEPS = Object.keys(shadows) as ShadowKey[];

function ShadowCard({ name, value }: ShadowCardProps) {
  return (
    <div className="ds-shadow-card">
      <div className="ds-shadow-card__preview" style={{ boxShadow: shadows[name] }} />
      <div className="ds-shadow-card__meta">
        <Text as="span" variant="text-lg" weight="semibold" className="ds-shadow-card__name">
          {name}
        </Text>
        <code>{`--shadow_${name}`}</code>
        <Text as="span" variant="text-xs" weight="regular" color="var(--neutral_500)" className="ds-shadow-card__value">
          {value}
        </Text>
      </div>
    </div>
  );
}

export function ShadowScale({ showValues = true }: ShadowScaleProps) {
  return (
    <div className="ds-shadows">
      <div className="ds-shadows__header">
        <div>
          <Text as="span" variant="text-sm" weight="semibold" color="var(--brand_600)" className="ds-shadows__eyebrow">
            Shadow
          </Text>
          <Text as="h2" variant="display-xs" weight="semibold" className="ds-shadows__title">
            Elevation scale
          </Text>
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
