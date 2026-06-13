import type { ChangeEvent, CSSProperties } from 'react';
import { HexColorPicker } from 'react-colorful';

import { Text } from '../../../foundations/Typography';
import {
  buildClassName,
  textFieldPlaceholderTrackingClass,
  textFieldTrackingClass,
  type NormalizedTextFieldState,
} from '../textField.constants';

import './colorDropdownField.css';

export interface ColorDropdownProps {
  color: string;
  disabled: boolean;
  displayValue: string;
  hasValue: boolean;
  isOpen: boolean;
  onColorChange: (color: string) => void;
  onOpenChange: (open: boolean) => void;
  onOpacityChange: (opacity: number) => void;
  opacity: number;
  placeholder: string;
  state: NormalizedTextFieldState | string;
}

function getColorFieldClassName(state: NormalizedTextFieldState | string) {
  const baseClasses = [
    'storybook-color-field',
    'box-border flex h-11 w-full min-w-0 cursor-pointer items-center justify-between gap-2 px-[14px] py-3',
    'rounded-8 border border-solid bg-neutral-0',
    'font-sans text-ds-text-sm font-normal text-neutral-700',
    'transition-[border-color,background-color,color,box-shadow] duration-150 ease-out',
    'focus:outline-none focus-visible:border-neutral-500',
  ];

  if (state === 'disabled') {
    return buildClassName([
      ...baseClasses,
      'cursor-not-allowed border-neutral-200 bg-neutral-25 text-neutral-300',
    ]);
  }

  if (state === 'error') {
    return buildClassName([
      ...baseClasses,
      'border-error-600 text-error-600',
    ]);
  }

  if (state === 'active') {
    return buildClassName([
      ...baseClasses,
      'border-neutral-500',
    ]);
  }

  return buildClassName([
    ...baseClasses,
    'border-neutral-200',
  ]);
}

function getColorDisplayTextClassName({
  hasValue,
  state,
}: {
  hasValue: boolean;
  state: NormalizedTextFieldState | string;
}) {
  if (!hasValue) {
    return state === 'error' ? 'text-error-600' : 'text-neutral-300';
  }

  if (state === 'error') {
    return 'text-error-600';
  }

  if (state === 'disabled') {
    return 'text-neutral-300';
  }

  return 'text-neutral-700';
}

export function ColorDropdown({
  color,
  disabled,
  displayValue,
  hasValue,
  isOpen,
  onColorChange,
  onOpenChange,
  onOpacityChange,
  opacity,
  placeholder,
  state,
}: ColorDropdownProps) {
  const textValue = hasValue ? displayValue : placeholder;

  return (
    <div className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        className={getColorFieldClassName(state)}
        onClick={() => onOpenChange(!isOpen)}
      >
        <span className="flex min-w-0 flex-[1_0_0] items-center gap-1">
          {hasValue && (
            <span
              className="storybook-color-field__preview size-5 shrink-0 rounded-1.5"
              style={{ background: color }}
              aria-hidden="true"
            />
          )}
          <Text
            as="span"
            variant="text-sm"
            weight="regular"
            className={buildClassName([
              'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-sans text-ds-text-sm font-normal',
              textFieldTrackingClass,
              getColorDisplayTextClassName({ hasValue, state }),
            ])}
          >
            {textValue}
          </Text>
        </span>
      </button>

      {isOpen && !disabled && (
        <div
          className={buildClassName([
            'storybook-color-field__panel',
            'mt-3 box-border flex w-[296px] flex-col gap-3 rounded-8 border border-solid border-neutral-100 bg-neutral-0 p-4 shadow-lg',
          ])}
        >
          <HexColorPicker color={color} onChange={onColorChange} />

          <input
            type="text"
            value={displayValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onColorChange(event.target.value)}
            placeholder="HEX Code"
            className={buildClassName([
              'order-2 box-border h-11 w-full px-[14px] py-3',
              'rounded-8 border border-solid border-neutral-200 bg-neutral-0',
              'font-sans text-ds-text-sm font-normal text-neutral-700',
              'placeholder:font-sans placeholder:text-ds-text-sm placeholder:font-normal placeholder:text-neutral-300',
              textFieldPlaceholderTrackingClass,
              'focus:border-neutral-500 focus:outline-none',
            ])}
          />

          <div className="relative order-4 h-5 w-full overflow-hidden rounded-full">
            <div className="storybook-color-field__opacity-grid" aria-hidden="true" />
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onOpacityChange(Number(event.target.value))}
              className="storybook-color-field__opacity-slider"
              style={{ '--current-color': color } as CSSProperties}
              aria-label="Color opacity"
            />
          </div>
        </div>
      )}
    </div>
  );
}
