import {
  ArrowSquareOut,
  CaretRight,
  Eye,
  EyeSlash,
  PencilSimple,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import { useCallback, useEffect, useState, type ComponentType } from 'react';

import { RadioButton } from '../../atoms/RadioButton';
import { Button } from '../../molecules/Button';
import { TextField } from '../../molecules/TextField';
import { Text } from '../../foundations/Typography';
import { LeftPanel } from '../../organisms/LeftPanel';
import { Popover, type PopoverBlock } from '../../organisms/Popover';
import { Sidebar } from '../../organisms/Sidebar';
import { TopNavigation } from '../../organisms/TopNavigation';

import eyeConditionIcon from '../../../assets/eye-condition.svg';
import lineBackgroundImage from '../../../assets/line-background.svg';
import mobilePreviewImage from '../../../assets/mobile-preview.png';

const HOME_PAGE_BLOCK_POPOVER_HEIGHT = 536;
const HOME_PAGE_BLOCK_POPOVER_BOTTOM_PADDING_FALLBACK = 16;
const HOME_PAGE_SHELL_BACKGROUND_STYLE = {
  backgroundImage: `url(${lineBackgroundImage})`,
} as const;

const HOME_PAGE_SHELL_GRID = [
  'grid grid-cols-[216px_248px_minmax(0,1fr)_theme(spacing.2)_248px_theme(spacing.2)]',
  'min-[1300px]:grid-cols-[216px_264px_minmax(0,1fr)_theme(spacing.2)_264px_theme(spacing.2)]',
  'min-[1537px]:grid-cols-[216px_clamp(264px,calc(12.5vw+72px),312px)_minmax(0,1fr)_theme(spacing.4)_clamp(264px,calc(12.5vw+72px),312px)_theme(spacing.4)]',
].join(' ');

const HOME_PAGE_SIDEBAR_PANEL_GAP = 'ml-2 min-[1537px]:ml-4';

const HOME_PAGE_LAYOUT_GAP = 'py-2 min-[1537px]:py-4';
const HOME_PAGE_PANEL_PADDING = 'px-4 min-[1300px]:px-6';
const HOME_PAGE_POPOVER_BOTTOM = 'bottom-2 min-[1537px]:bottom-4';
const HOME_PAGE_POPOVER_LEFT = [
  'pl-[calc(216px+8px+248px+theme(spacing.2))]',
  'min-[1300px]:pl-[calc(216px+8px+264px+theme(spacing.2))]',
  'min-[1537px]:pl-[calc(216px+16px+clamp(264px,calc(12.5vw+72px),312px)+theme(spacing.2))]',
].join(' ');
const HOME_PAGE_COLLECTION_WIDTH = 'w-[216px] min-[1537px]:w-[clamp(216px,calc(16.667vw-40px),280px)]';
const HOME_PAGE_PHONE_WIDTH = 'w-[322px] min-[1537px]:w-[clamp(322px,calc(20.313vw+10px),400px)]';

function getHomePageBlockPopoverBottomPadding() {
  const leftPanel = document.querySelector('.storybook-home-page__left-panel');

  if (!(leftPanel instanceof HTMLElement)) {
    return HOME_PAGE_BLOCK_POPOVER_BOTTOM_PADDING_FALLBACK;
  }

  const { paddingBottom } = window.getComputedStyle(leftPanel);
  const parsed = Number.parseFloat(paddingBottom);

  return Number.isFinite(parsed)
    ? parsed
    : HOME_PAGE_BLOCK_POPOVER_BOTTOM_PADDING_FALLBACK;
}

function clampBlockPopoverTop(anchorTop: number) {
  const bottomPadding = getHomePageBlockPopoverBottomPadding();
  const maxTop = Math.max(
    0,
    window.innerHeight - HOME_PAGE_BLOCK_POPOVER_HEIGHT - bottomPadding,
  );

  return Math.min(Math.max(anchorTop, 0), maxTop);
}

type BlockPopoverAnchor = {
  top: number;
};

type BlockPopoverOpenContext = {
  anchorTop?: number;
};

type VisibilityId = 'visible' | 'hidden' | 'conditional';
type VisibilityIcon = Icon | string;

type DatePartValues = {
  day?: string;
  month?: string;
  year?: string;
  hour?: string;
  minute?: string;
};

type VisibilityOptionProps = {
  checked: boolean;
  icon: VisibilityIcon;
  label: string;
  onSelect: () => void;
};

type ConditionalFilterCardProps = {
  isConditional: boolean;
};

type RightPanelProps = {
  onDesignChange?: () => void;
};

const TemplateLeftPanel = LeftPanel as unknown as ComponentType<Record<string, unknown>>;
const TemplateSidebar = Sidebar as unknown as ComponentType<Record<string, unknown>>;
const TemplatePopover = Popover as unknown as ComponentType<Record<string, unknown>>;
const TemplateTopNavigation = TopNavigation as unknown as ComponentType<Record<string, unknown>>;

const HOME_PAGE_NAV_INDEX = {
  themeSettings: 0,
  home: 1,
  plp: 2,
  pdp: 3,
  cart: 4,
} as const;

const HOME_PAGE_LEFT_PANEL_CONFIGS = {
  [HOME_PAGE_NAV_INDEX.themeSettings]: {
    id: 'theme-settings',
    type: 'theme-settings',
    pageTitle: 'Theme Settings',
    selectedItemId: 'app-styling',
  },
  [HOME_PAGE_NAV_INDEX.home]: {
    id: 'home',
    type: 'fixed-blocks',
    pageTitle: 'Home',
    fixedItems: [{ id: 'toolbar', label: 'Toolbar', locked: true }],
    scrollItems: [
      { id: 'image-banner', label: 'Imager Banner' },
      { id: 'content-block', label: 'Content Block' },
      { id: 'custom-blocks-1', label: 'Custom Blocks #1' },
      { id: 'custom-blocks-2', label: 'Custom Blocks #1' },
      { id: 'image-slider', label: 'Image Slider' },
      { id: 'content-block-2', label: 'Content Block' },
    ],
    selectedItemId: 'custom-blocks-1',
    footerLabel: 'Add New Page',
    footerIcon: 'plus',
    showFooter: true,
  },
  [HOME_PAGE_NAV_INDEX.plp]: {
    id: 'plp',
    type: 'fixed-blocks',
    pageTitle: 'PLP',
    fixedItems: [{ id: 'collection-image', label: 'Collection Image', locked: true }],
    scrollItems: [
      { id: 'collection-description', label: 'Collection Description' },
      { id: 'custom-blocks-1', label: 'Custom Blocks #1' },
      { id: 'sort-and-filter', label: 'Sort & Filter' },
      { id: 'sub-collection', label: 'Sub Collections' },
      { id: 'product-grid', label: 'Product Grid' },
      { id: 'content-block', label: 'Content Block' },
    ],
    selectedItemId: 'sub-collection',
    footerLabel: 'Edit Search Page',
    showFooter: true,
  },
  [HOME_PAGE_NAV_INDEX.pdp]: {
    id: 'pdp',
    type: 'fixed-blocks',
    pageTitle: 'PDP',
    fixedItems: [{ id: 'toolbar', label: 'Toolbar', locked: true }],
    secondaryFixedItems: [
      { id: 'label', label: 'Label' },
      { id: 'spacer-1', label: 'Spacer' },
      { id: 'price', label: 'Price' },
      { id: 'product-image', label: 'Product Image' },
      { id: 'ratings', label: 'Ratings' },
      { id: 'product-variant-1', label: 'Product Variant #1' },
      { id: 'cta', label: 'CTA' },
    ],
    secondaryFixedSectionTitle: 'Scroll',
    scrollItems: [],
    selectedItemId: 'label',
    showFooter: false,
  },
  [HOME_PAGE_NAV_INDEX.cart]: {
    id: 'cart',
    type: 'fixed-blocks',
    pageTitle: 'Cart',
    fixedItems: [{ id: 'toolbar', label: 'Toolbar', locked: true }],
    secondaryFixedItems: [
      { id: 'line-items', label: 'Line Items' },
      { id: 'spacer-1', label: 'Spacer' },
      { id: 'discount-gift-card', label: 'Discount/Gift Card' },
      { id: 'spacer-2', label: 'Spacer' },
      { id: 'cta', label: 'CTA' },
    ],
    scrollItems: [],
    selectedItemId: 'discount-gift-card',
    showFooter: false,
  },
};

const scrollStyleOptions = [
  'Scroll with parent',
  'Fixed to top',
  'Sticky',
];

const visibilityOptions = [
  {
    id: 'visible',
    icon: Eye,
    label: 'Visible',
    helper: 'This block will always be visible.',
  },
  {
    id: 'hidden',
    icon: EyeSlash,
    label: 'Hidden',
    helper: 'This block will always be hidden.',
  },
  {
    id: 'conditional',
    icon: eyeConditionIcon,
    label: 'Conditional visibility',
    helper: '',
  },
];

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

const HOME_PAGE_BUTTON_RESET = 'm-0 appearance-none';

function getHomePageShellClassName() {
  return buildClassName([
    'storybook-home-page box-border h-dvh w-full min-w-[1280px] max-[1279px]:w-[1280px] overflow-hidden',
    'bg-neutral-25 bg-[length:1280px_1080px] bg-top bg-repeat font-sans text-neutral-900',
    HOME_PAGE_SHELL_GRID,
  ]);
}

function getHomePageSidebarClassName() {
  return 'storybook-home-page__sidebar col-start-1 row-start-1 h-dvh w-[216px] shrink-0';
}

function getHomePageLeftPanelClassName() {
  return buildClassName([
    'storybook-home-page__left-panel box-border col-start-2 h-dvh min-w-0 bg-transparent',
    HOME_PAGE_SIDEBAR_PANEL_GAP,
    HOME_PAGE_LAYOUT_GAP,
  ]);
}

function getHomePageLeftPanelSurfaceClassName() {
  return buildClassName([
    'storybook-home-page__left-panel-surface h-full min-h-0 w-full rounded-6',
    HOME_PAGE_PANEL_PADDING,
  ]);
}

function getHomePageCanvasClassName() {
  return buildClassName([
    'storybook-home-page__canvas box-border col-start-3 col-end-5 flex h-dvh min-w-0 flex-col items-center gap-8 overflow-x-visible overflow-y-auto bg-transparent px-4',
    HOME_PAGE_LAYOUT_GAP,
  ]);
}

function getHomePageCanvasBodyClassName() {
  return 'storybook-home-page__canvas-body relative flex h-full min-h-0 w-full max-w-full flex-1 flex-col items-center overflow-hidden';
}

function getHomePageBlockPopoverLayerClassName() {
  return buildClassName([
    'storybook-home-page__block-popover-layer fixed inset-x-0 top-0 z-50',
    'flex items-start justify-start overflow-hidden',
    HOME_PAGE_POPOVER_BOTTOM,
    HOME_PAGE_POPOVER_LEFT,
  ]);
}

function getHomePageBlockPopoverDialogClassName() {
  return 'storybook-home-page__block-popover-dialog shrink-0';
}

function getHomePagePreviewLaneClassName() {
  return 'storybook-home-page__preview-lane grid h-full min-h-0 w-full max-w-full flex-[1_1_auto] grid-rows-[auto_minmax(0,1fr)_auto] items-center justify-items-center gap-4';
}

function getHomePageCollectionSelectClassName() {
  return buildClassName([
    'storybook-home-page__collection-select shrink-0 justify-self-center',
    HOME_PAGE_COLLECTION_WIDTH,
  ]);
}

function getHomePagePreviewStackClassName() {
  return 'storybook-home-page__preview-stack flex h-full min-h-0 w-max max-w-full flex-col items-center justify-center overflow-hidden';
}

function getHomePagePhoneClassName() {
  return buildClassName([
    'storybook-home-page-phone block h-auto max-h-full w-auto max-w-full object-contain',
    HOME_PAGE_PHONE_WIDTH,
    'drop-shadow-[0_32px_52px_rgba(10,13,18,0.14)]',
  ]);
}

function getHomePageLastSavedClassName() {
  return 'storybook-home-page__last-saved shrink-0 justify-self-center text-neutral-600';
}

function getHomePageRightPanelShellClassName() {
  return buildClassName([
    'storybook-home-page__right-panel box-border col-start-5 h-dvh min-w-0 bg-transparent',
    HOME_PAGE_LAYOUT_GAP,
  ]);
}

function getHomePageRightPanelClassName() {
  return buildClassName([
    'storybook-home-page-right-panel',
    'box-border flex h-full min-h-0 w-full flex-col gap-6 overflow-y-auto rounded-6 border border-solid border-neutral-100 bg-neutral-0 py-6 text-neutral-900',
    HOME_PAGE_PANEL_PADDING,
  ]);
}

function getHomePageVisibilityOptionClassName() {
  return 'storybook-home-page-visibility-option flex w-full items-center gap-2';
}

function getHomePageVisibilityLabelClassName() {
  return buildClassName([
    'storybook-home-page-visibility-label',
    'inline-flex min-w-0 flex-1 cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-left text-neutral-700',
    'focus-visible:outline-none focus-visible:shadow-focus-brand',
    HOME_PAGE_BUTTON_RESET,
  ]);
}

function getHomePageFilterCardClassName() {
  return buildClassName([
    'storybook-home-page-filter-card',
    'grid grid-cols-[20px_1fr] gap-2 rounded-16 bg-neutral-25 p-4',
  ]);
}

function getHomePageFilterCardSetupClassName() {
  return buildClassName([
    'storybook-home-page-filter-card__setup',
    'inline-flex w-max max-w-full cursor-pointer items-center justify-start gap-2 border-0 bg-transparent p-0 text-brand-400',
    'focus-visible:outline-none focus-visible:shadow-focus-brand',
    HOME_PAGE_BUTTON_RESET,
  ]);
}

function getHomePageCustomBlocksLinkClassName() {
  return buildClassName([
    'storybook-home-page-custom-blocks-link',
    'inline-flex w-max max-w-full cursor-pointer items-center justify-start gap-1 border-0 bg-transparent p-0 text-brand-400',
    'focus-visible:outline-none focus-visible:shadow-focus-brand',
    HOME_PAGE_BUTTON_RESET,
  ]);
}

function formatLastSavedAt(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const valueByType = parts.reduce<DatePartValues>((values, part) => {
    if (
      part.type === 'day'
      || part.type === 'month'
      || part.type === 'year'
      || part.type === 'hour'
      || part.type === 'minute'
    ) {
      values[part.type] = part.value;
    }

    return values;
  }, {});

  return `${valueByType.day}/${valueByType.month}/${valueByType.year} ${valueByType.hour}:${valueByType.minute} IST`;
}

function PhonePreview() {
  return (
    <img
      className={getHomePagePhoneClassName()}
      src={mobilePreviewImage}
      alt="Mobile storefront preview"
    />
  );
}

function VisibilityOption({
  checked,
  icon,
  label,
  onSelect,
}: VisibilityOptionProps) {
  const isImageIcon = typeof icon === 'string';
  const IconComponent = icon;

  return (
    <div className={getHomePageVisibilityOptionClassName()}>
      <RadioButton
        size="sm"
        pressed={checked}
        aria-label={label}
        className="shrink-0"
        onPressedChange={(nextPressed) => {
          if (nextPressed) {
            onSelect();
          }
        }}
      />
      <button
        type="button"
        className={getHomePageVisibilityLabelClassName()}
        onClick={onSelect}
      >
        <Text
          as="span"
          variant="text-sm"
          weight="medium"
          color="currentColor"
        >
          {label}
        </Text>
        {isImageIcon ? (
          <img
            aria-hidden="true"
            className="block size-4 shrink-0"
            src={icon}
            alt=""
          />
        ) : (
          <IconComponent
            aria-hidden="true"
            className="size-4 shrink-0 text-neutral-600"
            size={16}
            weight="regular"
          />
        )}
      </button>
    </div>
  );
}

function ConditionalFilterCard({
  isConditional,
}: ConditionalFilterCardProps) {
  return (
    <article className={getHomePageFilterCardClassName()}>
      <img
        aria-hidden="true"
        className="size-5 shrink-0"
        src={eyeConditionIcon}
        alt=""
      />
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Text
            as="h3"
            variant="text-sm"
            weight="semibold"
            className="text-neutral-900"
          >
            Conditional Filter
          </Text>
          {isConditional ? (
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              <li className="m-0 flex min-h-[var(--type-text-sm-line)] items-center gap-1">
                <span
                  aria-hidden="true"
                  className="size-1 shrink-0 rounded-full bg-neutral-600"
                />
                <Text as="span" variant="text-sm" weight="medium" className="text-neutral-600">
                  Customers (x3)
                </Text>
              </li>
              <li className="m-0 flex min-h-[var(--type-text-sm-line)] items-center gap-1">
                <span
                  aria-hidden="true"
                  className="size-1 shrink-0 rounded-full bg-neutral-600"
                />
                <Text as="span" variant="text-sm" weight="medium" className="text-neutral-600">
                  Time (x1)
                </Text>
              </li>
            </ul>
          ) : (
            <Text
              as="p"
              variant="text-sm"
              weight="medium"
              className="text-neutral-600"
            >
              Set up logic to show each widget to the right users at the right time.
            </Text>
          )}
        </div>
        <button
          type="button"
          className={getHomePageFilterCardSetupClassName()}
        >
          {isConditional && (
            <PencilSimple
              aria-hidden="true"
              size={18}
              weight="regular"
            />
          )}
          <Text
            as="span"
            variant="text-sm"
            weight="semibold"
            color="currentColor"
          >
            {isConditional ? 'Edit Condition' : 'Setup'}
          </Text>
          {!isConditional && (
            <CaretRight
              aria-hidden="true"
              size={18}
              weight="bold"
            />
          )}
        </button>
      </div>
    </article>
  );
}

function RightPanel({
  onDesignChange = () => {},
}: RightPanelProps) {
  // Demo default for Storybook only. In production, initialize from saved block settings
  // (e.g. API response) so visibility survives refresh.
  const [visibility, setVisibility] = useState<VisibilityId>('hidden');
  const selectedVisibility = visibilityOptions.find((option) => option.id === visibility);
  const isConditional = visibility === 'conditional';

  const handleVisibilitySelect = (nextVisibility: VisibilityId) => {
    if (nextVisibility === visibility) {
      return;
    }

    setVisibility(nextVisibility);
    onDesignChange();
  };

  return (
    <aside
      className={getHomePageRightPanelClassName()}
      aria-label="Home page properties"
    >
      <div className="flex flex-col gap-3">
        <Button
          label="Publish Theme"
          hierarchy="primary"
          size="medium"
          className="w-full min-w-0"
        />
        <span className="block h-px w-full bg-neutral-100" />
      </div>

      <section className="flex flex-col gap-3">
        <Text as="h2" variant="text-md" weight="semibold" className="text-neutral-900">
          Properties
        </Text>
        <div className="flex flex-col gap-3 text-neutral-600">
          <Text as="p" variant="text-sm" weight="regular" className="text-neutral-600">
            To customise custom blocks, go to the custom blocks settings under theme settings.
          </Text>
          <button
            type="button"
            className={getHomePageCustomBlocksLinkClassName()}
          >
            <Text as="span" variant="text-sm" weight="semibold" color="currentColor">
              Edit Custom Blocks
            </Text>
            <ArrowSquareOut
              aria-hidden="true"
              size={16}
              weight="regular"
            />
          </button>
        </div>
      </section>

      <TextField
        type="dropdown"
        fluid
        labelText="Scroll Style"
        placeholder="Scroll with parent"
        options={scrollStyleOptions}
        dropdownListItems={scrollStyleOptions}
        onSelectedOptionsChange={onDesignChange}
        tooltip={false}
        astriks={false}
      />

      <section className="flex flex-col gap-3">
        <Text as="h2" variant="text-md" weight="semibold" className="text-neutral-900">
          Visibility
        </Text>
        <div
          className="flex flex-col gap-2"
          role="radiogroup"
          aria-label="Visibility"
        >
          {visibilityOptions.map((option) => (
            <VisibilityOption
              key={option.id}
              checked={visibility === option.id}
              icon={option.icon}
              label={option.label}
              onSelect={() => handleVisibilitySelect(option.id as VisibilityId)}
            />
          ))}
        </div>
        {selectedVisibility?.helper && (
          <Text as="p" variant="text-sm" weight="regular" className="text-neutral-600">
            {selectedVisibility.helper}
          </Text>
        )}
      </section>

      {isConditional && (
        <ConditionalFilterCard isConditional={isConditional} />
      )}
    </aside>
  );
}

type BlockPopoverLayerProps = {
  anchor?: BlockPopoverAnchor | null;
  onAddBlock?: (block: PopoverBlock) => void;
  onClose: () => void;
  open: boolean;
};

function BlockPopoverLayer({
  anchor,
  open,
  onClose,
  onAddBlock,
}: BlockPopoverLayerProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={getHomePageBlockPopoverLayerClassName()}
      role="presentation"
      style={anchor ? { paddingTop: anchor.top } : undefined}
      onClick={onClose}
    >
      <div
        className={getHomePageBlockPopoverDialogClassName()}
        role="dialog"
        aria-label="Add block"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <TemplatePopover
          defaultActiveBlockId="image-banner"
          onAddBlock={(block: PopoverBlock) => {
            onAddBlock?.(block);
            onClose();
          }}
        />
      </div>
    </div>
  );
}

