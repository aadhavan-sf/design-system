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
    className: 'shrink-0',
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
        'inline-flex cursor-pointer items-center justify-center gap-1 rounded-6 border-0 bg-neutral-00 px-2 py-1 font-sans text-neutral-700 transition-[background-color,color,box-shadow] duration-[160ms] enabled:hover:bg-neutral-50 focus-visible:outline-none focus-visible:shadow-focus-brand disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-300',
        normalizedState === 'hover' && 'bg-neutral-50',
        normalizedState === 'focused' && 'bg-neutral-00 shadow-focus-brand',
        pressed && 'bg-primary-400 text-neutral-00 enabled:hover:bg-primary-400 focus-visible:bg-primary-400',
        pressed && isDisabled && 'bg-primary-100 text-neutral-00',
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
        className="overflow-hidden text-center text-ellipsis whitespace-nowrap"
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
      className={buildClassName([
        'box-border inline-flex items-center gap-1 overflow-hidden rounded-6 border border-solid border-neutral-100 bg-neutral-00 px-2 py-3',
        className,
      ])}
    >
      {items.map((item, index) => {
        const normalizedItem: TopNavigationItemConfig = typeof item === 'string'
          ? { label: item }
          : item;
        const pressed = index === selectedIndex;

        return (
          <div
            key={`${normalizedItem.label}-${index}`}
            className="inline-flex shrink-0 items-center gap-1"
          >
            {index > 0 && (
              <CaretRight
                aria-hidden="true"
                className="shrink-0 text-neutral-700"
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
