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
  { id: 'image-carousel', label: 'Image Carousel' },
  { id: 'spacer', label: 'Spacer' },
  { id: 'image-banner', label: 'Image Banner' },
  { id: 'promo-banner', label: 'Promo Banner' },
  { id: 'content-block', label: 'Content Block' },
  { id: 'image-slider', label: 'Image Slider' },
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

function getDragItemButtonRect(itemGroupNode) {
  const button = itemGroupNode?.querySelector('.storybook-left-panel-item');

  return button?.getBoundingClientRect() ?? itemGroupNode?.getBoundingClientRect();
}

function clampDragTop({
  dragTop,
  itemHeight,
  panelRect,
  sectionNode,
}) {
  if (!panelRect || !sectionNode) {
    return dragTop;
  }

  const sectionRect = sectionNode.getBoundingClientRect();
  const minTop = sectionRect.top - panelRect.top;
  const maxTop = sectionRect.bottom - panelRect.top - itemHeight;

  return Math.min(Math.max(dragTop, minTop), Math.max(minTop, maxTop));
}

const LEFT_PANEL_BUTTON_VISUAL_RESET =
  'm-0 appearance-none cursor-pointer focus-visible:outline-none disabled:cursor-not-allowed';

const LEFT_PANEL_ITEM_ACTIONS_WIDTH_VAR =
  '[--left-panel-item-actions-width:calc((20px*2)+var(--size\\_3))]';

const LEFT_PANEL_MAIN_SHRINK_CLASS =
  'max-w-[calc(100%-var(--left-panel-item-actions-width)-var(--size\\_2))] overflow-hidden';

function getLeftPanelItemMainClassName({
  deleting,
  dragging,
  forceShowActions,
  hidden,
  isDisabled,
  isFocused,
  isInteractionHovered,
  isRowHovered,
  isStorybookHover,
  pressed,
  showHiddenTrash,
}) {
  const shouldShrinkMain = !hidden && (
    deleting
    || forceShowActions
    || dragging
    || isInteractionHovered
    || (pressed && isDisabled && isInteractionHovered)
  );
  const shouldExpandMainForFocus = isFocused
    && !isStorybookHover
    && !pressed
    && !isRowHovered;

  return buildClassName([
    'storybook-left-panel-item__main flex min-w-0 flex-[1_1_0] items-center gap-2',
    hidden && (showHiddenTrash
      ? 'storybook-left-panel-item__main--actions-expanded max-w-[calc(100%-var(--left-panel-item-actions-width)-var(--size\\_2))] overflow-hidden'
      : 'storybook-left-panel-item__main--actions-single max-w-[calc(100%-20px-var(--size\\_2))] overflow-hidden'),
    shouldShrinkMain && LEFT_PANEL_MAIN_SHRINK_CLASS,
    shouldExpandMainForFocus && !shouldShrinkMain && 'max-w-none',
  ]);
}

function getLeftPanelItemActionsClassName({
  deleting,
  dragging,
  forceShowActions,
  hasActions,
  hidden,
  isDisabled,
  isInactive,
  isInteractionHovered,
  pressed,
  showHiddenTrash,
}) {
  const shouldHideActions = isDisabled && !pressed;
  const isDisabledPressedHover = isDisabled && pressed && isInteractionHovered;
  const shouldRevealActions = !shouldHideActions && (
    hidden
    || dragging
    || deleting
    || forceShowActions
    || isDisabledPressedHover
    || (!hidden && isInteractionHovered)
  );

  return buildClassName([
    'storybook-left-panel-item__actions absolute right-2 inline-flex w-[var(--left-panel-item-actions-width)] flex-none items-center justify-end',
    shouldRevealActions ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0',
    shouldRevealActions && !isDisabledPressedHover && 'pointer-events-auto',
    (!shouldRevealActions || isDisabledPressedHover) && 'pointer-events-none',
    hidden && (showHiddenTrash
      ? 'storybook-left-panel-item__actions--expanded w-[var(--left-panel-item-actions-width)] gap-3'
      : 'storybook-left-panel-item__actions--single w-5 gap-0'),
    !hidden && 'gap-3',
    isInactive && 'text-neutral-600',
    !isInactive && 'text-current',
  ]);
}

