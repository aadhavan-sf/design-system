import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ChangeEvent,
  type DragEvent,
} from 'react';
import type { Icon } from '@phosphor-icons/react';
import {
  CircleNotch,
  MonitorArrowUp,
  Plus,
  Repeat,
  Trash,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './uploadFile.css';

export type UploadLayout =
  | 'horizontal'
  | 'vertical'
  | 'Horizontal'
  | 'Vertical'
  | 'Horizontal + Single'
  | 'Vertical + Single'
  | 'Horizontal + Multiple'
  | 'Vertical + Multiple';
export type UploadMode = 'single' | 'multiple' | 'Single' | 'Multiple';
export type UploadDropzoneState = string;
export type UploadTileSize = string;
export type UploadTileStatus = 'default' | 'hovered' | 'loader' | 'Default' | 'Hovered' | 'Loader';
export type UploadTileType = 'image' | 'uploader' | 'Image' | 'Uploader';
export type UploadItemState =
  | 'completed'
  | 'completed-hover'
  | 'complete'
  | 'add-empty'
  | 'add-hover'
  | 'add-loader'
  | 'Completed'
  | 'Complete'
  | 'Completed + Hover'
  | 'Completed + 1 Empty'
  | 'Completed + 1 Loader'
  | 'Completed + 1 Hover';
export type UploadMultipleState = 'complete' | 'add-empty' | 'add-hover' | 'add-loader';

type NormalizedLayout = 'horizontal' | 'vertical';
type NormalizedMode = 'single' | 'multiple';
type NormalizedDropzoneState = 'enabled' | 'hover' | 'focus' | 'disabled';
type NormalizedTileSize = 'square' | 'iphone' | 'ipad' | 'android';
type NormalizedTileStatus = 'default' | 'hovered' | 'loader';
type NormalizedTileType = 'image' | 'uploader';
type NormalizedItemState = 'completed' | 'completed-hover' | UploadMultipleState;

export interface ImageAspectRatioProps {
  size?: UploadTileSize;
  status?: UploadTileStatus;
  type?: UploadTileType;
  index?: number;
  imageUrl?: string;
  className?: string;
}

export interface UploadFileBaseProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrop'> {
  layout?: UploadLayout;
  state?: UploadDropzoneState;
  supportingText?: boolean;
  title?: string;
  description?: string;
  onBrowse?: () => void;
  onDropFiles?: (files: File[]) => void;
}

interface UploadActionButtonProps {
  destructive?: boolean;
  hover?: boolean;
  icon: Icon;
  label: string;
  onClick?: () => void;
}

export interface UploadFileItemProps {
  type?: UploadMode;
  state?: UploadItemState;
  files?: File[];
  fileName?: string;
  fileSize?: string;
  imageUrls?: string[];
  tileSize?: UploadTileSize;
  replaceLabel?: string;
  deleteLabel?: string;
  className?: string;
  onReplace?: () => void;
  onDelete?: () => void;
}

