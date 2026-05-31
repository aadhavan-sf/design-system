import { useState, type ButtonHTMLAttributes } from 'react';
import { House } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

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
      className="shrink-0"
      size={16}
      weight="regular"
    />
  ) : null;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={buildClassName([
        'inline-flex cursor-pointer items-center justify-center gap-1 rounded-2 border-0 bg-transparent px-3 font-sans text-neutral-900 transition-[background-color,box-shadow,color] duration-[160ms] hover:not-disabled:not-[.is-pressed]:bg-neutral-50 focus-visible:outline-none focus-visible:shadow-focus-neutral disabled:cursor-not-allowed',
        size === 'md' ? 'py-1.5' : 'py-1',
        normalizedState === 'hover' && !pressed && 'bg-neutral-50',
        normalizedState === 'focused' && 'shadow-focus-neutral',
        pressed && 'is-pressed bg-neutral-900 text-neutral-0 hover:not-disabled:bg-neutral-900',
        isDisabled && 'bg-neutral-100 text-neutral-200',
        isDisabled && pressed && 'bg-neutral-400 text-neutral-0',
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
        className="max-w-40 overflow-hidden text-center text-ellipsis whitespace-nowrap"
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
        'inline-flex items-start gap-2',
        normalizedType === 'segments' && 'rounded-3 border border-solid border-neutral-100 bg-neutral-0 p-1',
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
