import { useState, type ButtonHTMLAttributes } from 'react';
import { House } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './tabs.css';

export type TabSize = 'sm' | 'md';
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
  return parts.filter(Boolean).join(' ');
}

function getTextVariant(size: TabSize) {
  return size === 'sm' ? 'text-xs' : 'text-sm';
}

function getTextWeight({ pressed, size }: { pressed: boolean; size: TabSize }) {
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

  const icon = showIcons ? (
    <House
      className="storybook-tab-item__icon"
      size={16}
      weight="regular"
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
}: TabsProps) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActiveIndex);
  const isControlled = typeof activeIndex === 'number';
  const resolvedActiveIndex = isControlled ? activeIndex : internalActiveIndex;
  const normalizedType = normalizeValue(type, {
    'No Segment': 'no-segment',
    Segemnts: 'segments',
    Segments: 'segments',
  }) as NormalizedTabsType;

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
