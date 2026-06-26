import uploadFilePreviewImage from '../../../assets/upload-file-preview.png';
import uploadFileSquarePreviewImage from '../../../assets/upload-file-square-preview.png';

export const UPLOAD_FILE_WIDTH_CLASS = 'w-[416px]';

export const FILE_REDIRECTION_WIDTH_CLASS = 'w-[216px]';

export const UPLOAD_FILE_LAYOUT_OPTIONS = ['Horizontal', 'Vertical'] as const;

export const UPLOAD_FILE_DROPZONE_STATE_OPTIONS = ['Default', 'Hover', 'Focus', 'Disabled'] as const;

export type UploadFileDropzoneStateOption = (typeof UPLOAD_FILE_DROPZONE_STATE_OPTIONS)[number];

export const UPLOAD_FILE_DROPZONE_STATE_ALIASES: Record<string, string> = {
  default: 'default',
  hover: 'hover',
  focus: 'focus',
  disabled: 'disabled',
  Default: 'default',
  Hover: 'hover',
  Focus: 'focus',
  Disabled: 'disabled',
  Focused: 'focus',
};

export const MULTIPLE_IMAGES_SLOT_COUNT = 10;

export const MULTIPLE_IMAGES_ITEM_SLOT_COUNT = 9;

export const UPLOAD_FILE_MAIN_STATE_OPTIONS = [
  'Uploading',
  'Large File',
  'Unsupported File',
  'Internet Issue',
  'Request Failed',
  'Upload Successful',
  'Multiple + iPad',
  'Multiple + Square',
  'Multiple + iPhone',
  'Multiple + Android',
] as const;

export const UPLOAD_FILE_MULTIPLE_STATE_OPTIONS = [
  'Multiple + iPad',
  'Multiple + Square',
  'Multiple + iPhone',
  'Multiple + Android',
] as const;

export type UploadFileLayoutOption = (typeof UPLOAD_FILE_LAYOUT_OPTIONS)[number];

export type UploadFileMainStateOption = (typeof UPLOAD_FILE_MAIN_STATE_OPTIONS)[number];

export type UploadFileMultipleStateOption = (typeof UPLOAD_FILE_MULTIPLE_STATE_OPTIONS)[number];

export const UPLOAD_FILE_LAYOUT_ALIASES: Record<string, 'horizontal' | 'vertical'> = {
  horizontal: 'horizontal',
  vertical: 'vertical',
  Horizontal: 'horizontal',
  Vertical: 'vertical',
};

export const UPLOAD_FILE_MAIN_STATE_ALIASES: Record<string, string> = {
  Uploading: 'uploading-media',
  uploading: 'uploading-media',
  'uploading-media': 'uploading-media',
  'Upload Successful': 'upload-successful',
  'upload-successful': 'upload-successful',
  'Large File': 'large-file',
  'large-file': 'large-file',
  'Unsupported File': 'unsupported-file',
  'unsupported-file': 'unsupported-file',
  'Internet Issue': 'internet-issue',
  'internet-issue': 'internet-issue',
  'Request Failed': 'request-failed',
  'request-failed': 'request-failed',
  'Multiple + Square': 'multiple-square',
  'Multiple + iPad': 'multiple-ipad',
  'Multiple + iPhone': 'multiple-iphone',
  'Multiple + Android': 'multiple-android',
};

export const UPLOAD_FILE_DEFAULT_PREVIEW_IMAGE = uploadFilePreviewImage;
export const UPLOAD_FILE_SQUARE_PREVIEW_IMAGE = uploadFileSquarePreviewImage;

export const UPLOAD_FILE_LARGE_FILE_ERROR = {
  title: 'This file is too large to upload!',
  description: 'Please upload an image under 20 MB or a video under 200 MB.',
} as const;

export const UPLOAD_FILE_UNSUPPORTED_FILE_ERROR = {
  title: 'This file format is not supported!',
  description: 'Please upload a JPG, PNG, MP4, or MOV file to continue with your upload.',
} as const;

export const UPLOAD_FILE_INTERNET_ISSUE_ERROR = {
  title: "This file couldn't be uploaded!",
  description: 'Please check your internet connection and try uploading the file again.',
} as const;

export const UPLOAD_FILE_REQUEST_FAILED_ERROR = {
  title: 'Request failed with status code 400!',
  description: "We couldn't complete your request at the moment. Please try again.",
} as const;

