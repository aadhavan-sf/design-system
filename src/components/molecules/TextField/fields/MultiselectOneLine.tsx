import type { KeyboardEvent } from 'react';
import { CaretUpDown } from '@phosphor-icons/react';

import { Chip } from '../../Chip';
import { DropdownList } from '../../DropdownList';
import { Text } from '../../../foundations/Typography';
import {
  buildClassName,
  getMultiselectSelectedChipStateClasses,
  textFieldDropdownMenuClassName,
  textFieldTrackingClass,
  type NormalizedTextFieldState,
} from '../textField.constants';
import type { DropdownListVariant } from '../../DropdownList/DropdownList';
import type { DropdownFieldProps } from './DropdownField';

import './multiselectOneLineField.css';

function getMultiselectOneLineFieldLayoutClasses() {
  return buildClassName([
    'storybook-multiselect-one-line-field',
    'box-border flex h-11 w-full min-w-0 items-center justify-between gap-2',
    'rounded-8 border border-solid bg-neutral-0 px-[14px] py-3',
    'text-left',
    'focus-visible:border-neutral-500',
  ]);
}

function getMultiselectOneLineFieldStateClasses(state: NormalizedTextFieldState | string) {
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

function getMultiselectOneLineFieldClassName(state: NormalizedTextFieldState | string) {
  return buildClassName([
    getMultiselectOneLineFieldLayoutClasses(),
    getMultiselectOneLineFieldStateClasses(state),
  ]);
}

function getMultiselectDisplayTextClassName({
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

function getMultiselectDisplayTextLayoutClasses() {
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

function getSelectedChipsContainerClassName() {
  return 'flex w-full min-w-0 items-center justify-start gap-1';
}

function getSelectedChipLayoutClasses(index: number) {
  return buildClassName([
    'storybook-multiselect-one-line-field__selected-chip',
    '[&_.storybook-chip__label]:text-left',
    'min-w-0 max-w-full justify-start gap-2 border-0',
    'h-[30px] rounded-2 px-2 py-[7px]',
    index === 0 ? 'flex-[0_0_auto]' : 'flex-[1_1_0]',
  ]);
}

function getSelectedChipClassName({
  index,
  state,
}: {
  index: number;
  state: NormalizedTextFieldState | string;
}) {
  return buildClassName([
    getSelectedChipLayoutClasses(index),
    getMultiselectSelectedChipStateClasses(state),
  ]);
}

export function MultiselectOneLine({
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
  const visibleSelectedItems = selectedItems.slice(0, 2);

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
        className={getMultiselectOneLineFieldClassName(state)}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span className="flex min-w-0 flex-[1_0_0] items-center gap-1">
          {hasValue ? (
            <span className={getSelectedChipsContainerClassName()}>
              {visibleSelectedItems.map((item, index) => (
                <Chip
                  key={item.value}
                  type="chip-button"
                  label={item.label}
                  size="md"
                  shape="rounded"
                  icon="right"
                  state="default"
                  disabled={disabled}
                  className={getSelectedChipClassName({ index, state })}
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
                getMultiselectDisplayTextLayoutClasses(),
                getMultiselectDisplayTextClassName({ hasValue, state }),
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
