// @ts-nocheck
import {
  useEffect,
  useRef,
  useState,
} from 'react';
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
  return parts.flat().filter(Boolean).join(' ');
}

function getLeftPanelItemClassName({
  state,
  pressed,
  hidden,
  deleting,
  dragging,
  forceShowActions,
  className,
}) {
  const isDisabled = state === 'disabled';
  const isHover = state === 'hover';
  const isFocused = state === 'focused';

  return buildClassName([
    'storybook-left-panel-item relative box-border flex h-11 w-full cursor-pointer items-center justify-center rounded-2 border border-solid px-2 py-3 text-left font-sans transition-[background-color,border-color,color,box-shadow,opacity,transform] duration-[160ms] ease-out focus-visible:outline-none focus-visible:shadow-focus-brand',
    !pressed && !hidden && !dragging && 'border-transparent',
    !pressed && !hidden && !isDisabled && !dragging && 'bg-transparent text-neutral-700 hover:bg-neutral-25 hover:text-neutral-700',
    !pressed && !hidden && isHover && 'bg-neutral-25 text-neutral-700',
    !pressed && !hidden && isFocused && 'border-transparent bg-neutral-0 text-neutral-700 shadow-focus-brand',
    pressed && !hidden && !isDisabled && !dragging && 'border-brand-400 bg-brand-25 text-brand-400',
    pressed && !hidden && !isDisabled && !dragging && !isFocused && 'hover:border-brand-400 hover:bg-brand-25 hover:text-brand-400',
    pressed && !hidden && !isDisabled && isHover && 'border-brand-400 bg-brand-25 text-brand-400',
    pressed && !hidden && !isDisabled && isFocused && 'border-brand-400 bg-brand-25 text-brand-400 shadow-focus-brand',
    hidden && 'border-transparent bg-transparent text-neutral-700 hover:border-transparent hover:bg-neutral-25 hover:text-neutral-700',
    dragging && 'pointer-events-none border-brand-400 bg-brand-25 text-brand-400 shadow-lg',
    isDisabled && !pressed && 'cursor-not-allowed border-transparent bg-neutral-50 text-neutral-300',
    pressed && isDisabled && 'cursor-not-allowed border-brand-200 bg-brand-25 text-brand-200',
    isHover && 'storybook-left-panel-item--hover',
    isFocused && 'storybook-left-panel-item--focused',
    pressed && 'storybook-left-panel-item--pressed',
    hidden && 'storybook-left-panel-item--hidden',
    deleting && 'storybook-left-panel-item--deleting',
    dragging && 'storybook-left-panel-item--dragging',
    forceShowActions && 'storybook-left-panel-item--actions-visible',
    isDisabled && 'storybook-left-panel-item--disabled',
    className,
  ]);
}

