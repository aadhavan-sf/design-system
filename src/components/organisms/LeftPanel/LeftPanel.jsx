import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CaretLeft,
  DotsSixVertical,
  Eye,
  LockSimple,
  PencilSimple,
  Plus,
  Trash,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './leftPanel.css';

const PANEL_TYPES = ['blocks', 'fixed-blocks', 'theme-settings'];
const ITEM_STATES = ['default', 'hover', 'focused', 'disabled'];
const STATUS_OPTIONS = ['draft', 'active'];

const DEFAULT_BLOCK_ITEMS = [
  { id: 'image-banner', label: 'Imager Banner' },
  { id: 'content-block', label: 'Content Block' },
  { id: 'product-carousel', label: 'Product Carousel' },
  { id: 'custom-blocks-1', label: 'Custom Blocks #1' },
  { id: 'image-slider', label: 'Image Slider' },
  { id: 'content-block-2', label: 'Content Block' },
];

const DEFAULT_FIXED_ITEMS = [
  { id: 'toolbar', label: 'Toolbar', locked: true },
];

const DEFAULT_THEME_SECTIONS = [
  {
    title: 'Styling',
    items: [
      { id: 'app-styling', label: 'App Styling' },
      { id: 'empty-state-images', label: 'Empty State Images' },
      { id: 'product-block', label: 'Product Block' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { id: 'top-navigation', label: 'Top Navigation' },
      { id: 'side-menu', label: 'Side Menu' },
      { id: 'bottombar', label: 'Bottombar' },
    ],
  },
  {
    title: 'Others',
    items: [
      { id: 'translations', label: 'Translations' },
    ],
  },
];

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function getResolvedType(type) {
  return normalizeValue(type, {
    Blocks: 'blocks',
    'Left Panel': 'blocks',
    'Fixed Blocks': 'fixed-blocks',
    'Left Panel + Fixed Item': 'fixed-blocks',
    'Theme Settings': 'theme-settings',
    themeSettings: 'theme-settings',
    fixedBlocks: 'fixed-blocks',
  });
}

function getResolvedStatus(status) {
  return normalizeValue(status, {
    Draft: 'draft',
    Active: 'active',
  });
}

function getResolvedState(state) {
  return normalizeValue(state, {
    Default: 'default',
    Hover: 'hover',
    Focused: 'focused',
    Disabled: 'disabled',
  });
}

export function ThemeStatus({
  status = 'draft',
  className,
}) {
  const resolvedStatus = getResolvedStatus(status);
  const isActive = resolvedStatus === 'active';

  return (
    <span
      className={buildClassName([
        'storybook-left-panel-status',
        `storybook-left-panel-status--${resolvedStatus}`,
        className,
      ])}
    >
      <Text
        as="span"
        variant="text-xs"
        weight="medium"
        color="currentColor"
        className="storybook-left-panel-status__label"
      >
        {isActive ? 'Active' : 'Draft'}
      </Text>
    </span>
  );
}

ThemeStatus.propTypes = {
  status: PropTypes.oneOf([...STATUS_OPTIONS, 'Draft', 'Active']),
  className: PropTypes.string,
};

export function LeftPanelItem({
  label = 'Imager Banner',
  locked = false,
  pressed = false,
  showActions,
  state = 'default',
  className,
  onClick,
  onDelete,
  onVisibilityClick,
}) {
  const resolvedState = getResolvedState(state);
  const isDisabled = resolvedState === 'disabled';
  const hasActions = showActions ?? (pressed || resolvedState === 'hover');
  const LeadingIcon = locked ? LockSimple : DotsSixVertical;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={buildClassName([
        'storybook-left-panel-item',
        `storybook-left-panel-item--${resolvedState}`,
        pressed && 'storybook-left-panel-item--pressed',
        className,
      ])}
      onClick={isDisabled ? undefined : onClick}
    >
      <span className="storybook-left-panel-item__main">
        <LeadingIcon
          aria-hidden="true"
          className="storybook-left-panel-item__leading-icon"
          size={16}
          weight="regular"
        />
        <Text
          as="span"
          variant="text-sm"
          weight={pressed ? 'semibold' : 'medium'}
          color="currentColor"
          className="storybook-left-panel-item__label"
        >
          {label}
        </Text>
      </span>
      {hasActions && (
        <span className="storybook-left-panel-item__actions">
          <span
            aria-hidden="true"
            className="storybook-left-panel-item__action"
            onClick={(event) => {
              event.stopPropagation();
              onVisibilityClick?.();
            }}
          >
            <Eye size={16} weight="regular" />
          </span>
          <span
            aria-hidden="true"
            className="storybook-left-panel-item__action"
            onClick={(event) => {
              event.stopPropagation();
              onDelete?.();
            }}
          >
            <Trash size={16} weight="regular" />
          </span>
        </span>
      )}
    </button>
  );
}

