import {
  MULTIPLE_IMAGES_CONTAINER_CLASS,
  MULTIPLE_IMAGES_CONTAINER_HEIGHT_CLASSES,
  MULTIPLE_IMAGES_DEFAULT_SLOTS,
  MULTIPLE_IMAGES_GRID_BASE_CLASS,
  MULTIPLE_IMAGES_GRID_ROW_CLASSES,
  UPLOAD_TILE_LAYOUT_ALIASES,
  type UploadTileLayout,
  type UploadTileLayoutOption,
} from './uploadFile.constants';
import { UploadFileBase, type UploadFileBaseState } from './UploadFileBase';
import { UploadFileImageTile, type UploadFileImageTileState } from './UploadFileImageTile';

export type MultipleImagesLayout = UploadTileLayout | UploadTileLayoutOption | string;

export type MultipleImagesSlot =
  | {
      kind: 'item';
      layout?: UploadTileLayout;
      state?: UploadFileImageTileState;
    }
  | {
      kind: 'base';
      layout?: UploadTileLayout;
      state?: UploadFileBaseState;
    };

export interface MultipleImagesProps {
  layout?: MultipleImagesLayout;
  slots?: MultipleImagesSlot[];
  className?: string;
  onBrowse?: () => void;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function normalizeMultipleImagesLayout(layout: MultipleImagesLayout | undefined): UploadTileLayout {
  return UPLOAD_TILE_LAYOUT_ALIASES[layout ?? 'square'] ?? 'square';
}

function renderSlot(
  slot: MultipleImagesSlot,
  index: number,
  layout: UploadTileLayout,
  onBrowse?: () => void,
) {
  const slotLayout = slot.layout ?? layout;

  if (slot.kind === 'base') {
    return (
      <UploadFileBase
        key={`base-${index}`}
        layout={slotLayout}
        showDescription={false}
        showSupportText={false}
        state={slot.state ?? 'default'}
        onBrowse={onBrowse}
      />
    );
  }

  return (
    <UploadFileImageTile
      key={`item-${index}`}
      layout={slotLayout}
      state={slot.state ?? 'default'}
    />
  );
}

export function MultipleImages({
  layout = 'square',
  slots = [...MULTIPLE_IMAGES_DEFAULT_SLOTS],
  className,
  onBrowse,
}: MultipleImagesProps) {
  const normalizedLayout = normalizeMultipleImagesLayout(layout);

  return (
    <div
      className={buildClassName([
        MULTIPLE_IMAGES_CONTAINER_CLASS,
        MULTIPLE_IMAGES_CONTAINER_HEIGHT_CLASSES[normalizedLayout],
        className,
      ])}
    >
      <div
        className={buildClassName([
          MULTIPLE_IMAGES_GRID_BASE_CLASS,
          MULTIPLE_IMAGES_GRID_ROW_CLASSES[normalizedLayout],
        ])}
      >
        {slots.map((slot, index) => renderSlot(slot, index, normalizedLayout, onBrowse))}
      </div>
    </div>
  );
}

MultipleImages.displayName = 'Multiple Images';
