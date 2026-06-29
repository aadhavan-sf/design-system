import { useEffect, useState, type HTMLAttributes, type MouseEvent } from 'react';
import {
  ArrowUp,
  X,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import chipAvatarImage from '../../../assets/superfans-avatar.png';

import './chip.css';

export type ChipType = string;
export type ChipSize = string;
export type ChipShape = string;
export type ChipIconName = string;
export type ChipState = string;
export type ChipTone = string;

type NormalizedChipType = 'chip' | 'chip-button';
type NormalizedChipShape = 'pill' | 'rounded';
type NormalizedChipIcon = 'none' | 'left' | 'right' | 'both' | 'avatar-left' | 'avatar-right' | 'icon-only';
type NormalizedChipState = 'default' | 'hover' | 'focused' | 'disabled';
type NormalizedChipTone = 'neutral' | 'brand';
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
  tone?: ChipTone;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onActiveChange?: (active: boolean) => void;
}

const CHIP_BUTTON_RESET = 'm-0 appearance-none';

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

function getChipShapeClassName(shape: NormalizedChipShape) {
  return shape === 'rounded' ? 'rounded-2' : 'rounded-6';
}

function getChipSizeClassName(
  size: ChipSize,
  icon: NormalizedChipIcon,
  type: NormalizedChipType,
  shape: NormalizedChipShape,
) {
  if (icon === 'icon-only') {
    if (size === 'lg') {
      return 'size-8 p-2';
    }

    if (size === 'md') {
      return 'size-[30px] p-2';
    }

    return 'size-7 p-2';
  }

  const isRoundedDisplayChip = type === 'chip' && shape === 'rounded';

  if (isRoundedDisplayChip) {
    if (size === 'lg') {
      return 'px-3 py-1';
    }

    if (size === 'md') {
      return 'px-2.5 py-1';
    }

    return 'px-2 py-1';
  }

  if (size === 'lg') {
    return 'h-7 px-3 py-0.5';
  }

  if (size === 'md') {
    return 'h-6 px-2.5 py-0.5';
  }

  return 'h-5 px-2 py-0.5';
}

function getChipBorderClassName({
  border,
  isDisabled,
  type,
  tone,
}: {
  border: boolean;
  isDisabled: boolean;
  type: NormalizedChipType;
  tone: NormalizedChipTone;
}) {
  if (type === 'chip-button') {
    return 'border border-solid border-neutral-400';
  }

  if (isDisabled) {
    return 'border border-solid border-neutral-200';
  }

  if (border && tone === 'neutral') {
    return 'border border-solid border-neutral-200';
  }

  return 'border-0';
}

function getChipTypeClassName({
  type,
  tone,
}: {
  type: NormalizedChipType;
  tone: NormalizedChipTone;
}) {
  if (type === 'chip-button') {
    return 'cursor-pointer';
  }

  if (tone === 'brand') {
    return 'bg-brand-50 text-brand-400';
  }

  return 'bg-neutral-50';
}

function getChipButtonInteractionClassName({
  isActive,
  isDisabled,
  state,
}: {
  isActive: boolean;
  isDisabled: boolean;
  state: NormalizedChipState;
}) {
  if (isDisabled) {
    return buildClassName([
      'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-200',
      isActive && 'border-transparent',
    ]);
  }

  return buildClassName([
    isActive
      ? 'border-transparent bg-neutral-900 text-neutral-0 enabled:hover:border-transparent'
      : 'bg-transparent text-neutral-700 enabled:hover:border-neutral-800',
    state === 'hover' && (isActive ? 'border-transparent' : 'border-neutral-800'),
    'focus-visible:outline-none focus-visible:shadow-focus-neutral',
    state === 'focused' && 'shadow-focus-neutral outline-none',
  ]);
}

function getChipClassName({
  border,
  className,
  icon,
  isActive,
  isDisabled,
  shape,
  size,
  state,
  tone,
  type,
}: {
  border: boolean;
  className?: string;
  icon: NormalizedChipIcon;
  isActive: boolean;
  isDisabled: boolean;
  shape: NormalizedChipShape;
  size: ChipSize;
  state: NormalizedChipState;
  tone: NormalizedChipTone;
  type: NormalizedChipType;
}) {
  const isChipButton = type === 'chip-button';

  return buildClassName([
    'storybook-chip inline-flex max-w-full items-center justify-center gap-1 box-border font-sans',
    !isChipButton && tone !== 'brand' && 'text-neutral-600',
    getChipBorderClassName({ border, isDisabled, type, tone }),
    getChipShapeClassName(shape),
    getChipSizeClassName(size, icon, type, shape),
    getChipTypeClassName({ type, tone }),
    isChipButton && CHIP_BUTTON_RESET,
    isChipButton && getChipButtonInteractionClassName({ isActive, isDisabled, state }),
    !isChipButton && isDisabled && 'cursor-not-allowed bg-neutral-100 text-neutral-200',
    `storybook-chip--${type}`,
    `storybook-chip--${size}`,
    `storybook-chip--${shape}`,
    `storybook-chip--state-${state}`,
    tone === 'brand' && 'storybook-chip--tone-brand',
    border && type === 'chip' && tone === 'neutral' && 'storybook-chip--bordered',
    isActive && 'storybook-chip--active',
    isDisabled && 'storybook-chip--disabled',
    icon === 'icon-only' && 'storybook-chip--icon-only',
    className,
  ]);
}