function getLeftPanelShellClassName({
  className,
  isThemeSettings,
}) {
  return buildClassName([
    'storybook-left-panel relative box-border flex h-full min-h-0 w-full flex-col overflow-hidden rounded-6 border border-solid border-neutral-100 bg-neutral-0 p-6 font-sans',
    isThemeSettings ? 'justify-start' : 'justify-between',
    className,
  ]);
}

function getLeftPanelBodyClassName() {
  return 'storybook-left-panel__body flex w-full flex-col gap-4';
}

function getLeftPanelContentClassName() {
  return 'storybook-left-panel__content flex w-full flex-col gap-6';
}

function getLeftPanelPageHeadingClassName() {
  return 'storybook-left-panel__page-heading flex w-full items-center justify-between gap-6';
}

function getLeftPanelBlockSectionsClassName() {
  return 'storybook-left-panel__block-sections flex w-full flex-col gap-6';
}

function getLeftPanelSectionClassName() {
  return 'storybook-left-panel-section flex w-full flex-col gap-4';
}

function getLeftPanelSectionTitleClassName() {
  return 'storybook-left-panel-section__title w-full uppercase tracking-[0.2em] text-neutral-600';
}

function getLeftPanelSectionItemsClassName() {
  return 'storybook-left-panel-section__items flex w-full flex-col gap-0';
}

function getLeftPanelThemeClassName() {
  return 'storybook-left-panel-theme flex w-full flex-col gap-6';
}

function getLeftPanelThemeItemsClassName() {
  return 'storybook-left-panel-theme__items flex w-full flex-col gap-4';
}

function getLeftPanelFooterClassName() {
  return 'storybook-left-panel-footer -mx-6 flex w-[calc(100%+3rem)] shrink-0 flex-col items-center gap-2';
}

function getLeftPanelFooterButtonClassName() {
  return buildClassName([
    'storybook-left-panel-footer__button inline-flex w-[calc(100%-3rem)] items-center justify-center gap-2 rounded-2 border-0 bg-transparent px-3 py-2 font-sans text-neutral-700 focus-visible:shadow-focus-brand',
    LEFT_PANEL_BUTTON_VISUAL_RESET,
  ]);
}

function getLeftPanelBackButtonClassName() {
  return buildClassName([
    'storybook-left-panel__back inline-flex size-5 shrink-0 items-center justify-center rounded-2 border-0 bg-transparent p-0 text-neutral-900 focus-visible:shadow-focus-brand',
    LEFT_PANEL_BUTTON_VISUAL_RESET,
  ]);
}

function getLeftPanelAddButtonClassName() {
  return buildClassName([
    'storybook-left-panel-add inline-flex shrink-0 items-center justify-center gap-2 rounded-2 border border-solid border-neutral-300 bg-neutral-0 px-3 py-2 font-sans text-neutral-700 focus-visible:shadow-focus-brand',
    LEFT_PANEL_BUTTON_VISUAL_RESET,
  ]);
}

function getLeftPanelInsertClassName() {
  return buildClassName([
    'storybook-left-panel-insert flex h-4 w-full items-center justify-center border-0 bg-transparent p-0 text-brand-400 opacity-0 hover:opacity-100 focus-visible:opacity-100',
    LEFT_PANEL_BUTTON_VISUAL_RESET,
  ]);
}

