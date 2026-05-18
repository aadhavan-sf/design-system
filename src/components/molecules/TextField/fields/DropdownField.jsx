import PropTypes from 'prop-types';
import {
  CaretUpDown,
} from '@phosphor-icons/react';

import { Chip } from '../../Chip';
import { DropdownList } from '../../DropdownList';
import { Text } from '../../../foundations/Typography';
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
  multiselectLayout = 'one-line',
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
  const selectedItems = selectedOptions.map((selectedValue) => {
    const matchingItem = dropdownItems.find((item) => item.value === selectedValue);

    return {
      label: matchingItem?.label ?? selectedValue,
      value: selectedValue,
    };
  });
  const visibleSelectedItems =
    multiselectLayout === 'two-line' ? selectedItems : selectedItems.slice(0, 2);
  const fieldClassName = getFieldClassName({
    state,
    hasValue,
    className: multiple && `storybook-textfield__field--multiselect-${multiselectLayout}`,
  });
  const handleToggle = () => {
    if (!disabled) {
      onOpenChange(!isOpen);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };
  const renderFieldContent = () => (
    <>
      <span className="storybook-textfield__field-content">
        {multiple && hasValue ? (
          <span className="storybook-textfield__tag-list">
            {visibleSelectedItems.map((item, index) => (
              <Chip
                key={item.value}
                type="button"
                label={item.label}
                size="md"
                shape="rounded"
                icon="right"
                state={disabled ? 'disabled' : 'default'}
                disabled={disabled}
                className={[
                  'storybook-textfield__selected-chip',
                  index === 0 && 'storybook-textfield__selected-chip--first',
                ].filter(Boolean).join(' ')}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(item.value);
                }}
              />
            ))}
          </span>
        ) : (
          <Text
            as="span"
            variant="text-sm"
            weight="regular"
            color={getDropdownTextColor({ hasValue, state })}
            className={getFieldTextClassName({ state, hasValue })}
          >
            {displayValue}
          </Text>
        )}
      </span>

      <CaretUpDown
        className="storybook-textfield__trailing-icon"
        size={20}
        weight="regular"
      />
    </>
  );

  return (
    <div className="storybook-textfield__dropdown-wrapper">
      {multiple ? (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          className={fieldClassName}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          {renderFieldContent()}
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          className={fieldClassName}
          onClick={handleToggle}
        >
          {renderFieldContent()}
        </button>
      )}

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
  multiselectLayout: PropTypes.oneOf(['one-line', 'two-line']),
  onOpenChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  state: PropTypes.string.isRequired,
  withIcon: PropTypes.bool.isRequired,
};
