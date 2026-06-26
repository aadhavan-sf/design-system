import {
  UPLOAD_TILE_LAYOUT_ALIASES,
  UPLOAD_TILE_LAYOUT_OPTIONS,
  UPLOAD_TILE_STATE_OPTIONS,
  type UploadTileLayoutOption,
  type UploadTileStateOption,
} from './uploadFile.constants';

export { UPLOAD_TILE_LAYOUT_OPTIONS, UPLOAD_TILE_STATE_OPTIONS };

export function isTileItemLayout(itemLayout: string | undefined) {
  return UPLOAD_TILE_LAYOUT_OPTIONS.includes(itemLayout as UploadTileLayoutOption);
}

export function resolveTileLayout(itemLayout: UploadTileLayoutOption | string | undefined) {
  return UPLOAD_TILE_LAYOUT_ALIASES[itemLayout ?? 'Square'] ?? 'square';
}

export function resolveTileState(tileState: UploadTileStateOption | string | undefined) {
  switch (tileState) {
    case 'Hover':
      return 'hover';
    case 'Loading':
      return 'loading';
    case 'Default':
    default:
      return 'default';
  }
}
