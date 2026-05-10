import PropTypes from 'prop-types';
import { useState } from 'react';

import {
  InfoIcon,
  CaretUpDown,
  Check,
  User,
} from '@phosphor-icons/react';

import './textfield.css';

export const TextField = ({
  type = 'input',
  state = 'default',

  label = true,
  tooltip = false,
  astriks = false,

  labelText = 'Label',
  placeholder = 'Placeholder text',

  helperText = 'Info text comes here',
  errorText = 'Error text comes here',

  options = [],
  withIcon = false,

  disabled = false,

  ...props
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  /* =========================
     STATES
  ========================= */

  const isDisabled =
    disabled || state === 'disabled';

  const isError =
    state === 'error';

  const isActive =
    state === 'active';

  const isFilled =
    inputValue.length > 0 ||
    selectedOption.length > 0 ||
    state === 'filled';

  /* =========================
     CLASS HELPERS
  ========================= */

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

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="storybook-textfield">

      {/* =========================
          LABEL
      ========================= */}

      {label && (
        <div className="storybook-textfield__header">

          <label
            htmlFor="textfield"
            className="storybook-textfield__label"
          >
            {labelText}
          </label>

          {tooltip && (
            <span className="storybook-textfield__tooltip">
              <InfoIcon
                size={16}
                weight="regular"
              />
            </span>
          )}

          {astriks && (
            <span className="storybook-textfield__required">
              *
            </span>
          )}

        </div>
      )}

      {/* =========================
          INPUT FIELD
      ========================= */}

      {type === 'input' && (
        <input
          id="textfield"
          type="text"
          value={inputValue}
          disabled={isDisabled}
          placeholder={placeholder}
          onChange={(e) =>
            setInputValue(e.target.value)
          }
          className={inputClasses}
          aria-invalid={isError}
          aria-disabled={isDisabled}
          {...props}
        />
      )}

      {/* =========================
          DROPDOWN
      ========================= */}

      {type === 'dropdown' && (
        <div className="storybook-textfield__dropdown-wrapper">

          <button
            type="button"
            disabled={isDisabled}
            className={dropdownClasses}
            onClick={() =>
              setIsOpen(!isOpen)
            }
            aria-expanded={isOpen}
          >

            <div className="storybook-textfield__dropdown-value">

              {withIcon && selectedOption && (
                <User
                  size={20}
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
                {selectedOption || placeholder}
              </span>

            </div>

            <span className="storybook-textfield__dropdown-icon">
                <CaretUpDown
                    size={20}
                    weight="regular"
                    className={[
                        'storybook-textfield__dropdown-icon',

                        isError &&
                        'storybook-textfield__dropdown-icon--error',
                    ]
                        .filter(Boolean)
                        .join(' ')}
                />
            </span>

          </button>

          {/* =========================
              DROPDOWN MENU
          ========================= */}

          {isOpen && !isDisabled && (
            <div className="storybook-textfield__menu">

              {options.map((option) => {

                const isSelected =
                  selectedOption === option;

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
                      setSelectedOption(option);
                      setIsOpen(false);
                    }}
                  >

                    <div className="storybook-textfield__menu-item-left">

                      {withIcon && (
                        <span className="storybook-textfield__menu-item-icon">
                          <User
                            size={20}
                            weight="regular"
                          />
                        </span>
                      )}

                      <span>{option}</span>

                    </div>

                    {isSelected && (
                      <span className="storybook-textfield__menu-check">
                        <Check
                          size={20}
                          weight="regular"
                        />
                      </span>
                    )}

                  </button>
                );
              })}

            </div>
          )}

        </div>
      )}

      {/* =========================
          HELPER TEXT
      ========================= */}

      {state === 'info' && (
        <span className="storybook-textfield__helper">
          {helperText}
        </span>
      )}

      {/* =========================
          ERROR TEXT
      ========================= */}

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
  astriks: PropTypes.bool,

  labelText: PropTypes.string,
  placeholder: PropTypes.string,

  helperText: PropTypes.string,
  errorText: PropTypes.string,

  options: PropTypes.array,
  withIcon: PropTypes.bool,

  disabled: PropTypes.bool,
};