import PropTypes from 'prop-types';
import { HexColorPicker } from 'react-colorful';

import {
  getFieldClassName,
  getFieldTextClassName,
} from '../textFieldState';

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
}) {
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
            onChange={(event) => onColorChange(event.target.value)}
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
              onChange={(event) => onOpacityChange(Number(event.target.value))}
              className="storybook-textfield__opacity-slider"
              style={{ '--current-color': color }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

ColorDropdown.propTypes = {
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  fieldDisplayValue: PropTypes.string,
  displayValue: PropTypes.string.isRequired,
  hasValue: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onOpacityChange: PropTypes.func.isRequired,
  opacity: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};
