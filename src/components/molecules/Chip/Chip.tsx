import { useState, type HTMLAttributes, type MouseEvent } from 'react';
import {
  ArrowUp,
  X,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

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

function getSizeClassName(size: ChipSize) {
  if (size === 'lg') {
    return 'min-h-7 px-3 py-0.5';
  }

  if (size === 'md') {
    return 'min-h-6 px-2.5 py-0.5';
  }

  return 'min-h-5 px-2 py-0.5';
}

function getIconOnlySizeClassName(size: ChipSize) {
  if (size === 'lg') {
    return 'p-2';
  }

  return 'p-2';
}

function getAvatarSizeClassName(size: ChipSize) {
  if (size === 'lg') {
    return 'h-[18px] w-[18px]';
  }

  if (size === 'md') {
    return 'h-4 w-4';
  }

  return 'h-3.5 w-3.5';
}

function ChipIcon({ name, size }: { name: InnerChipIconName; size: ChipSize }) {
  const iconSize = getIconSize(size);

  if (name === 'avatar') {
    return (
      <span
        className={buildClassName([
          'inline-flex shrink-0 rounded-full bg-[radial-gradient(circle_at_50%_36%,#2f251f_0_18%,transparent_19%),radial-gradient(circle_at_50%_88%,#5f3a29_0_34%,transparent_35%),linear-gradient(135deg,#f6c7a8_0%,#b86f4a_100%)]',
          getAvatarSizeClassName(size),
        ])}
        aria-hidden="true"
      />
    );
  }

  if (name === 'arrow') {
    return (
      <ArrowUp
        aria-hidden="true"
        className="shrink-0"
        size={iconSize}
        weight="regular"
      />
    );
  }

  return (
    <X
      aria-hidden="true"
      className="shrink-0"
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
        'inline-flex max-w-full items-center justify-center gap-1 border border-solid border-transparent box-border font-sans text-neutral-600 transition-[background-color,border-color,color,box-shadow] duration-[160ms]',
        normalizedIcon === 'icon-only' ? getIconOnlySizeClassName(size) : getSizeClassName(size),
        normalizedShape === 'pill' ? 'rounded-6' : 'rounded-2',
        normalizedType === 'chip' && 'bg-neutral-50',
        normalizedType === 'button' && 'cursor-pointer border-neutral-400 bg-neutral-0 text-neutral-700 hover:border-neutral-800 focus-visible:outline-none focus-visible:shadow-focus-neutral',
        border && normalizedType === 'chip' && 'border-neutral-200',
        isActive && normalizedType === 'button' && 'border-transparent bg-neutral-800 text-neutral-0 hover:border-transparent',
        normalizedState === 'hover' && normalizedType === 'button' && !isActive && 'border-neutral-800',
        normalizedState === 'focused' && normalizedType === 'button' && 'shadow-focus-neutral',
        isDisabled && 'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-200',
        isDisabled && isActive && normalizedType === 'button' && 'border-transparent bg-neutral-100 text-neutral-200',
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
          className="min-w-0 overflow-hidden text-center text-ellipsis whitespace-nowrap"
        >
          {label}
        </Text>
      )}
      {hasRightIcon && <ChipIcon name={rightIconName} size={size} />}
    </Component>
  );
}
