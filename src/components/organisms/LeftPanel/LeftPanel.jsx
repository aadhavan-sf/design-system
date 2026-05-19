import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CaretLeft,
  DotsSixVertical,
  Eye,
  EyeSlash,
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
  hidden = false,
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
  const hasActions = showActions ?? !locked;
  const forceShowActions = showActions === true;
  const LeadingIcon = locked ? LockSimple : DotsSixVertical;
  const VisibilityIcon = hidden ? EyeSlash : Eye;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={buildClassName([
        'storybook-left-panel-item',
        `storybook-left-panel-item--${resolvedState}`,
        pressed && 'storybook-left-panel-item--pressed',
        hidden && 'storybook-left-panel-item--hidden',
        forceShowActions && 'storybook-left-panel-item--actions-visible',
        className,
      ])}
      onClick={isDisabled ? undefined : onClick}
    >
      <span className="storybook-left-panel-item__main">
        <LeadingIcon
          aria-hidden="true"
          className="storybook-left-panel-item__leading-icon"
          size={20}
          weight={locked ? 'regular' : 'bold'}
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
            aria-label={hidden ? 'Show block' : 'Hide block'}
            className="storybook-left-panel-item__action storybook-left-panel-item__action--visibility"
            role="button"
            tabIndex={isDisabled ? -1 : 0}
            onClick={(event) => {
              event.stopPropagation();
              if (!isDisabled) {
                onVisibilityClick?.();
              }
            }}
          >
            <VisibilityIcon size={20} weight="regular" />
          </span>
          <span
            aria-label="Delete block"
            className="storybook-left-panel-item__action storybook-left-panel-item__action--delete"
            role="button"
            tabIndex={isDisabled ? -1 : 0}
            onClick={(event) => {
              event.stopPropagation();
              if (!isDisabled) {
                onDelete?.();
              }
            }}
          >
            <Trash size={20} weight="regular" />
          </span>
        </span>
      )}
    </button>
  );
}

LeftPanelItem.propTypes = {
  hidden: PropTypes.bool,
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

function LeftPanelInsertControl({
  label = 'Add block here',
  onClick,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="storybook-left-panel-insert"
      onClick={onClick}
    >
      <span className="storybook-left-panel-insert__line" />
      <Plus
        aria-hidden="true"
        className="storybook-left-panel-insert__icon"
        size={10}
        weight="regular"
      />
      <span className="storybook-left-panel-insert__line" />
    </button>
  );
}

LeftPanelInsertControl.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
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
  hiddenItemIds = [],
  items,
  selectedItemId,
  title,
  onDeleteItem,
  onHideItem,
  onInsertBlock,
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
        {items.map((item, index) => {
          const itemId = item.id ?? item.label;
          const isSelected = itemId === selectedItemId;
          const isHidden = hiddenItemIds.includes(itemId);

          return (
            <div
              key={itemId}
              className="storybook-left-panel-section__item-group"
            >
              <LeftPanelItem
                hidden={isHidden}
                label={item.label}
                locked={item.locked}
                pressed={isSelected}
                state={item.state ?? 'default'}
                onDelete={() => onDeleteItem?.(item, itemId)}
                onVisibilityClick={() => onHideItem?.(item, itemId)}
                onClick={() => onItemSelect?.(item, itemId)}
              />
              {index < items.length - 1 && (
                <LeftPanelInsertControl
                  onClick={() => onInsertBlock?.({
                    afterItem: item,
                    afterItemId: itemId,
                    index,
                  })}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

BlockSection.propTypes = {
  hiddenItemIds: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    locked: PropTypes.bool,
    state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  })).isRequired,
  selectedItemId: PropTypes.string,
  title: PropTypes.string.isRequired,
  onDeleteItem: PropTypes.func,
  onHideItem: PropTypes.func,
  onInsertBlock: PropTypes.func,
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
  onInsertBlock,
  onItemChange,
}) {
  const resolvedType = getResolvedType(type);
  const isThemeSettings = resolvedType === 'theme-settings';
  const resolvedPageTitle = pageTitle ?? (isThemeSettings ? 'Theme Settings' : 'Home');
  const initialSelectedItem = selectedItemId ?? (
    isThemeSettings ? 'app-styling' : 'custom-blocks-1'
  );
  const [internalSelectedItemId, setInternalSelectedItemId] = useState(initialSelectedItem);
  const [deletedItemIds, setDeletedItemIds] = useState([]);
  const [hiddenItemIds, setHiddenItemIds] = useState([]);
  const visibleFixedItems = fixedItems.filter((item) => !deletedItemIds.includes(item.id ?? item.label));
  const visibleScrollItems = scrollItems.filter((item) => !deletedItemIds.includes(item.id ?? item.label));

  const handleItemSelect = (item, itemId) => {
    setInternalSelectedItemId(itemId);
    onItemChange?.(item, itemId);
  };

  const handleDeleteItem = (item, itemId) => {
    // Storybook docs behavior: deletion is session-local, so refreshing the page restores demo items.
    setDeletedItemIds((currentIds) => (
      currentIds.includes(itemId) ? currentIds : [...currentIds, itemId]
    ));

    setHiddenItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));

    if (internalSelectedItemId === itemId) {
      setInternalSelectedItemId(undefined);
    }

    onItemChange?.({ ...item, deleted: true }, itemId);
  };

  const handleHideItem = (item, itemId) => {
    setHiddenItemIds((currentIds) => (
      currentIds.includes(itemId)
        ? currentIds.filter((currentId) => currentId !== itemId)
        : [...currentIds, itemId]
    ));

    onItemChange?.({ ...item, hidden: !hiddenItemIds.includes(itemId) }, itemId);
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
                    hiddenItemIds={hiddenItemIds}
                    items={visibleFixedItems}
                    selectedItemId={internalSelectedItemId}
                    title="Fixed"
                    onDeleteItem={handleDeleteItem}
                    onHideItem={handleHideItem}
                    onInsertBlock={onInsertBlock}
                    onItemSelect={handleItemSelect}
                  />
                  <div className="storybook-left-panel__divider" />
                </>
              )}
              <BlockSection
                hiddenItemIds={hiddenItemIds}
                items={visibleScrollItems}
                selectedItemId={internalSelectedItemId}
                title="Scrolls"
                onDeleteItem={handleDeleteItem}
                onHideItem={handleHideItem}
                onInsertBlock={onInsertBlock}
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
  onInsertBlock: PropTypes.func,
  onItemChange: PropTypes.func,
};
