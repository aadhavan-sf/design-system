import { useState, type ReactNode } from 'react';
import {
  Check,
  Plug,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

const DEFAULT_ITEMS = [
  { label: 'Head Content Editor' },
  { label: 'Head Content Editor', active: true, selected: true },
  { label: 'Head Content Editor', selected: true },
];

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function getItemValue(item: DropdownListItem) {
  return typeof item === 'string'
    ? item
    : item.value ?? item.label;
}

function getItemLabel(item: DropdownListItem) {
  return typeof item === 'string'
    ? item
    : item.label;
}

function getItemPrefix(item: DropdownListItem) {
  return typeof item === 'string'
    ? null
    : item.prefix ?? item.flag ?? null;
}

function getDefaultSelectedValues(items: DropdownListItem[]) {
  return items
    .filter((item) => typeof item !== 'string' && item.selected)
    .map(getItemValue);
}

function Control({ disabled, selected, variant }: { disabled: boolean; selected: boolean; variant: 'checkbox-left' | 'radio-left' | 'toggle-right' }) {
  if (variant === 'checkbox-left') {
    return (
      <span
        className={buildClassName([
          'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-1 border border-solid border-neutral-300 bg-neutral-00 text-neutral-00',
          selected && 'border-primary-400 bg-primary-400',
          disabled && 'border-neutral-200 bg-neutral-25 text-neutral-00',
          selected && disabled && 'border-primary-100 bg-primary-100',
        ])}
        aria-hidden="true"
      >
        {selected && <Check size={12} weight="regular" />}
      </span>
    );
  }

  if (variant === 'radio-left') {
    return (
      <span
        className={buildClassName([
          'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-pill border border-solid border-neutral-300 bg-neutral-00',
          selected && 'border-primary-400 bg-primary-50',
          disabled && 'border-neutral-200 bg-neutral-25',
          selected && disabled && 'border-primary-100 bg-primary-25',
        ])}
        aria-hidden="true"
      >
        <span
          className={buildClassName([
            'h-[6px] w-[6px] rounded-pill bg-transparent',
            selected && 'bg-primary-400',
            disabled && 'bg-primary-100',
          ])}
        />
      </span>
    );
  }

  if (variant === 'toggle-right') {
    return (
      <span
        className={buildClassName([
          'inline-flex h-5 w-9 shrink-0 items-center rounded-pill bg-neutral-100 p-0.5',
          selected && 'justify-end bg-primary-400',
          disabled && 'bg-neutral-50',
          selected && disabled && 'bg-primary-100',
        ])}
        aria-hidden="true"
      >
        <span className="h-4 w-4 rounded-pill bg-neutral-00 shadow-sm" />
      </span>
    );
  }

  return null;
}

export function DropdownList({
  className,
  items = DEFAULT_ITEMS,
  selectedValues,
  variant = 'icon-left',
  onItemSelect,
  onSelectedValuesChange,
}: DropdownListProps) {
  const [internalSelectedValues, setInternalSelectedValues] = useState(() =>
    getDefaultSelectedValues(items)
  );
  const resolvedSelectedValues = selectedValues ?? internalSelectedValues;

  const updateSelectedValues = (nextValues: string[]) => {
    if (!selectedValues) {
      setInternalSelectedValues(nextValues);
    }

    onSelectedValuesChange?.(nextValues);
  };

  const handleItemClick = (item: DropdownListItem, index: number) => {
    const value = getItemValue(item);
    const disabled = typeof item !== 'string' && item.disabled;

    if (disabled) {
      return;
    }

    if (variant === 'checkbox-left' || variant === 'toggle-right') {
      const nextValues = resolvedSelectedValues.includes(value)
        ? resolvedSelectedValues.filter((selectedValue) => selectedValue !== value)
        : [...resolvedSelectedValues, value];

      updateSelectedValues(nextValues);
    }

    if (variant === 'radio-left' || variant === 'check-right' || variant === 'icon-right') {
      updateSelectedValues([value]);
    }

    onItemSelect?.(item, index);
  };

  return (
    <div
      className={buildClassName([
        'flex w-60 flex-col items-stretch overflow-hidden rounded-2 bg-neutral-00 shadow-sm',
        className,
      ])}
    >
      {items.map((item, index) => {
        const label = getItemLabel(item);
        const value = getItemValue(item);
        const prefix = getItemPrefix(item);
        const itemState = typeof item === 'string' ? 'default' : item.state ?? 'default';
        const isDisabled = itemState === 'disabled' || (typeof item !== 'string' && item.disabled);
        const isDestructive = itemState === 'destructive';
        const isSelected = resolvedSelectedValues.includes(value);
        const isActive =
          itemState === 'active' ||
          (typeof item !== 'string' && item.active) ||
          isSelected;

        return (
          <button
            key={`${value}-${index}`}
            type="button"
            disabled={Boolean(isDisabled)}
            className={buildClassName([
              'flex min-h-11 w-full cursor-pointer items-center gap-2 border-0 bg-transparent px-4 py-3 text-neutral-600 transition-[background-color,color] duration-[140ms] enabled:hover:bg-neutral-25',
              isActive && 'bg-neutral-50 text-neutral-800 [&_.storybook-dropdown-list__icon]:text-primary-400',
              isDisabled && 'cursor-not-allowed text-neutral-300 enabled:hover:bg-transparent',
              isDestructive && 'text-error-600',
            ])}
            onClick={() => handleItemClick(item, index)}
          >
            {variant === 'icon-left' && (
              <Plug
                className="storybook-dropdown-list__icon shrink-0"
                size={16}
                weight="regular"
              />
            )}

            {(variant === 'checkbox-left' || variant === 'radio-left') && (
              <Control
                disabled={Boolean(isDisabled)}
                selected={isSelected}
                variant={variant}
              />
            )}

            {prefix && (
              <span
                className="inline-flex w-5 shrink-0 items-center justify-center text-sm leading-normal"
                aria-hidden="true"
              >
                {prefix}
              </span>
            )}

            <Text
              as="span"
              variant="text-sm"
              weight="regular"
              color="currentColor"
              className="min-w-px flex-1 basis-0 overflow-hidden text-left text-ellipsis whitespace-nowrap"
            >
              {label}
            </Text>

            {variant === 'toggle-right' && (
              <Control
                disabled={Boolean(isDisabled)}
                selected={isSelected}
                variant={variant}
              />
            )}

            {variant === 'icon-right' && (
              <Plug
                className="storybook-dropdown-list__icon shrink-0"
                size={16}
                weight="regular"
              />
            )}

            {variant === 'check-right' && isSelected && (
              <Check
                className="storybook-dropdown-list__icon shrink-0"
                size={16}
                weight="regular"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
export type DropdownListVariant = string;
export type DropdownListItemState = string;

export type DropdownListItem =
  | string
  | {
      label: string;
      value?: string;
      prefix?: ReactNode;
      flag?: ReactNode;
      active?: boolean;
      disabled?: boolean;
      selected?: boolean;
      state?: DropdownListItemState;
    };

export interface DropdownListProps {
  className?: string;
  items?: DropdownListItem[];
  selectedValues?: string[];
  variant?: DropdownListVariant;
  onItemSelect?: (item: DropdownListItem, index: number) => void;
  onSelectedValuesChange?: (values: string[]) => void;
}
