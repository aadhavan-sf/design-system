import PropTypes from 'prop-types';
import { CaretUpDown } from '@phosphor-icons/react';

import { DropdownList } from '../../../atoms/DropdownList';
import { Text } from '../../../styling/Typography';
import {
  getFieldClassName,
  getFieldTextClassName,
} from '../textFieldState';

function getDropdownTextColor({ hasValue, state }) {
  if (state === 'error') {
    return 'var(--error_600)';
  }

  if (state === 'disabled' || !hasValue) {
    return 'var(--neutral_300)';
  }

  return 'var(--neutral_700)';
}

export function DropdownField({
  disabled,
  displayValue,
  dropdownListItems,
  dropdownListVariant,
  hasValue,
  isOpen,
  multiple,
  onOpenChange,
  onSelect,
  options,
  selectedOptions,
  state,
  withIcon,
}) {
  const resolvedDropdownItems = dropdownListItems ?? options;
  const dropdownItems = resolvedDropdownItems.map((item) => {
    if (typeof item === 'string') {
      return {
        label: item,
        value: item,
        selected: selectedOptions.includes(item),
      };
    }

    const value = item.value ?? item.label;

    return {
      ...item,
      value,
      selected: selectedOptions.includes(value) || item.selected,
    };
  });
  const resolvedDropdownListVariant =
    dropdownListVariant ??
    (multiple ? 'checkbox-left' : withIcon ? 'icon-left' : 'check-right');

  return (
    <div className="storybook-textfield__dropdown-wrapper">
      <button
        type="button"
        disabled={disabled}
        className={getFieldClassName({ state, hasValue })}
        onClick={() => onOpenChange(!isOpen)}
      >
        <span className="storybook-textfield__field-content">
          <Text
            as="span"
            variant="text-sm"
            weight="regular"
            color={getDropdownTextColor({ hasValue, state })}
            className={getFieldTextClassName({ state, hasValue })}
          >
            {displayValue}
          </Text>
        </span>

        <CaretUpDown
          className="storybook-textfield__trailing-icon"
          size={20}
          weight="regular"
        />
      </button>

      {isOpen && !disabled && dropdownItems.length > 0 && (
        <DropdownList
          items={dropdownItems}
          selectedValues={selectedOptions}
          variant={resolvedDropdownListVariant}
          onItemSelect={(item) => onSelect(item.value)}
        />
      )}
    </div>
  );
}

DropdownField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  displayValue: PropTypes.string.isRequired,
  dropdownListItems: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      selected: PropTypes.bool,
      state: PropTypes.oneOf([
        'default',
        'active',
        'disabled',
        'destructive',
      ]),
    }),
  ])),
  dropdownListVariant: PropTypes.oneOf([
    'icon-left',
    'checkbox-left',
    'radio-left',
    'toggle-right',
    'icon-right',
    'check-right',
    'text',
  ]),
  hasValue: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  multiple: PropTypes.bool,
  onOpenChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  state: PropTypes.string.isRequired,
  withIcon: PropTypes.bool.isRequired,
};
