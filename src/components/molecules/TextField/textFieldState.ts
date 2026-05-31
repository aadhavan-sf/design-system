import { buildClassName } from './textField.constants';

export function getFieldClassName({
  state,
  className,
}: {
  state: string;
  hasValue: boolean;
  className?: string | false;
}) {
  return buildClassName([
    'box-border flex h-11 w-full min-w-0 items-center justify-between gap-2 rounded-2 border border-solid border-neutral-200 bg-neutral-00 px-[14px] py-3 font-sans text-sm font-normal leading-normal tracking-normal text-neutral-700 transition-[background-color,border-color,box-shadow,color] duration-[160ms] placeholder:font-sans placeholder:text-sm placeholder:font-normal placeholder:leading-normal placeholder:tracking-normal placeholder:text-neutral-300 focus:outline-none focus-visible:border-neutral-500 disabled:cursor-not-allowed',
    (state === 'active' || state === 'focus') && 'border-neutral-500',
    state === 'error' && 'border-error-600 text-error-600 placeholder:text-error-600',
    state === 'disabled' && 'cursor-not-allowed border-neutral-200 bg-neutral-25 text-neutral-300',
    className,
  ]);
}

export function getFieldTextClassName({
  state,
  hasValue,
}: {
  state: string;
  hasValue: boolean;
}) {
  return buildClassName([
    'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-sans text-sm font-normal leading-normal tracking-normal',
    hasValue ? 'text-neutral-700' : 'text-neutral-300',
    state === 'error' && 'text-error-600',
    state === 'disabled' && 'text-neutral-300',
  ]);
}
