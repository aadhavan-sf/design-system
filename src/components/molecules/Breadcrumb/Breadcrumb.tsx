import type { MouseEventHandler } from 'react';
import { CaretRight, House } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './breadcrumb.css';

export type BreadcrumbSize = 'base' | 'small' | 'Base' | 'S' | 'Small';
export type BreadcrumbDividerType = 'arrow' | 'slash' | 'Arrow' | 'Slash';
export type BreadcrumbItemState = string;

type NormalizedBreadcrumbSize = 'base' | 'small';
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
  return parts.filter(Boolean).join(' ');
}

function getTextVariant(size: NormalizedBreadcrumbSize) {
  return size === 'small' ? 'text-sm' : 'text-md';
}

function getIconSize(size: NormalizedBreadcrumbSize) {
  return size === 'small' ? 14 : 16;
}

export function BreadcrumbDivider({
  size = 'base',
  type = 'arrow',
  className,
}: BreadcrumbDividerProps) {
  const normalizedSize = normalizeValue(size, {
    Base: 'base',
    S: 'small',
    Small: 'small',
  }) as NormalizedBreadcrumbSize;
  const normalizedType = normalizeValue(type, {
    Arrow: 'arrow',
    Slash: 'slash',
  }) as NormalizedDividerType;

  return (
    <span
      className={buildClassName([
        'storybook-breadcrumb-divider',
        `storybook-breadcrumb-divider--${normalizedSize}`,
        className,
      ])}
      aria-hidden="true"
    >
      {normalizedType === 'arrow' ? (
        <CaretRight
          size={normalizedSize === 'small' ? 12 : 16}
          weight="regular"
        />
      ) : (
        <Text
          as="span"
          variant={normalizedSize === 'small' ? 'text-xs' : 'text-sm'}
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
  size = 'base',
  state = 'enabled',
  divider = 'arrow',
  href,
  className,
  onClick,
}: BreadcrumbItemProps) {
  const normalizedSize = normalizeValue(size, {
    Base: 'base',
    S: 'small',
    Small: 'small',
  }) as NormalizedBreadcrumbSize;
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

  return (
    <span
      className={buildClassName([
        'storybook-breadcrumb-item',
        `storybook-breadcrumb-item--${normalizedSize}`,
        className,
      ])}
    >
      <Component
        type={Component === 'button' ? 'button' : undefined}
        href={href}
        aria-current={isCurrent ? 'page' : undefined}
        className={buildClassName([
          'storybook-breadcrumb-item__label',
          `storybook-breadcrumb-item__label--${normalizedState}`,
        ])}
        onClick={onClick}
      >
        {homeIcon && (
          <House
            className="storybook-breadcrumb-item__icon"
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
  size = 'base',
  homeIcon = true,
  className,
}: BreadcrumbProps) {
  const normalizedSize = normalizeValue(size, {
    Base: 'base',
    S: 'small',
    Small: 'small',
  }) as NormalizedBreadcrumbSize;
  const normalizedDivider = normalizeValue(divider, {
    Arrow: 'arrow',
    Slash: 'slash',
  }) as NormalizedDividerType;

  return (
    <nav
      className={buildClassName([
        'storybook-breadcrumb',
        `storybook-breadcrumb--${normalizedSize}`,
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
