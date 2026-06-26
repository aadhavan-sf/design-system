import { useMemo, useState, type ChangeEvent, type HTMLAttributes } from 'react';

import { Text } from '../../foundations/Typography';
import {
  buildClassName,
  clamp,
  getPercent,
  getSliderProgressClassName,
  getSliderRailClassName,
} from './sliderShared';

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
type LabelOffset = 'none' | 'top' | 'bottom';

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

function normalizeValue<T extends string>(value: string | undefined, aliases: Record<string, T> = {}) {
  if (value === undefined) {
    return undefined;
  }

  return aliases[value] ?? value;
}

function getLabelOffset(labelPosition: NormalizedLabelPosition): LabelOffset {
  if (labelPosition === 'top' || labelPosition === 'floating-top') {
    return 'top';
  }

  if (labelPosition === 'bottom' || labelPosition === 'floating-bottom') {
    return 'bottom';
  }

  return 'none';
}

function getSliderLabelPaddingClasses(labelOffset: LabelOffset) {
  if (labelOffset === 'top') {
    return 'py-8 pt-10';
  }

  if (labelOffset === 'bottom') {
    return 'py-8 pb-10';
  }

  return '';
}

function getSliderShellClassName({
  disabled,
  labelOffset,
  normalizedStyle,
  className,
}: {
  disabled: boolean;
  labelOffset: LabelOffset;
  normalizedStyle: NormalizedSliderStyle;
  className?: string;
}) {
  return buildClassName([
    'storybook-slider w-[320px] text-neutral-800',
    getSliderLabelPaddingClasses(labelOffset),
    normalizedStyle === 'dotted' && 'storybook-slider--dotted',
    disabled && 'storybook-slider--disabled opacity-[0.55]',
    className,
  ]);
}

function getSliderStepClasses(active: boolean) {
  return active ? 'bg-neutral-0' : 'bg-neutral-400';
}

function getSliderThumbClasses(disabled: boolean, style: NormalizedSliderStyle) {
  if (style === 'dotted') {
    return disabled
      ? 'border-0 bg-neutral-0 shadow-xs'
      : 'border-0 bg-neutral-0 shadow-md';
  }

  return disabled
    ? 'border-2 border-solid border-brand-100 bg-neutral-0 shadow-xs'
    : 'border-2 border-solid border-brand-400 bg-neutral-0 shadow-md';
}

function getSliderStepClassName(active: boolean) {
  return buildClassName([
    'storybook-slider__step size-1.5 rounded-full',
    getSliderStepClasses(active),
  ]);
}

function getSliderThumbClassName(disabled: boolean, style: NormalizedSliderStyle) {
  return buildClassName([
    'storybook-slider__thumb box-border rounded-full',
    getSliderThumbClasses(disabled, style),
  ]);
}

function getSliderInputClassName(variant?: 'start' | 'end') {
  return buildClassName([
    'storybook-slider__input absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0',
    variant === 'start' && 'storybook-slider__input--start z-[6]',
    variant === 'end' && 'storybook-slider__input--end z-[7]',
    !variant && 'z-[5]',
    'disabled:cursor-not-allowed',
  ]);
}

function getValueLabelClassName(labelOffset: LabelOffset) {
  return buildClassName([
    'storybook-slider__value-label',
    labelOffset === 'top' && 'storybook-slider__value-label--top',
    labelOffset === 'bottom' && 'storybook-slider__value-label--bottom',
  ]);
}

function getFloatingLabelClassName(labelOffset: LabelOffset) {
  return buildClassName([
    'storybook-slider__floating-label',
    labelOffset === 'top' && 'storybook-slider__floating-label--top',
    labelOffset === 'bottom' && 'storybook-slider__floating-label--bottom',
  ]);
}

function SliderValueLabel({
  labelOffset,
  value,
  position,
}: {
  labelOffset: LabelOffset;
  value: number;
  position: NormalizedLabelPosition;
}) {
  if (position === 'none') {
    return null;
  }

  const isFloating = position === 'floating-bottom' || position === 'floating-top';

  if (isFloating) {
    return (
      <div
        className={getFloatingLabelClassName(labelOffset)}
        aria-hidden="true"
      >
        <Text
          as="span"
          variant="text-sm"
          weight="medium"
          className="box-border inline-flex h-9 min-w-10 items-center justify-center whitespace-nowrap rounded-2 bg-neutral-0 px-3 py-2 text-neutral-800 shadow-md"
        >
          {value}
        </Text>
        <span
          className={buildClassName([
            'storybook-slider__floating-label-arrow text-neutral-0',
            labelOffset === 'bottom' && 'storybook-slider__floating-label-arrow--bottom',
          ])}
        />
      </div>
    );
  }

  return (
    <Text
      as="span"
      variant="text-md"
      weight="medium"
      className={buildClassName([
        'text-neutral-800',
        getValueLabelClassName(labelOffset),
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
      className={getSliderShellClassName({
        disabled,
        labelOffset,
        normalizedStyle,
        className,
      })}
      {...props}
    >
      <div className="storybook-slider__control relative h-6 w-[320px] rounded-2">
        <div className={getSliderRailClassName(disabled)} />

        {normalizedStyle === 'dotted' && (
          <div
            className="storybook-slider__steps"
            aria-hidden="true"
          >
            {steps.map((stepPosition) => {
              const isActive = stepPosition >= progressStart && stepPosition <= progressEnd;

              return (
                <span
                  key={stepPosition}
                  className={getSliderStepClassName(isActive)}
                  style={{ left: `${stepPosition}%` }}
                />
              );
            })}
          </div>
        )}

        <div
          className={getSliderProgressClassName(disabled)}
          style={{
            left: `${progressStart}%`,
            width: `${progressEnd - progressStart}%`,
          }}
        />

        {isRange ? (
          <>
            <div
              className={getSliderThumbClassName(disabled, normalizedStyle)}
              style={{ left: `${progressStart}%` }}
            >
              <SliderValueLabel
                labelOffset={labelOffset}
                value={currentRange[0]}
                position={normalizedLabelPosition}
              />
            </div>
            <div
              className={getSliderThumbClassName(disabled, normalizedStyle)}
              style={{ left: `${progressEnd}%` }}
            >
              <SliderValueLabel
                labelOffset={labelOffset}
                value={currentRange[1]}
                position={normalizedLabelPosition}
              />
            </div>
            <input
              aria-label="Minimum value"
              className={getSliderInputClassName('start')}
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
              className={getSliderInputClassName('end')}
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
              className={getSliderThumbClassName(disabled, normalizedStyle)}
              style={{ left: `${progressEnd}%` }}
            >
              <SliderValueLabel
                labelOffset={labelOffset}
                value={currentValue}
                position={normalizedLabelPosition}
              />
            </div>
            <input
              aria-label="Slider value"
              className={getSliderInputClassName()}
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
