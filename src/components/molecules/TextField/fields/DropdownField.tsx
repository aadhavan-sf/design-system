import type { KeyboardEvent } from 'react';
import {
  CaretUpDown,
} from '@phosphor-icons/react';

import { DropdownList } from '../../DropdownList';
import { Text } from '../../../foundations/Typography';
import {
  buildClassName,
  textFieldDropdownMenuClassName,
  textFieldTrackingClass,
  type NormalizedTextFieldState,
} from '../textField.constants';
import type { DropdownListItem, DropdownListVariant } from '../../DropdownList/DropdownList';

import './dropdownField.css';

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
  state: NormalizedTextFieldState | string;
  withIcon: boolean;
}

function getDropdownFieldLayoutClasses() {
  return buildClassName([
    'storybook-dropdown-field',
    'box-border flex h-11 w-full min-w-0 items-center justify-between gap-2',
    'rounded-8 border border-solid bg-neutral-0 px-[14px] py-3',
    'text-left',
    'focus-visible:border-neutral-500',
  ]);
}

function getDropdownFieldStateClasses(state: NormalizedTextFieldState | string) {
  if (state === 'disabled') {
    return 'border-neutral-200 bg-neutral-25';
  }

  if (state === 'error') {
    return 'border-error-600';
  }

  if (state === 'active') {
    return 'border-neutral-500';
  }

  return 'border-neutral-200';
}

function getDropdownFieldClassName(state: NormalizedTextFieldState | string) {
  return buildClassName([
    getDropdownFieldLayoutClasses(),
    getDropdownFieldStateClasses(state),
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

function getDropdownDisplayTextLayoutClasses() {
  return buildClassName([
    'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap',
    'font-sans text-ds-text-sm font-normal',
    textFieldTrackingClass,
  ]);
}

function getTrailingIconClassName(state: NormalizedTextFieldState | string) {
  if (state === 'error') {
    return 'shrink-0 text-error-600';
  }

  if (state === 'disabled') {
    return 'shrink-0 text-neutral-300';
  }

  return 'shrink-0 text-neutral-600';
}

export function DropdownField({
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
  withIcon,
}: Omit<DropdownFieldProps, 'multiple' | 'multiselectLayout'>) {
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
    dropdownListVariant ?? (withIcon ? 'icon-left' : 'check-right');

  const handleToggle = () => {
    if (!disabled) {
      onOpenChange(!isOpen);
    }
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        className={getDropdownFieldClassName(state)}
        onClick={handleToggle}
        onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleToggle();
          }
        }}
      >
        <span className="flex min-w-0 flex-[1_0_0] items-center gap-1">
          <Text
            as="span"
            variant="text-sm"
            weight="regular"
            className={buildClassName([
              getDropdownDisplayTextLayoutClasses(),
              getDropdownDisplayTextClassName({ hasValue, state }),
            ])}
          >
            {displayValue}
          </Text>
        </span>

        <CaretUpDown
          className={getTrailingIconClassName(state)}
          size={20}
          weight="regular"
        />
      </button>

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
