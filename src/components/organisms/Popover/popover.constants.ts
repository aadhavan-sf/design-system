import type { ComponentType } from 'react';
import {
  Article,
  CirclesThreePlus,
  ColumnsPlusRight,
  Lego,
  CurrencyCircleDollar,
  CursorClick,
  Funnel,
  Image,
  ListBullets,
  MonitorPlay,
  PuzzlePiece,
  Resize,
  SealPercent,
  Slideshow,
  SplitVertical,
  SquaresFour,
  Star,
  Tag,
  TextAa,
  TextAlignLeft,
  Timer,
  Video,
  type IconProps,
} from '@phosphor-icons/react';

import imageBannerPreview from './assets/image-banner-preview.png';
import imageSliderSlide1 from './assets/image-slider-slide-1.png';
import imageSliderSlide2 from './assets/image-slider-slide-2.png';
import imageSliderSlide3 from './assets/image-slider-slide-3.png';
import imageSliderSlide4 from './assets/image-slider-slide-4.png';

export type PopoverTab = 'built-in' | 'custom' | 'plugin';
export type PopoverBlockCategory = PopoverTab;
export type PopoverBlockState = 'default' | 'hover' | 'selected';
export type PopoverEmptyStateType = 'search' | 'custom' | 'plugin';

export type PopoverBlock = {
  id: string;
  label: string;
  icon?: ComponentType<IconProps>;
  category?: PopoverBlockCategory;
  previewImage?: string;
  previewImages?: string[];
};

type PopoverBlockDefinition = PopoverBlock & {
  category: PopoverBlockCategory;
};

export const POPOVER_VISIBLE_BLOCK_COUNT = 9;
export const POPOVER_BLOCK_ROW_HEIGHT = 36;
export const POPOVER_BLOCK_ROW_GAP = 8;
export const POPOVER_LIST_VIEWPORT_HEIGHT =
  (POPOVER_VISIBLE_BLOCK_COUNT * POPOVER_BLOCK_ROW_HEIGHT)
  + ((POPOVER_VISIBLE_BLOCK_COUNT - 1) * POPOVER_BLOCK_ROW_GAP);
export const POPOVER_LIST_FADE_HEIGHT = POPOVER_BLOCK_ROW_HEIGHT;

export const POPOVER_TAB_CATEGORIES: PopoverBlockCategory[] = ['built-in', 'custom', 'plugin'];

export const IMAGE_SLIDER_PREVIEW_IMAGES = [
  imageSliderSlide1,
  imageSliderSlide2,
  imageSliderSlide3,
  imageSliderSlide4,
];

export const BUILTIN_BLOCKS: PopoverBlockDefinition[] = [
  { id: 'rich-text', label: 'Rich Text', icon: TextAa, category: 'built-in' },
  { id: 'countdown-timer', label: 'Countdown Timer', icon: Timer, category: 'built-in' },
  { id: 'image-banner', label: 'Image Banner', icon: Image, category: 'built-in', previewImage: imageBannerPreview },
  { id: 'image-carousel', label: 'Image Carousel', icon: Slideshow, category: 'built-in' },
  { id: 'video-banner', label: 'Video Banner', icon: Video, category: 'built-in' },
  { id: 'expandable-view', label: 'Expandable View', icon: Resize, category: 'built-in' },
  { id: 'product-grid', label: 'Product Grid', icon: SquaresFour, category: 'built-in' },
  { id: 'image-slider', label: 'Image Slider', icon: Slideshow, category: 'built-in', previewImages: IMAGE_SLIDER_PREVIEW_IMAGES },
  { id: 'image-grid', label: 'Image Grid', icon: SquaresFour, category: 'built-in' },
  { id: 'product-carousel', label: 'Product Carousel', icon: Slideshow, category: 'built-in' },
  { id: 'product-image', label: 'Product Image', icon: Image, category: 'built-in', previewImages: IMAGE_SLIDER_PREVIEW_IMAGES },
  { id: 'product-variants', label: 'Product Variants', icon: CirclesThreePlus, category: 'built-in' },
  { id: 'product-cta', label: 'Product CTA', icon: CursorClick, category: 'built-in' },
  { id: 'product-description', label: 'Product Description', icon: TextAlignLeft, category: 'built-in' },
  { id: 'replay-video', label: 'Replay Video', icon: MonitorPlay, category: 'built-in' },
  { id: 'spacer', label: 'Spacer', icon: SplitVertical, category: 'built-in' },
  { id: 'discount', label: 'Discount', icon: SealPercent, category: 'built-in' },
  { id: 'collection-image', label: 'Collection Image', icon: Image, category: 'built-in', previewImage: imageBannerPreview },
  { id: 'collection-description', label: 'Collection Description', icon: Article, category: 'built-in' },
  { id: 'sub-collection', label: 'Sub Collection', icon: ColumnsPlusRight, category: 'built-in' },
  { id: 'sort-and-filter', label: 'Sort & Filter', icon: Funnel, category: 'built-in' },
  { id: 'price', label: 'Price', icon: CurrencyCircleDollar, category: 'built-in' },
  { id: 'label', label: 'Label', icon: Tag, category: 'built-in' },
  { id: 'rating', label: 'Rating', icon: Star, category: 'built-in' },
  { id: 'product-details', label: 'Product Details', icon: ListBullets, category: 'built-in' },
];

export const DEMO_CUSTOM_BLOCKS: PopoverBlockDefinition[] = [
  { id: 'custom-block', label: 'Custom Block', icon: Lego, category: 'custom' },
];

export const DEMO_PLUGIN_BLOCKS: PopoverBlockDefinition[] = [
  { id: 'plugin-block', label: 'Plugin Block', icon: PuzzlePiece, category: 'plugin' },
];

export const DEFAULT_POPOVER_BLOCKS: PopoverBlock[] = BUILTIN_BLOCKS;

export const POPOVER_EMPTY_STATE_CONFIG: Record<PopoverEmptyStateType, {
  actionLabel?: string;
  description: string;
  icon: ComponentType<IconProps>;
  title: string;
}> = {
  search: {
    icon: SquaresFour,
    title: 'No Blocks found',
    description: 'Try another search',
  },
  custom: {
    icon: Lego,
    title: 'No Custom Block found',
    description: 'You can try creating new Custom Blocks.',
    actionLabel: 'Create Custom Block',
  },
  plugin: {
    icon: PuzzlePiece,
    title: 'No Plugins found',
    description: 'Please enable some in our Plugins to see the relevant blocks in here.',
    actionLabel: 'Go to Plugins',
  },
};

export function resolvePopoverEmptyStateType(
  category: PopoverBlockCategory,
  searchQuery: string,
): PopoverEmptyStateType {
  if (searchQuery.trim().length > 0) {
    return 'search';
  }

  if (category === 'custom') {
    return 'custom';
  }

  if (category === 'plugin') {
    return 'plugin';
  }

  return 'search';
}

export function getPopoverBlocksForCategory(
  blocks: PopoverBlock[],
  category: PopoverBlockCategory,
) {
  return blocks.filter((block) => (block.category ?? 'built-in') === category);
}

export function filterPopoverBlocksBySearch(
  blocks: PopoverBlock[],
  searchQuery: string,
) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  if (!normalizedQuery) {
    return blocks;
  }

  return blocks.filter((block) => {
    const normalizedLabel = block.label.toLowerCase();

    return (
      normalizedLabel.includes(normalizedQuery)
      || normalizedLabel.replace('&', 'and').includes(normalizedQuery)
    );
  });
}
