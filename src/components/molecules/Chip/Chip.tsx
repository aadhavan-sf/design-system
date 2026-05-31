import { useState, type HTMLAttributes, type MouseEvent } from 'react';
import {
  ArrowUp,
  X,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './chip.css';

export type ChipType = string;
export type ChipSize = string;
export type ChipShape = string;
export type ChipIconName = string;
export type ChipState = string;

type NormalizedChipType = 'chip' | 'button';
type NormalizedChipShape = 'pill' | 'rounded';
type NormalizedChipIcon = 'none' | 'left' | 'right' | 'both' | 'avatar-left' | 'avatar-right' | 'icon-only';
type NormalizedChipState = 'default' | 'hover' | 'focused' | 'disabled';
type InnerChipIconName = 'arrow' | 'avatar' | 'close';

export interface ChipProps extends Omit<HTMLAttributes<HTMLElement>, 'style' | 'onClick'> {
  type?: ChipType;
  label?: string;
  size?: ChipSize;
  shape?: ChipShape;
  style?: ChipShape;
  border?: boolean;
  icon?: ChipIconName;
  active?: boolean;
  defaultActive?: boolean;
  state?: ChipState;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onActiveChange?: (active: boolean) => void;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue<T extends string>(value: string | undefined, aliases: Record<string, T> = {}) {
  if (value === undefined) {
    return undefined;
  }

  return aliases[value] ?? value;
}

function getTextVariant(size: ChipSize) {
  if (size === 'sm') {
    return 'text-xs';
  }

  if (size === 'lg') {
    return 'text-md';
  }

  return 'text-sm';
}

function getIconSize(size: ChipSize) {
  if (size === 'sm') {
    return 12;
  }

  if (size === 'lg') {
    return 16;
  }

  return 14;
}

function ChipIcon({ name, size }: { name: InnerChipIconName; size: ChipSize }) {
  const iconSize = getIconSize(size);

  if (name === 'avatar') {
    return (
      <span
        className={buildClassName([
          'storybook-chip__avatar',
          `storybook-chip__avatar--${size}`,
        ])}
        aria-hidden="true"
      />
    );
  }

  if (name === 'arrow') {
    return (
      <ArrowUp
        aria-hidden="true"
        className="storybook-chip__icon"
        size={iconSize}
        weight="regular"
      />
    );
  }

  return (
    <X
      aria-hidden="true"
      className="storybook-chip__icon"
      size={iconSize}
      weight="regular"
    />
  );
}

export function Chip({
  type = 'chip',
  label = 'Label',
  size = 'sm',
  shape = 'pill',
  style,
  border = false,
  icon = 'none',
  active,
  defaultActive = false,
  state = 'default',
  disabled = false,
  className,
  onClick,
  onActiveChange,
  ...props
}: ChipProps) {
  const [internalActive, setInternalActive] = useState(defaultActive);
  const isActiveControlled = typeof active === 'boolean';
  const normalizedType = normalizeValue(type, {
    Chip: 'chip',
    Button: 'button',
    'Chip Button': 'button',
    chipButton: 'button',
  }) as NormalizedChipType;
  const normalizedShape = normalizeValue(shape ?? style, {
    Pill: 'pill',
    Rounded: 'rounded',
  }) as NormalizedChipShape;
  const normalizedIcon = normalizeValue(icon, {
    None: 'none',
    Left: 'left',
    Right: 'right',
    'Both Side': 'both',
    'Avatar Left': 'avatar-left',
    'Avatar Right': 'avatar-right',
    'Icon Only': 'icon-only',
  }) as NormalizedChipIcon;
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    Hover: 'hover',
    Focused: 'focused',
    Disabled: 'disabled',
  }) as NormalizedChipState;
  const isButton = normalizedType === 'button';
  const isDisabled = disabled || normalizedState === 'disabled';
  const isActive = isActiveControlled ? active : internalActive;
  const Component = isButton ? 'button' : 'span';
  const showLabel = normalizedIcon !== 'icon-only';
  const hasLeftIcon = ['left', 'both', 'avatar-left'].includes(normalizedIcon);
  const hasRightIcon = ['right', 'both', 'avatar-right'].includes(normalizedIcon);
  const leftIconName = normalizedIcon === 'avatar-left' ? 'avatar' : 'arrow';
  const rightIconName = normalizedIcon === 'avatar-right' ? 'avatar' : 'close';

  return (
    <Component
      type={isButton ? 'button' : undefined}
      disabled={isButton ? isDisabled : undefined}
      aria-disabled={!isButton && isDisabled ? true : undefined}
      aria-pressed={isButton ? isActive : undefined}
      className={buildClassName([
        'storybook-chip',
        `storybook-chip--${normalizedType}`,
        `storybook-chip--${size}`,
        `storybook-chip--${normalizedShape}`,
        `storybook-chip--state-${normalizedState}`,
        border && normalizedType === 'chip' && 'storybook-chip--bordered',
        isActive && 'storybook-chip--active',
        isDisabled && 'storybook-chip--disabled',
        normalizedIcon === 'icon-only' && 'storybook-chip--icon-only',
        className,
      ])}
      onClick={isDisabled ? undefined : (event) => {
        if (isButton) {
          const nextActive = !isActive;

          if (!isActiveControlled) {
            setInternalActive(nextActive);
          }

          onActiveChange?.(nextActive);
        }

        onClick?.(event);
      }}
      {...props}
    >
      {hasLeftIcon && <ChipIcon name={leftIconName} size={size} />}
      {normalizedIcon === 'icon-only' && <ChipIcon name="close" size={size} />}
      {showLabel && (
        <Text
          as="span"
          variant={getTextVariant(size)}
          weight={isButton && isActive ? 'semibold' : 'medium'}
          color="currentColor"
          className="storybook-chip__label"
        >
          {label}
        </Text>
      )}
      {hasRightIcon && <ChipIcon name={rightIconName} size={size} />}
    </Component>
  );
}
