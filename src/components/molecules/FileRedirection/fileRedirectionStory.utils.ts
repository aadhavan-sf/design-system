import {
  FILE_REDIRECTION_ACTION_ALIASES,
  FILE_REDIRECTION_ACTION_OPTIONS,
  FILE_REDIRECTION_DEFAULT_TARGET,
  FILE_REDIRECTION_DEFAULT_TARGET_VALUE,
  FILE_REDIRECTION_TARGET_ALIASES,
  FILE_REDIRECTION_TARGET_LABELS,
  FILE_REDIRECTION_TARGET_OPTIONS,
  FILE_REDIRECTION_TARGET_VALUE_OPTIONS,
  FILE_REDIRECTION_TYPE_ALIASES,
  FILE_REDIRECTION_TYPE_OPTIONS,
  type FileRedirectionActionOption,
  type FileRedirectionTargetOption,
  type FileRedirectionTypeOption,
  type NormalizedFileRedirectionTarget,
} from './fileRedirection.constants';

export {
  FILE_REDIRECTION_ACTION_OPTIONS,
  FILE_REDIRECTION_TARGET_OPTIONS,
  FILE_REDIRECTION_TYPE_OPTIONS,
};

export type NormalizedFileRedirectionType = 'with-redirection' | 'without-redirection';

export type NormalizedFileRedirectionAction = 'upload-file' | 'file-uploaded' | 'file-hover-effect';

export function resolveFileRedirectionType(
  type: FileRedirectionTypeOption | string | undefined,
): NormalizedFileRedirectionType {
  return FILE_REDIRECTION_TYPE_ALIASES[type ?? 'With Redirection'] ?? 'with-redirection';
}

export function resolveFileRedirectionAction(
  action: FileRedirectionActionOption | string | undefined,
): NormalizedFileRedirectionAction {
  return FILE_REDIRECTION_ACTION_ALIASES[action ?? 'Upload File'] ?? 'upload-file';
}

export function isFileRedirectionUploadedAction(
  action: NormalizedFileRedirectionAction,
): boolean {
  return action === 'file-uploaded' || action === 'file-hover-effect';
}

export interface FileRedirectionUploadedPreviewConfig {
  revealOverlayOnHover?: boolean;
  forceOverlay?: boolean;
  forceDeleteHover?: boolean;
}

export function getFileRedirectionUploadedPreviewConfig(
  action: NormalizedFileRedirectionAction,
): FileRedirectionUploadedPreviewConfig {
  if (action === 'file-uploaded') {
    return { revealOverlayOnHover: true };
  }

  if (action === 'file-hover-effect') {
    return { forceOverlay: true };
  }

  return {};
}

export function getUploadFileDropzoneStateForAction(
  action: NormalizedFileRedirectionAction,
): 'default' | 'hover' {
  return 'default';
}

export function resolveFileRedirectionTarget(
  target: FileRedirectionTargetOption | string | undefined,
): NormalizedFileRedirectionTarget {
  return FILE_REDIRECTION_TARGET_ALIASES[target ?? FILE_REDIRECTION_DEFAULT_TARGET] ?? 'collection';
}

export function getFileRedirectionTargetOptions(
  target: NormalizedFileRedirectionTarget,
): readonly string[] {
  return FILE_REDIRECTION_TARGET_VALUE_OPTIONS[target];
}

export function getDefaultFileRedirectionTargetValue(
  target: NormalizedFileRedirectionTarget,
): string {
  return FILE_REDIRECTION_TARGET_VALUE_OPTIONS[target][0] ?? FILE_REDIRECTION_DEFAULT_TARGET_VALUE;
}

export function getFileRedirectionTargetLabel(
  target: NormalizedFileRedirectionTarget,
): FileRedirectionTargetOption {
  return FILE_REDIRECTION_TARGET_LABELS[target];
}