LeftPanelItem.propTypes = {
  label: PropTypes.string,
  locked: PropTypes.bool,
  pressed: PropTypes.bool,
  showActions: PropTypes.bool,
  state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onVisibilityClick: PropTypes.func,
};

function LeftPanelMenuItem({
  label,
  pressed,
  state = 'default',
  onClick,
}) {
  const resolvedState = getResolvedState(state);
  const isDisabled = resolvedState === 'disabled';

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={buildClassName([
        'storybook-left-panel-menu-item',
        `storybook-left-panel-menu-item--${resolvedState}`,
        pressed && 'storybook-left-panel-menu-item--pressed',
      ])}
      onClick={isDisabled ? undefined : onClick}
    >
      <Text
        as="span"
        variant="text-md"
        weight={pressed ? 'semibold' : 'medium'}
        color="currentColor"
        className="storybook-left-panel-menu-item__label"
      >
        {label}
      </Text>
    </button>
  );
}

LeftPanelMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  pressed: PropTypes.bool,
  state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  onClick: PropTypes.func,
};

function PanelHeader({
  title,
  status,
  onBack,
}) {
  return (
    <header className="storybook-left-panel__header">
      <div className="storybook-left-panel__title-row">
        <button
          type="button"
          aria-label="Go back"
          className="storybook-left-panel__back"
          onClick={onBack}
        >
          <CaretLeft size={20} weight="regular" />
        </button>
        <Text
          as="h2"
          variant="text-md"
          weight="semibold"
          color="var(--neutral_900)"
          className="storybook-left-panel__title"
        >
          {title}
        </Text>
      </div>
      <ThemeStatus status={status} />
    </header>
  );
}

PanelHeader.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.oneOf([...STATUS_OPTIONS, 'Draft', 'Active']),
  onBack: PropTypes.func,
};

function AddBlockButton({ onClick }) {
  return (
    <button
      type="button"
      className="storybook-left-panel-add"
      onClick={onClick}
    >
      <Plus
        aria-hidden="true"
        className="storybook-left-panel-add__icon"
        size={20}
        weight="regular"
      />
      <Text
        as="span"
        variant="text-sm"
        weight="semibold"
        color="currentColor"
      >
        Add Block
      </Text>
    </button>
  );
}

AddBlockButton.propTypes = {
  onClick: PropTypes.func,
};

function FooterAction({ label, onClick }) {
  return (
    <footer className="storybook-left-panel-footer">
      <span className="storybook-left-panel-footer__divider" />
      <button
        type="button"
        className="storybook-left-panel-footer__button"
        onClick={onClick}
      >
        <PencilSimple
          aria-hidden="true"
          size={20}
          weight="regular"
        />
        <Text
          as="span"
          variant="text-sm"
          weight="semibold"
          color="currentColor"
        >
          {label}
        </Text>
      </button>
    </footer>
  );
}

FooterAction.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

function BlockSection({
  items,
  selectedItemId,
  title,
  onItemSelect,
}) {
  return (
    <section className="storybook-left-panel-section">
      <Text
        as="h3"
        variant="text-xs"
        weight="regular"
        color="var(--neutral_700)"
        className="storybook-left-panel-section__title"
      >
        {title}
      </Text>
      <div className="storybook-left-panel-section__items">
        {items.map((item) => {
          const itemId = item.id ?? item.label;
          const isSelected = itemId === selectedItemId;

          return (
            <LeftPanelItem
              key={itemId}
              label={item.label}
              locked={item.locked}
              pressed={isSelected}
              state={item.state ?? 'default'}
              onClick={() => onItemSelect?.(item, itemId)}
            />
          );
        })}
      </div>
    </section>
  );
}

BlockSection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    locked: PropTypes.bool,
    state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  })).isRequired,
  selectedItemId: PropTypes.string,
  title: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
};

