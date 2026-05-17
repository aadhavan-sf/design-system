import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CircleNotch,
  MonitorArrowUp,
  Plus,
  Repeat,
  Trash,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './uploadFile.css';

const LAYOUTS = ['horizontal', 'vertical'];
const MODES = ['single', 'multiple'];
const DROPZONE_STATES = ['enabled', 'hover', 'focus', 'disabled'];
const TILE_SIZES = ['square', 'iphone', 'ipad', 'android'];
const TILE_STATUSES = ['default', 'hovered', 'loader'];
const MULTIPLE_STATES = ['complete', 'add-empty', 'add-hover', 'add-loader'];

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function formatFileSize(size) {
  if (!Number.isFinite(size)) {
    return '200 KB';
  }

  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getDisplayFile(files, fallbackName, fallbackSize) {
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

function getPreviewUrls(files) {
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
}) {
  const normalizedSize = normalizeValue(size, {
    Square: 'square',
    iPhone: 'iphone',
    iPad: 'ipad',
    Android: 'android',
  });
  const normalizedStatus = normalizeValue(status, {
    Default: 'default',
    Hovered: 'hovered',
    Loader: 'loader',
  });
  const normalizedType = normalizeValue(type, {
    Image: 'image',
    Uploader: 'uploader',
  });
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

ImageAspectRatio.propTypes = {
  size: PropTypes.oneOf([...TILE_SIZES, 'Square', 'iPhone', 'iPad', 'Android']),
  status: PropTypes.oneOf([...TILE_STATUSES, 'Default', 'Hovered', 'Loader']),
  type: PropTypes.oneOf(['image', 'uploader', 'Image', 'Uploader']),
  index: PropTypes.number,
  imageUrl: PropTypes.string,
  className: PropTypes.string,
};

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
}) {
  const [isDragging, setIsDragging] = useState(false);
  const normalizedLayout = normalizeValue(layout, {
    Horizontal: 'horizontal',
    Vertical: 'vertical',
  });
  const normalizedState = normalizeValue(state, {
    Enabled: 'enabled',
    Hover: 'hover',
    Focus: 'focus',
    Disabled: 'disabled',
  });
  const isDisabled = disabled || normalizedState === 'disabled';
  const visualState = isDragging && !isDisabled ? 'hover' : normalizedState;

  const handleDrop = (event) => {
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

UploadFileBase.propTypes = {
  layout: PropTypes.oneOf([...LAYOUTS, 'Horizontal', 'Vertical']),
  state: PropTypes.oneOf([...DROPZONE_STATES, 'Enabled', 'Hover', 'Focus', 'Disabled']),
  supportingText: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onBrowse: PropTypes.func,
  onDropFiles: PropTypes.func,
};

function UploadActionButton({
  destructive = false,
  hover = false,
  icon,
  label,
  onClick,
}) {
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

UploadActionButton.propTypes = {
  destructive: PropTypes.bool,
  hover: PropTypes.bool,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

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
}) {
  const normalizedType = normalizeValue(type, {
    Single: 'single',
    Multiple: 'multiple',
  });
  const normalizedState = normalizeValue(state, {
    Completed: 'completed',
    Complete: 'complete',
    'Completed + Hover': 'completed-hover',
    'Completed + 1 Empty': 'add-empty',
    'Completed + 1 Loader': 'add-loader',
    'Completed + 1 Hover': 'add-hover',
  });
  const isMultiple = normalizedType === 'multiple';
  const displayedFile = getDisplayFile(files, fileName, fileSize);
  const tileCount = isMultiple && normalizedState === 'complete' ? 8 : 7;
  const hasAddTile = isMultiple && MULTIPLE_STATES.includes(normalizedState);
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
            color="var(--neutral_900)"
            className="storybook-upload-item__name"
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

UploadFileItem.propTypes = {
  type: PropTypes.oneOf([...MODES, 'Single', 'Multiple']),
  state: PropTypes.oneOf([
    'completed',
    'completed-hover',
    ...MULTIPLE_STATES,
    'Completed',
    'Complete',
    'Completed + Hover',
    'Completed + 1 Empty',
    'Completed + 1 Loader',
    'Completed + 1 Hover',
  ]),
  files: PropTypes.arrayOf(PropTypes.object),
  fileName: PropTypes.string,
  fileSize: PropTypes.string,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  tileSize: PropTypes.oneOf([...TILE_SIZES, 'Square', 'iPhone', 'iPad', 'Android']),
  replaceLabel: PropTypes.string,
  deleteLabel: PropTypes.string,
  className: PropTypes.string,
  onReplace: PropTypes.func,
  onDelete: PropTypes.func,
};

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
}) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [hasClearedQueuedFiles, setHasClearedQueuedFiles] = useState(false);
  const normalizedLayout = normalizeValue(layout, {
    Horizontal: 'horizontal',
    Vertical: 'vertical',
    'Horizontal + Single': 'horizontal',
    'Vertical + Single': 'vertical',
    'Horizontal + Multiple': 'horizontal',
    'Vertical + Multiple': 'vertical',
  });
  const normalizedMode = normalizeValue(mode, {
    Single: 'single',
    Multiple: 'multiple',
  });
  const isMultiple = normalizedMode === 'multiple';

  useEffect(() => () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewUrls]);

  const commitFiles = (nextFiles, { preserveClearedState = false } = {}) => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setPreviewUrls(getPreviewUrls(nextFiles));
    if (!preserveClearedState) {
      setHasClearedQueuedFiles(false);
    }
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  const handleInputChange = (event) => {
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

UploadFile.propTypes = {
  layout: PropTypes.oneOf([
    ...LAYOUTS,
    'Horizontal',
    'Vertical',
    'Horizontal + Single',
    'Vertical + Single',
    'Horizontal + Multiple',
    'Vertical + Multiple',
  ]),
  mode: PropTypes.oneOf([...MODES, 'Single', 'Multiple']),
  filesQueued: PropTypes.bool,
  dropzoneState: PropTypes.oneOf([...DROPZONE_STATES, 'Enabled', 'Hover', 'Focus', 'Disabled']),
  supportingText: PropTypes.bool,
  multipleState: PropTypes.oneOf(MULTIPLE_STATES),
  fileName: PropTypes.string,
  fileSize: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  onFilesChange: PropTypes.func,
  onReplace: PropTypes.func,
  onDelete: PropTypes.func,
};
