import type { MouseEventHandler } from 'react';
import { CaretRight, House } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './breadcrumb.css';

export type BreadcrumbSize = 'sm' | 'md' | 'Base' | 'S' | 'Small';
export type BreadcrumbDividerType = 'arrow' | 'slash' | 'Arrow' | 'Slash';
export type BreadcrumbItemState = string;

type NormalizedBreadcrumbSize = 'sm' | 'md';
type NormalizedDividerType = 'arrow' | 'slash';
type NormalizedItemState = 'enabled' | 'hover' | 'focus' | 'current';

export interface BreadcrumbItemConfig {
  label: string;
  homeIcon?: boolean;
  href?: string;
  state?: BreadcrumbItemState;
  onClick?: MouseEventHandler<HTMLElement>;
}

export interface BreadcrumbDividerProps {
  size?: BreadcrumbSize;
  type?: BreadcrumbDividerType;
  className?: string;
}

export interface BreadcrumbItemProps {
  label?: string;
  homeIcon?: boolean;
  href?: string;
  state?: BreadcrumbItemState;
  onClick?: MouseEventHandler<HTMLElement>;
  showDivider?: boolean;
  size?: BreadcrumbSize;
  divider?: BreadcrumbDividerType;
  className?: string;
}

export interface BreadcrumbProps {
  items?: BreadcrumbItemConfig[];
  divider?: BreadcrumbDividerType;
  size?: BreadcrumbSize;
  homeIcon?: boolean;
  className?: string;
}

const defaultItems: BreadcrumbItemConfig[] = [
  { label: 'Label' },
  { label: 'Label' },
  { label: 'Label' },
  { label: '...' },
  { label: 'Label', state: 'current' },
];

function normalizeValue<T extends string>(value: string | undefined, aliases: Record<string, T> = {}) {
  if (value === undefined) {
    return undefined;
  }

  return aliases[value] ?? value;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function normalizeBreadcrumbSize(size: BreadcrumbSize | undefined) {
  return normalizeValue(size, {
    Base: 'md',
    base: 'md',
    S: 'sm',
    Small: 'sm',
    small: 'sm',
  }) as NormalizedBreadcrumbSize;
}

function getTextVariant(size: NormalizedBreadcrumbSize) {
  return size === 'sm' ? 'text-sm' : 'text-md';
}

function getIconSize(size: NormalizedBreadcrumbSize) {
  return size === 'sm' ? 14 : 16;
}

function getBreadcrumbGapClasses(size: NormalizedBreadcrumbSize) {
  return size === 'sm' ? 'gap-0.5' : 'gap-1';
}

function getBreadcrumbDividerSizeClasses(size: NormalizedBreadcrumbSize) {
  return size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
}

function getBreadcrumbLabelStateClasses(state: NormalizedItemState) {
  if (state === 'current') {
    return 'text-neutral-900';
  }

  if (state === 'hover') {
    return 'rounded-none border-b border-solid border-neutral-400';
  }

  if (state === 'focus') {
    return 'rounded-none outline-none ring-1 ring-inset ring-brand-400';
  }

  return 'enabled:hover:rounded-none enabled:hover:border-b enabled:hover:border-solid enabled:hover:border-neutral-400 focus-visible:rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-brand-400';
}

function getBreadcrumbItemLabelClassName(state: NormalizedItemState) {
  return buildClassName([
    'storybook-breadcrumb-item__label',
    'inline-flex items-center justify-center gap-1 rounded-4 border-0 bg-transparent px-1 font-sans text-neutral-400 no-underline',
    getBreadcrumbLabelStateClasses(state),
  ]);
}

export function BreadcrumbDivider({
  size = 'sm',
  type = 'arrow',
  className,
}: BreadcrumbDividerProps) {
  const normalizedSize = normalizeBreadcrumbSize(size);
  const normalizedType = normalizeValue(type, {
    Arrow: 'arrow',
    Slash: 'slash',
  }) as NormalizedDividerType;

  return (
    <span
      className={buildClassName([
        'storybook-breadcrumb-divider',
        'inline-flex items-center justify-center text-neutral-400',
        getBreadcrumbDividerSizeClasses(normalizedSize),
        className,
      ])}
      aria-hidden="true"
    >
      {normalizedType === 'arrow' ? (
        <CaretRight
          size={normalizedSize === 'sm' ? 12 : 16}
          weight="regular"
        />
      ) : (
        <Text
          as="span"
          variant={normalizedSize === 'sm' ? 'text-xs' : 'text-sm'}
          weight="medium"
          color="currentColor"
        >
          /
        </Text>
      )}
    </span>
  );
}

export function BreadcrumbItem({
  label = 'Label',
  homeIcon = true,
  showDivider = true,
  size = 'sm',
  state = 'enabled',
  divider = 'arrow',
  href,
  className,
  onClick,
}: BreadcrumbItemProps) {
  const normalizedSize = normalizeBreadcrumbSize(size);
  const normalizedState = normalizeValue(state, {
    Enabled: 'enabled',
    Hover: 'hover',
    Focus: 'focus',
    Current: 'current',
  }) as NormalizedItemState;
  const normalizedDivider = normalizeValue(divider, {
    Arrow: 'arrow',
    Slash: 'slash',
  }) as NormalizedDividerType;
  const isCurrent = normalizedState === 'current';
  const Component = href ? 'a' : 'button';
  const gapClasses = getBreadcrumbGapClasses(normalizedSize);

  return (
    <span
      className={buildClassName([
        'storybook-breadcrumb-item',
        'inline-flex items-center justify-center',
        gapClasses,
        className,
      ])}
    >
      <Component
        type={Component === 'button' ? 'button' : undefined}
        href={href}
        aria-current={isCurrent ? 'page' : undefined}
        className={getBreadcrumbItemLabelClassName(normalizedState)}
        onClick={onClick}
      >
        {homeIcon && (
          <House
            className="storybook-breadcrumb-item__icon shrink-0"
            size={getIconSize(normalizedSize)}
            weight="regular"
          />
        )}
        <Text
          as="span"
          variant={getTextVariant(normalizedSize)}
          weight="medium"
          color="currentColor"
        >
          {label}
        </Text>
      </Component>

      {showDivider && (
        <BreadcrumbDivider
          size={normalizedSize}
          type={normalizedDivider}
        />
      )}
    </span>
  );
}

export function Breadcrumb({
  items = defaultItems,
  divider = 'arrow',
  size = 'sm',
  homeIcon = true,
  className,
}: BreadcrumbProps) {
  const normalizedSize = normalizeBreadcrumbSize(size);
  const normalizedDivider = normalizeValue(divider, {
    Arrow: 'arrow',
    Slash: 'slash',
  }) as NormalizedDividerType;

  return (
    <nav
      className={buildClassName([
        'storybook-breadcrumb',
        'inline-flex items-center',
        getBreadcrumbGapClasses(normalizedSize),
        className,
      ])}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <BreadcrumbItem
            key={`${item.label}-${index}`}
            divider={normalizedDivider}
            homeIcon={item.homeIcon ?? homeIcon}
            href={item.href}
            label={item.label}
            showDivider={!isLast}
            size={normalizedSize}
            state={item.state ?? (isLast ? 'current' : 'enabled')}
            onClick={item.onClick}
          />
        );
      })}
    </nav>
  );
}
