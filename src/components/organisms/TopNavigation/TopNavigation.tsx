import { useState } from 'react';
import {
  CaretRight,
  Gear,
  House,
  ShoppingCart,
  SquaresFour,
  Tag,
} from '@phosphor-icons/react';
import type { IconWeight } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './topNavigation.css';

export type TopNavigationItemState =
  | 'default'
  | 'hover'
  | 'focused'
  | 'disabled'
  | 'Default'
  | 'Hover'
  | 'Focused'
  | 'Disabled';

type TopNavigationIconName = 'cart' | 'gear' | 'home' | 'plp' | 'squares' | 'tag';

export type TopNavigationItemConfig = {
  label: string;
  icon?: TopNavigationIconName;
  disabled?: boolean;
  state?: TopNavigationItemState;
};

export type TopNavigationItemProps = {
  className?: string;
  icon?: TopNavigationIconName;
  label?: string;
  onClick?: () => void;
  pressed?: boolean;
  state?: TopNavigationItemState;
};

export type TopNavigationProps = {
  activeIndex?: number;
  className?: string;
  items?: Array<string | TopNavigationItemConfig>;
  onItemChange?: (item: TopNavigationItemConfig, index: number) => void;
};

type ClassNamePart = string | false | null | undefined;

const DEFAULT_ITEMS: TopNavigationItemConfig[] = [
  { label: 'Theme Settings', icon: 'gear' },
  { label: 'Home', icon: 'home' },
  { label: 'PLP', icon: 'plp' },
  { label: 'PDP', icon: 'tag' },
  { label: 'Cart', icon: 'cart' },
];

function buildClassName(parts: ClassNamePart[]) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue(
  value: TopNavigationItemState,
  aliases: Partial<Record<TopNavigationItemState, TopNavigationItemState>> = {},
) {
  return aliases[value] ?? value;
}

function renderIcon(icon: TopNavigationIconName, weight: IconWeight = 'regular') {
  const iconProps = {
    'aria-hidden': true,
    className: 'storybook-top-nav-item__icon',
    size: 18,
    weight,
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
}: TopNavigationItemProps) {
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
      {renderIcon(icon, pressed ? 'fill' : 'regular')}
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

export function TopNavigation({
  items = DEFAULT_ITEMS,
  activeIndex = 1,
  className,
  onItemChange,
}: TopNavigationProps) {
  const [selectedIndex, setSelectedIndex] = useState(activeIndex);

  const handleItemClick = (item: TopNavigationItemConfig, index: number) => {
    setSelectedIndex(index);
    onItemChange?.(item, index);
  };

  return (
    <nav
      aria-label="Top navigation"
      className={buildClassName(['storybook-top-nav', className])}
    >
      {items.map((item, index) => {
        const normalizedItem: TopNavigationItemConfig = typeof item === 'string'
          ? { label: item }
          : item;
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
