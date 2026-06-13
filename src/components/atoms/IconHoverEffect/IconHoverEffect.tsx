import {
  type ButtonHTMLAttributes,
  createElement,
} from 'react';
import {
  Copy,
  DownloadSimple,
  Eye,
  type Icon,
  type IconProps,
  PencilSimple,
  Repeat,
  Trash,
} from '@phosphor-icons/react';

import './iconHoverEffect.css';

type NormalizedType = 'default' | 'destructive';
type NormalizedSize = 'sm' | 'md' | 'lg' | 'xl';
type NormalizedState = 'default' | 'hover';
type NormalizedIcon = 'copy' | 'download' | 'eye' | 'pencil' | 'repeat';

export type IconHoverEffectType = NormalizedType | 'Default' | 'Destructive' | 'Delete';
export type IconHoverEffectSize = NormalizedSize | 'Small' | 'Medium' | 'Large' | 'XLarge';
export type IconHoverEffectState = NormalizedState | 'Default' | 'Hover';
export type IconHoverEffectIcon = NormalizedIcon | 'Copy' | 'Download' | 'Eye' | 'Pencil' | 'Repeat';

export interface IconHoverEffectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  ariaLabel?: string;
  icon?: IconHoverEffectIcon;
  iconComponent?: Icon;
  size?: IconHoverEffectSize;
  state?: IconHoverEffectState;
  type?: IconHoverEffectType;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function normalizeValue<T extends string>(value: string, aliases: Record<string, T> = {}) {
  return aliases[value] ?? value;
}

function getIconSize(size: NormalizedSize) {
  if (size === 'xl') {
    return 24;
  }

  if (size === 'lg') {
    return 20;
  }

  if (size === 'md') {
    return 18;
  }

  return 16;
}

function getIconHoverEffectSizeClasses(size: NormalizedSize) {
  return size === 'lg' ? 'rounded-2 p-2' : 'rounded-1 p-1';
}

function getIconHoverEffectStateClasses({
  state,
  type,
}: {
  state: NormalizedState;
  type: NormalizedType;
}) {
  if (type === 'destructive') {
    return state === 'hover'
      ? 'bg-error-50 text-error-600'
      : 'bg-transparent text-error-600';
  }

  return state === 'hover'
    ? 'bg-neutral-50 text-neutral-600'
    : 'bg-transparent text-neutral-600';
}

function getIconHoverEffectHoverClasses(type: NormalizedType) {
  return type === 'destructive'
    ? 'enabled:hover:bg-error-50'
    : 'enabled:hover:bg-neutral-50';
}

function getIconHoverEffectFocusClasses(type: NormalizedType) {
  return type === 'destructive'
    ? 'focus-visible:shadow-focus-error'
    : 'focus-visible:shadow-focus-neutral';
}

function getIconHoverEffectClassName({
  className,
  size,
  state,
  type,
}: {
  className?: string;
  size: NormalizedSize;
  state: NormalizedState;
  type: NormalizedType;
}) {
  return buildClassName([
    'storybook-icon-hover-effect border-0',
    getIconHoverEffectSizeClasses(size),
    getIconHoverEffectStateClasses({ state, type }),
    getIconHoverEffectHoverClasses(type),
    getIconHoverEffectFocusClasses(type),
    className,
  ]);
}

function renderIcon({
  icon,
  iconComponent,
  size,
  type,
}: {
  icon: NormalizedIcon;
  iconComponent?: Icon;
  size: NormalizedSize;
  type: NormalizedType;
}) {
  const iconProps: IconProps = {
    'aria-hidden': true,
    className: 'shrink-0',
    size: getIconSize(size),
    weight: 'regular',
  };

  if (type === 'destructive') {
    return <Trash {...iconProps} />;
  }

  if (iconComponent) {
    return createElement(iconComponent, iconProps);
  }

  switch (icon) {
    case 'copy':
      return <Copy {...iconProps} />;
    case 'download':
      return <DownloadSimple {...iconProps} />;
    case 'eye':
      return <Eye {...iconProps} />;
    case 'pencil':
      return <PencilSimple {...iconProps} />;
    case 'repeat':
    default:
      return <Repeat {...iconProps} />;
  }
}

export function IconHoverEffect({
  ariaLabel,
  className,
  icon = 'repeat',
  iconComponent,
  size = 'sm',
  state = 'default',
  type = 'default',
  onClick,
  ...props
}: IconHoverEffectProps) {
  const normalizedType = normalizeValue(type, {
    Default: 'default',
    Destructive: 'destructive',
    Delete: 'destructive',
  }) as NormalizedType;
  const normalizedSize = normalizeValue(size, {
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
    XLarge: 'xl',
  }) as NormalizedSize;
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    Hover: 'hover',
  }) as NormalizedState;
  const normalizedIcon = normalizeValue(icon, {
    Copy: 'copy',
    Download: 'download',
    Eye: 'eye',
    Pencil: 'pencil',
    Repeat: 'repeat',
  }) as NormalizedIcon;
  const resolvedAriaLabel =
    ariaLabel ?? (normalizedType === 'destructive' ? 'Delete' : 'Icon action');

  return (
    <button
      type="button"
      aria-label={resolvedAriaLabel}
      className={getIconHoverEffectClassName({
        className,
        size: normalizedSize,
        state: normalizedState,
        type: normalizedType,
      })}
      onClick={onClick}
      {...props}
    >
      {renderIcon({
        icon: normalizedIcon,
        iconComponent,
        size: normalizedSize,
        type: normalizedType,
      })}
    </button>
  );
}
