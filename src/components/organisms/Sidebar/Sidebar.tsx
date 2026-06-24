// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CaretUpDown,
  CardsThree,
  Check,
  CopySimple,
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
  Scan,
  SignOut,
  UserPlus,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';
import { DropdownList } from '../../molecules/DropdownList';
import superfansAvatar from './assets/superfans-avatar.png';
import superfansLogo from './assets/superfans-logo.png';
import superfansMark from './assets/superfans-mark.png';
import sidebarPreviewQr from './assets/sidebar-preview-qr.png';

import './sidebar.css';

const SIDEBAR_TYPES = ['expanded', 'collapsed'];
const ITEM_STATES = ['default', 'hover', 'focused', 'disabled'];
const ICON_NAMES = [
  'billing',
  'camera',
  'cards-three',
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

const DEFAULT_STORE_OPTIONS = [
  { id: 'superfans', name: 'Superfans', code: '12023' },
  { id: 'stellar-goods', name: 'Stellar Goods', code: '24018' },
  { id: 'nova-outfitters', name: 'Nova Outfitters', code: '31842' },
  { id: 'orbit-studio', name: 'Orbit Studio', code: '45109' },
  { id: 'lumen-market', name: 'Lumen Market', code: '78631' },
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
  return parts.flat().filter(Boolean).join(' ');
}

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function getSidebarShellClassName({
  isCollapsed,
  className,
}) {
  return buildClassName([
    'storybook-sidebar relative box-border flex h-full min-h-0 w-full flex-col justify-between border-0 border-r border-solid border-neutral-100 bg-neutral-0 font-sans',
    isCollapsed && 'storybook-sidebar--collapsed',
    className,
  ]);
}

function getSidebarItemClassName({
  state,
  pressed,
  collapsed,
  className,
}) {
  const isDisabled = state === 'disabled';

  return buildClassName([
    'storybook-sidebar-item inline-flex cursor-pointer border-0 font-sans text-left transition-[background-color,color,box-shadow] duration-[160ms] ease-out focus-visible:outline-none focus-visible:shadow-focus-brand',
    collapsed
      ? 'size-9 shrink-0 items-center justify-center gap-0 rounded-2'
      : 'w-full items-center gap-2 rounded-2 p-2',
    pressed && !isDisabled && 'text-neutral-0 hover:bg-brand-700 hover:text-neutral-0 focus-visible:bg-brand-400 focus-visible:text-neutral-0 focus-visible:shadow-none',
    pressed && !isDisabled && (state === 'hover' ? 'bg-brand-700' : 'bg-brand-400'),
    pressed && isDisabled && 'cursor-not-allowed bg-brand-100 text-neutral-0',
    !pressed && !isDisabled && 'bg-transparent text-neutral-700 hover:bg-neutral-50 focus-visible:bg-neutral-0 focus-visible:shadow-focus-brand',
    !pressed && isDisabled && 'cursor-not-allowed bg-neutral-50 text-neutral-300',
    !pressed && state === 'hover' && 'bg-neutral-50',
    !pressed && state === 'focused' && 'bg-neutral-0 shadow-focus-brand',
    className,
  ]);
}

function getSidebarActionClassName(destructive = false) {
  return buildClassName([
    'storybook-sidebar-action inline-flex cursor-pointer items-center justify-center gap-1 rounded-2 border border-solid border-neutral-100 bg-neutral-0 px-2.5 py-2 text-neutral-600',
    'transition-[background-color,border-color,color] duration-[160ms] ease-out focus-visible:outline-none focus-visible:shadow-focus-brand',
    destructive
      ? 'storybook-sidebar-action--destructive hover:border-error-600 hover:bg-error-25 hover:text-error-600'
      : 'hover:border-neutral-100 hover:bg-neutral-25 hover:text-neutral-600',
  ]);
}

function getPreviewCopyClassName(isCopied) {
  return buildClassName([
    'storybook-sidebar-preview-popover__copy inline-flex w-full cursor-pointer items-center justify-center gap-1 rounded-2 border border-solid p-2 font-sans',
    'transition-[background-color,border-color,box-shadow] duration-[160ms] ease-out focus-visible:outline-none focus-visible:shadow-focus-brand',
    isCopied
      ? 'border-success-200 bg-success-50 text-success-600 hover:border-success-200 hover:bg-success-50 hover:text-success-600'
      : 'border-neutral-100 bg-neutral-0 text-neutral-600 hover:bg-neutral-25',
  ]);
}

function renderSidebarIcon(
  icon,
  className = 'storybook-sidebar-item__icon size-5 shrink-0',
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
    case 'cards-three':
      return <CardsThree {...iconProps} />;
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
  sidebarCollapsed = false,
  variant = 'mark',
}) {
  const imageSrc = variant === 'logo'
    ? superfansLogo
    : variant === 'avatar' ? superfansAvatar : superfansMark;

  return (
    <img
      alt={alt}
      className={buildClassName([
        'storybook-sidebar-brand-image block shrink-0 object-contain',
        variant === 'logo' && 'w-[151px]',
        variant === 'mark' && 'w-[26px]',
        variant === 'avatar' && 'storybook-sidebar-brand-image--avatar rounded-2',
        variant === 'avatar' && (sidebarCollapsed ? 'size-9' : 'size-[38px]'),
      ])}
      src={imageSrc}
    />
  );
}