function getChipLabelClassName(size: ChipSize) {
  return buildClassName([
    'storybook-chip__label min-w-0 overflow-hidden text-center text-ellipsis whitespace-nowrap',
    size === 'sm' && 'leading-4',
  ]);
}

function getChipIconClassName() {
  return 'storybook-chip__icon shrink-0';
}

function getChipAvatarClassName({
  shape,
  size,
}: {
  shape: NormalizedChipShape;
  size: ChipSize;
}) {
  return buildClassName([
    'storybook-chip__avatar block shrink-0 overflow-hidden object-cover',
    shape === 'rounded' ? 'rounded-1' : 'rounded-full',
    size === 'lg' && 'size-[18px]',
    size === 'md' && 'size-4',
    (size === 'sm' || !size) && 'size-[14px]',
    `storybook-chip__avatar--${size}`,
  ]);
}

function ChipIcon({
  name,
  shape,
  size,
}: {
  name: InnerChipIconName;
  shape: NormalizedChipShape;
  size: ChipSize;
}) {
  const iconSize = getIconSize(size);

  if (name === 'avatar') {
    return (
      <img
        alt=""
        aria-hidden="true"
        className={getChipAvatarClassName({ shape, size })}
        src={chipAvatarImage}
      />
    );
  }

  if (name === 'arrow') {
    return (
      <ArrowUp
        aria-hidden="true"
        className={getChipIconClassName()}
        size={iconSize}
        weight="regular"
      />
    );
  }

  return (
    <X
      aria-hidden="true"
      className={getChipIconClassName()}
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
  tone = 'neutral',
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
    Button: 'chip-button',
    'Chip Button': 'chip-button',
    button: 'chip-button',
    chipButton: 'chip-button',
    'chip-button': 'chip-button',
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
  const normalizedTone = normalizeValue(tone, {
    Neutral: 'neutral',
    Brand: 'brand',
  }) as NormalizedChipTone;
  const isChipButton = normalizedType === 'chip-button';
  const isDisabled = disabled || normalizedState === 'disabled';
  const isActive = isActiveControlled ? active : internalActive;

  useEffect(() => {
    if (!isActiveControlled) {
      setInternalActive(defaultActive);
    }
  }, [defaultActive, isActiveControlled]);

  const Component = isChipButton ? 'button' : 'span';
  const showLabel = normalizedIcon !== 'icon-only';
  const hasLeftIcon = ['left', 'both', 'avatar-left'].includes(normalizedIcon);
  const hasRightIcon = ['right', 'both', 'avatar-right'].includes(normalizedIcon);
  const leftIconName = normalizedIcon === 'avatar-left' ? 'avatar' : 'arrow';
  const rightIconName = normalizedIcon === 'avatar-right' ? 'avatar' : 'close';

  return (
    <Component
      type={isChipButton ? 'button' : undefined}
      disabled={isChipButton ? isDisabled : undefined}
      aria-disabled={!isChipButton && isDisabled ? true : undefined}
      aria-pressed={isChipButton ? isActive : undefined}
      className={getChipClassName({
        border,
        className,
        icon: normalizedIcon,
        isActive,
        isDisabled,
        shape: normalizedShape,
        size,
        state: normalizedState,
        tone: normalizedTone,
        type: normalizedType,
      })}
      onClick={isDisabled ? undefined : (event) => {
        if (isChipButton) {
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
      {hasLeftIcon && (
        <ChipIcon
          name={leftIconName}
          shape={normalizedShape}
          size={size}
        />
      )}
      {normalizedIcon === 'icon-only' && (
        <ChipIcon
          name="close"
          shape={normalizedShape}
          size={size}
        />
      )}
      {showLabel && (
        <Text
          as="span"
          variant={getTextVariant(size)}
          weight={isChipButton && isActive ? 'semibold' : 'medium'}
          color="currentColor"
          className={getChipLabelClassName(size)}
        >
          {label}
        </Text>
      )}
      {hasRightIcon && (
        <ChipIcon
          name={rightIconName}
          shape={normalizedShape}
          size={size}
        />
      )}
    </Component>
  );
}
