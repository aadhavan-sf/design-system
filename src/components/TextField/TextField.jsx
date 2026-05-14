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
  /* ========================================
     TYPE
  ======================================== */

  type = 'input',

  /* ========================================
     STATE
  ======================================== */

  state = 'default',

  /* ========================================
     LABEL
  ======================================== */

  label = true,
  tooltip = false,
  astriks = false,

  labelText = 'Label',

  /* ========================================
     CONTENT
  ======================================== */

  placeholder = 'Placeholder text',

  helperText = 'Info text comes here',

  errorText = 'Error text comes here',

  /* ========================================
     DROPDOWN
  ======================================== */

  options = [],
  withIcon = false,

  /* ========================================
     ACCESSIBILITY
  ======================================== */

  disabled = false,

  ...props
}) => {
  /* ========================================
     LOCAL STATE
  ======================================== */

  const [inputValue, setInputValue] =
    useState('');

  const [selectedOption, setSelectedOption] =
    useState('');

  const [isOpen, setIsOpen] =
    useState(false);

  /* ========================================
     DERIVED STATES
  ======================================== */

  const isDisabled =
    disabled || state === 'disabled';

  const isError =
    state === 'error';

  const isActive =
    state === 'active';

  const isFilled =
    state === 'filled' ||
    inputValue.length > 0 ||
    selectedOption.length > 0;

  /* ========================================
     CLASSNAME HELPERS
  ======================================== */

  const getInputClasses = () =>
    [
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

  const getDropdownClasses = () =>
    [
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

  const getDropdownTextClasses = () =>
    [
      'storybook-textfield__dropdown-text',

      isFilled &&
        'storybook-textfield__dropdown-text--filled',

      isError &&
        'storybook-textfield__dropdown-text--error',
    ]
      .filter(Boolean)
      .join(' ');

  const getDropdownIconClasses = () =>
    [
      'storybook-textfield__dropdown-icon',

      isFilled &&
        'storybook-textfield__dropdown-icon--filled',

      isError &&
        'storybook-textfield__dropdown-icon--error',

      isDisabled &&
        'storybook-textfield__dropdown-icon--disabled',
    ]
      .filter(Boolean)
      .join(' ');

  /* ========================================
     HANDLERS
  ======================================== */

  const handleDropdownToggle = () => {
    if (isDisabled) return;

    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    setIsOpen(false);
  };

  /* ========================================
     RENDER
  ======================================== */

  return (
    <div className="storybook-textfield">

      {/* ========================================
          LABEL
      ======================================== */}

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

      {/* ========================================
          INPUT FIELD
      ======================================== */}

      {type === 'input' && (
        <input
          id="textfield"
          type="text"
          value={inputValue}
          disabled={isDisabled}
          placeholder={placeholder}
          className={getInputClasses()}
          aria-invalid={isError}
          aria-disabled={isDisabled}
          onChange={(event) =>
            setInputValue(event.target.value)
          }
          {...props}
        />
      )}

      {/* ========================================
          DROPDOWN FIELD
      ======================================== */}

      {type === 'dropdown' && (
        <div className="storybook-textfield__dropdown-wrapper">

          <button
            type="button"
            disabled={isDisabled}
            className={getDropdownClasses()}
            aria-expanded={isOpen}
            aria-disabled={isDisabled}
            onClick={handleDropdownToggle}
          >

            <div className="storybook-textfield__dropdown-value">

              {withIcon && selectedOption && (
                <span className="storybook-textfield__dropdown-user-icon">
                  <User
                    size={16}
                    weight="regular"
                  />
                </span>
              )}

              <span className={getDropdownTextClasses()}>
                {selectedOption || placeholder}
              </span>

            </div>

            <span className={getDropdownIconClasses()}>
              <CaretUpDown
                size={20}
                weight="regular"
              />
            </span>

          </button>

          {/* ========================================
              DROPDOWN MENU
          ======================================== */}

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
                    onClick={() =>
                      handleOptionSelect(option)
                    }
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
              })}

            </div>
          )}

        </div>
      )}

      {/* ========================================
          HELPER TEXT
      ======================================== */}

      {state === 'info' && (
        <span className="storybook-textfield__helper">
          {helperText}
        </span>
      )}

      {/* ========================================
          ERROR TEXT
      ======================================== */}

      {isError && (
        <span className="storybook-textfield__helper storybook-textfield__helper--error">
          {errorText}
        </span>
      )}

    </div>
  );
};

TextField.propTypes = {
  /* ========================================
     TYPE
  ======================================== */

  type: PropTypes.oneOf([
    'input',
    'dropdown',
  ]),

  /* ========================================
     STATE
  ======================================== */

  state: PropTypes.oneOf([
    'default',
    'active',
    'filled',
    'info',
    'error',
    'disabled',
  ]),

  /* ========================================
     LABEL
  ======================================== */

  label: PropTypes.bool,

  tooltip: PropTypes.bool,

  astriks: PropTypes.bool,

  labelText: PropTypes.string,

  /* ========================================
     CONTENT
  ======================================== */

  placeholder: PropTypes.string,

  helperText: PropTypes.string,

  errorText: PropTypes.string,

  /* ========================================
     DROPDOWN
  ======================================== */

  options: PropTypes.arrayOf(
    PropTypes.string
  ),

  withIcon: PropTypes.bool,

  /* ========================================
     ACCESSIBILITY
  ======================================== */

  disabled: PropTypes.bool,
};