import PropTypes from 'prop-types';

import {
  useState,
  useRef,
  useEffect,
} from 'react';

import {
  CaretUpDown,
  User,
  Check,
} from '@phosphor-icons/react';

import { HexColorPicker } from 'react-colorful';
import { HelpIcon } from '../Tooltip/HelpIcon';

import './textfield.css';

export const TextField = ({
  type = 'input',
  state = 'default',

  label = true,
  tooltip = true,
  tooltipTitle = 'This is a tooltip',
  tooltipDescription = 'Tooltips are used to describe or identify an element.',
  tooltipSupportingText = false,
  tooltipPlacement = 'Top arrow',
  astriks = true,

  labelText = 'Label',

  placeholder = 'Placeholder text',

  helperText = 'Info text comes here',
  errorText = 'Error text comes here',

  options = [],

  withIcon = false,
}) => {
  /* =====================================
     FIELD STATES
  ===================================== */

  const [inputValue, setInputValue] =
    useState('');

  const [selectedOption, setSelectedOption] =
    useState('');

  const [isOpen, setIsOpen] =
    useState(state === 'active');

  /* =====================================
     COLOR PICKER STATES
  ===================================== */

  const [color, setColor] =
    useState('#131313');

  const [opacity, setOpacity] =
    useState(100);

  const colorPickerRef =
    useRef(null);

  /* =====================================
     INTERACTION STATES
  ===================================== */

  const isDisabled =
    state === 'disabled';

  const isError =
    state === 'error';

  const isActive =
    state === 'active';

  const isColorPicker =
    type === 'color-picker';

  const isFilled =
    state === 'filled' ||
    state === 'error' ||
    state === 'disabled' ||
    state === 'info' ||
    inputValue.length > 0 ||
    selectedOption.length > 0;

  /* =====================================
     CLOSE ON OUTSIDE CLICK
  ===================================== */

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(
          event.target
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  /* =====================================
     HEX WITH OPACITY
  ===================================== */

  const alphaHex = Math.round(
    (opacity / 100) * 255
  )
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

  const finalHex =
    opacity === 100
      ? color.toUpperCase()
      : `${color.toUpperCase()}${alphaHex}`;

  /* =====================================
     LIGHT COLOR DETECTION
  ===================================== */

  const hexToRgb = (hex) => {
    const cleanHex = hex
      .replace('#', '')
      .slice(0, 6);

    const bigint = parseInt(
      cleanHex,
      16
    );

    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const { r, g, b } =
    hexToRgb(color);

  const isLightColor =
    r > 220 &&
    g > 220 &&
    b > 220;

  /* =====================================
     CLASSNAMES
  ===================================== */

  const inputClasses = [
    'storybook-textfield__input',

    isActive &&
      'storybook-textfield__input--active',

    isFilled &&
      'storybook-textfield__input--filled',

    isError &&
      'storybook-textfield__input--error',

    isDisabled &&
      'storybook-textfield__input--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  const dropdownClasses = [
    'storybook-textfield__dropdown',

    isActive &&
      'storybook-textfield__dropdown--active',

    isFilled &&
      'storybook-textfield__dropdown--filled',

    isError &&
      'storybook-textfield__dropdown--error',

    isDisabled &&
      'storybook-textfield__dropdown--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="storybook-textfield">

      {/* =====================================
          LABEL
      ===================================== */}

      {label && (
        <div className="storybook-textfield__header">

          <label className="storybook-textfield__label">
            {labelText}
          </label>

          {tooltip && (
            <HelpIcon
              className="storybook-textfield__tooltip"
              title={tooltipTitle}
              description={tooltipDescription}
              supportingText={tooltipSupportingText}
              tooltip={tooltipPlacement}
            />
          )}

          {astriks && (
            <span className="storybook-textfield__required">
              *
            </span>
          )}

        </div>
      )}

      {/* =====================================
          INPUT FIELD
      ===================================== */}

      {type === 'input' && (
        <input
          type="text"
          value={inputValue}
          disabled={isDisabled}
          placeholder={placeholder}
          onChange={(e) =>
            setInputValue(
              e.target.value
            )
          }
          className={inputClasses}
        />
      )}

      {/* =====================================
          DROPDOWN
      ===================================== */}

      {type === 'dropdown' && (
        <div className="storybook-textfield__dropdown-wrapper">

          <button
            type="button"
            disabled={isDisabled}
            className={dropdownClasses}
            onClick={() =>
              setIsOpen(!isOpen)
            }
          >

            <div className="storybook-textfield__dropdown-value">

              {withIcon &&
                selectedOption && (
                  <User
                    size={16}
                    weight="regular"
                  />
                )}

              <span
                className={[
                  'storybook-textfield__dropdown-text',

                  isFilled &&
                    'storybook-textfield__dropdown-text--filled',

                  isError &&
                    'storybook-textfield__dropdown-text--error',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {selectedOption ||
                  placeholder}
              </span>

            </div>

            <span className="storybook-textfield__dropdown-icon">

              <CaretUpDown
                size={16}
                weight="regular"
              />

            </span>

          </button>

          {isOpen &&
            !isDisabled && (
              <div className="storybook-textfield__menu">

                {options.map(
                  (option) => {
                    const isSelected =
                      selectedOption ===
                      option;

                    return (
                      <button
                        key={option}
                        type="button"
                        className={[
                          'storybook-textfield__menu-item',

                          isSelected &&
                            'storybook-textfield__menu-item--selected',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => {
                          setSelectedOption(
                            option
                          );

                          setIsOpen(
                            false
                          );
                        }}
                      >

                        <div className="storybook-textfield__menu-item-left">

                          {withIcon && (
                            <span className="storybook-textfield__menu-item-icon">
                              <User
                                size={16}
                                weight="regular"
                              />
                            </span>
                          )}

                          <span className="storybook-textfield__menu-item-text">
                            {option}
                          </span>

                        </div>

                        {isSelected && (
                          <span className="storybook-textfield__menu-check">
                            <Check
                              size={16}
                              weight="regular"
                            />
                          </span>
                        )}

                      </button>
                    );
                  }
                )}

              </div>
            )}

        </div>
      )}

      {/* =====================================
          COLOR PICKER
      ===================================== */}

      {isColorPicker && (
        <div
          ref={colorPickerRef}
          className="storybook-textfield__colorpicker-wrapper"
        >

          <button
            type="button"
            className={dropdownClasses}
            onClick={() =>
              !isDisabled &&
              setIsOpen(!isOpen)
            }
          >

            <div className="storybook-textfield__dropdown-value">

              {/* SHOW PREVIEW ONLY
                  FOR NON DEFAULT STATES */}

              {state !== 'default' && (
                <div
                  className={[
                    'storybook-textfield__color-preview',

                    isLightColor &&
                      'storybook-textfield__color-preview--light',

                    isDisabled &&
                      'storybook-textfield__color-preview--disabled',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{
                    background:
                      finalHex,
                  }}
                />
              )}

              <span
                className={[
                  'storybook-textfield__dropdown-text',

                  state !==
                    'default' &&
                    'storybook-textfield__dropdown-text--filled',

                  isError &&
                    'storybook-textfield__dropdown-text--error',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {state === 'default'
                  ? 'Click to select'
                  : finalHex}
              </span>

            </div>

          </button>

          {isOpen &&
            !isDisabled && (
              <div className="storybook-textfield__colorpicker-panel">

                {/* =====================================
                    HEX FIELD
                ===================================== */}

                <div className="storybook-textfield__colorpicker-hex">

                  <input
                    type="text"
                    value={finalHex}
                    onChange={(e) =>
                      setColor(
                        e.target.value
                      )
                    }
                    placeholder="HEX Code"
                    className="storybook-textfield__colorpicker-input"
                  />

                </div>

                {/* =====================================
                    COLOR PICKER
                ===================================== */}

                <HexColorPicker
                  color={color}
                  onChange={setColor}
                />

                {/* =====================================
                    OPACITY
                ===================================== */}

                <div className="storybook-textfield__opacity-wrapper">

                  <div className="storybook-textfield__opacity-grid" />

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={opacity}
                    onChange={(e) =>
                      setOpacity(
                        Number(
                          e.target
                            .value
                        )
                      )
                    }
                    className="storybook-textfield__opacity-slider"
                    style={{
                      '--current-color':
                        color,
                    }}
                  />

                </div>

              </div>
            )}

        </div>
      )}

      {/* =====================================
          HELPER TEXT
      ===================================== */}

      {state === 'info' && (
        <span className="storybook-textfield__helper">
          {helperText}
        </span>
      )}

      {/* =====================================
          ERROR TEXT
      ===================================== */}

      {isError && (
        <span className="storybook-textfield__helper storybook-textfield__helper--error">
          {errorText}
        </span>
      )}

    </div>
  );
};

TextField.propTypes = {
  type: PropTypes.oneOf([
    'input',
    'dropdown',
    'color-picker',
  ]),

  state: PropTypes.oneOf([
    'default',
    'active',
    'filled',
    'info',
    'error',
    'disabled',
  ]),

  label: PropTypes.bool,
  tooltip: PropTypes.bool,
  tooltipTitle:
    PropTypes.string,
  tooltipDescription:
    PropTypes.string,
  tooltipSupportingText:
    PropTypes.bool,
  tooltipPlacement:
    PropTypes.oneOf([
      'Top no arrow',
      'Top arrow',
      'Top left',
      'Top right',
      'Bottom',
      'Left',
      'Right',
    ]),
  astriks: PropTypes.bool,

  labelText:
    PropTypes.string,

  placeholder:
    PropTypes.string,

  helperText:
    PropTypes.string,

  errorText:
    PropTypes.string,

  options:
    PropTypes.array,

  withIcon:
    PropTypes.bool,
};