function getLeftPanelMenuItemClassName({
  state,
  pressed,
}) {
  const isDisabled = state === 'disabled';

  return buildClassName([
    'storybook-left-panel-menu-item box-border flex w-full cursor-pointer items-center gap-2 rounded-2 border border-solid p-3 text-left font-sans transition-[background-color,border-color,color,box-shadow] duration-[160ms] ease-out focus-visible:outline-none focus-visible:shadow-focus-brand',
    pressed && !isDisabled && 'border-brand-400 bg-brand-25 text-brand-400',
    pressed && !isDisabled && state === 'hover' && 'bg-brand-25',
    pressed && !isDisabled && state === 'focused' && 'border-brand-400 bg-brand-25 shadow-focus-brand',
    !pressed && !isDisabled && 'border-neutral-100 bg-neutral-0 text-neutral-600 hover:bg-neutral-50',
    !pressed && state === 'hover' && 'bg-neutral-50',
    !pressed && state === 'focused' && 'border-neutral-100 bg-neutral-0 shadow-focus-brand',
    isDisabled && 'cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-300',
    pressed && isDisabled && 'border-brand-200 bg-brand-25 text-brand-200',
    state === 'hover' && 'storybook-left-panel-menu-item--hover',
    state === 'focused' && 'storybook-left-panel-menu-item--focused',
    pressed && 'storybook-left-panel-menu-item--pressed',
    isDisabled && 'storybook-left-panel-menu-item--disabled',
  ]);
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
        'inline-flex shrink-0 items-center justify-center rounded-2 border border-solid px-2 py-1',
        isActive
          ? 'border-success-200 bg-success-25 text-success-600'
          : 'border-neutral-200 bg-neutral-25 text-neutral-600',
        className,
      ])}
    >
      <Text
        as="span"
        variant="text-xs"
        weight="medium"
        color="currentColor"
        className="overflow-hidden text-ellipsis whitespace-nowrap"
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
  deleting = false,
  dragOffsetY = 0,
  dragging = false,
  hidden = false,
  label = 'Imager Banner',
  locked = false,
  pressed = false,
  showActions,
  state = 'default',
  suppressHiddenTrash = false,
  visibilityAnimating = false,
  visibilityAnimationDirection = 'hide',
  className,
  onClick,
  onDelete,
  onDragHandlePointerDown,
  onPointerLeave,
  onVisibilityClick,
}) {
  const [isRowHovered, setIsRowHovered] = useState(false);
  const resolvedState = getResolvedState(state);
  const isDisabled = resolvedState === 'disabled';
  const isStorybookHover = resolvedState === 'hover';
  const isInteractionHovered = isRowHovered || isStorybookHover;
  const showHiddenTrash = hidden && isInteractionHovered && !suppressHiddenTrash;
  const hasActions = showActions ?? !locked;
  const forceShowActions = showActions === true;
  const LeadingIcon = locked ? LockSimple : DotsSixVertical;
  const isRestoringVisibility =
    visibilityAnimating && visibilityAnimationDirection === 'show';
  const VisibilityIcon = hidden && !isRestoringVisibility ? EyeSlash : Eye;
  const isInactive = !isDisabled && !dragging && (!pressed || hidden);

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={getLeftPanelItemClassName({
        state: resolvedState,
        pressed,
        hidden,
        deleting,
        dragging,
        forceShowActions,
        className,
      })}
      style={dragging ? { '--left-panel-drag-offset': `${dragOffsetY}px` } : undefined}
      onClick={isDisabled ? undefined : onClick}
      onPointerEnter={() => setIsRowHovered(true)}
      onPointerLeave={() => {
        setIsRowHovered(false);
        onPointerLeave?.();
      }}
    >
      <span className={buildClassName([
        'storybook-left-panel-item__main flex min-w-0 items-center gap-2',
        hidden && (showHiddenTrash
          ? 'storybook-left-panel-item__main--actions-expanded'
          : 'storybook-left-panel-item__main--actions-single'),
      ])}>
        <LeadingIcon
          aria-hidden="true"
          className={buildClassName([
            'storybook-left-panel-item__leading-icon size-5 shrink-0 transition-[color,transform] duration-[160ms] ease-out',
            isInactive && 'text-neutral-600',
            !isInactive && 'text-current',
          ])}
          data-drag-handle={!locked ? 'true' : undefined}
          size={20}
          weight={locked ? 'regular' : 'bold'}
          onPointerDown={locked || isDisabled ? undefined : onDragHandlePointerDown}
        />
        <Text
          as="span"
          variant="text-sm"
          weight={pressed && !hidden && !isDisabled ? 'semibold' : 'medium'}
          color="currentColor"
          className={buildClassName([
            'min-w-0 flex-[1_1_0] overflow-hidden text-ellipsis whitespace-nowrap',
            isInactive && 'text-neutral-700',
          ])}
        >
          {label}
        </Text>
      </span>
      {hasActions && (
        <span className={buildClassName([
          'storybook-left-panel-item__actions inline-flex items-center justify-end',
          !hidden && 'gap-3',
          hidden && (showHiddenTrash
            ? 'storybook-left-panel-item__actions--expanded'
            : 'storybook-left-panel-item__actions--single'),
          isInactive && 'text-neutral-600',
          !isInactive && 'text-current',
        ])}>
          <span
            aria-label={hidden ? 'Show block' : 'Hide block'}
            className={buildClassName([
              'storybook-left-panel-item__action storybook-left-panel-item__action--visibility relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-1',
              visibilityAnimating && 'storybook-left-panel-item__action--visibility-animating',
              visibilityAnimating &&
                visibilityAnimationDirection === 'show' &&
                'storybook-left-panel-item__action--visibility-restoring',
            ])}
            role="button"
            tabIndex={isDisabled ? -1 : 0}
            onClick={(event) => {
              event.stopPropagation();
              if (!isDisabled && !deleting && !visibilityAnimating) {
                onVisibilityClick?.();
                event.currentTarget.closest('button')?.blur();
              }
            }}
          >
            <VisibilityIcon size={20} weight="regular" />
          </span>
          <span
            aria-label="Delete block"
            className={buildClassName([
              'storybook-left-panel-item__action storybook-left-panel-item__action--delete relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-1',
              hidden && (showHiddenTrash
                ? 'storybook-left-panel-item__action--delete-visible'
                : 'storybook-left-panel-item__action--delete-collapsed'),
            ])}
            role="button"
            tabIndex={isDisabled ? -1 : 0}
            onClick={(event) => {
              event.stopPropagation();
              if (!isDisabled && !deleting) {
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
  deleting: PropTypes.bool,
  dragOffsetY: PropTypes.number,
  dragging: PropTypes.bool,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  locked: PropTypes.bool,
  pressed: PropTypes.bool,
  showActions: PropTypes.bool,
  state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  suppressHiddenTrash: PropTypes.bool,
  visibilityAnimating: PropTypes.bool,
  visibilityAnimationDirection: PropTypes.oneOf(['hide', 'show']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onDragHandlePointerDown: PropTypes.func,
  onPointerLeave: PropTypes.func,
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
      className="storybook-left-panel-insert flex w-full cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-brand-400 opacity-0 transition-[opacity,transform] duration-[160ms] ease-out"
      onClick={onClick}
    >
      <span className="h-0.5 flex-[1_1_0] bg-current" />
      <Plus
        aria-hidden="true"
        className="box-border size-4 shrink-0 rounded-full bg-brand-400 p-1 text-neutral-0"
        size={10}
        weight="regular"
      />
      <span className="h-0.5 flex-[1_1_0] bg-current" />
    </button>
  );
}

LeftPanelInsertControl.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export function LeftPanelMenuItem({
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
      className={getLeftPanelMenuItemClassName({
        state: resolvedState,
        pressed,
      })}
      onClick={isDisabled ? undefined : onClick}
    >
      <Text
        as="span"
        variant="text-md"
        weight={pressed ? 'semibold' : 'medium'}
        color="currentColor"
        className="min-w-0 flex-[1_1_0] overflow-hidden text-ellipsis whitespace-nowrap"
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
    <header className="flex w-full items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Go back"
          className="storybook-left-panel__back inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-2 border-0 bg-transparent p-0 text-neutral-900 focus-visible:outline-none focus-visible:shadow-focus-brand"
          onClick={onBack}
        >
          <CaretLeft size={20} weight="regular" />
        </button>
        <Text
          as="h2"
          variant="text-md"
          weight="semibold"
          className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-neutral-900"
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
      className="storybook-left-panel-add inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-2 border border-solid border-neutral-300 bg-neutral-0 px-3 py-2 text-neutral-700 focus-visible:outline-none focus-visible:shadow-focus-brand"
      onClick={onClick}
    >
      <Plus
        aria-hidden="true"
        className="size-5 shrink-0"
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
    <footer className="storybook-left-panel-footer shrink-0">
      <span className="storybook-left-panel-footer__divider h-px w-full bg-neutral-100" />
      <button
        type="button"
        className="storybook-left-panel-footer__button cursor-pointer rounded-2 border-0 bg-transparent px-3 py-2 text-neutral-700 focus-visible:outline-none focus-visible:shadow-focus-brand"
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
  activeDragItemId,
  activeDragOffsetY = 0,
  deletingItemIds = [],
  hiddenItemIds = [],
  hiddenTrashSuppressedItemIds = [],
  items,
  selectedItemId,
  title,
  getItemRef,
  visibilityAnimatingItemIds = [],
  visibilityRestoringItemIds = [],
  onDeleteItem,
  onDragStart,
  onHideItem,
  onInsertBlock,
  onItemPointerLeave,
  onItemSelect,
  setSectionRef,
}) {
  const sectionKey = title.toLowerCase();

  return (
    <section className="storybook-left-panel-section">
      <Text
        as="h3"
        variant="text-xs"
        weight="regular"
        className="storybook-left-panel-section__title w-full uppercase text-neutral-600"
      >
        {title}
      </Text>
      <div
        className="storybook-left-panel-section__items transition-transform duration-[180ms] ease-out"
        ref={(node) => setSectionRef?.(sectionKey, node)}
      >
        {items.map((item, index) => {
          const itemId = item.id ?? item.label;
          const isSelected = itemId === selectedItemId;
          const isHidden = hiddenItemIds.includes(itemId);
          const isDeleting = deletingItemIds.includes(itemId);
          const isDragging = activeDragItemId === itemId;
          const isVisibilityAnimating = visibilityAnimatingItemIds.includes(itemId);
          const isVisibilityRestoring = visibilityRestoringItemIds.includes(itemId);

          return (
            <div
              key={itemId}
              className="storybook-left-panel-section__item-group flex w-full flex-col transition-transform duration-[180ms] ease-out"
              ref={(node) => getItemRef?.(sectionKey, itemId, node)}
            >
              <LeftPanelItem
                deleting={isDeleting}
                dragOffsetY={isDragging ? activeDragOffsetY : 0}
                dragging={isDragging}
                hidden={isHidden}
                label={item.label}
                locked={item.locked}
                pressed={isSelected}
                state={item.state ?? 'default'}
                suppressHiddenTrash={hiddenTrashSuppressedItemIds.includes(itemId)}
                visibilityAnimating={isVisibilityAnimating}
                visibilityAnimationDirection={isVisibilityRestoring ? 'show' : 'hide'}
                onDelete={() => onDeleteItem?.(item, itemId)}
                onDragHandlePointerDown={(event) => onDragStart?.(event, {
                  item,
                  itemId,
                  sectionKey,
                })}
                onPointerLeave={() => onItemPointerLeave?.(itemId)}
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
  activeDragItemId: PropTypes.string,
  activeDragOffsetY: PropTypes.number,
  deletingItemIds: PropTypes.arrayOf(PropTypes.string),
  hiddenItemIds: PropTypes.arrayOf(PropTypes.string),
  hiddenTrashSuppressedItemIds: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    locked: PropTypes.bool,
    state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  })).isRequired,
  selectedItemId: PropTypes.string,
  title: PropTypes.string.isRequired,
  getItemRef: PropTypes.func,
  visibilityAnimatingItemIds: PropTypes.arrayOf(PropTypes.string),
  visibilityRestoringItemIds: PropTypes.arrayOf(PropTypes.string),
  onDeleteItem: PropTypes.func,
  onDragStart: PropTypes.func,
  onHideItem: PropTypes.func,
  onInsertBlock: PropTypes.func,
  onItemPointerLeave: PropTypes.func,
  onItemSelect: PropTypes.func,
  setSectionRef: PropTypes.func,
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
            className="storybook-left-panel-section__title w-full uppercase text-neutral-600"
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
  const [deletingItemIds, setDeletingItemIds] = useState([]);
  const [orderedFixedItems, setOrderedFixedItems] = useState(fixedItems);
  const [orderedScrollItems, setOrderedScrollItems] = useState(scrollItems);
  const [dragState, setDragState] = useState(null);
  const [hiddenItemIds, setHiddenItemIds] = useState([]);
  const [hiddenTrashSuppressedItemIds, setHiddenTrashSuppressedItemIds] = useState([]);
  const [visibilityAnimatingItemIds, setVisibilityAnimatingItemIds] = useState([]);
  const [visibilityRestoringItemIds, setVisibilityRestoringItemIds] = useState([]);
  const animationTimeoutsRef = useRef([]);
  const dragStateRef = useRef(null);
  const itemRefs = useRef({});
  const sectionRefs = useRef({});
  const visibleFixedItems = orderedFixedItems.filter((item) => !deletedItemIds.includes(item.id ?? item.label));
  const visibleScrollItems = orderedScrollItems.filter((item) => !deletedItemIds.includes(item.id ?? item.label));

  useEffect(() => () => {
    animationTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
  }, []);

  useEffect(() => {
    dragStateRef.current = dragState;
  }, [dragState]);

  useEffect(() => {
    if (!dragState) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const currentDragState = dragStateRef.current;

      if (!currentDragState) {
        return;
      }

      const nextOffset = Math.min(
        Math.max(event.clientY - currentDragState.startY, currentDragState.minOffset),
        currentDragState.maxOffset
      );

      setDragState((currentState) => (
        currentState ? { ...currentState, offsetY: nextOffset } : currentState
      ));

      const sectionItems = currentDragState.sectionKey === 'fixed'
        ? visibleFixedItems
        : visibleScrollItems;

      const targetItem = sectionItems.find((item) => {
        const itemId = item.id ?? item.label;

        if (itemId === currentDragState.itemId || item.locked) {
          return false;
        }

        const itemNode = itemRefs.current[currentDragState.sectionKey]?.[itemId];
        const itemRect = itemNode?.getBoundingClientRect();

        return itemRect
          ? event.clientY >= itemRect.top && event.clientY <= itemRect.bottom
          : false;
      });

      if (!targetItem) {
        return;
      }

      const targetItemId = targetItem.id ?? targetItem.label;

      if (currentDragState.lastTargetItemId === targetItemId) {
        return;
      }

      const moveItem = (currentItems) => {
        const fromIndex = currentItems.findIndex((item) => (item.id ?? item.label) === currentDragState.itemId);
        const toIndex = currentItems.findIndex((item) => (item.id ?? item.label) === targetItemId);

        if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
          return currentItems;
        }

        const nextItems = [...currentItems];
        const [movedItem] = nextItems.splice(fromIndex, 1);
        nextItems.splice(toIndex, 0, movedItem);

        return nextItems;
      };

      if (currentDragState.sectionKey === 'fixed') {
        setOrderedFixedItems(moveItem);
      } else {
        setOrderedScrollItems(moveItem);
      }

      const nextDragState = {
        ...currentDragState,
        lastTargetItemId: targetItemId,
        offsetY: 0,
        startY: event.clientY,
      };

      dragStateRef.current = nextDragState;
      setDragState(nextDragState);
    };

    const handlePointerUp = () => {
      const currentDragState = dragStateRef.current;

      if (currentDragState) {
        onItemChange?.({
          ...currentDragState.item,
          reordered: true,
          section: currentDragState.sectionKey,
        }, currentDragState.itemId);
      }

      setDragState(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [dragState, onItemChange, visibleFixedItems, visibleScrollItems]);

  const setSectionRef = (sectionKey, node) => {
    sectionRefs.current[sectionKey] = node;
  };

  const getItemRef = (sectionKey, itemId, node) => {
    itemRefs.current[sectionKey] = {
      ...(itemRefs.current[sectionKey] ?? {}),
      [itemId]: node,
    };
  };

  const handleItemSelect = (item, itemId) => {
    setInternalSelectedItemId(itemId);
    onItemChange?.(item, itemId);
  };

  const handleDeleteItem = (item, itemId) => {
    if (deletingItemIds.includes(itemId)) {
      return;
    }

    setDeletingItemIds((currentIds) => (
      currentIds.includes(itemId) ? currentIds : [...currentIds, itemId]
    ));

    const timeoutId = window.setTimeout(() => {
      // Storybook docs behavior: deletion is session-local, so refreshing the page restores demo items.
      setDeletedItemIds((currentIds) => (
        currentIds.includes(itemId) ? currentIds : [...currentIds, itemId]
      ));

      setDeletingItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));

      setHiddenItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));
      setVisibilityAnimatingItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));
      setVisibilityRestoringItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));

      if (internalSelectedItemId === itemId) {
        setInternalSelectedItemId(undefined);
      }

      onItemChange?.({ ...item, deleted: true }, itemId);
    }, 320);

    animationTimeoutsRef.current.push(timeoutId);
  };

  const handleItemPointerLeave = (itemId) => {
    setHiddenTrashSuppressedItemIds((currentIds) => (
      currentIds.filter((currentId) => currentId !== itemId)
    ));
  };

  const handleHideItem = (item, itemId) => {
    if (visibilityAnimatingItemIds.includes(itemId) || deletingItemIds.includes(itemId)) {
      return;
    }

    const isHidden = hiddenItemIds.includes(itemId);

    if (isHidden) {
      setVisibilityAnimatingItemIds((currentIds) => (
        currentIds.includes(itemId) ? currentIds : [...currentIds, itemId]
      ));
      setVisibilityRestoringItemIds((currentIds) => (
        currentIds.includes(itemId) ? currentIds : [...currentIds, itemId]
      ));

      const timeoutId = window.setTimeout(() => {
        setHiddenItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));
        setHiddenTrashSuppressedItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));
        setVisibilityAnimatingItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));
        setVisibilityRestoringItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));
        onItemChange?.({ ...item, hidden: false }, itemId);
      }, 180);

      animationTimeoutsRef.current.push(timeoutId);
      return;
    }

    setHiddenItemIds((currentIds) => (
      currentIds.includes(itemId) ? currentIds : [...currentIds, itemId]
    ));
    setHiddenTrashSuppressedItemIds((currentIds) => (
      currentIds.includes(itemId) ? currentIds : [...currentIds, itemId]
    ));
    setVisibilityAnimatingItemIds((currentIds) => (
      currentIds.includes(itemId) ? currentIds : [...currentIds, itemId]
    ));
    onItemChange?.({ ...item, hidden: true }, itemId);

    const timeoutId = window.setTimeout(() => {
      setVisibilityAnimatingItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));
      setVisibilityRestoringItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));
    }, 180);

    animationTimeoutsRef.current.push(timeoutId);
  };

  const handleDragStart = (event, {
    item,
    itemId,
    sectionKey,
  }) => {
    if (item.locked || deletingItemIds.includes(itemId)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const itemNode = itemRefs.current[sectionKey]?.[itemId];
    const sectionNode = sectionRefs.current[sectionKey];
    const itemRect = itemNode?.getBoundingClientRect();
    const sectionRect = sectionNode?.getBoundingClientRect();

    if (!itemRect || !sectionRect) {
      return;
    }

    setInternalSelectedItemId(itemId);
    setDragState({
      item,
      itemId,
      sectionKey,
      startY: event.clientY,
      offsetY: 0,
      minOffset: sectionRect.top - itemRect.top,
      maxOffset: sectionRect.bottom - itemRect.bottom,
    });
  };

  return (
    <aside
      aria-label={resolvedPageTitle}
      className={buildClassName([
        'storybook-left-panel box-border flex h-full min-h-0 w-full flex-col overflow-hidden rounded-6 border border-solid border-neutral-100 bg-neutral-0 font-sans',
        isThemeSettings ? 'justify-start' : 'justify-between',
        className,
      ])}
    >
      <div className="storybook-left-panel__body">
        <PanelHeader
          status={status}
          title={title}
          onBack={onBack}
        />

        <div className="storybook-left-panel__divider h-px w-full shrink-0 bg-neutral-100" />

        <main className="storybook-left-panel__content">
          <div className="storybook-left-panel__page-heading">
            <Text
              as="h2"
              variant="text-md"
              weight="semibold"
              className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-neutral-900"
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
                    activeDragItemId={dragState?.itemId}
                    activeDragOffsetY={dragState?.offsetY ?? 0}
                    deletingItemIds={deletingItemIds}
                    hiddenItemIds={hiddenItemIds}
                    hiddenTrashSuppressedItemIds={hiddenTrashSuppressedItemIds}
                    items={visibleFixedItems}
                    selectedItemId={internalSelectedItemId}
                    title="Fixed"
                    getItemRef={getItemRef}
                    visibilityAnimatingItemIds={visibilityAnimatingItemIds}
                    visibilityRestoringItemIds={visibilityRestoringItemIds}
                    onDeleteItem={handleDeleteItem}
                    onDragStart={handleDragStart}
                    onHideItem={handleHideItem}
                    onInsertBlock={onInsertBlock}
                    onItemPointerLeave={handleItemPointerLeave}
                    onItemSelect={handleItemSelect}
                    setSectionRef={setSectionRef}
                  />
                  <div className="storybook-left-panel__divider h-px w-full shrink-0 bg-neutral-100" />
                </>
              )}
              <BlockSection
                activeDragItemId={dragState?.itemId}
                activeDragOffsetY={dragState?.offsetY ?? 0}
                deletingItemIds={deletingItemIds}
                hiddenItemIds={hiddenItemIds}
                hiddenTrashSuppressedItemIds={hiddenTrashSuppressedItemIds}
                items={visibleScrollItems}
                selectedItemId={internalSelectedItemId}
                title="Scrolls"
                getItemRef={getItemRef}
                visibilityAnimatingItemIds={visibilityAnimatingItemIds}
                visibilityRestoringItemIds={visibilityRestoringItemIds}
                onDeleteItem={handleDeleteItem}
                onDragStart={handleDragStart}
                onHideItem={handleHideItem}
                onInsertBlock={onInsertBlock}
                onItemPointerLeave={handleItemPointerLeave}
                onItemSelect={handleItemSelect}
                setSectionRef={setSectionRef}
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
