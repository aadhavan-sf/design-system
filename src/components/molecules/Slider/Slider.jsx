import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { Text } from '../../foundations/Typography';

import './slider.css';

const STYLES = ['classic', 'dotted'];
const MODES = ['single', 'range'];
const LABEL_POSITIONS = ['none', 'bottom', 'top', 'floating-bottom', 'floating-top'];

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function clamp(value, min, max) {
  return Math.min(Math.max(Number(value), min), max);
}

function getPercent(value, min, max) {
  if (max === min) {
    return 0;
  }

  return ((value - min) / (max - min)) * 100;
}

function getLabelOffset(labelPosition) {
  if (labelPosition === 'top' || labelPosition === 'floating-top') {
    return 'top';
  }

  if (labelPosition === 'bottom' || labelPosition === 'floating-bottom') {
    return 'bottom';
  }

  return 'none';
}

function SliderValueLabel({ value, position }) {
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
          color="var(--neutral_800)"
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
      color="var(--neutral_800)"
      className="storybook-slider__value-label"
      aria-hidden="true"
    >
      {value}
    </Text>
  );
}

SliderValueLabel.propTypes = {
  value: PropTypes.number.isRequired,
  position: PropTypes.oneOf(LABEL_POSITIONS).isRequired,
};

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
}) {
  const normalizedMode = normalizeValue(mode ?? state, {
    Normal: 'single',
    Difference: 'range',
    normal: 'single',
    difference: 'range',
  }) ?? 'single';
  const normalizedStyle = normalizeValue(style, {
    Classic: 'classic',
    Dotted: 'dotted',
  });
  const normalizedLabelPosition = normalizeValue(labelPosition ?? label, {
    None: 'none',
    Bottom: 'bottom',
    Top: 'top',
    'Floating Bottom': 'floating-bottom',
    'Floating Top': 'floating-top',
  }) ?? 'none';

  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalRange, setInternalRange] = useState([
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

  const handleSingleChange = (event) => {
    const nextValue = clamp(event.target.value, min, max);

    setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const handleStartChange = (event) => {
    const nextStart = Math.min(clamp(event.target.value, min, max), currentRange[1]);
    const nextRange = [nextStart, currentRange[1]];

    setInternalRange(nextRange);
    onRangeChange?.(nextRange);
  };

  const handleEndChange = (event) => {
    const nextEnd = Math.max(clamp(event.target.value, min, max), currentRange[0]);
    const nextRange = [currentRange[0], nextEnd];

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

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  startValue: PropTypes.number,
  endValue: PropTypes.number,
  defaultStartValue: PropTypes.number,
  defaultEndValue: PropTypes.number,
  mode: PropTypes.oneOf([...MODES, 'normal', 'difference', 'Normal', 'Difference']),
  state: PropTypes.oneOf(['Normal', 'Difference', 'normal', 'difference']),
  style: PropTypes.oneOf([...STYLES, 'Classic', 'Dotted']),
  labelPosition: PropTypes.oneOf([
    ...LABEL_POSITIONS,
    'None',
    'Bottom',
    'Top',
    'Floating Bottom',
    'Floating Top',
  ]),
  label: PropTypes.oneOf(['None', 'Bottom', 'Top', 'Floating Bottom', 'Floating Top']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onRangeChange: PropTypes.func,
};
