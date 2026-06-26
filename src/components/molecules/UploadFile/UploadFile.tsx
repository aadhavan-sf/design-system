import { useRef, type ChangeEvent } from 'react';

import { MultipleImages, type MultipleImagesSlot } from './MultipleImages';
import { UploadFileBase, type UploadFileBaseState } from './UploadFileBase';
import { UploadFileItem, type UploadFileItemState } from './UploadFileItem';
import {
  UPLOAD_FILE_LAYOUT_ALIASES,
  UPLOAD_FILE_MAIN_STATE_ALIASES,
  UPLOAD_FILE_WIDTH_CLASS,
  type UploadFileLayoutOption,
  type UploadFileMainStateOption,
  type UploadFileDropzoneStateOption,
} from './uploadFile.constants';
import {
  isUploadFileMultipleState,
  resolveUploadFileDropzoneState,
  resolveUploadFileMultipleLayout,
} from './uploadFileStory.utils';

import './uploadFile.css';

export type { MultipleImagesSlot };

export type UploadFileLayout =
  | 'horizontal'
  | 'vertical'
  | UploadFileLayoutOption;

export type UploadFileState = UploadFileItemState | UploadFileMainStateOption;

export interface UploadFileProps {
  layout?: UploadFileLayout;
  showSupportText?: boolean;
  showDescription?: boolean;
  dropzoneState?: UploadFileBaseState | UploadFileDropzoneStateOption;
  filesQueued?: boolean;
  state?: UploadFileState;
  slots?: MultipleImagesSlot[];
  progress?: number;
  showFileSize?: boolean;
  fileName?: string;
  fileSize?: string;
  errorTitle?: string;
  errorDescription?: string;
  retryLabel?: string;
  replaceLabel?: string;
  deleteLabel?: string;
  title?: string;
  description?: string;
  footerText?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  onBrowse?: () => void;
  onFilesChange?: (files: File[]) => void;
  onReplace?: () => void;
  onDelete?: () => void;
  onRetry?: () => void;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function normalizeUploadFileLayout(layout: UploadFileLayout | undefined): 'horizontal' | 'vertical' {
  return UPLOAD_FILE_LAYOUT_ALIASES[layout ?? 'horizontal'] ?? 'horizontal';
}

function normalizeUploadFileItemState(state: UploadFileState | undefined): UploadFileItemState {
  const normalized = UPLOAD_FILE_MAIN_STATE_ALIASES[state ?? 'Uploading'] ?? state ?? 'uploading-media';

  return normalized as UploadFileItemState;
}

export function UploadFile({
  layout = 'horizontal',
  showSupportText = true,
  showDescription = true,
  dropzoneState = 'default',
  filesQueued = false,
  state = 'Uploading',
  slots,
  progress = 75,
  showFileSize = true,
  fileName = 'File_name.ext',
  fileSize = '200 KB',
  errorTitle,
  errorDescription,
  retryLabel,
  replaceLabel,
  deleteLabel,
  title,
  description,
  footerText,
  accept,
  multiple = false,
  disabled = false,
  className,
  onBrowse,
  onFilesChange,
  onReplace,
  onDelete,
  onRetry,
}: UploadFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const normalizedLayout = normalizeUploadFileLayout(layout);
  const normalizedItemState = normalizeUploadFileItemState(state);
  const normalizedDropzoneState = resolveUploadFileDropzoneState(dropzoneState) as UploadFileBaseState;
  const isMultipleState = isUploadFileMultipleState(state);
  const showQueuedItem = filesQueued && !isMultipleState;

  const handleBrowse = () => {
    onBrowse?.();

    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFilesChange?.(Array.from(event.target.files ?? []));
    event.target.value = '';
  };

  const handleReplace = () => {
    onReplace?.();

    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div
      className={buildClassName([
        'storybook-upload-file relative flex flex-col gap-2',
        UPLOAD_FILE_WIDTH_CLASS,
        className,
      ])}
    >
      <input
        ref={inputRef}
        accept={accept}
        className="storybook-upload-file__input"
        disabled={disabled}
        multiple={multiple || isMultipleState}
        type="file"
        onChange={handleInputChange}
      />

      {isMultipleState ? (
        <MultipleImages
          layout={resolveUploadFileMultipleLayout(state)}
          slots={slots}
          onBrowse={handleBrowse}
        />
      ) : showQueuedItem ? (
        <UploadFileItem
          deleteLabel={deleteLabel}
          errorDescription={errorDescription}
          errorTitle={errorTitle}
          fileName={fileName}
          fileSize={fileSize}
          progress={progress}
          replaceLabel={replaceLabel}
          retryLabel={retryLabel}
          showFileSize={showFileSize}
          state={normalizedItemState}
          onDelete={onDelete}
          onReplace={handleReplace}
          onRetry={onRetry}
        />
      ) : (
        <UploadFileBase
          description={description}
          disabled={disabled || normalizedDropzoneState === 'disabled'}
          footerText={footerText}
          layout={normalizedLayout}
          showDescription={showDescription}
          showSupportText={showSupportText}
          state={normalizedDropzoneState}
          title={title}
          onBrowse={handleBrowse}
          onDropFiles={onFilesChange}
        />
      )}
    </div>
  );
}

UploadFile.displayName = 'Upload File';
