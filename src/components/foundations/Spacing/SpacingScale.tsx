import { Text } from '../Typography';
import { size, sizePx } from '../../../styling/theme/size.js';

type SizeKey = string;

interface SpacingScaleProps {
  showCssVariable?: boolean;
}

interface SizeRowProps {
  step: SizeKey;
  value: string;
}

const typedSize = size as Record<SizeKey, string>;
const typedSizePx = sizePx as Record<SizeKey, string>;
const SIZE_STEPS = Object.keys(typedSize);

const radiusClassNames: Record<SizeKey, string> = {
  0: 'rounded-0',
  0.5: 'rounded-2px',
  1: 'rounded-4',
  1.5: 'rounded-6px',
  2: 'rounded-8',
  2.5: 'rounded-10px',
  3: 'rounded-12',
  4: 'rounded-16',
  5: 'rounded-20',
  6: 'rounded-24',
  8: 'rounded-32',
  10: 'rounded-40',
  12: 'rounded-48',
  16: 'rounded-64',
  20: 'rounded-80',
  24: 'rounded-96',
  32: 'rounded-128',
};

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function getSizeTokenName(step: SizeKey) {
  return `--size_${String(step).replace('.', '_')}`;
}

function getSpacingScaleClassName() {
  return 'flex flex-col gap-6 font-sans text-ds-text-strong';
}

function getSpacingHeaderClassName() {
  return 'flex items-end justify-between gap-4 max-sm:flex-col max-sm:items-start';
}

function getSpacingPreviewGridClassName() {
  return 'grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4';
}

function getSpacingPreviewBoxClassName({ gapClassName, paddingClassName }: {
  gapClassName: string;
  paddingClassName: string;
}) {
  return buildClassName([
    'flex flex-wrap items-center border border-solid border-ds-border bg-ds-surface-subtle rounded-8',
    gapClassName,
    paddingClassName,
  ]);
}

function getSpacingPreviewPillClassName() {
  return 'inline-flex min-h-10 items-center rounded-8 bg-ds-surface px-3 text-ds-text shadow-xs';
}

function getSpacingListClassName() {
  return 'flex flex-col gap-2';
}

function getSpacingRowClassName() {
  return buildClassName([
    'grid min-h-14 items-center gap-4 rounded-8 border border-solid border-ds-border bg-ds-surface px-3 py-2',
    'grid-cols-[minmax(160px,220px)_minmax(140px,1fr)_64px]',
    'max-sm:grid-cols-1 max-sm:gap-2',
  ]);
}

function getSpacingRowLabelClassName() {
  return 'flex flex-col gap-1';
}

function getSpacingRowBarWrapClassName() {
  return 'flex min-h-6 items-center';
}

function getSpacingRowBarClassName() {
  return 'h-4 min-w-px rounded-full bg-brand-500';
}

function getSpacingRowValueClassName() {
  return 'text-right max-sm:text-left';
}

function SizeRow({ step, value }: SizeRowProps) {
  const tailwindClasses = `p-${step} gap-${step} ${radiusClassNames[step]}`;

  return (
    <div className={getSpacingRowClassName()}>
      <div className={getSpacingRowLabelClassName()}>
        <Text as="span" variant="text-md" weight="semibold">
          {step}
        </Text>
        <code>{getSizeTokenName(step)}</code>
        <code>{tailwindClasses}</code>
      </div>
      <div className={getSpacingRowBarWrapClassName()}>
        <div
          className={getSpacingRowBarClassName()}
          style={{ width: typedSize[step] }}
        />
      </div>
      <Text
        as="span"
        variant="text-sm"
        weight="medium"
        className={buildClassName(['text-ds-text-muted', getSpacingRowValueClassName()])}
      >
        {value}
      </Text>
    </div>
  );
}

export function SpacingScale({ showCssVariable = true }: SpacingScaleProps) {
  const previewPillClassName = getSpacingPreviewPillClassName();

  return (
    <div className={getSpacingScaleClassName()}>
      <div className={getSpacingHeaderClassName()}>
        <div>
          <Text as="span" variant="text-sm" weight="semibold" className="text-brand-600">
            Size
          </Text>
          <Text as="h2" variant="display-xs" weight="semibold" className="mt-1">
            4px-based size scale
          </Text>
        </div>
        {showCssVariable ? <code>Size tokens for padding, gap, radius, and layout</code> : null}
      </div>

      <div className={getSpacingPreviewGridClassName()} aria-label="Size scale examples">
        <div className={getSpacingPreviewBoxClassName({ gapClassName: 'gap-2', paddingClassName: 'p-3' })}>
          <Text as="span" variant="text-sm" weight="medium" className={previewPillClassName}>gap 2</Text>
          <Text as="span" variant="text-sm" weight="medium" className={previewPillClassName}>padding 3</Text>
          <Text as="span" variant="text-sm" weight="medium" className={previewPillClassName}>radius 4</Text>
        </div>
        <div className={getSpacingPreviewBoxClassName({ gapClassName: 'gap-4', paddingClassName: 'p-6' })}>
          <Text as="span" variant="text-sm" weight="medium" className={previewPillClassName}>gap 4</Text>
          <Text as="span" variant="text-sm" weight="medium" className={previewPillClassName}>padding 6</Text>
          <Text as="span" variant="text-sm" weight="medium" className={previewPillClassName}>radius 8</Text>
        </div>
      </div>

      <div className={getSpacingListClassName()}>
        {SIZE_STEPS.map((step) => (
          <SizeRow key={step} step={step} value={typedSizePx[step]} />
        ))}
      </div>
    </div>
  );
}
