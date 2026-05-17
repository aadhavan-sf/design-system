import PropTypes from 'prop-types';
import {
  ArrowUp,
  X,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './chip.css';

const TYPES = ['chip', 'button'];
const SIZES = ['sm', 'md', 'lg'];
const SHAPES = ['pill', 'rounded'];
const ICONS = ['none', 'left', 'right', 'both', 'avatar-left', 'avatar-right', 'icon-only'];
const BUTTON_STATES = ['default', 'hover', 'focused', 'disabled'];

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function getTextVariant(size) {
  if (size === 'sm') {
    return 'text-xs';
  }

  if (size === 'lg') {
    return 'text-md';
  }

  return 'text-sm';
}

function getIconSize(size) {
  if (size === 'sm') {
    return 12;
  }

  if (size === 'lg') {
    return 16;
  }

  return 14;
}

function ChipIcon({ name, size }) {
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

ChipIcon.propTypes = {
  name: PropTypes.oneOf(['arrow', 'avatar', 'close']).isRequired,
  size: PropTypes.oneOf(SIZES).isRequired,
};

export function Chip({
  type = 'chip',
  label = 'Label',
  size = 'sm',
  shape = 'pill',
  style,
  border = false,
  icon = 'none',
  active = false,
  state = 'default',
  disabled = false,
  className,
  onClick,
  ...props
}) {
  const normalizedType = normalizeValue(type, {
    Chip: 'chip',
    Button: 'button',
    'Chip Button': 'button',
    chipButton: 'button',
  });
  const normalizedShape = normalizeValue(shape ?? style, {
    Pill: 'pill',
    Rounded: 'rounded',
  });
  const normalizedIcon = normalizeValue(icon, {
    None: 'none',
    Left: 'left',
    Right: 'right',
    'Both Side': 'both',
    'Avatar Left': 'avatar-left',
    'Avatar Right': 'avatar-right',
    'Icon Only': 'icon-only',
  });
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    Hover: 'hover',
    Focused: 'focused',
    Disabled: 'disabled',
  });
  const isButton = normalizedType === 'button';
  const isDisabled = disabled || normalizedState === 'disabled';
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
      aria-pressed={isButton ? active : undefined}
      className={buildClassName([
        'storybook-chip',
        `storybook-chip--${normalizedType}`,
        `storybook-chip--${size}`,
        `storybook-chip--${normalizedShape}`,
        `storybook-chip--state-${normalizedState}`,
        border && normalizedType === 'chip' && 'storybook-chip--bordered',
        active && 'storybook-chip--active',
        isDisabled && 'storybook-chip--disabled',
        normalizedIcon === 'icon-only' && 'storybook-chip--icon-only',
        className,
      ])}
      onClick={isDisabled ? undefined : onClick}
      {...props}
    >
      {hasLeftIcon && <ChipIcon name={leftIconName} size={size} />}
      {normalizedIcon === 'icon-only' && <ChipIcon name="close" size={size} />}
      {showLabel && (
        <Text
          as="span"
          variant={getTextVariant(size)}
          weight={isButton && active ? 'semibold' : 'medium'}
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

Chip.propTypes = {
  type: PropTypes.oneOf([...TYPES, 'Chip', 'Button', 'Chip Button', 'chipButton']),
  label: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  shape: PropTypes.oneOf([...SHAPES, 'Pill', 'Rounded']),
  style: PropTypes.oneOf(['Pill', 'Rounded']),
  border: PropTypes.bool,
  icon: PropTypes.oneOf([
    ...ICONS,
    'None',
    'Left',
    'Right',
    'Both Side',
    'Avatar Left',
    'Avatar Right',
    'Icon Only',
  ]),
  active: PropTypes.bool,
  state: PropTypes.oneOf([...BUTTON_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
