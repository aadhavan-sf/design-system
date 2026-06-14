import { useState, type ButtonHTMLAttributes } from 'react';
import { House } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './tabs.css';

export type TabSize = 'sm' | 'md';
export type TabCount = 2 | 3 | 4 | 5;
export type TabState = 'default' | 'hover' | 'focused' | 'disabled' | 'Default' | 'Hover' | 'Focused' | 'Disabled';
export type TabIconPosition = 'left' | 'right' | 'Left' | 'Right';
export type TabsType = 'no-segment' | 'segments' | 'No Segment' | 'Segemnts' | 'Segments';

type NormalizedTabState = 'default' | 'hover' | 'focused' | 'disabled';
type NormalizedIconPosition = 'left' | 'right';
type NormalizedTabsType = 'no-segment' | 'segments';

export interface TabItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  iconPosition?: TabIconPosition;
  pressed?: boolean;
  showIcons?: boolean;
  size?: TabSize;
  state?: TabState;
}

export type TabConfig = {
  label: string;
  disabled?: boolean;
  iconPosition?: TabIconPosition;
  showIcons?: boolean;
  size?: TabSize;
  state?: TabState;
};

export interface TabsProps {
  tabs?: Array<string | TabConfig>;
  tabCount?: TabCount;
  activeIndex?: number;
  defaultActiveIndex?: number;
  type?: TabsType;
  size?: TabSize;
  iconPosition?: TabIconPosition;
  showIcons?: boolean;
  className?: string;
  onTabChange?: (index: number) => void;
}

function normalizeValue<T extends string>(value: string | undefined, aliases: Record<string, T> = {}) {
  if (value === undefined) {
    return undefined;
  }

  return aliases[value] ?? value;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function getTextVariant(size: TabSize) {
  return size === 'sm' ? 'text-xs' : 'text-sm';
}

function getTextWeight({ pressed, size }: { pressed: boolean; size: TabSize }) {
  return pressed && size === 'sm' ? 'semibold' : 'medium';
}

function getTabItemVariantClasses({
  pressed,
  state,
}: {
  pressed: boolean;
  state: NormalizedTabState;
}) {
  const isDisabled = state === 'disabled';
  const isFocused = state === 'focused';
  const isHover = state === 'hover';

  if (isDisabled) {
    if (pressed) {
      return 'bg-neutral-400 text-neutral-0 shadow-none';
    }

    return 'bg-neutral-100 text-neutral-200 shadow-none';
  }

  if (pressed) {
    return [
      'bg-neutral-900 text-neutral-0',
      isFocused && 'shadow-focus-neutral',
      'enabled:hover:bg-neutral-900',
      'focus-visible:shadow-focus-neutral',
    ]
      .filter(Boolean)
      .join(' ');
  }

  if (isHover) {
    return 'bg-neutral-50 text-neutral-900 shadow-none';
  }

  if (isFocused) {
    return 'bg-transparent text-neutral-900 shadow-focus-neutral';
  }

  return [
    'bg-transparent text-neutral-900 shadow-none',
    'enabled:hover:bg-neutral-50',
    'focus-visible:shadow-focus-neutral',
  ].join(' ');
}

function getTabItemClassName({
  className,
  layoutClasses,
  variantClasses,
}: {
  className?: string;
  layoutClasses: string;
  variantClasses: string;
}) {
  return buildClassName([
    'storybook-tab-item',
    'inline-flex items-center justify-center gap-1 rounded-2 border-0 font-sans',
    layoutClasses,
    variantClasses,
    className,
  ]);
}

function getTabsTypeClasses(type: NormalizedTabsType) {
  if (type === 'segments') {
    return 'gap-2 rounded-3 border border-solid border-neutral-100 bg-neutral-0 p-1';
  }

  return 'gap-2';
}

function createDefaultTabs(count: TabCount) {
  return Array.from({ length: count }, () => 'Dynamic');
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
}: TabItemProps) {
  const normalizedIconPosition = normalizeValue(iconPosition, {
    Left: 'left',
    Right: 'right',
  }) as NormalizedIconPosition;
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    Hover: 'hover',
    Focused: 'focused',
    Disabled: 'disabled',
  }) as NormalizedTabState;
  const isDisabled = normalizedState === 'disabled';
  const variantClasses = getTabItemVariantClasses({
    pressed,
    state: normalizedState,
  });

  const layoutClasses = 'px-3 py-1.5';

  const icon = showIcons ? (
    <House
      className="storybook-tab-item__icon shrink-0"
      size={16}
      weight={pressed ? 'fill' : 'regular'}
    />
  ) : null;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={getTabItemClassName({
        className,
        layoutClasses,
        variantClasses,
      })}
      {...props}
    >
      {normalizedIconPosition === 'left' && icon}
      <Text
        as="span"
        variant={getTextVariant(size)}
        weight={getTextWeight({ pressed, size })}
        color="currentColor"
        className="storybook-tab-item__label max-w-[160px] overflow-hidden text-center text-ellipsis whitespace-nowrap"
      >
        {label}
      </Text>
      {normalizedIconPosition === 'right' && icon}
    </button>
  );
}

export function Tabs({
  tabs,
  tabCount = 2,
  activeIndex,
  defaultActiveIndex = 0,
  type = 'no-segment',
  size = 'sm',
  iconPosition = 'left',
  showIcons = false,
  className,
  onTabChange,
}: TabsProps) {
  const resolvedTabs = tabs ?? createDefaultTabs(tabCount);
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActiveIndex);
  const isControlled = typeof activeIndex === 'number';
  const resolvedActiveIndex = isControlled ? activeIndex : internalActiveIndex;
  const normalizedType = normalizeValue(type, {
    'No Segment': 'no-segment',
    Segemnts: 'segments',
    Segments: 'segments',
  }) as NormalizedTabsType;
  const typeClasses = getTabsTypeClasses(normalizedType);

  return (
    <div
      className={buildClassName([
        'storybook-tabs',
        'inline-flex items-start',
        typeClasses,
        className,
      ])}
      role="tablist"
    >
      {resolvedTabs.map((tab, index) => {
        const isStringTab = typeof tab === 'string';
        const label = isStringTab ? tab : tab.label;
        const disabled = isStringTab ? false : tab.disabled;
        const pressed = index === resolvedActiveIndex;

        return (
          <TabItem
            key={`${label}-${index}`}
            aria-selected={pressed}
            iconPosition={isStringTab ? iconPosition : tab.iconPosition ?? iconPosition}
            label={label}
            pressed={pressed}
            role="tab"
            showIcons={isStringTab ? showIcons : tab.showIcons ?? showIcons}
            size={isStringTab ? size : tab.size ?? size}
            state={disabled ? 'disabled' : isStringTab ? 'default' : tab.state ?? 'default'}
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