function ThemeSettingsContent({
  sections,
  selectedItemId,
  onItemSelect,
}) {
  return (
    <div className="storybook-left-panel-theme">
      {sections.map((section) => (
        <section
          key={section.title}
          className="storybook-left-panel-section"
        >
          <Text
            as="h3"
            variant="text-xs"
            weight="regular"
            color="var(--neutral_700)"
            className="storybook-left-panel-section__title"
          >
            {section.title}
          </Text>
          <div className="storybook-left-panel-theme__items">
            {section.items.map((item) => {
              const itemId = item.id ?? item.label;

              return (
                <LeftPanelMenuItem
                  key={itemId}
                  label={item.label}
                  pressed={itemId === selectedItemId}
                  state={item.state ?? 'default'}
                  onClick={() => onItemSelect?.(item, itemId)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

ThemeSettingsContent.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
    })).isRequired,
  })).isRequired,
  selectedItemId: PropTypes.string,
  onItemSelect: PropTypes.func,
};

export function LeftPanel({
  type = 'blocks',
  title = 'Version 1',
  pageTitle,
  status = 'draft',
  selectedItemId,
  fixedItems = DEFAULT_FIXED_ITEMS,
  scrollItems = DEFAULT_BLOCK_ITEMS,
  themeSections = DEFAULT_THEME_SECTIONS,
  footerLabel = 'Edit Search Page',
  className,
  onAddBlock,
  onBack,
  onFooterClick,
  onItemChange,
}) {
  const resolvedType = getResolvedType(type);
  const isThemeSettings = resolvedType === 'theme-settings';
  const resolvedPageTitle = pageTitle ?? (isThemeSettings ? 'Theme Settings' : 'Home');
  const initialSelectedItem = selectedItemId ?? (
    isThemeSettings ? 'app-styling' : 'custom-blocks-1'
  );
  const [internalSelectedItemId, setInternalSelectedItemId] = useState(initialSelectedItem);

  const handleItemSelect = (item, itemId) => {
    setInternalSelectedItemId(itemId);
    onItemChange?.(item, itemId);
  };

  return (
    <aside
      aria-label={resolvedPageTitle}
      className={buildClassName([
        'storybook-left-panel',
        `storybook-left-panel--${resolvedType}`,
        className,
      ])}
    >
      <div className="storybook-left-panel__body">
        <PanelHeader
          status={status}
          title={title}
          onBack={onBack}
        />

        <div className="storybook-left-panel__divider" />

        <main className="storybook-left-panel__content">
          <div className="storybook-left-panel__page-heading">
            <Text
              as="h2"
              variant="text-md"
              weight="semibold"
              color="var(--neutral_900)"
              className="storybook-left-panel__page-title"
            >
              {resolvedPageTitle}
            </Text>
            {!isThemeSettings && <AddBlockButton onClick={onAddBlock} />}
          </div>

          {isThemeSettings ? (
            <ThemeSettingsContent
              sections={themeSections}
              selectedItemId={internalSelectedItemId}
              onItemSelect={handleItemSelect}
            />
          ) : (
            <div className="storybook-left-panel__block-sections">
              {resolvedType === 'fixed-blocks' && (
                <>
                  <BlockSection
                    items={fixedItems}
                    selectedItemId={internalSelectedItemId}
                    title="Fixed"
                    onItemSelect={handleItemSelect}
                  />
                  <div className="storybook-left-panel__divider" />
                </>
              )}
              <BlockSection
                items={scrollItems}
                selectedItemId={internalSelectedItemId}
                title="Scrolls"
                onItemSelect={handleItemSelect}
              />
            </div>
          )}
        </main>
      </div>

      {!isThemeSettings && (
        <FooterAction
          label={footerLabel}
          onClick={onFooterClick}
        />
      )}
    </aside>
  );
}

const blockItemShape = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  locked: PropTypes.bool,
  state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
});

LeftPanel.propTypes = {
  type: PropTypes.oneOf([
    ...PANEL_TYPES,
    'Blocks',
    'Left Panel',
    'Fixed Blocks',
    'Left Panel + Fixed Item',
    'Theme Settings',
    'themeSettings',
    'fixedBlocks',
  ]),
  title: PropTypes.string,
  pageTitle: PropTypes.string,
  status: PropTypes.oneOf([...STATUS_OPTIONS, 'Draft', 'Active']),
  selectedItemId: PropTypes.string,
  fixedItems: PropTypes.arrayOf(blockItemShape),
  scrollItems: PropTypes.arrayOf(blockItemShape),
  themeSections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(blockItemShape).isRequired,
  })),
  footerLabel: PropTypes.string,
  className: PropTypes.string,
  onAddBlock: PropTypes.func,
  onBack: PropTypes.func,
  onFooterClick: PropTypes.func,
  onItemChange: PropTypes.func,
};
