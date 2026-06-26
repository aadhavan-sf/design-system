import { Spinner } from '@phosphor-icons/react';

import {
  UPLOAD_FILE_SQUARE_PREVIEW_IMAGE,
  UPLOAD_TILE_LAYOUT_ALIASES,
  UPLOAD_TILE_LAYOUT_CLASS_NAMES,
  type UploadTileLayout,
} from './uploadFile.constants';

import './uploadFileImageTile.css';

export type UploadFileImageTileState =
  | 'default'
  | 'hover'
  | 'loading'
  | 'Default'
  | 'Hover'
  | 'Loading';

export interface UploadFileImageTileProps {
  layout?: UploadTileLayout | string;
  state?: UploadFileImageTileState;
  index?: number;
  imageUrl?: string;
  className?: string;
}

type NormalizedTileState = 'default' | 'hover' | 'loading';

const TILE_STATE_ALIASES: Record<string, NormalizedTileState> = {
  default: 'default',
  hover: 'hover',
  loading: 'loading',
  Default: 'default',
  Hover: 'hover',
  Loading: 'loading',
};

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function normalizeTileLayout(layout: string | undefined): UploadTileLayout {
  return UPLOAD_TILE_LAYOUT_ALIASES[layout ?? 'square'] ?? 'square';
}

function normalizeTileState(state: UploadFileImageTileState | undefined): NormalizedTileState {
  return TILE_STATE_ALIASES[state ?? 'default'] ?? 'default';
}

export function UploadFileImageTile({
  layout = 'square',
  state = 'default',
  index = 0,
  imageUrl = UPLOAD_FILE_SQUARE_PREVIEW_IMAGE,
  className,
}: UploadFileImageTileProps) {
  const normalizedLayout = normalizeTileLayout(layout);
  const normalizedState = normalizeTileState(state);
  const isHover = normalizedState === 'hover';
  const isLoading = normalizedState === 'loading';

  return (
    <div
      className={buildClassName([
        'storybook-upload-image-tile relative shrink-0 overflow-hidden',
        UPLOAD_TILE_LAYOUT_CLASS_NAMES[normalizedLayout],
        className,
      ])}
    >
      {imageUrl ? (
        <img
          alt=""
          aria-hidden="true"
          className={buildClassName([
            'storybook-upload-image-tile__image',
            isLoading && 'storybook-upload-image-tile__image--blurred',
          ])}
          src={imageUrl}
        />
      ) : (
        <div
          className={buildClassName([
            'storybook-upload-image-tile__image storybook-upload-image-tile__image--placeholder',
            isLoading && 'storybook-upload-image-tile__image--blurred',
          ])}
          data-image-index={index % 8}
        />
      )}
      <span
        aria-hidden="true"
        className={buildClassName([
          'storybook-upload-image-tile__overlay',
          (isHover || isLoading) && 'storybook-upload-image-tile__overlay--visible',
        ])}
      />
      {isLoading && (
        <Spinner
          aria-hidden="true"
          aria-label="Loading"
          className="storybook-upload-image-tile__loader storybook-upload-image-tile__loader--spinning text-neutral-0"
          size={24}
          weight="regular"
        />
      )}
    </div>
  );
}
