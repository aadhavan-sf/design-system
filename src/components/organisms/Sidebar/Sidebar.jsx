import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CaretUpDown,
  CurrencyCircleDollar,
  DeviceMobileCamera,
  DeviceMobileSpeaker,
  DotsSixVertical,
  Gear,
  Lego,
  ListPlus,
  ListStar,
  PuzzlePiece,
  Repeat,
  SignOut,
  UserPlus,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';
import superfansAvatar from './assets/superfans-avatar.png';
import superfansLogo from './assets/superfans-logo.png';
import superfansMark from './assets/superfans-mark.png';

import './sidebar.css';

const SIDEBAR_TYPES = ['expanded', 'collapsed'];
const ITEM_STATES = ['default', 'hover', 'focused', 'disabled'];
const ICON_NAMES = [
  'billing',
  'camera',
  'device',
  'drag',
  'gear',
  'lego',
  'list-plus',
  'list-star',
  'puzzle',
  'repeat',
  'sign-out',
  'user-plus',
];

const DEFAULT_SECTIONS = [
  {
    title: 'Theme',
    items: [
      { id: 'active-theme', label: 'Active Theme', icon: 'list-star' },
      { id: 'theme-list', label: 'Theme List', icon: 'list-plus' },
    ],
  },
  {
    title: 'App',
    items: [
      { id: 'app-settings', label: 'App Settings', icon: 'gear' },
      { id: 'app-distribution', label: 'App Distribution', icon: 'device' },
    ],
  },
  {
    title: 'Extension',
    items: [
      { id: 'plugins', label: 'Plugins', icon: 'puzzle' },
      { id: 'custom-blocks', label: 'Custom Blocks', icon: 'lego' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { id: 'user-permission', label: 'User Permission', icon: 'user-plus' },
      { id: 'billing', label: 'Billing', icon: 'billing' },
    ],
  },
];

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function renderSidebarIcon(
  icon,
  className = 'storybook-sidebar-item__icon',
  weight = 'regular'
) {
  const iconProps = {
    'aria-hidden': true,
    className,
    size: 20,
    weight,
  };

  switch (icon) {
    case 'billing':
      return <CurrencyCircleDollar {...iconProps} />;
    case 'camera':
      return <DeviceMobileCamera {...iconProps} />;
    case 'device':
      return <DeviceMobileSpeaker {...iconProps} />;
    case 'gear':
      return <Gear {...iconProps} />;
    case 'lego':
      return <Lego {...iconProps} />;
    case 'list-plus':
      return <ListPlus {...iconProps} />;
    case 'list-star':
      return <ListStar {...iconProps} />;
    case 'puzzle':
      return <PuzzlePiece {...iconProps} />;
    case 'repeat':
      return <Repeat {...iconProps} />;
    case 'sign-out':
      return <SignOut {...iconProps} />;
    case 'user-plus':
      return <UserPlus {...iconProps} />;
    case 'drag':
    default:
      return (
        <DotsSixVertical
          {...iconProps}
          weight="bold"
        />
      );
  }
}

function SuperfansBrand({
  alt = '',
  compact = false,
  variant = 'mark',
}) {
  const imageSrc = variant === 'logo'
    ? superfansLogo
    : variant === 'avatar' ? superfansAvatar : superfansMark;

  return (
    <img
      alt={alt}
      className={buildClassName([
        'storybook-sidebar-brand-image',
        `storybook-sidebar-brand-image--${variant}`,
        compact && 'storybook-sidebar-logo-mark--compact',
      ])}
      src={imageSrc}
    />
  );
}

SuperfansBrand.propTypes = {
  alt: PropTypes.string,
  compact: PropTypes.bool,
  variant: PropTypes.oneOf(['avatar', 'logo', 'mark']),
};

export function SidebarItem({
  label = 'Custom Blocks #1',
  icon = 'drag',
  pressed = false,
  state = 'default',
  type = 'expanded',
  className,
  onClick,
}) {
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    Hover: 'hover',
    Focused: 'focused',
    Disabled: 'disabled',
  });
  const normalizedType = normalizeValue(type, {
    Expanded: 'expanded',
    Collapsed: 'collapsed',
  });
  const isCollapsed = normalizedType === 'collapsed';
  const isDisabled = normalizedState === 'disabled';

  return (
    <button
      type="button"
      aria-current={pressed ? 'page' : undefined}
      aria-label={isCollapsed ? label : undefined}
      disabled={isDisabled}
      className={buildClassName([
        'storybook-sidebar-item',
        `storybook-sidebar-item--${normalizedType}`,
        `storybook-sidebar-item--${normalizedState}`,
        pressed && 'storybook-sidebar-item--pressed',
        className,
      ])}
      onClick={isDisabled ? undefined : onClick}
    >
      {renderSidebarIcon(icon)}
      {!isCollapsed && (
        <Text
          as="span"
          variant="text-sm"
          weight={pressed ? 'semibold' : 'medium'}
          color="currentColor"
          className="storybook-sidebar-item__label"
        >
          {label}
        </Text>
      )}
    </button>
  );
}

SidebarItem.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.oneOf(ICON_NAMES),
  pressed: PropTypes.bool,
  state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  type: PropTypes.oneOf([...SIDEBAR_TYPES, 'Expanded', 'Collapsed']),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

