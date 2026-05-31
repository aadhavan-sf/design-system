import { useState, type ReactNode } from 'react';
import {
  Check,
  Plug,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './dropdownList.css';

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
          'storybook-dropdown-list__checkbox',
          selected && 'storybook-dropdown-list__checkbox--checked',
          disabled && 'storybook-dropdown-list__checkbox--disabled',
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
          'storybook-dropdown-list__radio',
          selected && 'storybook-dropdown-list__radio--checked',
          disabled && 'storybook-dropdown-list__radio--disabled',
        ])}
        aria-hidden="true"
      >
        <span className="storybook-dropdown-list__radio-dot" />
      </span>
    );
  }

  if (variant === 'toggle-right') {
    return (
      <span
        className={buildClassName([
          'storybook-dropdown-list__toggle',
          selected && 'storybook-dropdown-list__toggle--checked',
          disabled && 'storybook-dropdown-list__toggle--disabled',
        ])}
        aria-hidden="true"
      >
        <span className="storybook-dropdown-list__toggle-thumb" />
      </span>
    );
  }

  return null;
}

export function DropdownList({
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
        'storybook-dropdown-list',
        `storybook-dropdown-list--${variant}`,
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
              'storybook-dropdown-list__item',
              isActive && 'storybook-dropdown-list__item--active',
              isDisabled && 'storybook-dropdown-list__item--disabled',
              isDestructive && 'storybook-dropdown-list__item--destructive',
            ])}
            onClick={() => handleItemClick(item, index)}
          >
            {variant === 'icon-left' && (
              <Plug
                className="storybook-dropdown-list__icon"
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
                className="storybook-dropdown-list__prefix"
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
              className="storybook-dropdown-list__label"
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
                className="storybook-dropdown-list__icon"
                size={16}
                weight="regular"
              />
            )}

            {variant === 'check-right' && isSelected && (
              <Check
                className="storybook-dropdown-list__icon"
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
  items?: DropdownListItem[];
  selectedValues?: string[];
  variant?: DropdownListVariant;
  onItemSelect?: (item: DropdownListItem, index: number) => void;
  onSelectedValuesChange?: (values: string[]) => void;
}
