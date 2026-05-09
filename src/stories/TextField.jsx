import PropTypes from 'prop-types';
import { InfoIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import './textfield.css';

export const TextField = ({
  state = 'default',

  label = true,
  astriks = false,
  tooltip = false,

  labelText = 'Label',
  placeholder = 'Placeholder text',

  helperText = 'Info text comes here',
  errorText = 'Error text comes here',

  disabled = false,

  ...props
}) => {

  const [inputValue, setInputValue] = useState('');

  const isDisabled = state === 'disabled' || disabled;

  return (
    <div className="storybook-textfield">

      {/* Label */}

      {label && (
        <div className="storybook-textfield__label-wrapper">

          <label
            className="storybook-textfield__label"
            htmlFor="textfield"
          >
            {labelText}
          </label>

          {tooltip && (
            <InfoIcon
              size={16}
              weight="regular"
              className="storybook-textfield__tooltip"
            />
          )}

          {astriks && (
            <span className="storybook-textfield__astriks">
              *
            </span>
          )}

        </div>
      )}

      {/* Input */}

      <input
        id="textfield"
        type="text"
        value={inputValue}
        disabled={isDisabled}
        placeholder={placeholder}
        aria-invalid={state === 'error'}
        aria-disabled={isDisabled}
        aria-describedby={
          state === 'info'
            ? 'textfield-helper'
            : state === 'error'
            ? 'textfield-error'
            : undefined
        }
        className={[
          'storybook-textfield__input',
          `storybook-textfield--${state}`,
          inputValue && 'storybook-textfield--filled',
        ]
          .filter(Boolean)
          .join(' ')}
        onChange={(e) => setInputValue(e.target.value)}
        {...props}
      />

      {/* Info Text */}

      {state === 'info' && (
        <span
          id="textfield-helper"
          className="storybook-textfield__helper"
        >
          {helperText}
        </span>
      )}

      {/* Error Text */}

      {state === 'error' && (
        <span
          id="textfield-error"
          className="storybook-textfield__error"
        >
          {errorText}
        </span>
      )}

    </div>
  );
};

TextField.propTypes = {
  state: PropTypes.oneOf([
    'default',
    'active',
    'filled',
    'info',
    'error',
    'disabled',
  ]),

  label: PropTypes.bool,
  astriks: PropTypes.bool,
  tooltip: PropTypes.bool,

  labelText: PropTypes.string,
  placeholder: PropTypes.string,

  helperText: PropTypes.string,
  errorText: PropTypes.string,

  disabled: PropTypes.bool,
};