export function HomePage() {
  const [lastSavedAt, setLastSavedAt] = useState(() =>
    formatLastSavedAt()
  );
  const [isBlockPopoverOpen, setIsBlockPopoverOpen] = useState(false);
  const [blockPopoverAnchor, setBlockPopoverAnchor] = useState<BlockPopoverAnchor | null>(null);
  const [activeNavIndex, setActiveNavIndex] = useState(HOME_PAGE_NAV_INDEX.home);
  const activeLeftPanelConfig = HOME_PAGE_LEFT_PANEL_CONFIGS[activeNavIndex];

  const handleDesignChange = () => {
    setLastSavedAt(formatLastSavedAt());
  };

  const openBlockPopover = useCallback((context?: BlockPopoverOpenContext) => {
    if (context?.anchorTop != null) {
      setBlockPopoverAnchor({ top: clampBlockPopoverTop(context.anchorTop) });
    } else {
      setBlockPopoverAnchor(null);
    }

    setIsBlockPopoverOpen(true);
  }, []);

  const closeBlockPopover = useCallback(() => {
    setIsBlockPopoverOpen(false);
    setBlockPopoverAnchor(null);
  }, []);

  const handleBlockAdded = (_block: PopoverBlock) => {
    handleDesignChange();
  };

  const handleTopNavigationChange = (_item: unknown, index: number) => {
    setActiveNavIndex(index);
    closeBlockPopover();
  };

  return (
    <div className={getHomePageShellClassName()} style={HOME_PAGE_SHELL_BACKGROUND_STYLE}>
      <BlockPopoverLayer
        anchor={blockPopoverAnchor}
        open={isBlockPopoverOpen}
        onClose={closeBlockPopover}
        onAddBlock={handleBlockAdded}
      />
      <TemplateSidebar
        activeItemId="active-theme"
        className={getHomePageSidebarClassName()}
      />

      <div className={getHomePageLeftPanelClassName()}>
        <TemplateLeftPanel
          key={activeLeftPanelConfig.id}
          className={getHomePageLeftPanelSurfaceClassName()}
          title="Version 1"
          status="draft"
          onAddBlock={openBlockPopover}
          onInsertBlock={openBlockPopover}
          {...activeLeftPanelConfig}
        />
      </div>

      <main className={getHomePageCanvasClassName()}>
        <TemplateTopNavigation
          activeIndex={activeNavIndex}
          onItemChange={handleTopNavigationChange}
        />
        <div className={getHomePageCanvasBodyClassName()}>
          <div className={getHomePagePreviewLaneClassName()}>
            <div className={getHomePageCollectionSelectClassName()}>
              <TextField
                type="dropdown"
                fluid
                label={false}
                placeholder="Mens Collection"
                options={['Mens Collection', 'Womens Collection', 'Lifestyle']}
                dropdownListItems={['Mens Collection', 'Womens Collection', 'Lifestyle']}
                onSelectedOptionsChange={handleDesignChange}
                tooltip={false}
                astriks={false}
              />
            </div>
            <div className={getHomePagePreviewStackClassName()}>
              <PhonePreview />
            </div>
            <Text
              as="span"
              variant="text-sm"
              weight="regular"
              className={getHomePageLastSavedClassName()}
            >
              Last saved: {lastSavedAt}
            </Text>
          </div>
        </div>
      </main>

      <div className={getHomePageRightPanelShellClassName()}>
        <RightPanel onDesignChange={handleDesignChange} />
      </div>
    </div>
  );
}
