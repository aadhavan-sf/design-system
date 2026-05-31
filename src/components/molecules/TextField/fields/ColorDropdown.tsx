import type { ChangeEvent, CSSProperties } from 'react';
import { HexColorPicker } from 'react-colorful';

import {
  getFieldClassName,
  getFieldTextClassName,
} from '../textFieldState';

export interface ColorDropdownProps {
  color: string;
  disabled: boolean;
  fieldDisplayValue?: string;
  displayValue: string;
  hasValue: boolean;
  isOpen: boolean;
  onColorChange: (color: string) => void;
  onOpenChange: (open: boolean) => void;
  onOpacityChange: (opacity: number) => void;
  opacity: number;
  placeholder: string;
  state: string;
}

export function ColorDropdown({
  color,
  disabled,
  fieldDisplayValue,
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
  const textValue = hasValue ? fieldDisplayValue ?? displayValue : placeholder;

  return (
    <div className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        className={getFieldClassName({ state, hasValue })}
        onClick={() => onOpenChange(!isOpen)}
      >
        <span className="flex min-w-0 flex-1 basis-0 items-center gap-1">
          {hasValue && (
            <span
              className="h-5 w-5 shrink-0 rounded-[6px] ring-1 ring-inset ring-neutral-100"
              style={{ background: color }}
            />
          )}
          <span className={getFieldTextClassName({ state, hasValue })}>
            {textValue}
          </span>
        </span>
      </button>

      {isOpen && !disabled && (
        <div className="textfield-popover-enter mt-3 box-border flex w-[296px] origin-top flex-col gap-3 rounded-2 border border-solid border-neutral-100 bg-neutral-00 p-4 shadow-lg">
          <HexColorPicker color={color} onChange={onColorChange} />

          <input
            type="text"
            value={displayValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onColorChange(event.target.value)}
            placeholder="HEX Code"
            className="order-2 box-border h-11 w-full rounded-2 border border-solid border-neutral-200 bg-neutral-00 px-[14px] py-3 text-sm leading-normal text-neutral-700 placeholder:text-neutral-300 focus:border-neutral-500 focus:outline-none"
          />

          <div className="relative order-4 h-5 w-full overflow-hidden rounded-pill">
            <div className="textfield-opacity-grid absolute inset-0" />
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onOpacityChange(Number(event.target.value))}
              className="storybook-textfield__opacity-slider absolute inset-0 h-5 w-full cursor-pointer appearance-none bg-[linear-gradient(to_right,transparent,var(--current-color))] m-0"
              style={{ '--current-color': color } as CSSProperties}
            />
          </div>
        </div>
      )}
    </div>
  );
}
