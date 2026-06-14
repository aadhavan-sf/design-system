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
export type UploadDropzoneSize = 'default' | 'small';

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
  size?: UploadDropzoneSize;
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
  size?: UploadDropzoneSize;
  title?: string;
  description?: string;
  onFilesChange?: (files: File[]) => void;
  onReplace?: () => void;
  onDelete?: () => void;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
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

export const UPLOAD_FILE_INPUT_CLASSNAME = 'storybook-upload-file__input';

function getTileImageClassName(status: NormalizedTileStatus) {
  return buildClassName([
    'storybook-upload-tile__image size-full',
    status === 'loader' && 'blur-[2px]',
  ]);
}

function getTileScrimClassName(status: NormalizedTileStatus) {
  return buildClassName([
    'absolute inset-0',
    status === 'loader' ? 'bg-black/30' : 'bg-black/20',
  ]);
}
function getTileSizeClassName(size: NormalizedTileSize) {
  const sizeClasses = {
    square: 'h-[72px] w-[72px]',
    iphone: 'h-[155px] w-[72px]',
    ipad: 'h-[104px] w-[72px]',
    android: 'h-[158px] w-[72px]',
  };

  return sizeClasses[size];
}

function getTileClassName({
  size,
  status,
  type,
  className,
}: {
  size: NormalizedTileSize;
  status: NormalizedTileStatus;
  type: NormalizedTileType;
  className?: string;
}) {
  const isUploader = type === 'uploader';

  return buildClassName([
    'storybook-upload-tile relative box-border shrink-0 overflow-hidden rounded-4 border border-solid border-neutral-200',
    getTileSizeClassName(size),
    isUploader && 'inline-flex items-center justify-center rounded-2 border-dashed bg-neutral-0 text-brand-400',
    className,
  ]);
}

function getDropzoneClassName({
  layout,
  size = 'default',
  visualState,
  isDisabled,
  className,
}: {
  layout: NormalizedLayout;
  size?: UploadDropzoneSize;
  visualState: NormalizedDropzoneState;
  isDisabled: boolean;
  className?: string;
}) {
  const isHorizontal = layout === 'horizontal';
  const isHovered = visualState === 'hover';
  const isFocused = visualState === 'focus';
  const isSmall = size === 'small';

  return buildClassName([
    'storybook-upload-dropzone box-border flex border border-dashed border-neutral-200',
    'rounded-2 bg-neutral-0 font-sans text-left',
    isSmall ? 'w-full' : 'w-[500px]',
    isHorizontal
      ? isSmall
        ? 'items-start gap-2 p-3'
        : 'items-start gap-3 p-4'
      : isSmall
        ? 'min-h-24 flex-col items-center justify-center gap-3 px-4 py-4 text-center'
        : 'min-h-[128px] flex-col items-center justify-center gap-4 px-[54px] py-6 text-center',
    isDisabled && 'cursor-not-allowed bg-neutral-50 text-neutral-400',
    !isDisabled && isHovered && 'bg-neutral-25',
    !isDisabled && !isHovered && 'hover:bg-neutral-25',
    !isDisabled && isFocused && 'shadow-focus-brand',
    !isDisabled && 'focus-visible:bg-neutral-0 focus-visible:shadow-focus-brand',
    className,
  ]);
}

function getDropzoneIconClassName(isDisabled: boolean) {
  return buildClassName([
    'shrink-0',
    isDisabled ? 'text-neutral-400' : 'text-brand-400',
  ]);
}

function getDropzoneCopyClassName(layout: NormalizedLayout, size: UploadDropzoneSize = 'default') {
  return buildClassName([
    'flex min-w-0 flex-col gap-1',
    layout === 'horizontal' && size === 'default' && 'w-[252px]',
    layout === 'vertical' && 'items-center',
  ]);
}

function getDropzoneTitleClassName(isDisabled: boolean) {
  return buildClassName([
    'whitespace-nowrap',
    isDisabled ? 'text-current' : 'text-neutral-900',
  ]);
}

function getDropzoneDescriptionClassName(isDisabled: boolean) {
  return buildClassName([
    'whitespace-nowrap',
    isDisabled ? 'text-current' : 'text-neutral-600',
  ]);
}

function getUploadItemClassName({
  isMultiple,
  className,
}: {
  isMultiple: boolean;
  className?: string;
}) {
  return buildClassName([
    'storybook-upload-item box-border w-[500px] rounded-2 border border-solid border-neutral-200',
    isMultiple
      ? 'flex flex-col bg-neutral-0 p-3'
      : 'flex min-h-[110px] items-start gap-4 overflow-hidden bg-neutral-25 p-3',
    className,
  ]);
}

