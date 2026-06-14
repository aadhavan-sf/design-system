import {
  useEffect,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type ComponentType,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  Image,
  ArrowRight,
  MagnifyingGlass,
  Plus,
  X,
  type IconProps,
} from '@phosphor-icons/react';

import { Tabs } from '../../molecules/Tabs';
import { Text } from '../../foundations/Typography';
import {
  DEFAULT_POPOVER_BLOCKS,
  filterPopoverBlocksBySearch,
  getPopoverBlocksForCategory,
  POPOVER_EMPTY_STATE_CONFIG,
  POPOVER_VISIBLE_BLOCK_COUNT,
  resolvePopoverEmptyStateType,
  type PopoverBlock,
  type PopoverBlockCategory,
  type PopoverBlockState,
  type PopoverEmptyStateType,
  type PopoverTab,
} from './popover.constants';

import './popover.css';

export type {
  PopoverBlock,
  PopoverBlockCategory,
  PopoverBlockState,
  PopoverEmptyStateType,
  PopoverTab,
};

export type PopoverBlockItemProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  icon?: ComponentType<IconProps>;
  label?: string;
  selected?: boolean;
  state?: PopoverBlockState;
  showAddAction?: boolean;
};

export type PopoverPreviewProps = HTMLAttributes<HTMLDivElement> & {
  empty?: boolean;
  label?: string;
  preview?: ReactNode;
};

export type PopoverEmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  framed?: boolean;
  onAction?: () => void;
  type?: PopoverEmptyStateType;
};

export type PopoverProps = HTMLAttributes<HTMLDivElement> & {
  activeBlockId?: string;
  activeTabIndex?: number;
  blocks?: PopoverBlock[];
  defaultActiveBlockId?: string;
  defaultActiveTabIndex?: number;
  defaultSearchQuery?: string;
  onAddBlock?: (block: PopoverBlock) => void;
  onBlockChange?: (block: PopoverBlock) => void;
  onCreateCustomBlock?: () => void;
  onGoToPlugins?: () => void;
  onSearchChange?: (query: string) => void;
  onTabChange?: (index: number) => void;
  preview?: ReactNode;
  previewLabel?: string;
  searchPlaceholder?: string;
  searchQuery?: string;
  tabs?: string[];
};

const DEFAULT_TABS = ['Built-in', 'Custom', 'Plugin'];

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function normalizeBlockState({
  selected,
  state,
}: {
  selected?: boolean;
  state?: PopoverBlockState;
}) {
  if (state) {
    return state;
  }

  return selected ? 'selected' : 'default';
}

function getPopoverShellClassName(className?: string) {
  return buildClassName([
    'storybook-popover box-border flex h-[536px] w-[528px] max-w-full flex-col overflow-hidden rounded-16 border border-solid border-neutral-100 bg-neutral-0 p-6 font-sans shadow-md',
    className,
  ]);
}

function getPopoverBodyClassName() {
  return 'flex min-h-0 flex-1 items-stretch gap-4';
}

function getPopoverLeftPanelClassName() {
  return 'flex min-h-0 w-[232px] min-w-0 shrink-0 flex-col gap-2 self-stretch';
}

function getPopoverListClassName({
  isEmpty,
}: {
  isEmpty: boolean;
}) {
  return buildClassName([
    'storybook-popover__list relative flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden',
    isEmpty
      ? 'storybook-popover__list--empty rounded-2 border border-solid border-neutral-100 bg-neutral-0'
      : '',
  ]);
}

function getPopoverListScrollClassName() {
  return 'storybook-popover__list-scroll flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-y-contain pr-1';
}

function getPopoverEmptyStateShellClassName({
  className,
  framed = true,
}: {
  className?: string;
  framed?: boolean;
}) {
  return buildClassName([
    'storybook-popover-empty box-border flex w-full min-w-0 flex-col items-center justify-center px-4 py-8 text-center',
    framed
      ? 'min-h-[388px] flex-1 rounded-2 border border-solid border-neutral-100'
      : 'h-full min-h-0 flex-1',
    className,
  ]);
}

