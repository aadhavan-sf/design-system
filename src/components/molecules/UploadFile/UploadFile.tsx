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

const tileSizeClassNames: Record<NormalizedTileSize, string> = {
  square: 'h-[72px] w-[72px]',
  iphone: 'h-[155px] w-[72px]',
  ipad: 'h-[104px] w-[72px]',
  android: 'h-[158px] w-[72px]',
};

const generatedImageBackgrounds = [
  'linear-gradient(180deg, rgba(247, 244, 254, 0.18) 0%, rgba(13, 9, 21, 0.2) 100%), radial-gradient(circle at 58% 66%, rgba(255, 205, 165, 0.85) 0 14%, transparent 15%), linear-gradient(135deg, #11071c 0%, #1c1430 40%, #bda7f6 41%, #efe7ff 100%)',
  'linear-gradient(180deg, rgba(13, 9, 21, 0.1), rgba(13, 9, 21, 0.5)), radial-gradient(circle at 45% 72%, #c47f57 0 13%, transparent 14%), linear-gradient(160deg, #f3f0ff 0%, #d9cdfb 46%, #0d0915 47%)',
  'linear-gradient(180deg, rgba(13, 9, 21, 0), rgba(13, 9, 21, 0.3)), linear-gradient(90deg, #f7f4fe 0 35%, #0d0915 36% 72%, #d2c5fb 73%)',
  'linear-gradient(180deg, rgba(13, 9, 21, 0), rgba(13, 9, 21, 0.4)), repeating-linear-gradient(90deg, #ffffff 0 12px, #e1d9fb 12px 24px, #0d0915 24px 36px)',
  'linear-gradient(180deg, rgba(13, 9, 21, 0), rgba(13, 9, 21, 0.5)), radial-gradient(circle at 50% 36%, #323234 0 20%, transparent 21%), linear-gradient(145deg, #ffffff 0%, #d7c7fb 100%)',
  'linear-gradient(180deg, rgba(13, 9, 21, 0), rgba(13, 9, 21, 0.35)), linear-gradient(135deg, #0d0915 0%, #35165f 44%, #f7f4fe 45% 100%)',
  'linear-gradient(180deg, rgba(13, 9, 21, 0), rgba(13, 9, 21, 0.5)), repeating-linear-gradient(0deg, #f7f4fe 0 18px, #d8c9fb 18px 36px, #0d0915 36px 54px)',
  'linear-gradient(180deg, rgba(13, 9, 21, 0.05), rgba(13, 9, 21, 0.45)), linear-gradient(135deg, #ffffff 0 30%, #915ee9 31% 48%, #0d0915 49%)',
];

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
  const imageStyle = {
    backgroundImage: imageUrl
      ? `url(${imageUrl})`
      : generatedImageBackgrounds[index % generatedImageBackgrounds.length],
  };

  return (
    <div
      className={buildClassName([
        'relative shrink-0 overflow-hidden box-border border border-solid border-neutral-200 rounded-1',
        tileSizeClassNames[normalizedSize],
        isUploader && 'inline-flex items-center justify-center rounded-2 border-dashed bg-neutral-00 text-primary-400',
        className,
      ])}
    >
      {isUploader ? (
        <Plus
          aria-hidden="true"
          className="text-primary-400"
          size={32}
          weight="regular"
        />
      ) : (
        <>
          <div
            className={buildClassName([
              'h-full w-full bg-primary-100 bg-cover bg-center',
              normalizedStatus === 'loader' && 'blur-[2px]',
            ])}
            style={imageStyle}
          />
          {normalizedStatus !== 'default' && (
            <span
              className={buildClassName([
                'absolute inset-0 bg-black/20',
                normalizedStatus === 'loader' && 'bg-black/30',
              ])}
            />
          )}
          {normalizedStatus === 'loader' && (
            <CircleNotch
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin text-neutral-00"
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
        'group flex w-[500px] box-border cursor-pointer border border-dashed border-neutral-200 bg-neutral-00 text-left font-sans text-neutral-900 transition-[background-color,box-shadow,color] duration-[160ms] enabled:hover:bg-neutral-25 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400 focus-visible:bg-neutral-00 focus-visible:outline-none focus-visible:shadow-focus-primary-inset',
        normalizedLayout === 'horizontal' && 'items-start gap-3 rounded-2 p-4',
        normalizedLayout === 'vertical' && 'min-h-32 flex-col items-center justify-center gap-4 rounded-2 px-[54px] py-6 text-center',
        visualState === 'hover' && 'bg-neutral-25',
        visualState === 'focus' && 'bg-neutral-00 shadow-focus-primary-inset',
        visualState === 'disabled' && 'cursor-not-allowed bg-neutral-50 text-neutral-400',
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
        className="shrink-0 text-primary-400 group-disabled:text-neutral-400"
        size={24}
        weight="regular"
      />
      <span
        className={buildClassName([
          'flex min-w-0 flex-col gap-1',
          normalizedLayout === 'horizontal' && 'w-[252px]',
          normalizedLayout === 'vertical' && 'items-center',
        ])}
      >
        <Text
          as="span"
          variant="text-md"
          weight="medium"
          color="currentColor"
          className="whitespace-nowrap"
        >
          {title}
        </Text>
        {supportingText && (
          <Text
            as="span"
            variant="text-sm"
            weight="regular"
            color={isDisabled ? 'currentColor' : 'var(--neutral_600)'}
            className="whitespace-nowrap"
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
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-2 border-0 bg-transparent p-0 text-neutral-700 transition-[background-color,color] duration-[160ms] focus-visible:outline-none focus-visible:shadow-focus-primary-inset',
        !destructive && 'border border-solid border-neutral-300 px-[14px] py-2 enabled:hover:bg-neutral-50 enabled:hover:text-neutral-800',
        !destructive && hover && 'bg-neutral-50 text-neutral-800',
        destructive && 'text-error-600 enabled:hover:text-error-700',
        destructive && hover && 'text-error-700',
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
      <div className={buildClassName(['box-border flex w-[500px] flex-col rounded-2 border border-solid border-neutral-200 bg-neutral-00 p-3', className])}>
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
    <div
      className={buildClassName([
        'box-border flex min-h-[110px] w-[500px] items-start gap-4 overflow-hidden rounded-2 border border-solid border-neutral-200 bg-neutral-25 p-3',
        className,
      ])}
    >
      <div className="h-[86px] w-[86px] shrink-0 overflow-hidden rounded-2 border border-solid border-neutral-200 bg-neutral-200">
        <div className="h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(12,18,32,0.58)_100%),linear-gradient(145deg,#d2e6f6_0%,#7189a5_42%,#1f2937_100%)]" />
      </div>
      <div className="flex min-h-[86px] min-w-0 flex-1 basis-0 flex-col justify-center gap-2">
        <div className="flex flex-col gap-1">
          <Text
            as="span"
            variant="text-sm"
            weight="medium"
            color="var(--neutral_900)"
            className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {displayedFile.name}
          </Text>
          <Text
            as="span"
            variant="text-xs"
            weight="regular"
            color="var(--neutral_600)"
          >
            {displayedFile.size}
          </Text>
        </div>
        <div className="flex items-center justify-between gap-3">
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
        'flex w-[500px] flex-col gap-2',
        className,
      ])}
    >
      <input
        ref={inputRef}
        accept={accept}
        className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)] [clip:rect(0_0_0_0)]"
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
