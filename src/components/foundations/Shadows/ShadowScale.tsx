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

const shadowClassNames: Record<ShadowKey, string> = {
  xs: 'shadow-xs',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  '3xl': 'shadow-3xl',
};

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function getShadowScaleClassName() {
  return 'flex flex-col gap-6 font-sans text-ds-text-strong';
}

function getShadowHeaderClassName() {
  return 'flex items-end justify-between gap-4 max-sm:flex-col max-sm:items-start';
}

function getShadowGridClassName() {
  return 'grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5';
}

function getShadowCardClassName() {
  return 'flex flex-col gap-4 rounded-8 border border-solid border-ds-border bg-ds-surface p-4';
}

function getShadowCardPreviewClassName(shadowClassName: string) {
  return buildClassName([
    'min-h-28 rounded-8 border border-solid border-ds-border bg-neutral-0',
    shadowClassName,
  ]);
}

function getShadowCardMetaClassName() {
  return 'flex flex-col gap-2';
}

function ShadowCard({ name, value }: ShadowCardProps) {
  return (
    <div className={getShadowCardClassName()}>
      <div className={getShadowCardPreviewClassName(shadowClassNames[name])} />
      <div className={getShadowCardMetaClassName()}>
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
    <div className={getShadowScaleClassName()}>
      <div className={getShadowHeaderClassName()}>
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

      <div className={getShadowGridClassName()}>
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