export interface UploadFileProps {
  layout?: UploadLayout;
  mode?: UploadMode;
  filesQueued?: boolean;
  dropzoneState?: UploadDropzoneState;
  supportingText?: boolean;
  multipleState?: UploadMultipleState;
  fileName?: string;
  fileSize?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  imageUrls?: string[];
  className?: string;
  onFilesChange?: (files: File[]) => void;
  onReplace?: () => void;
  onDelete?: () => void;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue<T extends string>(value: string | undefined, aliases: Record<string, T> = {}) {
  if (value === undefined) {
    return undefined;
  }

  return aliases[value] ?? value;
}

function formatFileSize(size: number) {
  if (!Number.isFinite(size)) {
    return '200 KB';
  }

  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getDisplayFile(files: File[], fallbackName: string, fallbackSize: string) {
  const file = files?.[0];

  if (!file) {
    return {
      name: fallbackName,
      size: fallbackSize,
    };
  }

  return {
    name: file.name,
    size: formatFileSize(file.size),
  };
}

function getPreviewUrls(files: File[]) {
  return files
    .filter((file) => file.type?.startsWith('image/'))
    .map((file) => URL.createObjectURL(file));
}

export function ImageAspectRatio({
  size = 'ipad',
  status = 'default',
  type = 'image',
  index = 0,
  imageUrl,
  className,
}: ImageAspectRatioProps) {
  const normalizedSize = normalizeValue(size, {
    Square: 'square',
    iPhone: 'iphone',
    iPad: 'ipad',
    Android: 'android',
  }) as NormalizedTileSize;
  const normalizedStatus = normalizeValue(status, {
    Default: 'default',
    Hovered: 'hovered',
    Loader: 'loader',
  }) as NormalizedTileStatus;
  const normalizedType = normalizeValue(type, {
    Image: 'image',
    Uploader: 'uploader',
  }) as NormalizedTileType;
  const isUploader = normalizedType === 'uploader';
  const imageStyle = imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined;

  return (
    <div
      className={buildClassName([
        'storybook-upload-tile',
        `storybook-upload-tile--${normalizedSize}`,
        `storybook-upload-tile--${normalizedStatus}`,
        `storybook-upload-tile--${normalizedType}`,
        className,
      ])}
    >
      {isUploader ? (
        <Plus
          aria-hidden="true"
          className="storybook-upload-tile__plus"
          size={32}
          weight="regular"
        />
      ) : (
        <>
          <div
            className="storybook-upload-tile__image"
            data-image-index={index % 8}
            style={imageStyle}
          />
          {normalizedStatus !== 'default' && <span className="storybook-upload-tile__scrim" />}
          {normalizedStatus === 'loader' && (
            <CircleNotch
              aria-hidden="true"
              className="storybook-upload-tile__loader"
              size={24}
              weight="regular"
            />
          )}
        </>
      )}
    </div>
  );
}

export function UploadFileBase({
  layout = 'horizontal',
  state = 'enabled',
  supportingText = true,
  title = 'Drag and drop or browse files',
  description = 'Supporting text',
  disabled = false,
  className,
  onBrowse,
  onDropFiles,
}: UploadFileBaseProps) {
  const [isDragging, setIsDragging] = useState(false);
  const normalizedLayout = normalizeValue(layout, {
    Horizontal: 'horizontal',
    Vertical: 'vertical',
  }) as NormalizedLayout;
  const normalizedState = normalizeValue(state, {
    Enabled: 'enabled',
    Hover: 'hover',
    Focus: 'focus',
    Disabled: 'disabled',
  }) as NormalizedDropzoneState;
  const isDisabled = disabled || normalizedState === 'disabled';
  const visualState = isDragging && !isDisabled ? 'hover' : normalizedState;

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (isDisabled) {
      return;
    }

    onDropFiles?.(Array.from(event.dataTransfer.files));
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={buildClassName([
        'storybook-upload-dropzone',
        `storybook-upload-dropzone--${normalizedLayout}`,
        `storybook-upload-dropzone--${visualState}`,
        className,
      ])}
      onClick={isDisabled ? undefined : onBrowse}
      onDragLeave={() => setIsDragging(false)}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDrop={handleDrop}
    >
      <MonitorArrowUp
        aria-hidden="true"
        className="storybook-upload-dropzone__icon"
        size={24}
        weight="regular"
      />
      <span className="storybook-upload-dropzone__copy">
        <Text
          as="span"
          variant="text-md"
          weight="medium"
          color="currentColor"
          className="storybook-upload-dropzone__title"
        >
          {title}
        </Text>
        {supportingText && (
          <Text
            as="span"
            variant="text-sm"
            weight="regular"
            color="currentColor"
            className="storybook-upload-dropzone__description"
          >
            {description}
          </Text>
        )}
      </span>
    </button>
  );
}

function UploadActionButton({
  destructive = false,
  hover = false,
  icon,
  label,
  onClick,
}: UploadActionButtonProps) {
  const Icon = icon;

  return (
    <button
      type="button"
      className={buildClassName([
        'storybook-upload-action',
        destructive && 'storybook-upload-action--destructive',
        hover && 'storybook-upload-action--hover',
      ])}
      onClick={onClick}
    >
      <Icon aria-hidden="true" size={20} weight="regular" />
      <Text
        as="span"
        variant="text-sm"
        weight="semibold"
        color="currentColor"
      >
        {label}
      </Text>
    </button>
  );
}

export function UploadFileItem({
  type = 'single',
  state = 'completed',
  files = [],
  fileName = 'File_name.ext',
  fileSize = '200 KB',
  imageUrls = [],
  tileSize = 'ipad',
  replaceLabel = 'Replace Logo',
  deleteLabel = 'Delete',
  className,
  onReplace,
  onDelete,
}: UploadFileItemProps) {
  const normalizedType = normalizeValue(type, {
    Single: 'single',
    Multiple: 'multiple',
  }) as NormalizedMode;
  const normalizedState = normalizeValue(state, {
    Completed: 'completed',
    Complete: 'complete',
    'Completed + Hover': 'completed-hover',
    'Completed + 1 Empty': 'add-empty',
    'Completed + 1 Loader': 'add-loader',
    'Completed + 1 Hover': 'add-hover',
  }) as NormalizedItemState;
  const isMultiple = normalizedType === 'multiple';
  const displayedFile = getDisplayFile(files, fileName, fileSize);
  const tileCount = isMultiple && normalizedState === 'complete' ? 8 : 7;
  const hasAddTile = isMultiple && ['complete', 'add-empty', 'add-hover', 'add-loader'].includes(normalizedState);
  const addTileStatus = normalizedState === 'add-loader'
    ? 'loader'
    : normalizedState === 'add-hover' ? 'hovered' : 'default';
  const addTileType = normalizedState === 'add-empty' ? 'uploader' : 'image';

  if (isMultiple) {
    return (
      <div className={buildClassName(['storybook-upload-item', 'storybook-upload-item--multiple', className])}>
        <div className="storybook-upload-grid">
          {Array.from({ length: tileCount }).map((_, index) => (
            <ImageAspectRatio
              key={`image-${index}`}
              imageUrl={imageUrls[index]}
              index={index}
              size={tileSize}
            />
          ))}
          {hasAddTile && (
            <ImageAspectRatio
              imageUrl={imageUrls[tileCount]}
              index={tileCount}
              size={tileSize}
              status={addTileStatus}
              type={addTileType}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={buildClassName([
        'storybook-upload-item',
        'storybook-upload-item--single',
        normalizedState === 'completed-hover' && 'storybook-upload-item--hover',
        className,
      ])}
    >
      <div className="storybook-upload-item__thumbnail">
        <div className="storybook-upload-item__thumbnail-image" />
      </div>
      <div className="storybook-upload-item__content">
        <div className="storybook-upload-item__copy">
          <Text
            as="span"
            variant="text-sm"
            weight="medium"
            color="currentColor"
            className="storybook-upload-item__name"
          >
            {displayedFile.name}
          </Text>
          <Text
            as="span"
            variant="text-xs"
            weight="regular"
            color="currentColor"
            className="storybook-upload-item__size"
          >
            {displayedFile.size}
          </Text>
        </div>
        <div className="storybook-upload-item__actions">
          <UploadActionButton
            hover={normalizedState === 'completed-hover'}
            icon={Repeat}
            label={replaceLabel}
            onClick={onReplace}
          />
          <UploadActionButton
            destructive
            hover={normalizedState === 'completed-hover'}
            icon={Trash}
            label={deleteLabel}
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export function UploadFile({
  layout = 'horizontal',
  mode = 'single',
  filesQueued = false,
  dropzoneState = 'enabled',
  supportingText = true,
  multipleState = 'complete',
  fileName = 'File_name.ext',
  fileSize = '200 KB',
  accept,
  multiple,
  disabled = false,
  imageUrls = [],
  className,
  onFilesChange,
  onReplace,
  onDelete,
}: UploadFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [hasClearedQueuedFiles, setHasClearedQueuedFiles] = useState(false);
  const normalizedLayout = normalizeValue(layout, {
    Horizontal: 'horizontal',
    Vertical: 'vertical',
    'Horizontal + Single': 'horizontal',
    'Vertical + Single': 'vertical',
    'Horizontal + Multiple': 'horizontal',
    'Vertical + Multiple': 'vertical',
  }) as NormalizedLayout;
  const normalizedMode = normalizeValue(mode, {
    Single: 'single',
    Multiple: 'multiple',
  }) as NormalizedMode;
  const isMultiple = normalizedMode === 'multiple';

  useEffect(() => () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewUrls]);

  const commitFiles = (nextFiles: File[], { preserveClearedState = false } = {}) => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setPreviewUrls(getPreviewUrls(nextFiles));
    if (!preserveClearedState) {
      setHasClearedQueuedFiles(false);
    }
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    commitFiles(Array.from(event.target.files ?? []));
    event.target.value = '';
  };

  const hasQueuedFiles = (filesQueued && !hasClearedQueuedFiles) || files.length > 0;
  const resolvedImageUrls = previewUrls.length > 0 ? previewUrls : imageUrls;

  const handleDelete = () => {
    setHasClearedQueuedFiles(true);
    commitFiles([], { preserveClearedState: true });
    onDelete?.();
  };

  return (
    <div
      className={buildClassName([
        'storybook-upload-file',
        `storybook-upload-file--${normalizedLayout}`,
        className,
      ])}
    >
      <input
        ref={inputRef}
        accept={accept}
        className="storybook-upload-file__input"
        disabled={disabled}
        multiple={multiple ?? isMultiple}
        type="file"
        onChange={handleInputChange}
      />

      {hasQueuedFiles ? (
        <UploadFileItem
          fileName={fileName}
          fileSize={fileSize}
          files={files}
          imageUrls={resolvedImageUrls}
          state={isMultiple ? multipleState : 'completed'}
          type={normalizedMode}
          onDelete={handleDelete}
          onReplace={() => {
            inputRef.current?.click();
            onReplace?.();
          }}
        />
      ) : (
        <UploadFileBase
          disabled={disabled}
          layout={normalizedLayout}
          state={dropzoneState}
          supportingText={supportingText}
          onBrowse={() => inputRef.current?.click()}
          onDropFiles={commitFiles}
        />
      )}
    </div>
  );
}
