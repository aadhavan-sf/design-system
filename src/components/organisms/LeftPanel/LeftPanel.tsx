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
        'inline-flex shrink-0 items-center justify-center rounded-2 border border-solid border-neutral-200 bg-neutral-25 px-2 py-1 text-neutral-600',
        isActive && 'border-success-200 bg-success-25 text-success-600',
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
  visibilityAnimating = false,
  visibilityAnimationDirection = 'hide',
  className,
  onClick,
  onDelete,
  onDragHandlePointerDown,
  onVisibilityClick,
}) {
  const resolvedState = getResolvedState(state);
  const isDisabled = resolvedState === 'disabled';
  const hasActions = showActions ?? !locked;
  const forceShowActions = showActions === true;
  const LeadingIcon = locked ? LockSimple : DotsSixVertical;
  const isRestoringVisibility =
    visibilityAnimating && visibilityAnimationDirection === 'show';
  const VisibilityIcon = hidden && !isRestoringVisibility ? EyeSlash : Eye;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={buildClassName([
        'group relative box-border flex h-11 w-full cursor-pointer items-center justify-center rounded-2 border border-solid border-transparent bg-transparent px-2 py-3 text-left font-sans text-neutral-700 transition-[background-color,border-color,color,box-shadow,opacity,transform] duration-[160ms] enabled:hover:justify-between enabled:hover:bg-neutral-25 focus-visible:outline-none focus-visible:shadow-focus-brand disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-300',
        resolvedState === 'hover' && 'justify-between bg-neutral-25',
        resolvedState === 'focused' && 'bg-neutral-00 shadow-focus-brand',
        pressed && !hidden && 'justify-between border-primary-400 bg-primary-25 text-primary-400 enabled:hover:bg-primary-25',
        hidden && 'justify-between border-transparent bg-transparent text-neutral-700 enabled:hover:bg-neutral-25 enabled:hover:text-neutral-700',
        deleting && 'pointer-events-none -translate-x-2 scale-[0.98] opacity-0',
        dragging && 'pointer-events-none z-[3] cursor-grabbing border-primary-400 bg-primary-25 text-primary-400 shadow-lg',
        isDisabled && pressed && 'border-primary-200 bg-primary-25 text-primary-200',
        className,
      ])}
      style={dragging ? { transform: `translateY(${dragOffsetY}px)` } : undefined}
      onClick={isDisabled ? undefined : onClick}
    >
      <span
        className={buildClassName([
          'flex min-w-0 flex-1 basis-0 items-center gap-2',
          (forceShowActions || deleting || hidden || resolvedState === 'hover') && 'max-w-[calc(100%-60px)] overflow-hidden',
          'group-hover:max-w-[calc(100%-60px)] group-hover:overflow-hidden',
        ])}
      >
        <LeadingIcon
          aria-hidden="true"
          className={buildClassName([
            'h-5 w-5 shrink-0 transition-[color,transform] duration-[160ms]',
            !locked && 'cursor-grab touch-none active:cursor-grabbing',
            dragging && 'cursor-grabbing',
          ])}
          data-drag-handle={!locked ? 'true' : undefined}
          size={20}
          weight={locked ? 'regular' : 'bold'}
          onPointerDown={locked || isDisabled ? undefined : onDragHandlePointerDown}
        />
        <Text
          as="span"
          variant="text-sm"
          weight={pressed && !hidden ? 'semibold' : 'medium'}
          color="currentColor"
          className="min-w-0 flex-1 basis-0 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {label}
        </Text>
      </span>
      {hasActions && (
        <span
          className={buildClassName([
            'absolute right-2 inline-flex w-[52px] flex-none translate-x-3 items-center justify-end gap-3 text-neutral-500 opacity-0 pointer-events-none transition-[opacity,transform,width] duration-[180ms]',
            'group-hover:translate-x-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto',
            (forceShowActions || deleting || resolvedState === 'hover') && 'translate-x-0 opacity-100 pointer-events-auto',
            pressed && !hidden && 'text-primary-400',
            hidden && 'w-5 translate-x-0 gap-0 text-neutral-600 opacity-100 pointer-events-auto group-hover:w-[52px] group-hover:gap-3 group-focus-within:w-[52px] group-focus-within:gap-3',
            isDisabled && 'translate-x-3 text-neutral-300 opacity-0 pointer-events-none',
          ])}
        >
          <span
            aria-label={hidden ? 'Show block' : 'Hide block'}
            className={buildClassName([
              'relative inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-1 text-current transition-[color,opacity,transform] duration-[160ms]',
              visibilityAnimating && 'scale-95',
            ])}
            role="button"
            tabIndex={isDisabled ? -1 : 0}
            onClick={(event) => {
              event.stopPropagation();
              if (!isDisabled && !deleting && !visibilityAnimating) {
                onVisibilityClick?.();
              }
            }}
          >
            <VisibilityIcon size={20} weight="regular" />
          </span>
          <span
            aria-label="Delete block"
            className={buildClassName([
              'inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-1 text-current transition-[opacity,transform,width] duration-[160ms]',
              hidden && 'w-0 translate-x-2 overflow-hidden opacity-0 pointer-events-none group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:w-5 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto',
              deleting && 'rotate-6',
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
  visibilityAnimating: PropTypes.bool,
  visibilityAnimationDirection: PropTypes.oneOf(['hide', 'show']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onDragHandlePointerDown: PropTypes.func,
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
      className="flex h-4 w-full cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-primary-400 opacity-0 transition-[opacity,transform] duration-[160ms] hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
      onClick={onClick}
    >
      <span className="h-0.5 flex-1 bg-current" />
      <Plus
        aria-hidden="true"
        className="box-border h-4 w-4 shrink-0 rounded-pill bg-primary-400 p-[3px] text-neutral-00"
        size={10}
        weight="regular"
      />
      <span className="h-0.5 flex-1 bg-current" />
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
        'box-border flex w-full cursor-pointer items-center gap-2 rounded-2 border border-solid border-neutral-100 bg-neutral-00 p-3 text-left font-sans text-neutral-600 transition-[background-color,border-color,color,box-shadow] duration-[160ms] enabled:hover:bg-neutral-50 focus-visible:outline-none focus-visible:shadow-focus-brand disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-300',
        resolvedState === 'hover' && 'bg-neutral-50',
        resolvedState === 'focused' && 'bg-neutral-00 shadow-focus-brand',
        pressed && 'border-primary-400 bg-primary-25 text-primary-400',
      ])}
      onClick={isDisabled ? undefined : onClick}
    >
      <Text
        as="span"
        variant="text-md"
        weight={pressed ? 'semibold' : 'medium'}
        color="currentColor"
        className="min-w-0 flex-1 basis-0 overflow-hidden text-ellipsis whitespace-nowrap"
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
          className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-2 border-0 bg-transparent p-0 text-neutral-900 focus-visible:outline-none focus-visible:shadow-focus-brand"
          onClick={onBack}
        >
          <CaretLeft size={20} weight="regular" />
        </button>
        <Text
          as="h2"
          variant="text-md"
          weight="semibold"
          color="var(--neutral_900)"
          className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
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
      className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-2 border border-solid border-neutral-300 bg-neutral-00 px-3 py-2 text-neutral-700 focus-visible:outline-none focus-visible:shadow-focus-brand"
      onClick={onClick}
    >
      <Plus
        aria-hidden="true"
        className="shrink-0"
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
    <footer className="-mx-6 flex w-[calc(100%+48px)] flex-col items-center gap-2">
      <span className="h-px w-full bg-neutral-100" />
      <button
        type="button"
        className="inline-flex w-[calc(100%-48px)] cursor-pointer items-center justify-center gap-2 rounded-2 border-0 bg-transparent px-3 py-2 text-neutral-700 focus-visible:outline-none focus-visible:shadow-focus-brand"
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
  onItemSelect,
  setSectionRef,
}) {
  const sectionKey = title.toLowerCase();

  return (
    <section className="flex w-full flex-col gap-4">
      <Text
        as="h3"
        variant="text-xs"
        weight="regular"
        color="var(--neutral_700)"
        className="uppercase tracking-[0.2em]"
      >
        {title}
      </Text>
      <div
        className="flex w-full flex-col"
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
              className="flex w-full flex-col transition-transform duration-[180ms]"
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
                visibilityAnimating={isVisibilityAnimating}
                visibilityAnimationDirection={isVisibilityRestoring ? 'show' : 'hide'}
                onDelete={() => onDeleteItem?.(item, itemId)}
                onDragHandlePointerDown={(event) => onDragStart?.(event, {
                  item,
                  itemId,
                  sectionKey,
                })}
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
  onItemSelect: PropTypes.func,
  setSectionRef: PropTypes.func,
};

function ThemeSettingsContent({
  sections,
  selectedItemId,
  onItemSelect,
}) {
  return (
    <div className="flex w-full flex-col gap-6">
      {sections.map((section) => (
        <section
          key={section.title}
          className="flex w-full flex-col gap-4"
        >
          <Text
            as="h3"
            variant="text-xs"
            weight="regular"
            color="var(--neutral_700)"
            className="uppercase tracking-[0.2em]"
          >
            {section.title}
          </Text>
          <div className="flex w-full flex-col gap-4">
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
        setVisibilityAnimatingItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));
        setVisibilityRestoringItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));
        onItemChange?.({ ...item, hidden: false }, itemId);
      }, 180);

      animationTimeoutsRef.current.push(timeoutId);
      return;
    }

    setVisibilityAnimatingItemIds((currentIds) => (
      currentIds.includes(itemId) ? currentIds : [...currentIds, itemId]
    ));

    const timeoutId = window.setTimeout(() => {
      setHiddenItemIds((currentIds) => (
        currentIds.includes(itemId) ? currentIds : [...currentIds, itemId]
      ));

      setVisibilityAnimatingItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));
      setVisibilityRestoringItemIds((currentIds) => currentIds.filter((currentId) => currentId !== itemId));
      onItemChange?.({ ...item, hidden: true }, itemId);
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
        'box-border flex h-[846px] w-[284px] flex-col overflow-hidden rounded-6 border border-solid border-neutral-100 bg-neutral-00 p-6',
        isThemeSettings ? 'justify-start' : 'justify-between',
        className,
      ])}
    >
      <div className="flex w-full flex-col gap-4">
        <PanelHeader
          status={status}
          title={title}
          onBack={onBack}
        />

        <div className="h-px w-full shrink-0 bg-neutral-100" />

        <main className="flex w-full flex-col gap-6">
          <div className="flex w-full items-center justify-between gap-6">
            <Text
              as="h2"
              variant="text-md"
              weight="semibold"
              color="var(--neutral_900)"
              className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
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
            <div className="flex w-full flex-col gap-6">
              {resolvedType === 'fixed-blocks' && (
                <>
                  <BlockSection
                    activeDragItemId={dragState?.itemId}
                    activeDragOffsetY={dragState?.offsetY ?? 0}
                    deletingItemIds={deletingItemIds}
                    hiddenItemIds={hiddenItemIds}
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
                    onItemSelect={handleItemSelect}
                    setSectionRef={setSectionRef}
                  />
                  <div className="h-px w-full shrink-0 bg-neutral-100" />
                </>
              )}
              <BlockSection
                activeDragItemId={dragState?.itemId}
                activeDragOffsetY={dragState?.offsetY ?? 0}
                deletingItemIds={deletingItemIds}
                hiddenItemIds={hiddenItemIds}
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
