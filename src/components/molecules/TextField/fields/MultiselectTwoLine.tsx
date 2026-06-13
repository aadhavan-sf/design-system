import type { KeyboardEvent } from 'react';
import { CaretUpDown } from '@phosphor-icons/react';

import { Chip } from '../../Chip';
import { DropdownList } from '../../DropdownList';
import { Text } from '../../../foundations/Typography';
import {
  buildClassName,
  textFieldDropdownMenuClassName,
  textFieldTrackingClass,
  type NormalizedTextFieldState,
} from '../textField.constants';
import type { DropdownFieldProps } from './DropdownField';

import './multiselectTwoLineField.css';

function getMultiselectTwoLineFieldClassName(state: NormalizedTextFieldState | string) {
  const baseClasses = [
    'storybook-multiselect-two-line-field',
    'box-border flex h-[112px] w-full min-w-0 items-start justify-between gap-2 overflow-hidden',
    'rounded-8 border border-solid bg-neutral-0 px-[14px] py-3',
    'font-sans text-ds-text-sm font-normal text-neutral-700',
    'transition-[border-color,background-color,color,box-shadow] duration-150 ease-out',
    'focus:outline-none focus-visible:border-neutral-500',
    'm-0 cursor-pointer appearance-none text-left font-[inherit]',
  ];

  if (state === 'disabled') {
    return buildClassName([
      ...baseClasses,
      'cursor-not-allowed border-neutral-200 bg-neutral-25 text-neutral-300',
    ]);
  }

  if (state === 'error') {
    return buildClassName([
      ...baseClasses,
      'border-error-600 text-error-600',
    ]);
  }

  if (state === 'active') {
    return buildClassName([
      ...baseClasses,
      'border-neutral-500',
    ]);
  }

  return buildClassName([
    ...baseClasses,
    'border-neutral-200',
  ]);
}

function getDropdownDisplayTextClassName({
  hasValue,
  state,
}: {
  hasValue: boolean;
  state: NormalizedTextFieldState | string;
}) {
  if (!hasValue) {
    return state === 'error' ? 'text-error-600' : 'text-neutral-300';
  }

  if (state === 'error') {
    return 'text-error-600';
  }

  if (state === 'disabled') {
    return 'text-neutral-300';
  }

  return 'text-neutral-700';
}

function getTrailingIconClassName(state: NormalizedTextFieldState | string) {
  if (state === 'error') {
    return 'shrink-0 self-start text-error-600';
  }

  if (state === 'disabled') {
    return 'shrink-0 self-start text-neutral-300';
  }

  return 'shrink-0 self-start text-neutral-600';
}

function getSelectedChipClassName(state: NormalizedTextFieldState | string) {
  return buildClassName([
    'storybook-multiselect-two-line-field__selected-chip',
    'min-w-0 max-w-full justify-start gap-2 border-0',
    'h-[30px] rounded-2 px-2 py-[7px]',
    state === 'error' && '!bg-neutral-50 !text-error-600',
    state === 'disabled' && 'h-7 rounded-1 px-2 py-1 bg-neutral-100 !text-neutral-400',
    state !== 'disabled' && state !== 'error' && 'bg-neutral-50 text-neutral-600',
  ]);
}

export function MultiselectTwoLine({
  disabled,
  displayValue,
  dropdownListItems,
  dropdownListVariant,
  hasValue,
  isOpen,
  onOpenChange,
  onSelect,
  options,
  selectedOptions,
  state,
}: Omit<DropdownFieldProps, 'multiple' | 'multiselectLayout' | 'withIcon'>) {
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
  const resolvedDropdownListVariant = dropdownListVariant ?? 'checkbox-left';
  const selectedItems = selectedOptions.map((selectedValue) => {
    const matchingItem = dropdownItems.find((item) => item.value === selectedValue);

    return {
      label: matchingItem?.label ?? selectedValue,
      value: selectedValue,
    };
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

  return (
    <div className="relative w-full">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        className={getMultiselectTwoLineFieldClassName(state)}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span className="flex min-w-0 flex-[1_0_0] items-start self-start gap-1">
          {hasValue ? (
            <span className="flex max-h-[98px] w-full min-w-0 flex-wrap content-start items-start justify-start gap-1 overflow-hidden">
              {selectedItems.map((item) => (
                <Chip
                  key={item.value}
                  type="button"
                  label={item.label}
                  size="md"
                  shape="rounded"
                  icon="right"
                  state={disabled ? 'disabled' : 'default'}
                  disabled={disabled}
                  className={getSelectedChipClassName(state)}
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
              className={buildClassName([
                'min-w-0 self-start overflow-hidden text-ellipsis whitespace-nowrap font-sans text-ds-text-sm font-normal',
                textFieldTrackingClass,
                getDropdownDisplayTextClassName({ hasValue, state }),
              ])}
            >
              {displayValue}
            </Text>
          )}
        </span>

        <CaretUpDown
          className={getTrailingIconClassName(state)}
          size={20}
          weight="regular"
        />
      </div>

      {isOpen && !disabled && dropdownItems.length > 0 && (
        <DropdownList
          items={dropdownItems}
          selectedValues={selectedOptions}
          variant={resolvedDropdownListVariant}
          fullWidth
          className={textFieldDropdownMenuClassName}
          onItemSelect={(item) => {
            const value = typeof item === 'string' ? item : item.value ?? item.label;
            onSelect(value);
          }}
        />
      )}
    </div>
  );
}
