export const FILE_REDIRECTION_TYPE_OPTIONS = ['With Redirection', 'Without Redirection'] as const;

export const FILE_REDIRECTION_ACTION_OPTIONS = [
  'Upload File',
  'File Uploaded',
  'File Hover Effect',
] as const;

export type FileRedirectionTypeOption = (typeof FILE_REDIRECTION_TYPE_OPTIONS)[number];

export type FileRedirectionActionOption = (typeof FILE_REDIRECTION_ACTION_OPTIONS)[number];

export const FILE_REDIRECTION_TYPE_ALIASES: Record<string, 'with-redirection' | 'without-redirection'> = {
  'with-redirection': 'with-redirection',
  'without-redirection': 'without-redirection',
  'With Redirection': 'with-redirection',
  'Without Redirection': 'without-redirection',
};

export const FILE_REDIRECTION_ACTION_ALIASES: Record<string, 'upload-file' | 'file-uploaded' | 'file-hover-effect'> = {
  'upload-file': 'upload-file',
  'file-uploaded': 'file-uploaded',
  'file-hover-effect': 'file-hover-effect',
  'Upload File': 'upload-file',
  'File Uploaded': 'file-uploaded',
  'File Hover Effect': 'file-hover-effect',
};

export const FILE_REDIRECTION_DEFAULT_TITLE = 'Upload the file';

export const FILE_REDIRECTION_DEFAULT_REDIRECT_LABEL = 'Redirect to';

export const FILE_REDIRECTION_TARGET_OPTIONS = [
  'Collection',
  'Custom Block',
  'Page',
  'Product',
  'URL',
] as const;

export type FileRedirectionTargetOption = (typeof FILE_REDIRECTION_TARGET_OPTIONS)[number];

export type NormalizedFileRedirectionTarget =
  | 'collection'
  | 'custom-block'
  | 'page'
  | 'product'
  | 'url';

export const FILE_REDIRECTION_TARGET_ALIASES: Record<string, NormalizedFileRedirectionTarget> = {
  Collection: 'collection',
  'Custom Block': 'custom-block',
  Page: 'page',
  Product: 'product',
  URL: 'url',
  collection: 'collection',
  'custom-block': 'custom-block',
  page: 'page',
  product: 'product',
  url: 'url',
};

export const FILE_REDIRECTION_TARGET_LABELS: Record<
  NormalizedFileRedirectionTarget,
  FileRedirectionTargetOption
> = {
  collection: 'Collection',
  'custom-block': 'Custom Block',
  page: 'Page',
  product: 'Product',
  url: 'URL',
};

export const FILE_REDIRECTION_TARGET_VALUE_OPTIONS: Record<
  NormalizedFileRedirectionTarget,
  readonly string[]
> = {
  collection: ['Collection #1', 'Collection #2', 'Collection #3'],
  'custom-block': ['Custom Block #1', 'Custom Block #2'],
  page: ['Page #1', 'Page #2'],
  product: ['Product #1', 'Product #2'],
  url: ['https://example.com', 'https://shop.example.com'],
};

export const FILE_REDIRECTION_DEFAULT_TARGET: FileRedirectionTargetOption = 'Collection';

export const FILE_REDIRECTION_DEFAULT_TARGET_VALUE = 'Collection #1';

export const FILE_REDIRECTION_URL_PLACEHOLDER = 'https://example.com';
