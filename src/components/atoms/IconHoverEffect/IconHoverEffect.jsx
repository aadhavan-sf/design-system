import PropTypes from 'prop-types';
import { createElement } from 'react';
import {
  Copy,
  DownloadSimple,
  Eye,
  PencilSimple,
  Repeat,
  Trash,
} from '@phosphor-icons/react';

import './iconHoverEffect.css';

const TYPES = ['default', 'destructive'];
const SIZES = ['sm', 'md', 'lg'];
const STATES = ['default', 'hover'];
const ICONS = ['copy', 'download', 'eye', 'pencil', 'repeat'];

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function getIconSize(size) {
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
}) {
  const iconProps = {
    'aria-hidden': true,
    className: 'storybook-icon-hover-effect__icon',
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
}) {
  const normalizedType = normalizeValue(type, {
    Default: 'default',
    Destructive: 'destructive',
    Delete: 'destructive',
  });
  const normalizedSize = normalizeValue(size, {
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
  });
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    Hover: 'hover',
  });
  const normalizedIcon = normalizeValue(icon, {
    Copy: 'copy',
    Download: 'download',
    Eye: 'eye',
    Pencil: 'pencil',
    Repeat: 'repeat',
  });
  const resolvedAriaLabel =
    ariaLabel ?? (normalizedType === 'destructive' ? 'Delete' : 'Icon action');

  return (
    <button
      type="button"
      aria-label={resolvedAriaLabel}
      className={buildClassName([
        'storybook-icon-hover-effect',
        `storybook-icon-hover-effect--${normalizedType}`,
        `storybook-icon-hover-effect--${normalizedSize}`,
        `storybook-icon-hover-effect--${normalizedState}`,
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

IconHoverEffect.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.oneOf([...ICONS, 'Copy', 'Download', 'Eye', 'Pencil', 'Repeat']),
  iconComponent: PropTypes.elementType,
  size: PropTypes.oneOf([...SIZES, 'Small', 'Medium', 'Large']),
  state: PropTypes.oneOf([...STATES, 'Default', 'Hover']),
  type: PropTypes.oneOf([...TYPES, 'Default', 'Destructive', 'Delete']),
  onClick: PropTypes.func,
};