function getPopoverSearchShellClassName() {
  return buildClassName([
    'storybook-popover__search',
    'box-border flex h-11 w-full min-w-0 items-center gap-2 rounded-8 border border-solid border-neutral-100 bg-neutral-0 px-[14px] py-3',
    'focus-within:border-neutral-500',
  ]);
}

function getPopoverSearchInputClassName() {
  return buildClassName([
    'storybook-popover__search-input',
    'block min-w-0 flex-1 border-0 bg-transparent p-0 font-sans text-ds-text-sm font-normal text-neutral-700',
    'placeholder:font-sans placeholder:text-ds-text-sm placeholder:font-normal placeholder:text-neutral-300',
    'focus-visible:outline-none',
  ]);
}

function getPopoverClearButtonClassName() {
  return buildClassName([
    'storybook-popover__search-clear',
    'inline-flex size-5 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-neutral-600',
    'focus-visible:shadow-focus-brand',
  ]);
}

function getPopoverTabsClassName() {
  return 'storybook-popover__tabs w-full gap-1.5';
}

function getPopoverEmptyStateIconShellClassName() {
  return 'inline-flex size-12 items-center justify-center rounded-[28px] bg-brand-50 text-brand-400';
}

function getPopoverEmptyStateCopyClassName() {
  return 'flex w-full flex-col gap-1';
}

function getPopoverEmptyStateActionClassName() {
  return buildClassName([
    'storybook-popover-empty__action inline-flex items-center gap-1 border-0 bg-transparent p-0 font-sans text-ds-text-sm font-medium text-brand-400',
    'focus-visible:shadow-focus-brand',
  ]);
}

function getPopoverPreviewEmptyClassName() {
  return 'text-center text-neutral-400';
}

function getPopoverBlockItemClassName({
  state,
  className,
}: {
  state: PopoverBlockState;
  className?: string;
}) {
  const isSelected = state === 'selected';
  const isHover = state === 'hover';

  return buildClassName([
    'storybook-popover-block-item group box-border flex h-9 w-full items-center gap-2 rounded-2 border-0 p-2 text-left font-sans text-neutral-700',
    isSelected || isHover ? 'bg-neutral-50 text-neutral-700' : 'bg-transparent text-neutral-700',
    !isSelected && state === 'default' && 'enabled:hover:bg-neutral-50',
    'focus-visible:shadow-focus-neutral',
    className,
  ]);
}

function getPopoverBlockIconClassName() {
  return 'shrink-0 text-neutral-600';
}

function getPopoverBlockLabelClassName() {
  return 'min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap';
}

function getPopoverBlockAddClassName({
  visible,
}: {
  visible: boolean;
}) {
  return buildClassName([
    'storybook-popover-block-item__add inline-flex size-4 shrink-0 items-center justify-center text-neutral-600',
    visible ? 'opacity-100' : 'opacity-0',
    'group-hover:opacity-100 group-focus-visible:opacity-100',
  ]);
}

function getPopoverPreviewShellClassName(className?: string) {
  return buildClassName([
    'storybook-popover-preview box-border flex min-h-0 w-[232px] shrink-0 flex-col self-stretch rounded-2 border border-solid border-neutral-100 bg-neutral-0',
    className,
  ]);
}

function getPopoverPreviewCanvasClassName() {
  return 'flex min-h-0 flex-1 items-center justify-center px-4 pt-4';
}

function getPopoverPreviewPlaceholderClassName() {
  return 'flex h-[178px] w-full items-center justify-center rounded-2 bg-brand-50 text-brand-400';
}

function getPopoverPreviewImageClassName() {
  return 'block h-[256px] w-[200px] max-w-full shrink-0 rounded-2 object-cover object-center';
}

function getPopoverImageSliderClassName() {
  return 'storybook-popover-image-slider relative h-[256px] w-[200px] max-w-full shrink-0 overflow-hidden rounded-2';
}

function getPopoverImageSliderTrackClassName(isAnimating: boolean) {
  return buildClassName([
    'storybook-popover-image-slider__track flex h-full',
    isAnimating && 'storybook-popover-image-slider__track--animating',
  ]);
}

