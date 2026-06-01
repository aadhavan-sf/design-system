import { useMemo, useState, type ChangeEvent, type HTMLAttributes } from 'react';

import { Text } from '../../foundations/Typography';

import './slider.css';

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
      <div className="storybook-slider__floating-label" aria-hidden="true">
        <Text
          as="span"
          variant="text-sm"
          weight="medium"
          color="currentColor"
          className="storybook-slider__floating-label-text"
        >
          {value}
        </Text>
        <span className="storybook-slider__floating-label-arrow" />
      </div>
    );
  }

  return (
    <Text
      as="span"
      variant="text-md"
      weight="medium"
      color="currentColor"
      className="storybook-slider__value-label"
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
        'storybook-slider',
        `storybook-slider--${normalizedStyle}`,
        `storybook-slider--${normalizedMode}`,
        `storybook-slider--labels-${labelOffset}`,
        disabled && 'storybook-slider--disabled',
        className,
      ])}
      {...props}
    >
      <div className="storybook-slider__control">
        <div className="storybook-slider__rail" />

        {normalizedStyle === 'dotted' && (
          <div className="storybook-slider__steps" aria-hidden="true">
            {steps.map((stepPosition) => (
              <span
                key={stepPosition}
                className={buildClassName([
                  'storybook-slider__step',
                  stepPosition >= progressStart
                    && stepPosition <= progressEnd
                    && 'storybook-slider__step--active',
                ])}
                style={{ left: `${stepPosition}%` }}
              />
            ))}
          </div>
        )}

        <div
          className="storybook-slider__progress"
          style={{
            left: `${progressStart}%`,
            width: `${progressEnd - progressStart}%`,
          }}
        />

        {isRange ? (
          <>
            <div
              className="storybook-slider__thumb storybook-slider__thumb--start"
              style={{ left: `${progressStart}%` }}
            >
              <SliderValueLabel value={currentRange[0]} position={normalizedLabelPosition} />
            </div>
            <div
              className="storybook-slider__thumb storybook-slider__thumb--end"
              style={{ left: `${progressEnd}%` }}
            >
              <SliderValueLabel value={currentRange[1]} position={normalizedLabelPosition} />
            </div>
            <input
              aria-label="Minimum value"
              className="storybook-slider__input storybook-slider__input--start"
              disabled={disabled}
              max={max}
              min={min}
              step={step}
              type="range"
              value={currentRange[0]}
              onChange={handleStartChange}
            />
            <input
              aria-label="Maximum value"
              className="storybook-slider__input storybook-slider__input--end"
              disabled={disabled}
              max={max}
              min={min}
              step={step}
              type="range"
              value={currentRange[1]}
              onChange={handleEndChange}
            />
          </>
        ) : (
          <>
            <div
              className="storybook-slider__thumb"
              style={{ left: `${progressEnd}%` }}
            >
              <SliderValueLabel value={currentValue} position={normalizedLabelPosition} />
            </div>
            <input
              aria-label="Slider value"
              className="storybook-slider__input"
              disabled={disabled}
              max={max}
              min={min}
              step={step}
              type="range"
              value={currentValue}
              onChange={handleSingleChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
