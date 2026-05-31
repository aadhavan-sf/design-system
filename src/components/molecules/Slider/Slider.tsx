import { useMemo, useState, type ChangeEvent, type HTMLAttributes } from 'react';

import { Text } from '../../foundations/Typography';

export type SliderStyle = 'classic' | 'dotted' | 'Classic' | 'Dotted';
export type SliderMode = 'single' | 'range' | 'normal' | 'difference' | 'Normal' | 'Difference';
export type SliderState = 'Normal' | 'Difference' | 'normal' | 'difference';
export type SliderLabelPosition =
  | 'none'
  | 'bottom'
  | 'top'
  | 'floating-bottom'
  | 'floating-top'
  | 'None'
  | 'Bottom'
  | 'Top'
  | 'Floating Bottom'
  | 'Floating Top';

type NormalizedSliderMode = 'single' | 'range';
type NormalizedSliderStyle = 'classic' | 'dotted';
type NormalizedLabelPosition = 'none' | 'bottom' | 'top' | 'floating-bottom' | 'floating-top';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'style'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  startValue?: number;
  endValue?: number;
  defaultStartValue?: number;
  defaultEndValue?: number;
  mode?: SliderMode;
  state?: SliderState;
  style?: SliderStyle;
  labelPosition?: SliderLabelPosition;
  label?: SliderLabelPosition;
  disabled?: boolean;
  onChange?: (value: number) => void;
  onRangeChange?: (range: [number, number]) => void;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue<T extends string>(value: string | undefined, aliases: Record<string, T> = {}) {
  if (value === undefined) {
    return undefined;
  }

  return aliases[value] ?? value;
}

function clamp(value: number | string, min: number, max: number) {
  return Math.min(Math.max(Number(value), min), max);
}

function getPercent(value: number, min: number, max: number) {
  if (max === min) {
    return 0;
  }

  return ((value - min) / (max - min)) * 100;
}

function getLabelOffset(labelPosition: NormalizedLabelPosition) {
  if (labelPosition === 'top' || labelPosition === 'floating-top') {
    return 'top';
  }

  if (labelPosition === 'bottom' || labelPosition === 'floating-bottom') {
    return 'bottom';
  }

  return 'none';
}

