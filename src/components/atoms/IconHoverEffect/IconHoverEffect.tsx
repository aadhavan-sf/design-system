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
type NormalizedSize = 'sm' | 'md' | 'lg';
type NormalizedState = 'default' | 'hover';
type NormalizedIcon = 'copy' | 'download' | 'eye' | 'pencil' | 'repeat';

export type IconHoverEffectType = NormalizedType | 'Default' | 'Destructive' | 'Delete';
export type IconHoverEffectSize = NormalizedSize | 'Small' | 'Medium' | 'Large';
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

function buildClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue<T extends string>(value: string, aliases: Record<string, T> = {}) {
  return aliases[value] ?? value;
}

function getIconSize(size: NormalizedSize) {
  if (size === 'lg') {
    return 24;
  }

  if (size === 'md') {
    return 18;
  }

  return 16;
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
    className: 'storybook-icon-hover-effect__icon shrink-0',
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
  const stateClasses =
    normalizedType === 'destructive'
      ? normalizedState === 'hover'
        ? 'bg-error-50 text-error-600 hover:bg-error-50 focus-visible:shadow-focus-error'
        : 'bg-transparent text-error-600 hover:bg-error-50 focus-visible:shadow-focus-error'
      : normalizedState === 'hover'
        ? 'bg-neutral-50 text-neutral-600 hover:bg-neutral-50 focus-visible:shadow-focus-neutral'
        : 'bg-transparent text-neutral-600 hover:bg-neutral-50 focus-visible:shadow-focus-neutral';
  const resolvedAriaLabel =
    ariaLabel ?? (normalizedType === 'destructive' ? 'Delete' : 'Icon action');

  return (
    <button
      type="button"
      aria-label={resolvedAriaLabel}
      className={buildClassName([
        'storybook-icon-hover-effect',
        'rounded-1',
        'border-0',
        'p-1',
        stateClasses,
        `storybook-icon-hover-effect--${normalizedType}`,
        `storybook-icon-hover-effect--${normalizedSize}`,
        normalizedType === 'destructive' && 'storybook-icon-hover-effect--trash-motion',
        normalizedType !== 'destructive' && `storybook-icon-hover-effect--icon-${normalizedIcon}`,
        className,
      ])}
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
