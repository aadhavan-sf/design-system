import type { HTMLAttributes } from 'react';

import {
  buildClassName,
  clamp,
  getPercent,
  getProgressBarFillClassName,
  getProgressBarTrackClassName,
} from '../Slider/sliderShared';

import './progressBar.css';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function ProgressBar({
  value = 0,
  min = 0,
  max = 100,
  disabled = false,
  className,
  ...props
}: ProgressBarProps) {
  const clampedValue = clamp(value, min, max);
  const progressPercent = getPercent(clampedValue, min, max);

  return (
    <div
      {...props}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={clampedValue}
      className={buildClassName([
        'storybook-progress-bar w-full',
        disabled && 'opacity-[0.55]',
        className,
      ])}
      role="progressbar"
    >
      <div className={getProgressBarTrackClassName(disabled)}>
        <div
          className={getProgressBarFillClassName(disabled)}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