function SidebarSection({
  activeItemId,
  collapsed,
  items,
  onItemSelect,
  title,
}) {
  return (
    <section
      aria-label={title}
      className="storybook-sidebar-section"
    >
      {!collapsed && (
        <Text
          as="h3"
          variant="text-xs"
          weight="medium"
          color="var(--neutral_600)"
          className="storybook-sidebar-section__title"
        >
          {title}
        </Text>
      )}
      <div className="storybook-sidebar-section__items">
        {items.map((item) => {
          const itemId = item.id ?? item.label;
          const isActive = itemId === activeItemId;

          return (
            <SidebarItem
              key={itemId}
              icon={item.icon}
              label={item.label}
              pressed={isActive}
              state={item.disabled ? 'disabled' : item.state ?? 'default'}
              type={collapsed ? 'collapsed' : 'expanded'}
              onClick={() => onItemSelect?.(item, itemId)}
            />
          );
        })}
      </div>
    </section>
  );
}

SidebarSection.propTypes = {
  activeItemId: PropTypes.string,
  collapsed: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    icon: PropTypes.oneOf(ICON_NAMES),
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  })).isRequired,
  onItemSelect: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export function Sidebar({
  type = 'expanded',
  activeItemId = 'active-theme',
  avatarLabel = 'Superfans',
  avatarMeta = '12023',
  brandLabel = 'superfans',
  sections = DEFAULT_SECTIONS,
  storePlaceholder = 'Search a Store',
  className,
  onItemChange,
  onPreview,
  onLogout,
}) {
  const normalizedType = normalizeValue(type, {
    Expanded: 'expanded',
    Collapsed: 'collapsed',
  });
  const isCollapsed = normalizedType === 'collapsed';
  const [selectedItemId, setSelectedItemId] = useState(activeItemId);

  const handleItemSelect = (item, itemId) => {
    setSelectedItemId(itemId);
    onItemChange?.(item, itemId);
  };

  return (
    <aside
      className={buildClassName([
        'storybook-sidebar',
        `storybook-sidebar--${normalizedType}`,
        className,
      ])}
    >
      <div className="storybook-sidebar__main">
        <header className="storybook-sidebar__header">
          <div className="storybook-sidebar-logo">
            <SuperfansBrand
              alt={isCollapsed ? brandLabel : `${brandLabel} logo`}
              compact={isCollapsed}
              variant={isCollapsed ? 'mark' : 'logo'}
            />
          </div>
        </header>

        {!isCollapsed ? (
          <button
            type="button"
            className="storybook-sidebar-store"
          >
            <Text
              as="span"
              variant="text-sm"
              weight="regular"
              color="var(--neutral_300)"
              className="storybook-sidebar-store__label"
            >
              {storePlaceholder}
            </Text>
            <CaretUpDown
              aria-hidden="true"
              className="storybook-sidebar-store__icon"
              size={20}
              weight="regular"
            />
          </button>
        ) : (
          <button
            type="button"
            aria-label="Switch store"
            className="storybook-sidebar-icon-button storybook-sidebar-icon-button--header"
          >
            {renderSidebarIcon('repeat', 'storybook-sidebar-icon-button__icon')}
          </button>
        )}

        <nav
          aria-label="Sidebar navigation"
          className="storybook-sidebar__nav"
        >
          {sections.map((section) => (
            <SidebarSection
              key={section.title}
              activeItemId={selectedItemId}
              collapsed={isCollapsed}
              items={section.items}
              title={section.title}
              onItemSelect={handleItemSelect}
            />
          ))}
        </nav>
      </div>

      <footer className="storybook-sidebar__footer">
        <div className="storybook-sidebar-account">
          <SuperfansBrand
            alt=""
            compact
            variant="avatar"
          />
          {!isCollapsed && (
            <div className="storybook-sidebar-account__copy">
              <Text
                as="span"
                variant="text-sm"
                weight="bold"
                color="var(--neutral_900)"
              >
                {avatarLabel}
              </Text>
              <Text
                as="span"
                variant="text-xs"
                weight="regular"
                color="var(--neutral_600)"
                className="storybook-sidebar-account__meta"
              >
                {avatarMeta}
              </Text>
            </div>
          )}
        </div>

        <span className="storybook-sidebar__divider" />

        <div className="storybook-sidebar-actions">
          <button
            type="button"
            aria-label={isCollapsed ? 'Preview' : undefined}
            className="storybook-sidebar-action"
            onClick={onPreview}
          >
            {renderSidebarIcon('camera', 'storybook-sidebar-action__icon')}
            {!isCollapsed && (
              <Text
                as="span"
                variant="text-xs"
                weight="semibold"
                color="currentColor"
              >
                Preview
              </Text>
            )}
          </button>

          {!isCollapsed && (
            <button
              type="button"
              className="storybook-sidebar-action"
              onClick={onLogout}
            >
              {renderSidebarIcon('sign-out', 'storybook-sidebar-action__icon')}
              <Text
                as="span"
                variant="text-xs"
                weight="semibold"
                color="currentColor"
              >
                Logout
              </Text>
            </button>
          )}
        </div>
      </footer>
    </aside>
  );
}

const sectionShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    icon: PropTypes.oneOf(ICON_NAMES),
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  })).isRequired,
});

Sidebar.propTypes = {
  type: PropTypes.oneOf([...SIDEBAR_TYPES, 'Expanded', 'Collapsed']),
  activeItemId: PropTypes.string,
  avatarLabel: PropTypes.string,
  avatarMeta: PropTypes.string,
  brandLabel: PropTypes.string,
  sections: PropTypes.arrayOf(sectionShape),
  storePlaceholder: PropTypes.string,
  className: PropTypes.string,
  onItemChange: PropTypes.func,
  onPreview: PropTypes.func,
  onLogout: PropTypes.func,
};
