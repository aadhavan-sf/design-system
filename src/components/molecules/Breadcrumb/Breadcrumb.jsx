import PropTypes from 'prop-types';
import { CaretRight, House } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './breadcrumb.css';

const SIZES = ['base', 'small'];
const DIVIDER_TYPES = ['arrow', 'slash'];
const ITEM_STATES = ['enabled', 'hover', 'focus', 'current'];

const defaultItems = [
  { label: 'Label' },
  { label: 'Label' },
  { label: 'Label' },
  { label: '...' },
  { label: 'Label', state: 'current' },
];

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function getTextVariant(size) {
  return size === 'small' ? 'text-sm' : 'text-md';
}

function getIconSize(size) {
  return size === 'small' ? 14 : 16;
}

export function BreadcrumbDivider({
  size = 'base',
  type = 'arrow',
  className,
}) {
  const normalizedSize = normalizeValue(size, {
    Base: 'base',
    S: 'small',
    Small: 'small',
  });
  const normalizedType = normalizeValue(type, {
    Arrow: 'arrow',
    Slash: 'slash',
  });

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

BreadcrumbDivider.propTypes = {
  size: PropTypes.oneOf([...SIZES, 'Base', 'S', 'Small']),
  type: PropTypes.oneOf([...DIVIDER_TYPES, 'Arrow', 'Slash']),
  className: PropTypes.string,
};

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
}) {
  const normalizedSize = normalizeValue(size, {
    Base: 'base',
    S: 'small',
    Small: 'small',
  });
  const normalizedState = normalizeValue(state, {
    Enabled: 'enabled',
    Hover: 'hover',
    Focus: 'focus',
    Current: 'current',
  });
  const normalizedDivider = normalizeValue(divider, {
    Arrow: 'arrow',
    Slash: 'slash',
  });
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

BreadcrumbItem.propTypes = {
  label: PropTypes.string,
  homeIcon: PropTypes.bool,
  showDivider: PropTypes.bool,
  size: PropTypes.oneOf([...SIZES, 'Base', 'S', 'Small']),
  state: PropTypes.oneOf([...ITEM_STATES, 'Enabled', 'Hover', 'Focus', 'Current']),
  divider: PropTypes.oneOf([...DIVIDER_TYPES, 'Arrow', 'Slash']),
  href: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export function Breadcrumb({
  items = defaultItems,
  divider = 'arrow',
  size = 'base',
  homeIcon = true,
  className,
}) {
  const normalizedSize = normalizeValue(size, {
    Base: 'base',
    S: 'small',
    Small: 'small',
  });
  const normalizedDivider = normalizeValue(divider, {
    Arrow: 'arrow',
    Slash: 'slash',
  });

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

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    homeIcon: PropTypes.bool,
    href: PropTypes.string,
    state: PropTypes.oneOf([...ITEM_STATES, 'Enabled', 'Hover', 'Focus', 'Current']),
    onClick: PropTypes.func,
  })),
  divider: PropTypes.oneOf([...DIVIDER_TYPES, 'Arrow', 'Slash']),
  size: PropTypes.oneOf([...SIZES, 'Base', 'S', 'Small']),
  homeIcon: PropTypes.bool,
  className: PropTypes.string,
};
