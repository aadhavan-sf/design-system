import type { KeyboardEvent } from 'react';
import {
  CaretUpDown,
} from '@phosphor-icons/react';

import { Chip } from '../../Chip';
import { DropdownList } from '../../DropdownList';
import { Text } from '../../../foundations/Typography';
import {
  getFieldClassName,
  getFieldIconClassName,
  getFieldTextClassName,
} from '../textFieldState';
import type { DropdownListItem, DropdownListVariant } from '../../DropdownList/DropdownList';

export type TextFieldDropdownItem = DropdownListItem;

export interface DropdownFieldProps {
  disabled: boolean;
  displayValue: string;
  dropdownListItems?: TextFieldDropdownItem[];
  dropdownListVariant?: DropdownListVariant;
  hasValue: boolean;
  isOpen: boolean;
  multiple?: boolean;
  multiselectLayout?: 'one-line' | 'two-line';
  onOpenChange: (open: boolean) => void;
  onSelect: (value: string) => void;
  options: string[];
  selectedOptions: string[];
  state: string;
  withIcon: boolean;
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
}: DropdownFieldProps) {
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
    multiselectLayout === 'two-line' ? selectedItems.slice(0, 4) : selectedItems.slice(0, 2);
  const fieldClassName = getFieldClassName({
    state,
    hasValue,
    className: multiple && [
      `storybook-textfield__field--multiselect-${multiselectLayout}`,
      'gap-2',
      'p-3',
    ].join(' '),
  });
  const handleToggle = () => {
    if (!disabled) {
      onOpenChange(!isOpen);
    }
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };
  const renderFieldContent = () => (
    <>
      <span className="storybook-textfield__field-content gap-1">
        {multiple && hasValue ? (
          <span className="storybook-textfield__tag-list gap-1">
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
                  'gap-2',
                  'border-0',
                  state === 'disabled' && multiselectLayout === 'two-line'
                    ? 'rounded-1 bg-neutral-100 px-2 py-1 text-neutral-600'
                    : 'rounded-2 bg-neutral-50 px-2 py-2 text-neutral-600',
                  state === 'error' && 'text-error-600',
                  state === 'disabled' && multiselectLayout !== 'two-line' && 'bg-neutral-100 text-neutral-400',
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
            color="currentColor"
            className={getFieldTextClassName({ state, hasValue })}
          >
            {displayValue}
          </Text>
        )}
      </span>

      <CaretUpDown
        className={[
          'storybook-textfield__trailing-icon',
          getFieldIconClassName({ state }),
          multiselectLayout === 'two-line' && 'mt-1',
        ].filter(Boolean).join(' ')}
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
          onItemSelect={(item) => {
            const value = typeof item === 'string' ? item : item.value ?? item.label;
            onSelect(value);
          }}
        />
      )}
    </div>
  );
}