function getLeftPanelItemClassName({
  state,
  pressed,
  hidden,
  deleting,
  dragging,
  isFrameDragging,
  className,
}) {
  const isDisabled = state === 'disabled';
  const isHover = state === 'hover';
  const isFocused = state === 'focused';

  return buildClassName([
    'storybook-left-panel-item box-border flex h-11 w-full items-center rounded-2 border border-solid px-2 py-3 text-left font-sans focus-visible:shadow-focus-brand',
    isFrameDragging ? 'absolute z-[60]' : 'relative',
    LEFT_PANEL_BUTTON_VISUAL_RESET,
    LEFT_PANEL_ITEM_ACTIONS_WIDTH_VAR,
    hidden || dragging || (isHover && !hidden) || (pressed && isDisabled && isHover)
      ? 'justify-between'
      : 'justify-center hover:justify-between',
    !pressed && !hidden && !dragging && 'border-transparent',
    !pressed && !hidden && !isDisabled && !dragging && 'bg-transparent text-neutral-700 hover:bg-neutral-25 hover:text-neutral-700',
    !pressed && !hidden && isHover && 'bg-neutral-25 text-neutral-700',
    !pressed && !hidden && isFocused && 'border-transparent bg-neutral-0 text-neutral-700 shadow-focus-brand',
    pressed && !hidden && !isDisabled && !dragging && 'border-brand-400 bg-brand-25 text-brand-400',
    pressed && !hidden && !isDisabled && !dragging && !isFocused && 'hover:border-brand-400 hover:bg-brand-25 hover:text-brand-400',
    pressed && !hidden && !isDisabled && isHover && 'border-brand-400 bg-brand-25 text-brand-400',
    pressed && !hidden && !isDisabled && isFocused && 'border-brand-400 bg-brand-25 text-brand-400 shadow-focus-brand',
    hidden && 'border-transparent bg-transparent text-neutral-700 hover:border-transparent hover:bg-neutral-25 hover:text-neutral-700',
    dragging && 'pointer-events-none cursor-grabbing border-brand-400 bg-brand-25 text-brand-400 shadow-lg',
    deleting && 'pointer-events-none storybook-left-panel-item--deleting',
    isDisabled && !pressed && 'border-transparent bg-neutral-50 text-neutral-300',
    pressed && isDisabled && 'border-brand-200 bg-brand-25 text-brand-200',
    dragging && 'storybook-left-panel-item--dragging',
    className,
  ]);
}