export const MULTIPLE_IMAGES_DEFAULT_SLOTS = [
  { kind: 'item', state: 'default' },
  { kind: 'item', state: 'default' },
  { kind: 'item', state: 'default' },
  { kind: 'item', state: 'default' },
  { kind: 'item', state: 'default' },
  { kind: 'item', state: 'default' },
  { kind: 'item', state: 'default' },
  { kind: 'item', state: 'hover' },
  { kind: 'item', state: 'loading' },
  { kind: 'base', state: 'default' },
] as const satisfies ReadonlyArray<{
  kind: 'item' | 'base';
  state: string;
}>;

export type UploadTileLayout = 'square' | 'ipad' | 'iphone' | 'android';

export const UPLOAD_FILE_MULTIPLE_STATE_LAYOUTS: Record<
  UploadFileMultipleStateOption,
  UploadTileLayout
> = {
  'Multiple + Square': 'square',
  'Multiple + iPad': 'ipad',
  'Multiple + iPhone': 'iphone',
  'Multiple + Android': 'android',
};

export const UPLOAD_TILE_LAYOUT_OPTIONS = ['Square', 'iPad', 'iPhone', 'Android'] as const;

export const UPLOAD_TILE_STATE_OPTIONS = ['Default', 'Hover', 'Loading'] as const;

export type UploadTileLayoutOption = (typeof UPLOAD_TILE_LAYOUT_OPTIONS)[number];

export type UploadTileStateOption = (typeof UPLOAD_TILE_STATE_OPTIONS)[number];

/** Figma tile dimensions in px: width 72 for all layouts. */
export const UPLOAD_TILE_DIMENSIONS: Record<UploadTileLayout, { width: number; height: number }> = {
  square: { width: 72, height: 72 },
  ipad: { width: 72, height: 104 },
  iphone: { width: 72, height: 155 },
  android: { width: 72, height: 158 },
};

export const MULTIPLE_IMAGES_CONTAINER_CLASS = [
  'storybook-multiple-images relative box-border',
  UPLOAD_FILE_WIDTH_CLASS,
  'bg-neutral-0 p-3 rounded-8',
  'after:content-[""] after:absolute after:inset-0 after:z-[1]',
  'after:box-border after:border after:border-solid after:border-neutral-200',
  'after:rounded-[inherit] after:pointer-events-none',
].join(' ');

/** Vertical padding (12×2) + row gap (8) + two tile rows. */
export const MULTIPLE_IMAGES_CONTAINER_HEIGHT_CLASSES: Record<UploadTileLayout, string> = {
  square: 'min-h-[176px]',
  ipad: 'min-h-[240px]',
  iphone: 'min-h-[342px]',
  android: 'min-h-[348px]',
};

export const MULTIPLE_IMAGES_GRID_BASE_CLASS =
  'relative z-0 grid w-fit grid-cols-[repeat(5,72px)] gap-2';

export const MULTIPLE_IMAGES_GRID_ROW_CLASSES: Record<UploadTileLayout, string> = {
  square: 'grid-rows-[72px_72px]',
  ipad: 'grid-rows-[104px_104px]',
  iphone: 'grid-rows-[155px_155px]',
  android: 'grid-rows-[158px_158px]',
};

export const UPLOAD_TILE_LAYOUT_CLASS_NAMES: Record<UploadTileLayout, string> = {
  square: 'storybook-upload-image-tile--square',
  ipad: 'storybook-upload-image-tile--ipad',
  iphone: 'storybook-upload-image-tile--iphone',
  android: 'storybook-upload-image-tile--android',
};

export const UPLOAD_TILE_SIZE_CLASSES: Record<UploadTileLayout, string> = {
  square: 'w-[72px] h-[72px]',
  ipad: 'w-[72px] h-[104px]',
  iphone: 'w-[72px] h-[155px]',
  android: 'w-[72px] h-[158px]',
};

export const UPLOAD_TILE_LAYOUT_ALIASES: Record<string, UploadTileLayout> = {
  square: 'square',
  ipad: 'ipad',
  iphone: 'iphone',
  android: 'android',
  Square: 'square',
  iPad: 'ipad',
  iPhone: 'iphone',
  Android: 'android',
};
