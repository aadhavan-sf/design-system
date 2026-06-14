import { useEffect, useState } from 'react';
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
type NormalizedTopNavigationItemState = 'default' | 'hover' | 'focused' | 'disabled';

const DEFAULT_ITEMS: TopNavigationItemConfig[] = [
  { label: 'Theme Settings', icon: 'gear' },
  { label: 'Home', icon: 'home' },
  { label: 'PLP', icon: 'plp' },
  { label: 'PDP', icon: 'tag' },
  { label: 'Cart', icon: 'cart' },
];

function buildClassName(parts: ClassNamePart[]) {
  return parts.flat().filter(Boolean).join(' ');
}

function normalizeValue(
  value: TopNavigationItemState,
  aliases: Partial<Record<TopNavigationItemState, TopNavigationItemState>> = {},
) {
  return aliases[value] ?? value;
}

function getTopNavItemClassName({
  state,
  pressed,
  className,
}: {
  state: NormalizedTopNavigationItemState;
  pressed: boolean;
  className?: string;
}) {
  const isDisabled = state === 'disabled';

  return buildClassName([
    'storybook-top-nav-item inline-flex items-center justify-center gap-1 rounded-6 border-0 px-2 py-1 font-sans',
    'cursor-pointer transition-[background-color,color,box-shadow] duration-[160ms] ease-out focus-visible:outline-none',
    pressed && !isDisabled && 'text-neutral-0 hover:bg-brand-700 hover:text-neutral-0 focus-visible:bg-brand-400 focus-visible:text-neutral-0 focus-visible:shadow-none',
    pressed && !isDisabled && (state === 'hover' ? 'bg-brand-700' : 'bg-brand-400'),
    pressed && isDisabled && 'bg-brand-100 text-neutral-0',
    !pressed && !isDisabled && 'bg-neutral-0 text-neutral-700 hover:bg-neutral-50 focus-visible:bg-neutral-0 focus-visible:shadow-focus-brand',
    !pressed && isDisabled && 'cursor-not-allowed bg-neutral-50 text-neutral-300',
    !pressed && state === 'hover' && 'bg-neutral-50',
    !pressed && state === 'focused' && 'bg-neutral-0 shadow-focus-brand',
    className,
  ]);
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
  }) as NormalizedTopNavigationItemState;
  const isDisabled = normalizedState === 'disabled';

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-current={pressed ? 'page' : undefined}
      className={getTopNavItemClassName({
        state: normalizedState,
        pressed,
        className,
      })}
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

  useEffect(() => {
    setSelectedIndex(activeIndex);
  }, [activeIndex]);

  const handleItemClick = (item: TopNavigationItemConfig, index: number) => {
    setSelectedIndex(index);
    onItemChange?.(item, index);
  };

  return (
    <nav
      aria-label="Top navigation"
      className={buildClassName([
        'storybook-top-nav box-border inline-flex items-center gap-1 overflow-hidden rounded-6 border border-solid border-neutral-100 bg-neutral-0 px-2 py-3',
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