SuperfansBrand.propTypes = {
  alt: PropTypes.string,
  sidebarCollapsed: PropTypes.bool,
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
      className={getSidebarItemClassName({
        state: normalizedState,
        pressed,
        collapsed: isCollapsed,
        className,
      })}
      onClick={isDisabled ? undefined : onClick}
    >
      {renderSidebarIcon(icon, buildClassName([
        'storybook-sidebar-item__icon size-5 shrink-0',
        icon === 'drag' && 'storybook-sidebar-item__icon--drag',
      ]), pressed ? 'fill' : 'regular')}
      {!isCollapsed && (
        <Text
          as="span"
          variant="text-sm"
          weight={pressed ? 'semibold' : 'medium'}
          color="currentColor"
          className="min-w-0 flex-[1_1_auto] overflow-hidden text-ellipsis whitespace-nowrap"
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
      className="flex w-full flex-col gap-2"
    >
      {!collapsed && (
        <Text
          as="h3"
          variant="text-xs"
          weight="medium"
          className="storybook-sidebar-section__title w-full uppercase text-neutral-600"
        >
          {title}
        </Text>
      )}
      <div className={buildClassName([
        'flex w-full flex-col',
        collapsed && 'items-center',
      ])}>
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
  storeOptions = DEFAULT_STORE_OPTIONS,
  storePlaceholder = 'Search a Store',
  className,
  onItemChange,
  onPreview,
  onLogout,
  onStoreChange,
}) {
  const normalizedType = normalizeValue(type, {
    Expanded: 'expanded',
    Collapsed: 'collapsed',
  });
  const isCollapsed = normalizedType === 'collapsed';
  const [selectedItemId, setSelectedItemId] = useState(activeItemId);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPreviewLinkCopied, setIsPreviewLinkCopied] = useState(false);
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(() => storeOptions[0]?.id);
  const storeButtonRef = useRef(null);
  const storeDropdownRef = useRef(null);
  const previewButtonRef = useRef(null);
  const previewPopoverRef = useRef(null);
  const selectedStore =
    storeOptions.find((store) => store.id === selectedStoreId) ?? storeOptions[0];

  const handleItemSelect = (item, itemId) => {
    setSelectedItemId(itemId);
    onItemChange?.(item, itemId);
  };

  const handleStoreSelect = (item) => {
    const nextStore = storeOptions.find((store) => store.id === item.value);

    if (!nextStore) {
      return;
    }

    setSelectedStoreId(nextStore.id);
    setIsStoreDropdownOpen(false);
    onStoreChange?.(nextStore);
  };

  const handlePreviewClick = () => {
    setIsPreviewOpen((currentValue) => !currentValue);
    onPreview?.();
  };

  const handlePreviewCopy = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href);
    } catch {
      // Visual confirmation should still work when clipboard access is unavailable.
    }

    setIsPreviewLinkCopied(true);
  };

  useEffect(() => {
    setSelectedItemId(activeItemId);
  }, [activeItemId]);

  useEffect(() => {
    if (!isPreviewOpen) {
      setIsPreviewLinkCopied(false);
    }
  }, [isPreviewOpen]);

  useEffect(() => {
    if (!isPreviewOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const target = event.target;

      if (
        previewPopoverRef.current?.contains(target)
        || previewButtonRef.current?.contains(target)
      ) {
        return;
      }

      setIsPreviewOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isPreviewOpen]);

  useEffect(() => {
    if (!isStoreDropdownOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const target = event.target;

      if (
        storeDropdownRef.current?.contains(target)
        || storeButtonRef.current?.contains(target)
      ) {
        return;
      }

      setIsStoreDropdownOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isStoreDropdownOpen]);

  return (
    <aside
      className={getSidebarShellClassName({
        isCollapsed,
        className,
      })}
    >
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex flex-col gap-4">
          <header className={buildClassName([
            'storybook-sidebar-brand-header flex h-[40px] items-center',
            isCollapsed ? 'justify-center p-0' : 'px-4',
          ])}>
            <div className="inline-flex h-full items-center">
              <SuperfansBrand
                alt={isCollapsed ? brandLabel : `${brandLabel} logo`}
                variant={isCollapsed ? 'mark' : 'logo'}
              />
            </div>
          </header>

          {!isCollapsed ? (
            <div className="px-4">
              <div className="relative">
                <button
                  ref={storeButtonRef}
                  type="button"
                  aria-expanded={isStoreDropdownOpen}
                  aria-controls="storybook-sidebar-store-dropdown"
                  className="storybook-sidebar-store box-border flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-2 border border-solid border-neutral-200 bg-neutral-0 px-[14px] py-2.5 focus-visible:outline-none focus-visible:shadow-focus-brand"
                  onClick={() => setIsStoreDropdownOpen((currentValue) => !currentValue)}
                >
                  <Text
                    as="span"
                    variant="text-sm"
                    weight="regular"
                    className={buildClassName([
                      'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap',
                      selectedStore ? 'text-neutral-700' : 'text-neutral-300',
                    ])}
                  >
                    {selectedStore?.name ?? storePlaceholder}
                  </Text>
                  <CaretUpDown
                    aria-hidden="true"
                    className="size-5 shrink-0 text-neutral-600"
                    size={20}
                    weight="regular"
                  />
                </button>

                {isStoreDropdownOpen && (
                  <div
                    ref={storeDropdownRef}
                    id="storybook-sidebar-store-dropdown"
                    className="storybook-sidebar-store-dropdown absolute inset-x-0 z-20"
                  >
                    <DropdownList
                      items={storeOptions.map((store) => ({
                        label: store.name,
                        value: store.id,
                      }))}
                      selectedValues={selectedStore ? [selectedStore.id] : []}
                      variant="check-right"
                      fullWidth
                      onItemSelect={handleStoreSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              type="button"
              aria-label="Switch store"
              className="storybook-sidebar-icon-button inline-flex cursor-pointer items-center justify-center self-center rounded-2 border border-solid border-neutral-100 bg-neutral-0 p-2 text-neutral-600 focus-visible:outline-none focus-visible:shadow-focus-brand"
            >
              {renderSidebarIcon('repeat', 'storybook-sidebar-icon-button__icon size-[18px] shrink-0')}
            </button>
          )}
        </div>

        <nav
          aria-label="Sidebar navigation"
          className={buildClassName([
            'flex flex-col gap-6',
            isCollapsed ? 'items-center px-3' : 'px-4',
          ])}
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

      <footer className={buildClassName([
        'flex flex-col gap-4',
        isCollapsed ? 'items-center justify-center px-3 pb-6' : 'px-4 pb-6',
      ])}>
        <div className="flex items-center gap-3">
          <SuperfansBrand
            alt=""
            sidebarCollapsed={isCollapsed}
            variant="avatar"
          />
          {!isCollapsed && (
            <div className="flex flex-col">
              <Text
                as="span"
                variant="text-sm"
                weight="bold"
                className="text-neutral-900"
              >
                {selectedStore?.name ?? avatarLabel}
              </Text>
              <Text
                as="span"
                variant="text-xs"
                weight="regular"
                className="storybook-sidebar-account__meta text-neutral-600"
              >
                {selectedStore?.code ?? avatarMeta}
              </Text>
            </div>
          )}
        </div>

        <span className="h-px w-full bg-neutral-100" />

        <div className={buildClassName([
          'flex items-center gap-3',
          isCollapsed ? 'justify-center' : 'justify-between',
        ])}>
          <button
            ref={previewButtonRef}
            type="button"
            aria-label={isCollapsed ? 'Preview' : undefined}
            aria-expanded={isPreviewOpen}
            aria-controls="storybook-sidebar-preview-popover"
            className={getSidebarActionClassName()}
            onClick={handlePreviewClick}
          >
            {renderSidebarIcon('camera', 'storybook-sidebar-action__icon size-[18px] shrink-0')}
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
              className={getSidebarActionClassName(true)}
              onClick={onLogout}
            >
              {renderSidebarIcon('sign-out', 'storybook-sidebar-action__icon size-[18px] shrink-0')}
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

      {isPreviewOpen && (
        <div
          ref={previewPopoverRef}
          id="storybook-sidebar-preview-popover"
          className="storybook-sidebar-preview-popover absolute bottom-[72px] left-4 z-10 box-border flex w-[189px] flex-col items-center justify-center gap-2 rounded-16 border border-solid border-neutral-100 bg-neutral-0 p-3 shadow-lg"
          role="dialog"
          aria-label="App preview QR code"
        >
          <div className="flex w-full items-center justify-center overflow-hidden rounded-2">
            <img
              alt="QR code for app preview"
              className="block size-[165px] object-cover opacity-70"
              src={sidebarPreviewQr}
            />
          </div>
          <div className="flex w-full items-center gap-1 text-neutral-600">
            <Scan
              aria-hidden="true"
              className="size-5 shrink-0"
              size={20}
              weight="regular"
            />
            <Text
              as="span"
              variant="text-xs"
              weight="medium"
              className="min-w-0 flex-[1_1_auto] text-neutral-600"
            >
              Scan QR to download the app to preview on mobile
            </Text>
          </div>
          <button
            type="button"
            className={getPreviewCopyClassName(isPreviewLinkCopied)}
            onClick={handlePreviewCopy}
          >
            {isPreviewLinkCopied ? (
              <Check
                aria-hidden="true"
                className="storybook-sidebar-preview-popover__copy-icon--check size-[18px] shrink-0"
                size={18}
                weight="bold"
              />
            ) : (
              <CopySimple
                aria-hidden="true"
                className="size-[18px] shrink-0"
                size={18}
                weight="regular"
              />
            )}
            <Text
              as="span"
              variant="text-xs"
              weight="semibold"
              color="currentColor"
            >
              {isPreviewLinkCopied ? 'Copied' : 'Copy link'}
            </Text>
          </button>
        </div>
      )}
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
  storeOptions: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  storePlaceholder: PropTypes.string,
  className: PropTypes.string,
  onItemChange: PropTypes.func,
  onPreview: PropTypes.func,
  onLogout: PropTypes.func,
  onStoreChange: PropTypes.func,
};
