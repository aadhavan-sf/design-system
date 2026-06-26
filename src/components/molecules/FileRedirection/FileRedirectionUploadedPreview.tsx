import { useState, type MouseEvent } from 'react';
import { Repeat, Trash } from '@phosphor-icons/react';

import { UPLOAD_FILE_DEFAULT_PREVIEW_IMAGE } from '../UploadFile/uploadFile.constants';

import './fileRedirectionUploadedPreview.css';

export interface FileRedirectionUploadedPreviewProps {
  disabled?: boolean;
  /** Reveal overlay + default icons when the preview is hovered (File Uploaded). */
  revealOverlayOnHover?: boolean;
  /** Always show overlay + default icons (File Hover Effect default state). */
  forceOverlay?: boolean;
  /** Force delete icon hover styling (Icon Hover effect). */
  forceDeleteHover?: boolean;
  onReplace?: () => void;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function getPreviewIconButtonClassName({
  isDelete,
  isHovered,
  isDeleteAnimating,
}: {
  isDelete: boolean;
  isHovered: boolean;
  isDeleteAnimating: boolean;
}) {
  return buildClassName([
    'storybook-file-redirection-preview-icon',
    'box-border inline-flex h-[36px] w-[36px] shrink-0 items-center justify-center',
    'rounded-2 border border-solid p-2',
    'transition-colors duration-150',
    isDelete
      ? isHovered
        ? 'border-error-200 bg-error-50 text-error-600'
        : 'border-neutral-200 bg-neutral-0 text-neutral-600'
      : isHovered
        ? 'border-neutral-200 bg-neutral-50 text-neutral-600'
        : 'border-neutral-200 bg-neutral-0 text-neutral-600',
    isDeleteAnimating && 'storybook-file-redirection-preview-icon--delete-animating',
  ]);
}

export function FileRedirectionUploadedPreview({
  disabled = false,
  revealOverlayOnHover = false,
  forceOverlay = false,
  forceDeleteHover = false,
  onReplace,
}: FileRedirectionUploadedPreviewProps) {
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
  const [isRepeatHovered, setIsRepeatHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isDeleteAnimating, setIsDeleteAnimating] = useState(false);

  const showOverlay =
    forceOverlay || (revealOverlayOnHover && isPreviewHovered);

  const isRepeatIconHovered = isRepeatHovered && !forceDeleteHover;
  const isDeleteIconHovered = forceDeleteHover || isDeleteHovered;

  const handlePreviewMouseLeave = () => {
    setIsPreviewHovered(false);
    setIsRepeatHovered(false);
    setIsDeleteHovered(false);
  };

  const handleReplaceClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (disabled) {
      return;
    }

    onReplace?.();
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (disabled || isDeleteAnimating) {
      return;
    }

    setIsDeleteAnimating(true);
    window.setTimeout(() => {
      setIsDeleteAnimating(false);
    }, 180);
  };

  return (
    <div
      className="relative h-[100px] min-h-[100px] w-full overflow-hidden rounded-2 bg-neutral-0"
      onMouseEnter={() => {
        if (revealOverlayOnHover) {
          setIsPreviewHovered(true);
        }
      }}
      onMouseLeave={handlePreviewMouseLeave}
    >
      <img
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover"
        src={UPLOAD_FILE_DEFAULT_PREVIEW_IMAGE}
      />

      <span
        aria-hidden="true"
        className={buildClassName([
          'absolute inset-0 transition-opacity duration-150',
          showOverlay ? 'opacity-100' : 'pointer-events-none opacity-0',
        ])}
        style={{
          background: 'color-mix(in srgb, var(--neutral_1000) 30%, transparent)',
        }}
      />

      <div
        className={buildClassName([
          'absolute inset-0 z-[1] flex items-center justify-center gap-2 transition-opacity duration-150',
          showOverlay ? 'opacity-100' : 'pointer-events-none opacity-0',
        ])}
      >
        <button
          type="button"
          aria-label="Replace file"
          className={getPreviewIconButtonClassName({
            isDelete: false,
            isHovered: isRepeatIconHovered,
            isDeleteAnimating: false,
          })}
          disabled={disabled}
          onClick={handleReplaceClick}
          onMouseEnter={() => setIsRepeatHovered(true)}
          onMouseLeave={() => setIsRepeatHovered(false)}
        >
          <Repeat aria-hidden="true" size={20} weight="regular" />
        </button>

        <button
          type="button"
          aria-label="Delete file"
          className={getPreviewIconButtonClassName({
            isDelete: true,
            isHovered: isDeleteIconHovered,
            isDeleteAnimating,
          })}
          disabled={disabled}
          onClick={handleDeleteClick}
          onMouseEnter={() => setIsDeleteHovered(true)}
          onMouseLeave={() => setIsDeleteHovered(false)}
        >
          <Trash aria-hidden="true" size={20} weight="regular" />
        </button>
      </div>
    </div>
  );
}

FileRedirectionUploadedPreview.displayName = 'File Redirection Uploaded Preview';
