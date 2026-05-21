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
    <div className="storybook-textfield__dropdown-wrapper">
      <button
        type="button"
        disabled={disabled}
        className={getFieldClassName({ state, hasValue })}
        onClick={() => onOpenChange(!isOpen)}
      >
        <span className="storybook-textfield__field-content">
          {hasValue && (
            <span
              className="storybook-textfield__color-preview"
              style={{ background: color }}
            />
          )}
          <span className={getFieldTextClassName({ state, hasValue })}>
            {textValue}
          </span>
        </span>
      </button>

      {isOpen && !disabled && (
        <div className="storybook-textfield__colorpicker-panel">
          <HexColorPicker color={color} onChange={onColorChange} />

          <input
            type="text"
            value={displayValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onColorChange(event.target.value)}
            placeholder="HEX Code"
            className="storybook-textfield__colorpicker-input"
          />

          <div className="storybook-textfield__opacity-wrapper">
            <div className="storybook-textfield__opacity-grid" />
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onOpacityChange(Number(event.target.value))}
              className="storybook-textfield__opacity-slider"
              style={{ '--current-color': color } as CSSProperties}
            />
          </div>
        </div>
      )}
    </div>
  );
}
