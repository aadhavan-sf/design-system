import type { KeyboardEvent } from 'react';
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

function getDropdownTextColor({ hasValue, state }: { hasValue: boolean; state: string }) {
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
    multiselectLayout === 'two-line' ? selectedItems : selectedItems.slice(0, 2);
  const fieldClassName = getFieldClassName({
    state,
    hasValue,
    className: multiple && (
      multiselectLayout === 'two-line'
        ? 'h-28 items-start gap-2 overflow-hidden p-3'
        : 'gap-2 p-3'
    ),
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
      <span
        className={[
          'flex min-w-0 flex-1 basis-0 items-center gap-1',
          multiple && multiselectLayout === 'two-line' && 'items-start',
        ].filter(Boolean).join(' ')}
      >
        {multiple && hasValue ? (
          <span
            className={[
              'flex w-full min-w-0 items-center justify-start gap-1',
              multiselectLayout === 'two-line' && 'max-h-[98px] flex-wrap content-start items-start overflow-hidden',
            ].filter(Boolean).join(' ')}
          >
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
                  'h-[30px] min-w-0 max-w-full flex-[0_1_auto] justify-start gap-2 rounded-2 border-0 bg-neutral-50 px-2 py-[7px] text-neutral-600 [&_span]:text-left',
                  index === 0 && 'flex-none',
                  multiselectLayout === 'one-line' && index !== 0 && 'flex-1 basis-0',
                  multiselectLayout === 'two-line' && 'max-w-[calc(50%_-_2px)] flex-[0_1_calc(50%_-_2px)]',
                  state === 'error' && 'text-error-600',
                  disabled && 'bg-neutral-100 text-neutral-400',
                  disabled && multiselectLayout === 'two-line' && 'h-7 rounded-1 px-2 py-1 text-neutral-600',
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
        className={[
          'shrink-0',
          state === 'error' ? 'text-error-600' : state === 'disabled' ? 'text-neutral-300' : 'text-neutral-700',
          multiselectLayout === 'two-line' && 'mt-0.5',
        ].filter(Boolean).join(' ')}
        size={20}
        weight="regular"
      />
    </>
  );

  return (
    <div className="relative w-full">
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
          className="absolute left-0 top-[calc(100%+8px)] z-[100] max-h-80 w-full overflow-y-auto"
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
