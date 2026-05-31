import { Text } from '../Typography';
import { shadowValues, shadows } from '../../../styling/theme/shadows';

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
    <div className="flex flex-col gap-4 rounded-2 border border-solid border-[var(--ds-border)] bg-[var(--ds-surface)] p-4">
      <div
        className="min-h-28 rounded-2 border border-solid border-[var(--ds-border)] bg-neutral-0"
        style={{ boxShadow: shadows[name] }}
      />
      <div className="flex flex-col gap-2">
        <Text as="span" variant="text-lg" weight="semibold">
          {name}
        </Text>
        <code>{`--shadow_${name}`}</code>
        <Text as="span" variant="text-xs" weight="regular" color="var(--neutral_500)">
          {value}
        </Text>
      </div>
    </div>
  );
}

export function ShadowScale({ showValues = true }: ShadowScaleProps) {
  return (
    <div className="flex flex-col gap-6 font-sans text-[var(--ds-text-strong)]">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Text as="span" variant="text-sm" weight="semibold" color="var(--brand_600)">
            Shadow
          </Text>
          <Text
            as="h2"
            variant="display-xs"
            weight="semibold"
            className="mt-1"
          >
            Elevation scale
          </Text>
        </div>
        <code>var(--shadow_*)</code>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
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
