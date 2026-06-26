export function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

export function clamp(value: number | string, min: number, max: number) {
  return Math.min(Math.max(Number(value), min), max);
}

export function getPercent(value: number, min: number, max: number) {
  if (max === min) {
    return 0;
  }

  return ((value - min) / (max - min)) * 100;
}

function getSliderRailClasses(disabled: boolean) {
  return disabled ? 'bg-neutral-50' : 'bg-neutral-100';
}

function getSliderProgressClasses(disabled: boolean) {
  return disabled ? 'bg-brand-100' : 'bg-brand-400';
}

export function getSliderRailClassName(disabled: boolean) {
  return buildClassName([
    'storybook-slider__rail rounded-6',
    getSliderRailClasses(disabled),
  ]);
}

export function getSliderProgressClassName(disabled: boolean) {
  return buildClassName([
    'storybook-slider__progress z-[1] rounded-6',
    getSliderProgressClasses(disabled),
  ]);
}

export function getProgressBarTrackClassName(disabled: boolean) {
  return buildClassName([
    'storybook-progress-bar__track h-4 w-full overflow-hidden rounded-8',
    disabled ? 'bg-neutral-50' : 'bg-neutral-100',
  ]);
}

export function getProgressBarFillClassName(disabled: boolean) {
  return buildClassName([
    'storybook-progress-bar__fill h-full rounded-8',
    disabled ? 'bg-brand-100' : 'bg-brand-400',
  ]);
}
