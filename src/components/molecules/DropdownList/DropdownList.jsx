import PropTypes from 'prop-types';
import { useState } from 'react';
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

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function getItemValue(item) {
  return typeof item === 'string'
    ? item
    : item.value ?? item.label;
}

function getItemLabel(item) {
  return typeof item === 'string'
    ? item
    : item.label;
}

function getDefaultSelectedValues(items) {
  return items
    .filter((item) => typeof item !== 'string' && item.selected)
    .map(getItemValue);
}

function Control({ disabled, selected, variant }) {
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
        {selected && <Check size={12} weight="bold" />}
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

Control.propTypes = {
  disabled: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf([
    'checkbox-left',
    'radio-left',
    'toggle-right',
  ]).isRequired,
};

export function DropdownList({
  items = DEFAULT_ITEMS,
  selectedValues,
  variant = 'icon-left',
  onItemSelect,
  onSelectedValuesChange,
}) {
  const [internalSelectedValues, setInternalSelectedValues] = useState(() =>
    getDefaultSelectedValues(items)
  );
  const resolvedSelectedValues = selectedValues ?? internalSelectedValues;

  const updateSelectedValues = (nextValues) => {
    if (!selectedValues) {
      setInternalSelectedValues(nextValues);
    }

    onSelectedValuesChange?.(nextValues);
  };

  const handleItemClick = (item, index) => {
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
            disabled={isDisabled}
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
                disabled={isDisabled}
                selected={isSelected}
                variant={variant}
              />
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
                disabled={isDisabled}
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

const itemShape = PropTypes.oneOfType([
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
]);

DropdownList.propTypes = {
  items: PropTypes.arrayOf(itemShape),
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.oneOf([
    'icon-left',
    'checkbox-left',
    'radio-left',
    'toggle-right',
    'icon-right',
    'check-right',
    'text',
  ]),
  onItemSelect: PropTypes.func,
  onSelectedValuesChange: PropTypes.func,
};
