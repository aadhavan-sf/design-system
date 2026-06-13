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

const shadowClassNames: Record<ShadowKey, string> = {
  xs: 'shadow-xs',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  '3xl': 'shadow-3xl',
};

function ShadowCard({ name, value }: ShadowCardProps) {
  return (
    <div className="ds-shadow-card gap-4 rounded-8 border-ds-border bg-ds-surface p-4">
      <div className={`ds-shadow-card__preview rounded-8 border-ds-border bg-neutral-0 ${shadowClassNames[name]}`} />
      <div className="ds-shadow-card__meta gap-2">
        <Text as="span" variant="text-lg" weight="semibold">
          {name}
        </Text>
        <code>{shadowClassNames[name]}</code>
        <Text as="span" variant="text-xs" weight="regular" className="text-ds-text-muted">
          {value}
        </Text>
      </div>
    </div>
  );
}

export function ShadowScale({ showValues = true }: ShadowScaleProps) {
  return (
    <div className="ds-shadows gap-6 font-sans text-ds-text-strong">
      <div className="ds-shadows__header gap-4">
        <div>
          <Text as="span" variant="text-sm" weight="semibold" className="text-brand-600">
            Shadow
          </Text>
          <Text as="h2" variant="display-xs" weight="semibold" className="mt-1">
            Elevation scale
          </Text>
        </div>
        <code>shadow-*</code>
      </div>

      <div className="ds-shadows__grid gap-5">
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