function getUploadActionClassName({
  destructive,
  hover,
}: {
  destructive?: boolean;
  hover?: boolean;
}) {
  return buildClassName([
    'storybook-upload-action inline-flex items-center justify-center gap-2 border-0 bg-transparent',
    destructive
      ? buildClassName([
          'storybook-upload-action--destructive p-0 text-error-600',
          hover && 'storybook-upload-action--hover text-error-700',
          'hover:text-error-700',
        ])
      : buildClassName([
          'rounded-2 border border-solid border-neutral-300 px-[14px] py-2 text-neutral-700',
          hover && 'bg-neutral-50 text-neutral-800',
          'hover:bg-neutral-50 hover:text-neutral-800',
        ]),
  ]);
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
      className={getTileClassName({
        size: normalizedSize,
        status: normalizedStatus,
        type: normalizedType,
        className,
      })}
    >
      {isUploader ? (
        <Plus
          aria-hidden="true"
          className="text-brand-400"
          size={32}
          weight="regular"
        />
      ) : (
        <>
          <div
            className={getTileImageClassName(normalizedStatus)}
            data-image-index={index % 8}
            style={imageStyle}
          />
          {normalizedStatus !== 'default' && (
            <span className={getTileScrimClassName(normalizedStatus)} />
          )}
          {normalizedStatus === 'loader' && (
            <CircleNotch
              aria-hidden="true"
              className="storybook-upload-tile__loader text-neutral-0"
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
  size = 'default',
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
      className={getDropzoneClassName({
        layout: normalizedLayout,
        size,
        visualState,
        isDisabled,
        className,
      })}
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
        className={getDropzoneIconClassName(isDisabled)}
        size={24}
        weight="regular"
      />
      <span className={getDropzoneCopyClassName(normalizedLayout, size)}>
        <Text
          as="span"
          variant={size === 'small' ? 'text-sm' : 'text-md'}
          weight="medium"
          className={getDropzoneTitleClassName(isDisabled)}
        >
          {title}
        </Text>
        {supportingText && (
          <Text
            as="span"
            variant={size === 'small' ? 'text-xs' : 'text-sm'}
            weight="regular"
            className={getDropzoneDescriptionClassName(isDisabled)}
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
  const IconComponent = icon;

  return (
    <button
      type="button"
      className={getUploadActionClassName({ destructive, hover })}
      onClick={onClick}
    >
      <IconComponent aria-hidden="true" size={20} weight="regular" />
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
  const isHovered = normalizedState === 'completed-hover';

  if (isMultiple) {
    return (
      <div className={getUploadItemClassName({ isMultiple: true, className })}>
        <div className="flex flex-wrap items-center gap-2">
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
    <div className={getUploadItemClassName({ isMultiple: false, className })}>
      <div className="h-[86px] w-[86px] shrink-0 overflow-hidden rounded-2 border border-solid border-neutral-200 bg-neutral-200">
        <div className="storybook-upload-item__thumbnail-image h-full w-full" />
      </div>
      <div className="flex min-h-[86px] min-w-0 flex-1 flex-col justify-center gap-2">
        <div className="flex flex-col gap-1">
          <Text
            as="span"
            variant="text-sm"
            weight="medium"
            className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-neutral-900"
          >
            {displayedFile.name}
          </Text>
          <Text
            as="span"
            variant="text-xs"
            weight="regular"
            className="text-neutral-600"
          >
            {displayedFile.size}
          </Text>
        </div>
        <div className="flex items-center justify-between gap-3">
          <UploadActionButton
            hover={isHovered}
            icon={Repeat}
            label={replaceLabel}
            onClick={onReplace}
          />
          <UploadActionButton
            destructive
            hover={isHovered}
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
  size = 'default',
  title,
  description,
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
        'storybook-upload-file relative flex flex-col gap-2',
        size === 'small' ? 'w-full' : 'w-[500px]',
        className,
      ])}
    >
      <input
        ref={inputRef}
        accept={accept}
        className={UPLOAD_FILE_INPUT_CLASSNAME}
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
          size={size}
          state={dropzoneState}
          supportingText={supportingText}
          title={title}
          description={description}
          onBrowse={() => inputRef.current?.click()}
          onDropFiles={commitFiles}
        />
      )}
    </div>
  );
}
