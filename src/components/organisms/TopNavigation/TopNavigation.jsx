import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CaretRight,
  Gear,
  House,
  ShoppingCart,
  SquaresFour,
  Tag,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './topNavigation.css';

const ITEM_STATES = ['default', 'hover', 'focused', 'disabled'];

const DEFAULT_ITEMS = [
  { label: 'Theme Settings', icon: 'gear' },
  { label: 'Home', icon: 'home' },
  { label: 'PLP', icon: 'plp' },
  { label: 'PDP', icon: 'tag' },
  { label: 'Cart', icon: 'cart' },
];

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function renderIcon(icon) {
  const iconProps = {
    'aria-hidden': true,
    className: 'storybook-top-nav-item__icon',
    size: 18,
    weight: 'regular',
  };

  switch (icon) {
    case 'cart':
      return <ShoppingCart {...iconProps} />;
    case 'home':
      return <House {...iconProps} />;
    case 'plp':
    case 'squares':
      return <SquaresFour {...iconProps} />;
    case 'tag':
      return <Tag {...iconProps} />;
    case 'gear':
    default:
      return <Gear {...iconProps} />;
  }
}

export function TopNavigationItem({
  label = 'Theme Settings',
  icon = 'gear',
  pressed = false,
  state = 'default',
  className,
  onClick,
}) {
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    Hover: 'hover',
    Focused: 'focused',
    Disabled: 'disabled',
  });
  const isDisabled = normalizedState === 'disabled';

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-current={pressed ? 'page' : undefined}
      className={buildClassName([
        'storybook-top-nav-item',
        `storybook-top-nav-item--${normalizedState}`,
        pressed && 'storybook-top-nav-item--pressed',
        className,
      ])}
      onClick={isDisabled ? undefined : onClick}
    >
      {renderIcon(icon)}
      <Text
        as="span"
        variant="text-sm"
        weight={pressed ? 'semibold' : 'medium'}
        color="currentColor"
        className="storybook-top-nav-item__label"
      >
        {label}
      </Text>
    </button>
  );
}

TopNavigationItem.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.oneOf(['cart', 'gear', 'home', 'plp', 'squares', 'tag']),
  pressed: PropTypes.bool,
  state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export function TopNavigation({
  items = DEFAULT_ITEMS,
  activeIndex = 1,
  className,
  onItemChange,
}) {
  const [selectedIndex, setSelectedIndex] = useState(activeIndex);

  const handleItemClick = (item, index) => {
    setSelectedIndex(index);
    onItemChange?.(item, index);
  };

  return (
    <nav
      aria-label="Top navigation"
      className={buildClassName(['storybook-top-nav', className])}
    >
      {items.map((item, index) => {
        const normalizedItem = typeof item === 'string' ? { label: item } : item;
        const pressed = index === selectedIndex;

        return (
          <div
            key={`${normalizedItem.label}-${index}`}
            className="storybook-top-nav__segment"
          >
            {index > 0 && (
              <CaretRight
                aria-hidden="true"
                className="storybook-top-nav__separator"
                size={20}
                weight="regular"
              />
            )}
            <TopNavigationItem
              icon={normalizedItem.icon ?? 'gear'}
              label={normalizedItem.label}
              pressed={pressed}
              state={normalizedItem.disabled ? 'disabled' : normalizedItem.state ?? 'default'}
              onClick={() => handleItemClick(normalizedItem, index)}
            />
          </div>
        );
      })}
    </nav>
  );
}

TopNavigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.oneOf(['cart', 'gear', 'home', 'plp', 'squares', 'tag']),
      disabled: PropTypes.bool,
      state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
    }),
  ])),
  activeIndex: PropTypes.number,
  className: PropTypes.string,
  onItemChange: PropTypes.func,
};