function getLeftPanelMenuItemClassName({
  state,
  pressed,
}) {
  const isDisabled = state === 'disabled';

  return buildClassName([
    'storybook-left-panel-menu-item box-border flex w-full items-center gap-2 rounded-2 border border-solid p-3 text-left font-sans focus-visible:shadow-focus-brand',
    LEFT_PANEL_BUTTON_VISUAL_RESET,
    pressed && !isDisabled && 'border-brand-400 bg-brand-25 text-brand-400',
    pressed && !isDisabled && state === 'hover' && 'bg-brand-25',
    pressed && !isDisabled && state === 'focused' && 'border-brand-400 bg-brand-25 shadow-focus-brand',
    !pressed && !isDisabled && 'border-neutral-100 bg-neutral-0 text-neutral-600 hover:bg-neutral-50',
    !pressed && state === 'hover' && 'bg-neutral-50',
    !pressed && state === 'focused' && 'border-neutral-100 bg-neutral-0 shadow-focus-brand',
    isDisabled && 'border-neutral-100 bg-neutral-50 text-neutral-300',
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
  dragPositionStyle,
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
  const isFocused = resolvedState === 'focused';
  const isInteractionHovered = isRowHovered || isStorybookHover;
  const showHiddenTrash = hidden && isInteractionHovered && !suppressHiddenTrash;
  const hasActions = showActions ?? !locked;
  const forceShowActions = showActions === true;
  const isFrameDragging = dragging && Boolean(dragPositionStyle);
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
        isFrameDragging,
        className,
      })}
      style={isFrameDragging ? {
        top: dragPositionStyle.top,
        left: dragPositionStyle.left,
        width: dragPositionStyle.width,
      } : undefined}
      onClick={isDisabled ? undefined : onClick}
      onPointerEnter={() => setIsRowHovered(true)}
      onPointerLeave={() => {
        setIsRowHovered(false);
        onPointerLeave?.();
      }}
    >
      <span className={getLeftPanelItemMainClassName({
        deleting,
        dragging,
        forceShowActions,
        hidden,
        isDisabled,
        isFocused,
        isInteractionHovered,
        isRowHovered,
        isStorybookHover,
        pressed,
        showHiddenTrash,
      })}>
        <LeadingIcon
          aria-hidden="true"
          className={buildClassName([
            'storybook-left-panel-item__leading-icon size-5 shrink-0',
            !locked && 'cursor-grab touch-none',
            dragging && !locked && 'cursor-grabbing',
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
        <span className={getLeftPanelItemActionsClassName({
          deleting,
          dragging,
          forceShowActions,
          hasActions,
          hidden,
          isDisabled,
          isInactive,
          isInteractionHovered,
          pressed,
          showHiddenTrash,
        })}>
          <span
            aria-label={hidden ? 'Show block' : 'Hide block'}
            className={buildClassName([
              'storybook-left-panel-item__action storybook-left-panel-item__action--visibility relative inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-1 text-current',
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
              'storybook-left-panel-item__action storybook-left-panel-item__action--delete relative inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-1 text-current',
              hidden && (showHiddenTrash
                ? 'storybook-left-panel-item__action--delete-visible w-5 min-w-5 translate-x-0 opacity-100 pointer-events-auto'
                : 'storybook-left-panel-item__action--delete-collapsed w-0 min-w-0 translate-x-3 overflow-hidden opacity-0 pointer-events-none'),
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
  dragPositionStyle: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
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
  className,
  label = 'Add block here',
  onClick,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={buildClassName([
        getLeftPanelInsertClassName(),
        className,
      ])}
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
  className: PropTypes.string,
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
          className={getLeftPanelBackButtonClassName()}
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
      className={getLeftPanelAddButtonClassName()}
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

function FooterAction({ label, icon = 'pencil', onClick }) {
  const FooterIcon = icon === 'plus' ? Plus : PencilSimple;

  return (
    <footer className={getLeftPanelFooterClassName()}>
      <span className="storybook-left-panel-footer__divider h-px w-full bg-neutral-100" />
      <button
        type="button"
        className={getLeftPanelFooterButtonClassName()}
        onClick={onClick}
      >
        <FooterIcon
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
  icon: PropTypes.oneOf(['pencil', 'plus']),
  onClick: PropTypes.func,
};

function BlockSection({
  activeDragItemId,
  activeDragPositionStyle,
  deletingItemIds = [],
  hiddenItemIds = [],
  hiddenTrashSuppressedItemIds = [],
  items,
  sectionKey,
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
  const resolvedSectionKey = sectionKey ?? title.toLowerCase();

  return (
    <section className={getLeftPanelSectionClassName()}>
      <Text
        as="h3"
        variant="text-xs"
        weight="regular"
        className={getLeftPanelSectionTitleClassName()}
      >
        {title}
      </Text>
      <div
        className={getLeftPanelSectionItemsClassName()}
        ref={(node) => setSectionRef?.(resolvedSectionKey, node)}
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
              className="storybook-left-panel-section__item-group flex w-full flex-col"
              ref={(node) => getItemRef?.(resolvedSectionKey, itemId, node)}
            >
              {isDragging && (
                <div
                  aria-hidden="true"
                  className="h-11 w-full shrink-0"
                />
              )}
              <LeftPanelItem
                deleting={isDeleting}
                dragPositionStyle={isDragging ? activeDragPositionStyle : undefined}
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
                  sectionKey: resolvedSectionKey,
                })}
                onPointerLeave={() => onItemPointerLeave?.(itemId)}
                onVisibilityClick={() => onHideItem?.(item, itemId)}
                onClick={() => onItemSelect?.(item, itemId)}
              />
              {index < items.length - 1 && (
                <LeftPanelInsertControl
                  className={activeDragItemId ? 'pointer-events-none opacity-0' : undefined}
                  onClick={(event) => onInsertBlock?.({
                    afterItem: item,
                    afterItemId: itemId,
                    index,
                    anchorTop: event.currentTarget.getBoundingClientRect().top,
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
  activeDragPositionStyle: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
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
    <div className={getLeftPanelThemeClassName()}>
      {sections.map((section) => (
        <section
          key={section.title}
          className={getLeftPanelSectionClassName()}
        >
          <Text
            as="h3"
            variant="text-xs"
            weight="regular"
            className={getLeftPanelSectionTitleClassName()}
          >
            {section.title}
          </Text>
          <div className={getLeftPanelThemeItemsClassName()}>
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
  secondaryFixedItems,
  secondaryFixedSectionTitle = 'Fixed',
  scrollItems = DEFAULT_BLOCK_ITEMS,
  themeSections = DEFAULT_THEME_SECTIONS,
  footerLabel = 'Edit Search Page',
  footerIcon = 'pencil',
  showFooter = true,
  showScrollSection,
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
  const shouldShowScrollSection = showScrollSection ?? scrollItems.length > 0;
  const initialSelectedItem = selectedItemId ?? (
    isThemeSettings ? 'app-styling' : 'image-slider'
  );
  const [internalSelectedItemId, setInternalSelectedItemId] = useState(initialSelectedItem);
  const [deletedItemIds, setDeletedItemIds] = useState([]);
  const [deletingItemIds, setDeletingItemIds] = useState([]);
  const [orderedFixedItems, setOrderedFixedItems] = useState(fixedItems);
  const [orderedSecondaryFixedItems, setOrderedSecondaryFixedItems] = useState(secondaryFixedItems ?? []);
  const [orderedScrollItems, setOrderedScrollItems] = useState(scrollItems);
  const [dragState, setDragState] = useState(null);
  const [hiddenItemIds, setHiddenItemIds] = useState([]);
  const [hiddenTrashSuppressedItemIds, setHiddenTrashSuppressedItemIds] = useState([]);
  const [visibilityAnimatingItemIds, setVisibilityAnimatingItemIds] = useState([]);
  const [visibilityRestoringItemIds, setVisibilityRestoringItemIds] = useState([]);
  const animationTimeoutsRef = useRef([]);
  const dragStateRef = useRef(null);
  const itemRefs = useRef({});
  const panelContainerRef = useRef(null);
  const sectionRefs = useRef({});
  const visibleFixedItems = orderedFixedItems.filter((item) => !deletedItemIds.includes(item.id ?? item.label));
  const visibleSecondaryFixedItems = orderedSecondaryFixedItems.filter(
    (item) => !deletedItemIds.includes(item.id ?? item.label),
  );
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

    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
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

      const panelRect = panelContainerRef.current?.getBoundingClientRect();

      if (!panelRect) {
        return;
      }

      let dragTop = event.clientY - currentDragState.pointerOffsetY - panelRect.top;
      dragTop = clampDragTop({
        dragTop,
        itemHeight: currentDragState.itemHeight,
        panelRect,
        sectionNode: sectionRefs.current[currentDragState.sectionKey],
      });

      setDragState((currentState) => (
        currentState ? { ...currentState, dragTop } : currentState
      ));

      const sectionItems = currentDragState.sectionKey === 'fixed'
        ? visibleFixedItems
        : currentDragState.sectionKey === 'fixed-secondary'
          ? visibleSecondaryFixedItems
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
      } else if (currentDragState.sectionKey === 'fixed-secondary') {
        setOrderedSecondaryFixedItems(moveItem);
      } else {
        setOrderedScrollItems(moveItem);
      }

      dragStateRef.current = {
        ...currentDragState,
        lastTargetItemId: targetItemId,
        dragTop,
      };
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
  }, [dragState, onItemChange, visibleFixedItems, visibleSecondaryFixedItems, visibleScrollItems]);

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

    const itemGroupNode = itemRefs.current[sectionKey]?.[itemId];
    const itemRect = getDragItemButtonRect(itemGroupNode);
    const panelRect = panelContainerRef.current?.getBoundingClientRect();

    if (!itemRect || !panelRect) {
      return;
    }

    setInternalSelectedItemId(itemId);
    setDragState({
      item,
      itemId,
      sectionKey,
      pointerOffsetY: event.clientY - itemRect.top,
      dragTop: itemRect.top - panelRect.top,
      dragLeft: itemRect.left - panelRect.left,
      itemWidth: itemRect.width,
      itemHeight: itemRect.height,
      lastTargetItemId: null,
    });
  };

  const activeDragPositionStyle = dragState
    ? {
      top: dragState.dragTop,
      left: dragState.dragLeft,
      width: dragState.itemWidth,
    }
    : undefined;

  return (
    <aside
      ref={panelContainerRef}
      aria-label={resolvedPageTitle}
      className={getLeftPanelShellClassName({
        className,
        isThemeSettings,
      })}
    >
      <div className={getLeftPanelBodyClassName()}>
        <PanelHeader
          status={status}
          title={title}
          onBack={onBack}
        />

        <div className="storybook-left-panel__divider h-px w-full shrink-0 bg-neutral-100" />

        <main className={getLeftPanelContentClassName()}>
          <div className={getLeftPanelPageHeadingClassName()}>
            <Text
              as="h2"
              variant="text-md"
              weight="semibold"
              className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-neutral-900"
            >
              {resolvedPageTitle}
            </Text>
            {!isThemeSettings && (
              <AddBlockButton
                onClick={(event) => onAddBlock?.({
                  anchorTop: event.currentTarget.getBoundingClientRect().top,
                })}
              />
            )}
          </div>

          {isThemeSettings ? (
            <ThemeSettingsContent
              sections={themeSections}
              selectedItemId={internalSelectedItemId}
              onItemSelect={handleItemSelect}
            />
          ) : (
            <div className={getLeftPanelBlockSectionsClassName()}>
              {resolvedType === 'fixed-blocks' && visibleFixedItems.length > 0 && (
                <>
                  <BlockSection
                    activeDragItemId={dragState?.itemId}
                    activeDragPositionStyle={activeDragPositionStyle}
                    deletingItemIds={deletingItemIds}
                    hiddenItemIds={hiddenItemIds}
                    hiddenTrashSuppressedItemIds={hiddenTrashSuppressedItemIds}
                    items={visibleFixedItems}
                    sectionKey="fixed"
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
                  {(visibleSecondaryFixedItems.length > 0 || shouldShowScrollSection) && (
                    <div className="storybook-left-panel__divider h-px w-full shrink-0 bg-neutral-100" />
                  )}
                </>
              )}
              {resolvedType === 'fixed-blocks' && visibleSecondaryFixedItems.length > 0 && (
                <>
                  <BlockSection
                    activeDragItemId={dragState?.itemId}
                    activeDragPositionStyle={activeDragPositionStyle}
                    deletingItemIds={deletingItemIds}
                    hiddenItemIds={hiddenItemIds}
                    hiddenTrashSuppressedItemIds={hiddenTrashSuppressedItemIds}
                    items={visibleSecondaryFixedItems}
                    sectionKey="fixed-secondary"
                    selectedItemId={internalSelectedItemId}
                    title={secondaryFixedSectionTitle}
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
                  {shouldShowScrollSection && (
                    <div className="storybook-left-panel__divider h-px w-full shrink-0 bg-neutral-100" />
                  )}
                </>
              )}
              {shouldShowScrollSection && (
                <BlockSection
                  activeDragItemId={dragState?.itemId}
                  activeDragPositionStyle={activeDragPositionStyle}
                  deletingItemIds={deletingItemIds}
                  hiddenItemIds={hiddenItemIds}
                  hiddenTrashSuppressedItemIds={hiddenTrashSuppressedItemIds}
                  items={visibleScrollItems}
                  sectionKey="scrolls"
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
              )}
            </div>
          )}
        </main>
      </div>

      {!isThemeSettings && showFooter && (
        <FooterAction
          icon={footerIcon}
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
  secondaryFixedItems: PropTypes.arrayOf(blockItemShape),
  secondaryFixedSectionTitle: PropTypes.string,
  scrollItems: PropTypes.arrayOf(blockItemShape),
  themeSections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(blockItemShape).isRequired,
  })),
  footerLabel: PropTypes.string,
  footerIcon: PropTypes.oneOf(['pencil', 'plus']),
  showFooter: PropTypes.bool,
  showScrollSection: PropTypes.bool,
  className: PropTypes.string,
  onAddBlock: PropTypes.func,
  onBack: PropTypes.func,
  onFooterClick: PropTypes.func,
  onInsertBlock: PropTypes.func,
  onItemChange: PropTypes.func,
};