function getPopoverImageSliderSlideClassName() {
  return 'storybook-popover-image-slider__slide block h-[256px] w-[200px] shrink-0 object-cover object-center';
}

function getPopoverImageSliderDotsClassName() {
  return 'storybook-popover-image-slider__dots';
}

function getPopoverImageSliderDotClassName(isActive: boolean) {
  return buildClassName([
    'storybook-popover-image-slider__dot',
    isActive
      ? 'storybook-popover-image-slider__dot--active'
      : 'storybook-popover-image-slider__dot--inactive',
  ]);
}

const POPOVER_IMAGE_SLIDER_INTERVAL_MS = 2800;

function PopoverImageSliderPreview({
  images,
}: {
  images: string[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => {
      mediaQuery.removeEventListener('change', updatePreference);
    };
  }, []);

  useEffect(() => {
    if (images.length <= 1 || prefersReducedMotion) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, POPOVER_IMAGE_SLIDER_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [images.length, prefersReducedMotion]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={getPopoverImageSliderClassName()}>
      <div
        className={getPopoverImageSliderTrackClassName(!prefersReducedMotion)}
        style={{ transform: `translate3d(-${activeIndex * 200}px, 0, 0)` }}
      >
        {images.map((image, index) => (
          <img
            key={image}
            alt={`Slide ${index + 1}`}
            className={getPopoverImageSliderSlideClassName()}
            src={image}
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className={getPopoverImageSliderDotsClassName()} aria-hidden="true">
          {images.map((image, index) => (
            <span
              key={image}
              className={getPopoverImageSliderDotClassName(index === activeIndex)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function renderPopoverBlockPreview(block: PopoverBlock) {
  if (block.previewImages?.length) {
    return <PopoverImageSliderPreview images={block.previewImages} />;
  }

  if (block.previewImage) {
    return (
      <img
        alt={`${block.label} preview`}
        className={getPopoverPreviewImageClassName()}
        src={block.previewImage}
      />
    );
  }

  const BlockIcon = block.icon ?? Image;

  return (
    <div className={getPopoverPreviewPlaceholderClassName()}>
      <BlockIcon size={40} weight="regular" />
    </div>
  );
}

function getPopoverPreviewLabelClassName() {
  return 'storybook-popover-preview__label m-0 shrink-0 px-4 pb-3 pt-3 text-center uppercase tracking-[0.2em] text-neutral-400';
}


const POPOVER_TAB_CATEGORIES: PopoverBlockCategory[] = ['built-in', 'custom', 'plugin'];

function getActiveCategory(tabIndex: number): PopoverBlockCategory {
  return POPOVER_TAB_CATEGORIES[tabIndex] ?? 'built-in';
}

export function PopoverBlockItem({
  icon: Icon = Image,
  label = 'Image Banner',
  selected = false,
  state,
  showAddAction = true,
  className,
  ...props
}: PopoverBlockItemProps) {
  const resolvedState = normalizeBlockState({ selected, state });
  const showAddIcon = showAddAction && (resolvedState === 'selected' || resolvedState === 'hover');

  return (
    <button
      type="button"
      className={getPopoverBlockItemClassName({
        state: resolvedState,
        className,
      })}
      {...props}
    >
      <Icon className={getPopoverBlockIconClassName()} size={16} weight="regular" />
      <Text
        as="span"
        variant="text-sm"
        weight="medium"
        color="currentColor"
        className={getPopoverBlockLabelClassName()}
      >
        {label}
      </Text>
      {showAddAction && (
        <Plus
          aria-hidden="true"
          className={getPopoverBlockAddClassName({ visible: showAddIcon })}
          size={16}
          weight="regular"
        />
      )}
    </button>
  );
}

export function PopoverEmptyState({
  framed = true,
  type = 'search',
  onAction,
  className,
  ...props
}: PopoverEmptyStateProps) {
  const config = POPOVER_EMPTY_STATE_CONFIG[type];
  const Icon = config.icon;

  return (
    <div className={getPopoverEmptyStateShellClassName({ className, framed })} {...props}>
      <div className="flex w-full flex-col items-center gap-4">
        <div className={getPopoverEmptyStateIconShellClassName()}>
          <Icon size={24} weight="regular" />
        </div>

        <div className={getPopoverEmptyStateCopyClassName()}>
          <Text
            as="h3"
            variant="text-md"
            weight="semibold"
            className="text-neutral-900"
          >
            {config.title}
          </Text>
          <Text
            as="p"
            variant="text-sm"
            weight="regular"
            className="text-neutral-600"
          >
            {config.description}
          </Text>
        </div>

        {config.actionLabel && (
          <button
            type="button"
            className={getPopoverEmptyStateActionClassName()}
            onClick={onAction}
          >
            {config.actionLabel}
            <ArrowRight aria-hidden="true" size={16} weight="regular" />
          </button>
        )}
      </div>
    </div>
  );
}

export function PopoverPreview({
  empty = false,
  label = 'Preview',
  preview,
  className,
  ...props
}: PopoverPreviewProps) {
  return (
    <aside
      className={getPopoverPreviewShellClassName(className)}
      aria-label={`${label} panel`}
      {...props}
    >
      <div className={getPopoverPreviewCanvasClassName()}>
        {empty ? (
          <Text
            as="span"
            variant="text-sm"
            weight="medium"
            className={getPopoverPreviewEmptyClassName()}
          >
            No preview available
          </Text>
        ) : (
          preview ?? (
            <div className={getPopoverPreviewPlaceholderClassName()}>
              <Image size={40} weight="regular" />
            </div>
          )
        )}
      </div>
      <Text
        as="span"
        variant="text-sm"
        weight="medium"
        className={getPopoverPreviewLabelClassName()}
      >
        {label}
      </Text>
    </aside>
  );
}

export function Popover({
  activeBlockId,
  activeTabIndex,
  blocks = DEFAULT_POPOVER_BLOCKS,
  className,
  defaultActiveBlockId = 'image-banner',
  defaultActiveTabIndex = 0,
  defaultSearchQuery = '',
  onAddBlock,
  onBlockChange,
  onCreateCustomBlock,
  onGoToPlugins,
  onSearchChange,
  onTabChange,
  preview,
  previewLabel = 'Preview',
  searchPlaceholder = 'Search',
  searchQuery,
  tabs = DEFAULT_TABS,
  ...props
}: PopoverProps) {
  const [internalSearchQuery, setInternalSearchQuery] = useState(defaultSearchQuery);
  const [internalActiveBlockId, setInternalActiveBlockId] = useState(defaultActiveBlockId);
  const [internalActiveTabIndex, setInternalActiveTabIndex] = useState(defaultActiveTabIndex);

  const isSearchControlled = searchQuery !== undefined;
  const isBlockControlled = activeBlockId !== undefined;
  const isTabControlled = activeTabIndex !== undefined;

  const resolvedSearchQuery = isSearchControlled ? searchQuery : internalSearchQuery;
  const resolvedActiveBlockId = isBlockControlled ? activeBlockId : internalActiveBlockId;
  const resolvedActiveTabIndex = isTabControlled ? activeTabIndex : internalActiveTabIndex;
  const activeCategory = getActiveCategory(resolvedActiveTabIndex);

  const filteredBlocks = useMemo(() => {
    const tabBlocks = getPopoverBlocksForCategory(blocks, activeCategory);

    return filterPopoverBlocksBySearch(tabBlocks, resolvedSearchQuery);
  }, [activeCategory, blocks, resolvedSearchQuery]);

  const isListEmpty = filteredBlocks.length === 0;
  const emptyStateType = resolvePopoverEmptyStateType(activeCategory, resolvedSearchQuery);
  const showListFade = !isListEmpty && filteredBlocks.length > POPOVER_VISIBLE_BLOCK_COUNT;

  const selectedBlock = isListEmpty
    ? undefined
    : blocks.find((block) => block.id === resolvedActiveBlockId)
      ?? filteredBlocks[0];

  const handleEmptyAction = () => {
    if (emptyStateType === 'custom') {
      onCreateCustomBlock?.();
      return;
    }

    if (emptyStateType === 'plugin') {
      onGoToPlugins?.();
    }
  };

  const handleSearchChange = (nextQuery: string) => {
    if (!isSearchControlled) {
      setInternalSearchQuery(nextQuery);
    }

    onSearchChange?.(nextQuery);

    const tabBlocks = getPopoverBlocksForCategory(blocks, activeCategory);
    const matches = filterPopoverBlocksBySearch(tabBlocks, nextQuery);

    if (matches.length === 0) {
      return;
    }

    const nextBlock = matches.find((block) => block.id === resolvedActiveBlockId) ?? matches[0];

    if (!isBlockControlled) {
      setInternalActiveBlockId(nextBlock.id);
    }

    if (nextBlock.id !== resolvedActiveBlockId) {
      onBlockChange?.(nextBlock);
    }
  };

  const handleBlockSelect = (block: PopoverBlock) => {
    if (!isBlockControlled) {
      setInternalActiveBlockId(block.id);
    }

    onBlockChange?.(block);
  };

  const handleTabChange = (index: number) => {
    if (!isTabControlled) {
      setInternalActiveTabIndex(index);
    }

    if (!isSearchControlled) {
      setInternalSearchQuery('');
    }

    onSearchChange?.('');
    onTabChange?.(index);

    const nextCategory = getActiveCategory(index);
    const tabBlocks = getPopoverBlocksForCategory(blocks, nextCategory);

    if (tabBlocks.length === 0) {
      return;
    }

    const nextBlock = tabBlocks.find((block) => block.id === resolvedActiveBlockId) ?? tabBlocks[0];

    if (!isBlockControlled) {
      setInternalActiveBlockId(nextBlock.id);
    }

    if (nextBlock.id !== resolvedActiveBlockId) {
      onBlockChange?.(nextBlock);
    }
  };

  return (
    <div className={getPopoverShellClassName(className)} {...props}>
      <div className={getPopoverBodyClassName()}>
        <section className={getPopoverLeftPanelClassName()} aria-label="Block library">
          <label className={getPopoverSearchShellClassName()}>
            <MagnifyingGlass
              aria-hidden="true"
              className="shrink-0 text-neutral-600"
              size={20}
              weight="regular"
            />
            <input
              type="search"
              value={resolvedSearchQuery}
              placeholder={searchPlaceholder}
              className={getPopoverSearchInputClassName()}
              onChange={(event) => handleSearchChange(event.target.value)}
            />
            {resolvedSearchQuery.length > 0 && (
              <button
                type="button"
                aria-label="Clear search"
                className={getPopoverClearButtonClassName()}
                onClick={() => handleSearchChange('')}
              >
                <X size={16} weight="regular" />
              </button>
            )}
          </label>

          <Tabs
            activeIndex={resolvedActiveTabIndex}
            className={getPopoverTabsClassName()}
            showIcons={false}
            size="md"
            tabs={tabs}
            tabCount={3}
            type="segments"
            onTabChange={handleTabChange}
          />

          <div
            className={getPopoverListClassName({ isEmpty: isListEmpty })}
            role="listbox"
            aria-label="Blocks"
          >
            {!isListEmpty ? (
              <>
                <div className={getPopoverListScrollClassName()}>
                  {filteredBlocks.map((block) => {
                    const BlockIcon = block.icon ?? Image;
                    const isSelected = block.id === resolvedActiveBlockId;

                    return (
                      <PopoverBlockItem
                        key={block.id}
                        aria-selected={isSelected}
                        icon={BlockIcon}
                        label={block.label}
                        role="option"
                        selected={isSelected}
                        onClick={() => handleBlockSelect(block)}
                        onDoubleClick={() => onAddBlock?.(block)}
                      />
                    );
                  })}
                </div>
                {showListFade && (
                  <div className="storybook-popover__list-fade" aria-hidden="true" />
                )}
              </>
            ) : (
              <PopoverEmptyState
                framed={false}
                type={emptyStateType}
                onAction={handleEmptyAction}
              />
            )}
          </div>
        </section>

        <PopoverPreview
          empty={isListEmpty}
          label={previewLabel}
          preview={!isListEmpty && selectedBlock ? (
            preview ?? renderPopoverBlockPreview(selectedBlock)
          ) : undefined}
        />
      </div>
    </div>
  );
}