function SliderValueLabel({ value, position }: { value: number; position: NormalizedLabelPosition }) {
  if (position === 'none') {
    return null;
  }

  const isFloating = position === 'floating-bottom' || position === 'floating-top';

  if (isFloating) {
    return (
      <div
        className={buildClassName([
          'absolute left-1/2 inline-flex -translate-x-1/2 items-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]',
          position === 'floating-top' && 'bottom-8 flex-col',
          position === 'floating-bottom' && 'top-8 flex-col-reverse',
        ])}
        aria-hidden="true"
      >
        <Text
          as="span"
          variant="text-sm"
          weight="medium"
          color="var(--neutral_800)"
          className="box-border inline-flex h-9 min-w-10 items-center justify-center whitespace-nowrap rounded-2 bg-neutral-00 px-3 py-2"
        >
          {value}
        </Text>
        <span className="h-2 w-4 overflow-hidden text-neutral-00">
          <span
            className={buildClassName([
              'mx-auto block h-3 w-3 rotate-45 bg-current',
              position === 'floating-top' ? '-mt-[7px]' : 'mt-[3px]',
            ])}
          />
        </span>
      </div>
    );
  }

  return (
    <Text
      as="span"
      variant="text-md"
      weight="medium"
      color="var(--neutral_800)"
      className={buildClassName([
        'absolute left-1/2 -translate-x-1/2 whitespace-nowrap',
        position === 'top' && 'bottom-9',
        position === 'bottom' && 'top-9',
      ])}
      aria-hidden="true"
    >
      {value}
    </Text>
  );
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 25,
  startValue,
  endValue,
  defaultStartValue = 25,
  defaultEndValue = 50,
  mode,
  state,
  style = 'classic',
  labelPosition,
  label,
  disabled = false,
  className,
  onChange,
  onRangeChange,
  ...props
}: SliderProps) {
  const normalizedMode = normalizeValue(mode ?? state, {
    Normal: 'single',
    Difference: 'range',
    normal: 'single',
    difference: 'range',
  }) as NormalizedSliderMode ?? 'single';
  const normalizedStyle = normalizeValue(style, {
    Classic: 'classic',
    Dotted: 'dotted',
  }) as NormalizedSliderStyle;
  const normalizedLabelPosition = normalizeValue(labelPosition ?? label, {
    None: 'none',
    Bottom: 'bottom',
    Top: 'top',
    'Floating Bottom': 'floating-bottom',
    'Floating Top': 'floating-top',
  }) as NormalizedLabelPosition ?? 'none';

  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalRange, setInternalRange] = useState<[number, number]>([
    defaultStartValue,
    defaultEndValue,
  ]);
  const [focusedThumb, setFocusedThumb] = useState<'single' | 'start' | 'end' | null>(null);

  const isRange = normalizedMode === 'range';
  const currentValue = clamp(value ?? internalValue, min, max);
  const currentRange = useMemo(() => {
    const firstValue = clamp(startValue ?? internalRange[0], min, max);
    const secondValue = clamp(endValue ?? internalRange[1], min, max);

    return [
      Math.min(firstValue, secondValue),
      Math.max(firstValue, secondValue),
    ];
  }, [endValue, internalRange, max, min, startValue]);

  const progressStart = isRange ? getPercent(currentRange[0], min, max) : 0;
  const progressEnd = isRange
    ? getPercent(currentRange[1], min, max)
    : getPercent(currentValue, min, max);
  const steps = useMemo(() => Array.from({ length: 9 }, (_, index) => index * 12.5), []);
  const labelOffset = getLabelOffset(normalizedLabelPosition);

  const handleSingleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = clamp(event.target.value, min, max);

    setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const handleStartChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextStart = Math.min(clamp(event.target.value, min, max), currentRange[1]);
    const nextRange: [number, number] = [nextStart, currentRange[1]];

    setInternalRange(nextRange);
    onRangeChange?.(nextRange);
  };

  const handleEndChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextEnd = Math.max(clamp(event.target.value, min, max), currentRange[0]);
    const nextRange: [number, number] = [currentRange[0], nextEnd];

    setInternalRange(nextRange);
    onRangeChange?.(nextRange);
  };

  return (
    <div
      className={buildClassName([
        'w-80 text-neutral-800',
        (labelOffset === 'top' || labelOffset === 'bottom') && 'py-8',
        labelOffset === 'top' && 'pt-10',
        labelOffset === 'bottom' && 'pb-10',
        disabled && 'opacity-55',
        className,
      ])}
      {...props}
    >
      <div className="relative h-6 w-80 rounded-2">
        <div
          className={buildClassName([
            'absolute inset-x-0 top-1 h-4 rounded-6 bg-neutral-100',
            disabled && 'bg-neutral-50',
          ])}
        />

        {normalizedStyle === 'dotted' && (
          <div className="pointer-events-none absolute inset-x-2 top-1/2 z-[1] h-[6px] -translate-y-1/2" aria-hidden="true">
            {steps.map((stepPosition) => (
              <span
                key={stepPosition}
                className={buildClassName([
                  'absolute top-0 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-neutral-400',
                  stepPosition >= progressStart
                    && stepPosition <= progressEnd
                    && 'bg-neutral-00',
                ])}
                style={{ left: `${stepPosition}%` }}
              />
            ))}
          </div>
        )}

        <div
          className={buildClassName([
            'absolute top-1 h-4 rounded-6 bg-primary-400',
            disabled && 'bg-primary-100',
          ])}
          style={{
            left: `${progressStart}%`,
            width: `${progressEnd - progressStart}%`,
          }}
        />

        {isRange ? (
          <>
            <div
              className={buildClassName([
                'pointer-events-none absolute top-1/2 z-[3] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-solid border-primary-400 bg-neutral-00 shadow-md',
                disabled && 'border-primary-100 shadow-xs',
                focusedThumb === 'start' && 'shadow-slider-focus',
              ])}
              style={{ left: `${progressStart}%` }}
            >
              {normalizedStyle === 'dotted' && (
                <span className={buildClassName(['absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400', disabled && 'bg-primary-100'])} />
              )}
              <SliderValueLabel value={currentRange[0]} position={normalizedLabelPosition} />
            </div>
            <div
              className={buildClassName([
                'pointer-events-none absolute top-1/2 z-[3] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-solid border-primary-400 bg-neutral-00 shadow-md',
                disabled && 'border-primary-100 shadow-xs',
                focusedThumb === 'end' && 'shadow-slider-focus',
              ])}
              style={{ left: `${progressEnd}%` }}
            >
              {normalizedStyle === 'dotted' && (
                <span className={buildClassName(['absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400', disabled && 'bg-primary-100'])} />
              )}
              <SliderValueLabel value={currentRange[1]} position={normalizedLabelPosition} />
            </div>
            <input
              aria-label="Minimum value"
              className="absolute inset-0 z-[6] m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed focus-visible:outline-none"
              disabled={disabled}
              max={max}
              min={min}
              step={step}
              type="range"
              value={currentRange[0]}
              onChange={handleStartChange}
              onBlur={() => setFocusedThumb(null)}
              onFocus={() => setFocusedThumb('start')}
            />
            <input
              aria-label="Maximum value"
              className="absolute inset-0 z-[7] m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed focus-visible:outline-none"
              disabled={disabled}
              max={max}
              min={min}
              step={step}
              type="range"
              value={currentRange[1]}
              onChange={handleEndChange}
              onBlur={() => setFocusedThumb(null)}
              onFocus={() => setFocusedThumb('end')}
            />
          </>
        ) : (
          <>
            <div
              className={buildClassName([
                'pointer-events-none absolute top-1/2 z-[3] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-solid border-primary-400 bg-neutral-00 shadow-md',
                disabled && 'border-primary-100 shadow-xs',
                focusedThumb === 'single' && 'shadow-slider-focus',
              ])}
              style={{ left: `${progressEnd}%` }}
            >
              {normalizedStyle === 'dotted' && (
                <span className={buildClassName(['absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400', disabled && 'bg-primary-100'])} />
              )}
              <SliderValueLabel value={currentValue} position={normalizedLabelPosition} />
            </div>
            <input
              aria-label="Slider value"
              className="absolute inset-0 z-[5] m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed focus-visible:outline-none"
              disabled={disabled}
              max={max}
              min={min}
              step={step}
              type="range"
              value={currentValue}
              onChange={handleSingleChange}
              onBlur={() => setFocusedThumb(null)}
              onFocus={() => setFocusedThumb('single')}
            />
          </>
        )}
      </div>
    </div>
  );
}
