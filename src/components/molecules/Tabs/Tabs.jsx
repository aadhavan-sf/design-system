import PropTypes from 'prop-types';
import { useState } from 'react';
import { House } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './tabs.css';

const SIZES = ['sm', 'md'];
const STATES = ['default', 'hover', 'focused', 'disabled'];
const ICON_POSITIONS = ['left', 'right'];
const TYPES = ['no-segment', 'segments'];

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function getTextVariant(size) {
  return size === 'sm' ? 'text-xs' : 'text-sm';
}

function getTextWeight({ pressed, size }) {
  return pressed && size === 'sm' ? 'semibold' : 'medium';
}

export function TabItem({
  label = 'Dynamic',
  iconPosition = 'right',
  pressed = false,
  showIcons = true,
  size = 'sm',
  state = 'default',
  className,
  ...props
}) {
  const normalizedIconPosition = normalizeValue(iconPosition, {
    Left: 'left',
    Right: 'right',
  });
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    Hover: 'hover',
    Focused: 'focused',
    Disabled: 'disabled',
  });
  const isDisabled = normalizedState === 'disabled';

  const icon = showIcons ? (
    <House
      className="storybook-tab-item__icon"
      size={16}
      weight={pressed ? 'fill' : 'regular'}
    />
  ) : null;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={buildClassName([
        'storybook-tab-item',
        `storybook-tab-item--${size}`,
        `storybook-tab-item--${normalizedState}`,
        pressed && 'storybook-tab-item--pressed',
        className,
      ])}
      {...props}
    >
      {normalizedIconPosition === 'left' && icon}
      <Text
        as="span"
        variant={getTextVariant(size)}
        weight={getTextWeight({ pressed, size })}
        color="currentColor"
        className="storybook-tab-item__label"
      >
        {label}
      </Text>
      {normalizedIconPosition === 'right' && icon}
    </button>
  );
}

TabItem.propTypes = {
  label: PropTypes.string,
  iconPosition: PropTypes.oneOf([...ICON_POSITIONS, 'Left', 'Right']),
  pressed: PropTypes.bool,
  showIcons: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
  state: PropTypes.oneOf([...STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export function Tabs({
  tabs = ['Dynamic', 'Dynamic'],
  activeIndex,
  defaultActiveIndex = 0,
  type = 'no-segment',
  size = 'md',
  iconPosition = 'left',
  showIcons = false,
  className,
  onTabChange,
}) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActiveIndex);
  const isControlled = typeof activeIndex === 'number';
  const resolvedActiveIndex = isControlled ? activeIndex : internalActiveIndex;
  const normalizedType = normalizeValue(type, {
    'No Segment': 'no-segment',
    Segemnts: 'segments',
    Segments: 'segments',
  });

  return (
    <div
      className={buildClassName([
        'storybook-tabs',
        `storybook-tabs--${normalizedType}`,
        className,
      ])}
      role="tablist"
    >
      {tabs.map((tab, index) => {
        const label = typeof tab === 'string' ? tab : tab.label;
        const disabled = typeof tab === 'string' ? false : tab.disabled;
        const pressed = index === resolvedActiveIndex;

        return (
          <TabItem
            key={`${label}-${index}`}
            aria-selected={pressed}
            iconPosition={typeof tab === 'string' ? iconPosition : tab.iconPosition ?? iconPosition}
            label={label}
            pressed={pressed}
            role="tab"
            showIcons={typeof tab === 'string' ? showIcons : tab.showIcons ?? showIcons}
            size={typeof tab === 'string' ? size : tab.size ?? size}
            state={disabled ? 'disabled' : tab.state ?? 'default'}
            onClick={() => {
              if (!disabled) {
                if (!isControlled) {
                  setInternalActiveIndex(index);
                }
                onTabChange?.(index);
              }
            }}
          />
        );
      })}
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      iconPosition: PropTypes.oneOf([...ICON_POSITIONS, 'Left', 'Right']),
      showIcons: PropTypes.bool,
      size: PropTypes.oneOf(SIZES),
      state: PropTypes.oneOf([...STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
    }),
  ])),
  activeIndex: PropTypes.number,
  defaultActiveIndex: PropTypes.number,
  type: PropTypes.oneOf([...TYPES, 'No Segment', 'Segemnts', 'Segments']),
  size: PropTypes.oneOf(SIZES),
  iconPosition: PropTypes.oneOf([...ICON_POSITIONS, 'Left', 'Right']),
  showIcons: PropTypes.bool,
  className: PropTypes.string,
  onTabChange: PropTypes.func,
};
