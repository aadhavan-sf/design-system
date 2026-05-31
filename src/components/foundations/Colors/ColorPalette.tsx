import { Text } from '../Typography';
import { colorHex } from '../../../styling/theme/colors';

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
  cssVar: string;
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

function Swatch({ group, step, hex, showHex }: SwatchProps) {
  const cssVar =
    group === 'neutral' && step === 0 ? '--neutral_00' : `--${group}_${String(step)}`;

  return (
    <div
      className="overflow-hidden rounded-3 border border-solid border-[var(--ds-border)] bg-[var(--ds-surface)] shadow-lg"
      title={`${group} ${step}`}
    >
      <div className="h-20 w-full" style={{ backgroundColor: `var(${cssVar})` }} />
      <div className="flex flex-col gap-0.5 px-3 pb-3">
        <Text as="span" variant="text-lg" weight="medium">
          {step}
        </Text>
        {showHex ? (
          <Text
            as="span"
            variant="text-md"
            weight="regular"
            color="var(--neutral_500)"
            className="uppercase"
          >
            {hex}
          </Text>
        ) : null}
      </div>
    </div>
  );
}

function SpecialSwatch({ name, cssVar, hex, showHex }: SpecialSwatchProps) {
  return (
    <div
      className="overflow-hidden rounded-3 border border-solid border-[var(--ds-border)] bg-[var(--ds-surface)] shadow-lg"
      title={name}
    >
      <div className="h-20 w-full" style={{ backgroundColor: `var(${cssVar})` }} />
      <div className="flex flex-col gap-0.5 px-3 pb-3">
        <Text as="span" variant="text-lg" weight="medium">
          {name}
        </Text>
        {showHex ? (
          <Text
            as="span"
            variant="text-md"
            weight="regular"
            color="var(--neutral_500)"
            className="uppercase"
          >
            {hex}
          </Text>
        ) : null}
      </div>
    </div>
  );
}

export function ColorPalette({ showHex = true }: ColorPaletteProps) {
  return (
    <div className="flex flex-col gap-6 font-sans">
      <Section title="Neutral" group="neutral" steps={[0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]} showHex={showHex} />
      <Section title="Brand" group="brand" steps={[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} showHex={showHex} />
      <Section title="Error" group="error" steps={[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} showHex={showHex} />
      <Section title="Warning" group="warning" steps={[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} showHex={showHex} />
      <Section title="Success" group="success" steps={[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} showHex={showHex} />

      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <Text as="h2" variant="text-lg" weight="semibold">
            Special Colors
          </Text>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,160px))] gap-4">
          <SpecialSwatch name="off-white" cssVar="--off-white" hex={colorHex.special.offwhite} showHex={showHex} />
          <SpecialSwatch name="lightening" cssVar="--lightening" hex={colorHex.special.lightening} showHex={showHex} />
          <SpecialSwatch name="midnight-black" cssVar="--midnight-black" hex={colorHex.special.midnightBlack} showHex={showHex} />
        </div>
      </div>
    </div>
  );
}

function Section({ title, group, steps, showHex }: SectionProps) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <Text as="h2" variant="text-lg" weight="semibold">
          {title}
        </Text>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,160px))] gap-4">
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
