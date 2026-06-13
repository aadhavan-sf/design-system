import { Text } from '../Typography';
import { colorHex } from '../../../styling/theme/colors';
import './colorPalette.css';

type ColorGroup = 'neutral' | 'brand' | 'error' | 'warning' | 'success';
type ColorStep = number | string;

interface ColorPaletteProps {
  showHex?: boolean;
}

interface SwatchProps {
  group: ColorGroup;
  step: ColorStep;
  hex: string;
  showHex: boolean;
}

interface SpecialSwatchProps {
  name: string;
  colorClassName: string;
  tokenName: string;
  hex: string;
  showHex: boolean;
}

interface SectionProps {
  title: string;
  group: ColorGroup;
  steps: number[];
  showHex: boolean;
}

const typedColorHex = colorHex as Record<ColorGroup, Record<number, string>> & typeof colorHex;

const colorClassNames: Record<ColorGroup, Record<string, string>> = {
  neutral: {
    0: 'bg-neutral-0', 25: 'bg-neutral-25', 50: 'bg-neutral-50',
    100: 'bg-neutral-100', 200: 'bg-neutral-200', 300: 'bg-neutral-300',
    400: 'bg-neutral-400', 500: 'bg-neutral-500', 600: 'bg-neutral-600',
    700: 'bg-neutral-700', 800: 'bg-neutral-800', 900: 'bg-neutral-900',
    1000: 'bg-neutral-1000',
  },
  brand: {
    25: 'bg-brand-25', 50: 'bg-brand-50', 100: 'bg-brand-100',
    200: 'bg-brand-200', 300: 'bg-brand-300', 400: 'bg-brand-400',
    500: 'bg-brand-500', 600: 'bg-brand-600', 700: 'bg-brand-700',
    800: 'bg-brand-800', 900: 'bg-brand-900',
  },
  error: {
    25: 'bg-error-25', 50: 'bg-error-50', 100: 'bg-error-100',
    200: 'bg-error-200', 300: 'bg-error-300', 400: 'bg-error-400',
    500: 'bg-error-500', 600: 'bg-error-600', 700: 'bg-error-700',
    800: 'bg-error-800', 900: 'bg-error-900',
  },
  warning: {
    25: 'bg-warning-25', 50: 'bg-warning-50', 100: 'bg-warning-100',
    200: 'bg-warning-200', 300: 'bg-warning-300', 400: 'bg-warning-400',
    500: 'bg-warning-500', 600: 'bg-warning-600', 700: 'bg-warning-700',
    800: 'bg-warning-800', 900: 'bg-warning-900',
  },
  success: {
    25: 'bg-success-25', 50: 'bg-success-50', 100: 'bg-success-100',
    200: 'bg-success-200', 300: 'bg-success-300', 400: 'bg-success-400',
    500: 'bg-success-500', 600: 'bg-success-600', 700: 'bg-success-700',
    800: 'bg-success-800', 900: 'bg-success-900',
  },
};

function Swatch({ group, step, hex, showHex }: SwatchProps) {
  const tokenName = `${group}-${step}`;

  return (
    <div className="ds-swatch overflow-hidden rounded-12 border-ds-border bg-ds-surface shadow-lg" title={`${group} ${step}`}>
      <div className={`ds-swatch__chip ${colorClassNames[group][String(step)]}`} />
      <div className="ds-swatch__meta gap-0.5 px-3 pb-3">
        <Text as="span" variant="text-lg" weight="medium">
          {step}
        </Text>
        {showHex ? (
          <Text as="span" variant="text-md" weight="regular" className="uppercase text-ds-text-muted">
            {hex}
          </Text>
        ) : null}
        <code>{`bg-${tokenName}`}</code>
        <code>{`text-${tokenName}`}</code>
        <code>{`border-${tokenName}`}</code>
      </div>
    </div>
  );
}

function SpecialSwatch({ name, colorClassName, tokenName, hex, showHex }: SpecialSwatchProps) {
  return (
    <div className="ds-swatch overflow-hidden rounded-12 border-ds-border bg-ds-surface shadow-lg" title={name}>
      <div className={`ds-swatch__chip ${colorClassName}`} />
      <div className="ds-swatch__meta gap-0.5 px-3 pb-3">
        <Text as="span" variant="text-lg" weight="medium">
          {name}
        </Text>
        {showHex ? (
          <Text as="span" variant="text-md" weight="regular" className="uppercase text-ds-text-muted">
            {hex}
          </Text>
        ) : null}
        <code>{`bg-${tokenName}`}</code>
        <code>{`text-${tokenName}`}</code>
        <code>{`border-${tokenName}`}</code>
      </div>
    </div>
  );
}

export function ColorPalette({ showHex = true }: ColorPaletteProps) {
  return (
    <div className="ds-palette gap-6 font-sans">
      <Section title="Neutral" group="neutral" steps={[0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]} showHex={showHex} />
      <Section title="Brand" group="brand" steps={[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} showHex={showHex} />
      <Section title="Error" group="error" steps={[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} showHex={showHex} />
      <Section title="Warning" group="warning" steps={[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} showHex={showHex} />
      <Section title="Success" group="success" steps={[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} showHex={showHex} />

      <div>
        <div className="ds-section__header mb-2">
          <Text as="h2" variant="text-lg" weight="semibold">
            Special Colors
          </Text>
        </div>
        <div className="ds-section__grid gap-4">
          <SpecialSwatch name="off-white" tokenName="special-offwhite" colorClassName="bg-special-offwhite" hex={colorHex.special.offwhite} showHex={showHex} />
          <SpecialSwatch name="lightening" tokenName="special-lightening" colorClassName="bg-special-lightening" hex={colorHex.special.lightening} showHex={showHex} />
          <SpecialSwatch name="midnight-black" tokenName="special-midnight-black" colorClassName="bg-special-midnight-black" hex={colorHex.special.midnightBlack} showHex={showHex} />
        </div>
      </div>
    </div>
  );
}

function Section({ title, group, steps, showHex }: SectionProps) {
  return (
    <div>
      <div className="ds-section__header mb-2">
        <Text as="h2" variant="text-lg" weight="semibold">
          {title}
        </Text>
      </div>
      <div className="ds-section__grid gap-4">
        {steps.map((step) => (
          <Swatch
            key={`${group}-${step}`}
            group={group}
            step={step}
            hex={typedColorHex[group][step]}
            showHex={showHex}
          />
        ))}
      </div>
    </div>
  );
}
