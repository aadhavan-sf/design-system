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

function getColorFieldLayoutClasses() {
  return buildClassName([
    'storybook-color-field',
    'box-border flex h-11 w-full min-w-0 items-center justify-between gap-2',
    'rounded-8 border border-solid bg-neutral-0 px-[14px] py-3',
    'text-left',
    'focus-visible:border-neutral-500',
  ]);
}

function getColorFieldStateClasses(state: NormalizedTextFieldState | string) {
  if (state === 'disabled') {
    return 'border-neutral-200 bg-neutral-25';
  }

  if (state === 'error') {
    return 'border-error-600';
  }

  if (state === 'active') {
    return 'border-neutral-500';
  }

  return 'border-neutral-200';
}

function getColorFieldClassName(state: NormalizedTextFieldState | string) {
  return buildClassName([
    getColorFieldLayoutClasses(),
    getColorFieldStateClasses(state),
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

function getColorDisplayTextLayoutClasses() {
  return buildClassName([
    'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap',
    'font-sans text-ds-text-sm font-normal',
    textFieldTrackingClass,
  ]);
}

function getColorPreviewClassName() {
  return buildClassName([
    'storybook-color-field__preview',
    'size-5 shrink-0 rounded-1.5',
  ]);
}

function getColorPanelClassName() {
  return buildClassName([
    'storybook-color-field__panel',
    'mt-3 box-border flex w-[296px] flex-col gap-3',
    'rounded-8 border border-solid border-neutral-100 bg-neutral-0 p-4 shadow-lg',
  ]);
}

function getColorHexInputClassName() {
  return buildClassName([
    'storybook-color-field__hex-input',
    'order-2 box-border h-11 w-full px-[14px] py-3',
    'rounded-8 border border-solid border-neutral-200 bg-neutral-0',
    'font-sans text-ds-text-sm font-normal text-neutral-700',
    'placeholder:font-sans placeholder:text-ds-text-sm placeholder:font-normal placeholder:text-neutral-300',
    textFieldPlaceholderTrackingClass,
    'focus:border-neutral-500',
  ]);
}

function getColorOpacityTrackClassName() {
  return 'relative order-4 h-5 w-full overflow-hidden rounded-full';
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
              className={getColorPreviewClassName()}
              style={{ background: color }}
              aria-hidden="true"
            />
          )}
          <Text
            as="span"
            variant="text-sm"
            weight="regular"
            className={buildClassName([
              getColorDisplayTextLayoutClasses(),
              getColorDisplayTextClassName({ hasValue, state }),
            ])}
          >
            {textValue}
          </Text>
        </span>
      </button>

      {isOpen && !disabled && (
        <div className={getColorPanelClassName()}>
          <HexColorPicker color={color} onChange={onColorChange} />

          <input
            type="text"
            value={displayValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onColorChange(event.target.value)}
            placeholder="HEX Code"
            className={getColorHexInputClassName()}
          />

          <div className={getColorOpacityTrackClassName()}>
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
